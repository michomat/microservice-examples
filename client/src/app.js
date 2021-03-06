import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

export default () => {
  return (
    <div className="container">
      <h1>Blog App</h1>
      <PostCreate></PostCreate>
      <hr />
      <h1>Posts</h1>
      <PostList></PostList>
    </div>
  );
};
