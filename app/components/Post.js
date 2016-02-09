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
    const postinput = document.getElementById('postinput').value;
    PostActions.create(postinput);
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
          {post.text}
          <div className="author">by Edwin</div>
          <Comment
            postId={post.id}
          />
          <button onClick={this.deletePost.bind(this, post.id)}>Remove post</button>
        </li>
      );
    });
    return (
      <div>
        {renderPost}
        <br></br>
        <textarea id="postinput" rows="7" cols="75">
        </textarea>
        <button onClick={this.addPost}>Post!</button>
      </div>
    );
  }
}

export default Post;
