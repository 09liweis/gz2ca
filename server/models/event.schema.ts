import { defineMongooseModel } from '#nuxt/mongoose';

export const Event = defineMongooseModel('Event', {
  tl: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    trim: true
  },
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  place_id: {
    type: String,
    ref: 'Place',
    index: true
  },
  status: {
    type: String,//draft, published
  },
  ts: {
    type: Date,
  },
  mt: {
    type: Date,
  }
})