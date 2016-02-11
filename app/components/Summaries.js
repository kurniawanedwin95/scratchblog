import React from 'react';
import PostStore from '../stores/PostStore.js';
import PostActions from '../actions/PostActions.js';
import { Link } from 'react-router';

class Summaries extends React.Component {
  constructor() {
    super();
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
    // erases the textarea
    document.getElementById('post-title').value = '';
    document.getElementById('post-input').value = '';
  }

  render() {
    const posts = PostStore.posts;
    const renderSummaries = [];
    posts.forEach(post => {
      renderSummaries.push(
        <li className="summaries" key={post.id}>
          <div>
            <div className="summary-title">
              {post.title}
            </div>
            <br></br>
            <div className="summary-time">
              {post.time}
            </div>
            <br></br>
            <div>
              {post.text.substring(0, 100)}
            </div>
            <div className="read-more">
              <Link to={`/post/${post.id}`}>
                Read more..
              </Link>
            </div>
          </div>
        </li>
      );
    });
    return (
      <div>
        {renderSummaries}
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

export default Summaries;
