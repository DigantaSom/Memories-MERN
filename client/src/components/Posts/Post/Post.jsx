import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { deletePost, likePost } from '../../../actions/posts';

import useStyles from './styles';

const Post = ({
  post: {
    _id,
    title,
    name,
    creator,
    message,
    selectedFile,
    createdAt,
    tags,
    likes,
  },
  setCurrentId,
}) => {
  const [postLikes, setPostLikes] = useState(likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  dayjs.extend(relativeTime);

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = likes.find(like => like === userId);

  const openPost = () => {
    navigate(`/posts/${_id}`);
  };

  const handleClickLike = async () => {
    dispatch(likePost(_id));

    if (hasLikedPost) {
      setPostLikes(likes.filter(id => id !== userId));
    } else {
      setPostLikes([...likes, userId]);
    }
  };

  const Likes = () => {
    if (postLikes.length > 0) {
      return hasLikedPost ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {postLikes.length > 2
            ? `You and ${postLikes.length - 1} others`
            : `${postLikes.length} like${postLikes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize='small' />
          &nbsp;{postLikes.length}&nbsp;
          {postLikes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={selectedFile || ''}
          title={title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='body2'>{dayjs(createdAt).fromNow()}</Typography>
        </div>
        {(user?.result.googleId === creator ||
          user?.result._id === creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: 'white' }}
              size='small'
              onClick={() => setCurrentId(_id)}
            >
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {tags.map(tag => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>
          {title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={handleClickLike}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {(user?.result.googleId === creator ||
          user?.result._id === creator) && (
          <Button
            size='small'
            color='primary'
            onClick={() => dispatch(deletePost(_id))}
          >
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
