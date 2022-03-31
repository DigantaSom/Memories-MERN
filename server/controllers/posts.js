import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  const { page } = req.query;

  const LIMIT = 8;
  const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

  try {
    const total = await PostMessage.countDocuments();
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i'); // case insensitive search
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });
    res.status(200).json({ data: posts });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that ID.');
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that ID.');
  }
  try {
    await PostMessage.findByIdAndDelete(_id);
    return res.json({ message: 'Post deleted successfully.' });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
export const likePost = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      message: 'Unauthorized to Like Post',
    });
  }
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that ID.');
  }
  try {
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex(id => id === String(req.userId));
    if (index === -1) {
      // if user wants to like the post
      post.likes.push(req.userId);
    } else {
      // if user wants to remove their like from the post
      post.likes = post.likes.filter(id => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
