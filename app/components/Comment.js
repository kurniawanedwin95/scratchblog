import React from 'react';
import CommentActions from '../actions/CommentActions.js';
import CommentStore from '../stores/CommentStore.js';
import Reply from './Reply.js';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      hide: false,
    };
    this.storeChanged = this.storeChanged.bind(this);
    this.hideComments = this.hideComments.bind(this);
    this.showComments = this.showComments.bind(this);
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

  addComment(postId, commentAuthor) {
    if (!commentAuthor && commentAuthor !== 'admin') {
      alert('Please login to comment');
      return;
    }
    else {
      const t = new Date();
      const time = t.toString();
      const commentInput = document.getElementById(postId).value;
      CommentActions.create(postId, commentAuthor, commentInput, time);
      // erases the textarea
      document.getElementById(postId).value = '';
    }
  }

  deleteComment(id) {
    CommentActions.delete(id);
  }

  startEditComment(id) {
    CommentActions.startEdit(id);
  }

  finishEditComment(id, user) {
    const t = new Date();
    const time = t.toString();
    const commentInput = document.getElementById('edit-comment-input').value;
    CommentActions.finishEdit(id, commentInput, time);
    // erases the textarea
    document.getElementById('edit-comment-input').value = '';
  }

  hideComments() {
    this.setState({ hide: true });
  }

  showComments() {
    this.setState({ hide: false });
  }

  hideShowComments(postId, renderComments) {
    if (this.state.hide) {
      return (
        <div>
          <div className="comment-hide-show" onClick={this.showComments}>Show comments</div>
          <br></br>
          Comments are hidden
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="comment-hide-show" onClick={this.hideComments}>Hide comments</div>
          {renderComments}
          <div className="comment-textarea">
            <br></br>
            <div>Write your comment:</div>
            <textarea id={postId} rows="3" cols="50">
            </textarea>
            <button onClick={this.addComment.bind(this, postId, this.props.user)}>
              Add comment
            </button>
          </div>          
        </div>
      );
    }
  }

  renderWhich(comment, postId) {
    if (comment.editing === true) {
      // editing a comment
      return (
        <div>
          <br></br>
          <div className="comment-author-time">
            <div className="comment-delete"
              onClick={this.deleteComment.bind(this, comment.id)}
            >x</div>
            <button className="comment-edit"
              onClick={this.finishEditComment.bind(this, comment.id, this.props.user)}
            >Confirm modifications</button>
            Author: {comment.author}, {comment.time}
          </div>
          <textarea id='edit-comment-input' rows="2" cols="30">
            {comment.text}
          </textarea>
        </div>
      );
    }
    else if (comment.editing === false) {
      // not editing a comment
      if (this.props.user === comment.author || this.props.user === 'admin') {
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
              Author: {comment.author}, {comment.time}
            </div>
            {comment.text}
          </div>
        );
      }
      else {
        return (
          <div>
            <br></br>
            <div className="comment-author-time">
              Author: {comment.author}, {comment.time}
            </div>
            {comment.text}
          </div>
        );
      }
    }
  }

  render() {
    const comments = CommentStore.comments;
    const renderComments = [];
    const postId = this.props.postId;

    comments.forEach(comment => {
      if (comment.postId === postId) {
        renderComments.push(
          <li className="comment" key={comment.id}>
            {this.renderWhich(comment, postId)}
            <ul className="breadcrumb">
              <Reply
                commentId={comment.id}
                user={this.props.user}
              />
            </ul>
          </li>
        );
      }
    });
    return (
      <div className="comment-box">
        {this.hideShowComments(postId, renderComments)}
      </div>
    );
  }
}

export default Comment;
