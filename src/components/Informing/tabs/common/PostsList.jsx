import React, { useState } from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';

import LoadingBox from './LoadingBox';
import FailureBox from './FailureBox';
import PostCard from './PostCard';

import styles from './PostsList.module.scss';

const states = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export default function PostsList({ type }) {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState(states.SUCCESS);
  const [hasMore, setHasMore] = useState(true);

  function fetchPosts(page) {
    setState(states.LOADING);
    axios({
      url: process.env.REACT_APP_GET_POSTS,
      params: {
        page,
        per_page: 10,
        type,
      },
    })
      .then(({ data }) => {
        setPosts(posts.concat(data.list));
        setHasMore(data.meta.has_next);
        setState(states.SUCCESS);
      })
      .catch((err) => {
        console.error(err);
        setState(states.FAILURE);
      });
  }

  if (state === states.LOADING) {
    return <LoadingBox />;
  }
  if (state === states.FAILURE) {
    return <FailureBox />;
  }
  if (state === states.SUCCESS) {
    return (
      <div className={styles.listContainer}>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchPosts}
          hasMore={hasMore}
          loader={<LoadingBox key={0} />}
          useWindow={false}
        >
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} large={index === 0} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
