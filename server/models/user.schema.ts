import { defineMongooseModel } from '#nuxt/mongoose';

export const User = defineMongooseModel('User', {
  fn: {
    type: String,
    required: true,
    trim: true
  },
  ln:{
    type:String,
    required: true,
    trim:true
  },
  eml: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  pwd: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
  },
  avt: {
    type: String,
    required: false
  },
  graduationYear: {
    type: Number,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  lts: {
    type: Date,
  },
  ts:{
    type:Date
  },
  mt:{
    type: Date
  }
})