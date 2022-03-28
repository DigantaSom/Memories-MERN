import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';

import useStyles from './styles';

const initialPostState = {
  title: '',
  message: '',
  tags: '',
  selectedFile: '',
};

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState(initialPostState);
  const post = useSelector(state =>
    currentId ? state.posts.find(p => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleChange = e => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          name: user?.result?.name || user?.result?.givenName,
        })
      );
    } else {
      dispatch(
        createPost({
          ...postData,
          name: user?.result?.name || user?.result?.givenName,
        })
      );
    }
    onClear();
  };

  const onClear = () => {
    setCurrentId(null);
    setPostData(initialPostState);
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memories and like others' memories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? 'Editing' : 'Creating'} a Memory
        </Typography>
        <TextField
          variant='outlined'
          label='Title'
          fullWidth
          name='title'
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          label='Message'
          fullWidth
          name='message'
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          variant='outlined'
          label='Tags'
          fullWidth
          name='tags'
          value={postData.tags}
          onChange={e =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          fullWidth
          onClick={onClear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
