import React from 'react';
import PostActions from '../actions/PostActions.js';
import PostStore from '../stores/PostStore.js';
import Comment from './Comment.js';
import { IndexLink } from 'react-router';

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
    let postInput = document.getElementById('post-input').value;
    PostActions.create(postTitle, postInput, time);
    // erases the textarea
    document.getElementById('post-title').value = '';
    document.getElementById('post-input').value = '';
  }

  deletePost(id) {
    PostActions.delete(id);
  }

  startEditPost(id) {
    PostActions.startEdit(id);
  }

  finishEditPost(id) {
    const t = new Date();
    const time = t.toString();
    const postTitle = document.getElementById('edit-post-title').value;
    const postInput = document.getElementById('edit-post-input').value;
    PostActions.finishEdit(id, postTitle, postInput, time);
    // erases the textarea
    document.getElementById('edit-post-title').value = '';
    document.getElementById('edit-post-input').value = '';
  }

  renderWhich(post) {
    // in editing mode
    if (post.editing === true) {
      return (
        <div>
          Title:
          <div className="title-textarea">
            <textarea id="edit-post-title" rows="1" cols="50">
            {post.title}
            </textarea>
          </div>
          Post:
          <div className="post-textarea">
            <textarea id="edit-post-input" rows="7" cols="75">
            {post.text}
            </textarea>
          </div>
          <div className="post-author-time">
            Author: Edwin, {post.time}
          </div>
          <ul>
            <Comment
              postId={post.id}
            />
          </ul>
          <button><IndexLink to="/">
            Return to home
          </IndexLink></button>
          <button
            onClick={this.deletePost.bind(this, post.id)}
          ><IndexLink to="/">
            Remove post
            </IndexLink>
          </button>
          <button
            onClick={this.finishEditPost.bind(this, post.id)}
          >Confirm post modification</button>
        </div>
      );
    }
    // before and after editing mode
    else if (post.editing === false) {
      return (
        <div>
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
          <button><IndexLink to="/">
            Return to home
          </IndexLink></button>
          <button
            onClick={this.deletePost.bind(this, post.id)}
          ><IndexLink to="/">
            Remove post
            </IndexLink>
          </button>
          <button
            onClick={this.startEditPost.bind(this, post.id)}
          >Modify post</button>
        </div>
      );
    }
  }

  render() {
    const posts = PostStore.posts;
    const renderPost = [];
    posts.forEach(post => {
      if (post.id === this.props.params.id) {
        renderPost.push(
          <li className="post" key={post.id}>
            {this.renderWhich(post)}
          </li>
        );
      }
    });
    return (
      <div>
        {renderPost}
      </div>
    );
  }
}

export default Post;
