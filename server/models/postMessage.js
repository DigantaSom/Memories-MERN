import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String, // _id of the creator
  name: String, // name of the creator
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: { type: Date, default: new Date() },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
