import { Place } from '../models/place.schema'

export const upsertPlace = async (place: any) => {
  if (!place) {
    return null
  }

  const existingPlace = await Place.findOne({ mapbox_id: place.mapbox_id })

  if (existingPlace) {
    return existingPlace._id.toString()
  }

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
  })

  return newPlace._id.toString()
}
