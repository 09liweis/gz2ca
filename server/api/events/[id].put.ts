import { defineEventHandler, getCookie, readBody, getRouterParam } from 'h3';
import { Event } from '../../models/event.schema';
import { Place } from '../../models/place.schema';
import { verifyToken } from '../../utils/jwt';
import { handleUnauthorized, handleBadRequest, handleNotFound, handleForbidden, handleInternalError } from '../../utils/error';

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

    const eventId = getRouterParam(event, 'id');
    if (!eventId) {
      handleBadRequest('活动ID不能为空');
    }

    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      handleNotFound('活动不存在');
    }

    if (existingEvent.user_id !== user._id.toString()) {
      handleForbidden('无权修改此活动');
    }

    const body = await readBody(event);
    const { tl, desc, date, place, status } = body;

    let place_id = existingEvent.place_id;

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

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        tl,
        desc,
        date,
        place_id,
        status,
        mt: new Date()
      },
      { new: true, runValidators: true }
    );

    const populatedEvent = await Event.findById(updatedEvent._id).populate('place_id');

    return {
      success: true,
      message: '活动更新成功',
      event: populatedEvent
    };
  } catch (error: any) {
    console.error('Update event error:', error);
    handleInternalError(error.message || '更新活动失败');
  }
});
