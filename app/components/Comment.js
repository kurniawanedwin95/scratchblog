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
    const t = new Date();
    const time = t.toString();
    const commentinput = document.getElementById(postId).value;
    CommentActions.create(postId, commentinput, time);
  }

  deleteComment(id) {
    CommentActions.delete(id);
  }

  startEditComment(id) {
    console.log('boom');
    CommentActions.startEdit(id);
  }

  finishEditComment(id) {
    const t = new Date();
    const time = t.toString();
    const commentInput = document.getElementById('edit-comment-input').value;
    CommentActions.finishEdit(id, commentInput, time);
  }

  renderWhich(comment, postId) {
    if (comment.editing === true) {
      return (
        <div>
          <br></br>
          <div className="comment-author-time">
            <div className="comment-delete"
              onClick={this.deleteComment.bind(this, comment.id)}
            >x</div>
            <button className="comment-edit"
              onClick={this.finishEditComment.bind(this, comment.id)}
            >Confirm modifications</button>
            Author: anonymous, {comment.time}
          </div>
          <textarea id='edit-comment-input' rows="2" cols="15">
            {comment.text}
          </textarea>
        </div>
      );
    }
    else if (comment.editing === false) {
      return (
        <div>
          <br></br>
          <div className="comment-author-time">
            <div className="comment-delete"
              onClick={this.deleteComment.bind(this, comment.id)}
            >x</div>
            <div className="comment-edit"
              onClick={this.startEditComment.bind(this, comment.id)}
            >Modify</div>
            Author: anonymous, {comment.time}
          </div>
          {comment.text}
        </div>
      );
    }
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
            {this.renderWhich(comment, postId)}
          </li>
        );
      }
    });
    return (
      <div className="comment-box">
        {renderComments}
        <div className="comment-textarea">
          <br></br>
          <div>Write your comment:</div>
          <textarea id={postId} rows="3" cols="30">
          </textarea>
        </div>
        <br></br>
        <button className="add-comment" onClick={this.addComment.bind(this, postId)}>
          Add comment
        </button>
      </div>
    );
  }
}

export default Comment;
