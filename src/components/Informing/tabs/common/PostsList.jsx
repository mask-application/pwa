import React, { useState } from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';

import LoadingBox from './LoadingBox';
import FailureBox from './FailureBox';
import PostCard from './PostCard';
import PostDetails from './PostDetails';

import styles from './PostsList.module.scss';

export default function PostsList({ type }) {
  const [posts, setPosts] = useState([]);
  const [hasFailed, setHasFailed] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  function fetchPosts(page) {
    setHasFailed(false);
    axios({
      url: process.env.REACT_APP_GET_POSTS,
      params: {
        page,
        per_page: 10,
        type,
      },
    })
      .then(({ data }) => {
        setHasMore(data.meta.has_next);
        setPosts(posts.concat(data.list));
        setHasFailed(false);
      })
      .catch((err) => {
        console.error(err);
        setHasFailed(true);
      });
  }

  if (hasFailed) {
    return <FailureBox />;
  }

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
          <PostCard
            key={post.id}
            post={post}
            large={index === 0}
            onClick={() => setSelectedPost(post)}
          />
        ))}
      </InfiniteScroll>
      <PostDetails post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
