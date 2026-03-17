import { defineEventHandler, getCookie, readBody } from 'h3';
import { Event } from '../../models/event.schema';
import { Place } from '../../models/place.schema';
import { verifyToken } from '../../utils/jwt';
import { handleUnauthorized, handleInternalError } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token') || event.node.req.headers.authorization?.split(' ')[1];

  if (!token) {
    return handleUnauthorized('请先登录');
  }

  try {
    const user = await verifyToken(token);
    if (!user || !user._id) {
      handleUnauthorized('用户不存在');
    }

    const body = await readBody(event);
    const { tl, desc, date, place, status } = body;

    let place_id = null;

    if (place) {
      const existingPlace = await Place.findOne({ mapbox_id: place.mapbox_id });

      if (existingPlace) {
        place_id = existingPlace._id.toString();
      } else {
        const newPlace = await Place.create({
          name: place.name,
          full_address: place.full_address,
          city: place.context?.place?.name,
          region: place.context?.region?.name,
          country: place.context?.country?.name,
          mapbox_id: place.mapbox_id,
          latitude: place.coordinates?.latitude,
          longitude: place.coordinates?.longitude,
          coordinates: place.coordinates?.latitude && place.coordinates?.longitude
            ? {
                type: 'Point',
                coordinates: [place.coordinates.longitude, place.coordinates.latitude]
              }
            : undefined,
          context: place.context,
          ts: new Date(),
          mt: new Date()
        });
        place_id = newPlace._id.toString();
      }
    }

    const newEvent = await Event.create({
      tl,
      desc,
      user_id: user._id,
      date,
      place_id,
      status: status || 'draft',
      ts: new Date(),
      mt: new Date()
    });

    const populatedEvent = await Event.findById(newEvent._id).populate('place_id');

    return {
      success: true,
      message: '活动创建成功',
      event: populatedEvent
    };
  } catch (error: any) {
    console.error('Create event error:', error);
    handleInternalError(error.message || '创建活动失败');
  }
});
