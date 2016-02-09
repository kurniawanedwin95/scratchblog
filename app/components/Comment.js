import React from 'react';
import CommentActions from '../actions/CommentActions.js';
import CommentStore from '../stores/CommentStore.js';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
    this.storeChanged = this.storeChanged.bind(this);
  }

  componentDidMount() {
    CommentStore.addChangeListener(this.storeChanged);
  }

  componentWillUnmount() {
    CommentStore.removeChangeListener(this.storeChanged);
  }

  storeChanged() {
    this.setState({ comments: CommentStore.comments });
  }

  addComment(postId) {
    const commentinput = document.getElementById(postId).value;
    CommentActions.create(postId, commentinput);
  }

  render() {
    const comments = CommentStore.comments;
    const renderComments = [];
    const postId = this.props.postId;
    console.log(postId);

    comments.forEach(comment => {
      if (comment.postId === postId) {
        renderComments.push(
          <li className="comment" key={comment.id}>
            <br></br>
            Author: anonymous
            <br></br>
            {comment.text}
          </li>
        );
      }
    });
    return (
      <div className="comment">
        Comments:
        {renderComments}
        <textarea id={postId} rows="3" cols="30">
        </textarea>
        <br></br>
        <button className="add-comment" onClick={this.addComment.bind(this, postId)}>
          Add comment
        </button>
      </div>
    );
  }
}

export default Comment;
