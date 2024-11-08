import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const channelSchema = new Schema({
  name: String,
  domain: String,
  internal_link: String,
  theme: String,
})

export const ChannelModel = model('Channel', channelSchema)
export type Channel = InstanceType<typeof ChannelModel>
