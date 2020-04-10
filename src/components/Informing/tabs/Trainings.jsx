import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';

import LoadingBox from './common/LoadingBox';
import FailureBox from './common/FailureBox';
import PostCard from './common/PostCard';

import styles from './Trainings.module.scss';

const states = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export default function Trainings() {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState(states.LOADING);
  const [hasMore, setHasMore] = useState(false);

  function fetchPosts(page) {
    setState(states.LOADING);
    axios({
      url: process.env.REACT_APP_GET_POSTS,
      params: {
        page,
        per_page: 10,
        type: 1,
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

  useEffect(() => {
    fetchPosts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          pageStart={1}
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
