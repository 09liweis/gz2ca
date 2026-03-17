import { defineMongooseModel } from '#nuxt/mongoose';

export const Media = defineMongooseModel('Media', {
  event_id: {
    type: String,
    required: true,
    index: true
  },
  thumb: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  ts: {
    type: Date,
  },
  mt: {
    type: Date,
  }
})
