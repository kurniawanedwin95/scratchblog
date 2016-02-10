import React from 'react';
import PostActions from '../actions/PostActions.js';
import PostStore from '../stores/PostStore.js';
import Comment from './Comment.js';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.storeChanged = this.storeChanged.bind(this);
  }

  componentDidMount() {
    PostStore.addChangeListener(this.storeChanged);
  }

  componentWillUnmount() {
    PostStore.removeChangeListener(this.storeChanged);
  }

  storeChanged() {
    this.setState({ posts: PostStore.posts });
  }

  addPost() {
    const t = new Date();
    const time = t.toString();
    const postTitle = document.getElementById('post-title').value;
    const postInput = document.getElementById('post-input').value;
    PostActions.create(postTitle, postInput, time);
  }

  deletePost(id) {
    PostActions.delete(id);
  }

  render() {
    const posts = PostStore.posts;
    const renderPost = [];
    console.log(this.state.posts);
    posts.forEach(post => {
      renderPost.push(
        <li className="post" key={post.id}>
          <div className="post-title">{post.title}</div>
          <br></br>
          {post.text}
          <div className="post-author-time">
            Author: Edwin, {post.time}
          </div>
          <ul>
            <Comment
              postId={post.id}
            />
          </ul>
          <button onClick={this.deletePost.bind(this, post.id)}>Remove post</button>
        </li>
      );
    });
    return (
      <div>
        {renderPost}
        <br></br>
        Title:
        <div className="title-textarea">
          <textarea id="post-title" rows="1" cols="50">
          </textarea>
        </div>
        Post:
        <div className="post-textarea">
          <textarea id="post-input" rows="7" cols="75">
          </textarea>
        </div>
        <button onClick={this.addPost}>Post!</button>
      </div>
    );
  }
}

export default Post;
