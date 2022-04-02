import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button } from '@material-ui/core';

import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const commentsRef = useRef();
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem('profile'));

  const handleClick = async () => {
    if (user) {
      const finalComment = `${user.result.name}: ${comment}`;
      const newComments = await dispatch(commentPost(finalComment, post._id));
      setComments(newComments);
      setComment('');
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant='h6'>
              Write a comment
            </Typography>
            <TextField
              label='Comment'
              fullWidth
              variant='outlined'
              multiline
              minRows={4}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: 10 }}
              variant='contained'
              color='primary'
              fullWidth
              disabled={!comment}
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
