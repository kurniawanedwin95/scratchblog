import React from 'react';
import Post from './Post.js';

export default ({ posts }) => {
  // shit is still under construction
  const post = Post.post;
  return (
    <div className="posts">
      <Post className="post" key={post.id} post={post} />
    </div>
  );
};
