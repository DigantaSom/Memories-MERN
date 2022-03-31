import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import { getPostsBySearch } from '../../actions/posts';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';

import useStyles from './styles';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const classes = useStyles();

  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const searchPosts = () => {
    if (searchTerm.trim() || tags) {
      dispatch(getPostsBySearch({ searchTerm, tags: tags.join(',') }));
      navigate(
        `/posts/search?searchQuery=${searchTerm || 'none'}&tags=${tags.join(
          ','
        )}`
      );
    } else {
      navigate('/');
    }
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      searchPosts();
    }
  };

  const handleAddTag = tag => {
    setTags(prevTagsState => [...prevTagsState, tag]);
  };

  const handleDeleteTag = tagToDelete => {
    setTags(prevTagsState => prevTagsState.filter(tag => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} md={9} sm={6}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                fullWidth
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyUp={handleKeyUp}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                label='Search Tags'
                variant='outlined'
              />
              <Button
                onClick={searchPosts}
                className={classes.searchButton}
                variant='contained'
                color='primary'
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper
                className={classes.pagination}
                elevation={6}
                className={classes.pagination}
              >
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
