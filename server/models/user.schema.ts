import { defineMongooseModel } from '#nuxt/mongoose';

export const User = defineMongooseModel('User', {
  fn: {
    type: String,
    trim: true
  },
  ln:{
    type:String,
    trim:true
  },
  eml: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  pwd: {
    type: String,
    minlength: 6
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
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