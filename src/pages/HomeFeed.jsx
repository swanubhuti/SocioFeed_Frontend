import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  useAuth  from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import { useIntersectionObserver } from 'react-intersection-observer';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
}));

const HomeFeed = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { intersectionObserver } = useIntersectionObserver();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts/feed', {
          params: {
            userId: user.id,
            page: 1,
            limit: 10,
          },
        });
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get('/api/posts/feed', {
        params: {
          userId: user.id,
          page: 2,
          limit: 10,
        },
      });
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      setLoading(false);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/like`);
      const updatedPost = posts.find((post) => post.id === postId);
      updatedPost.likesCount = response.data.likesCount;
      setPosts((prevPosts) => [...prevPosts]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentPost = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`);
      const updatedPost = posts.find((post) => post.id === postId);
      updatedPost.commentsCount = response.data.commentsCount;
      setPosts((prevPosts) => [...prevPosts]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSavePost = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/save`);
      const updatedPost = posts.find((post) => post.id === postId);
      updatedPost.saved = true;
      setPosts((prevPosts) => [...prevPosts]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} className={classes.card}>
          <CardHeader
            avatar={
              <img src={post.author.profilePic} alt={post.author.username} />
            }
            title={
              <Typography variant="h6" component="h6">
                {post.author.username}
              </Typography>
            }
            subheader={<Typography variant="body2" component="p">
              {moment(post.createdAt).fromNow()}
            </Typography>}
          />
          <CardContent>
            <Typography variant="body1" component="p">
              {post.content}
            </Typography>
            <CardMedia
              component="img"
              image={post.images[0]}
              title={post.author.username}
            />
          </CardContent>
          <Button variant="contained" color="primary" onClick={() => handleLikePost(post.id)}>
            <i className="material-icons">favorite</i> {post.likesCount}
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleCommentPost(post.id)}>
            <i className="material-icons">comment</i> {post.commentsCount}
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleSavePost(post.id)}>
            <i className="material-icons">bookmark</i>
          </Button>
        </Card>
      ))}
      {loading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {!hasMore && (
        <Typography variant="body2" component="p">
          You're all caught up!
        </Typography>
      )}
      {intersectionObserver && (
        <button onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default HomeFeed;
