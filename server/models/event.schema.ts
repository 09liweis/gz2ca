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
  address: {
    type: String,
    trim: true
  },
  city: {
    type: String,
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