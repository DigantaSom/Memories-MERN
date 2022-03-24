import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';

import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    creator: '',
    tags: '',
    selectedFile: '',
  });
  const post = useSelector(state =>
    currentId ? state.posts.find(p => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

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
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    onClear();
  };

  const onClear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      creator: '',
      tags: '',
      selectedFile: '',
    });
  };

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
          label='Creator'
          fullWidth
          name='creator'
          value={postData.creator}
          onChange={handleChange}
        />
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
          onChange={handleChange}
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
