import React from 'react';
import PostActions from '../actions/PostActions.js';
import PostStore from '../stores/PostStore.js';

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
    const input = document.getElementById('input').value;
    PostActions.create(input);
  }

  deletePost() {
    console.log('imma delete');
    return;
  }

  render() {
    // WE'RE GONNA DO A MAP/FOREACH AND RENDER ALL THE POST OF POSTS!
    const posts = PostStore.posts;
    const renderPost = [];
    console.log(this.state.posts);
    posts.forEach(post => {
      renderPost.push(
        <li className="post" key={post.id}>
          {post.text}
          <div className="author"> by Edwin </div>
          <button onClick={this.deletePost}>Remove post</button>
        </li>
      );
    });
    return (
      <div>
        {renderPost}
        <br></br>
        <textarea id = "input" rows="7" cols="75">
        </textarea>
        <button onClick={this.addPost}>Post!</button>
      </div>
    );
  }
}

export default Post;
