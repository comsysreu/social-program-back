import * as mongoose from 'mongoose';

export const ViewSchema = new mongoose.Schema({
  name: String,
  id: Number,
  path: String,
  title: String,
});
