import { defineMongooseModel } from '#nuxt/mongoose';

export const Place = defineMongooseModel('Place', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  full_address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  region: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  mapbox_id: {
    type: String,
    trim: true,
    index: true
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  context: {
    type: Object,
    default: {}
  },
  ts: {
    type: Date,
  },
  mt: {
    type: Date,
  }
})
