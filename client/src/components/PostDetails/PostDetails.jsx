import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from '@material-ui/core';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import CommentSection from './CommentSection';

import { getPost, getPostsBySearch } from '../../actions/posts';

import useStyles from './styles';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, post, isLoading } = useSelector(state => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();

  dayjs.extend(relativeTime);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      getPostsBySearch({ searchTerm: 'none', tags: post?.tags.join(',') })
    );
  }, [dispatch, post]);

  const openPost = id => {
    navigate(`/posts/${id}`);
  };

  if (!post) {
    return null;
  }

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant='h6'
            color='textSecondary'
            component='h2'
          >
            {post.tags.map(tag => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant='body1' component='p'>
            {post.message}
          </Typography>
          <Typography variant='h6'>Created by: {post.name}</Typography>
          <Typography variant='body1'>
            {dayjs(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant='body1'>
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>

      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>
            You might also like
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ _id, title, message, name, likes, selectedFile }) => (
                <div
                  key={id}
                  style={{ margin: 20, cursor: 'pointer' }}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant='h6'>
                    {title}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {name}
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    {message}
                  </Typography>
                  <Typography gutterBottom variant='subtitle1'>
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} alt={title} width={200} />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
