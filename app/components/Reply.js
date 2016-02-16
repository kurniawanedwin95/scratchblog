import React from 'react';
import Comment from './Comment.js';
import ReplyStore from '../stores/ReplyStore.js';
import ReplyActions from '../actions/ReplyActions.js';

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
      hide: true,
    };
    this.storeChanged = this.storeChanged.bind(this);
    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
  }

  componentDidMount() {
    ReplyStore.addChangeListener(this.storeChanged);
  }

  componentWillUnmount() {
    ReplyStore.removeChangeListener(this.storeChanged);
  }

  storeChanged() {
    this.setState({ replies: ReplyStore.replies });
  }

  showTextarea() {
    this.setState({ hide: false });
  }

  hideTextarea() {
    this.setState({ hide: true });
  }

  addReply(commentId, replyAuthor) {
    if (!replyAuthor && replyAuthor !== 'admin') {
      alert('Please login to reply');
      return;
    }
    else{
      const t = new Date();
      const time = t.toString();
      const replyInput = document.getElementById(commentId).value;
      ReplyActions.create(commentId, replyAuthor, replyInput, time);
      // erases the textarea
      document.getElementById(commentId).value = '';
      this.hideTextarea();
    }
  }

  deleteReply(id) {
    ReplyActions.delete(id);
  }

  startEditReply(id) {
    ReplyActions.startEdit(id);
  }

  finishEditReply(id, user) {
    const t = new Date();
    const time = t.toString();
    const replyInput = document.getElementById('edit-reply-input').value;
    ReplyActions.finishEdit(id, replyInput, time);
    // erases the textarea
    document.getElementById('edit-reply-input').value = '';
  }

  startAdd(commentId, renderReplies) {
    if (this.state.hide) {
      return (
        <div>
          {renderReplies}
          <br></br>
          <div className="reply-start"
            onClick={this.showTextarea.bind(this)}
          >Reply</div>
        </div>
      );
    }
    else {
      return (
        <div>
          {renderReplies}
          <br></br>
          <textarea id={commentId} rows="1" cols="75">
          </textarea>
          <button className="reply-add" onClick={this.addReply.bind(this, commentId, this.props.user)}>
            Add reply
          </button>
        </div>
      );
    }
    // SHOW TEXTAREA TO CREATE
  }

  renderWhich(reply, commentId) {
    if (reply.commentId === commentId) {
      if (reply.editing === true) {
        // currently modifying reply
        return (
          <div>
            <br></br>
            <div className="reply-author-time">
              <div className="reply-delete"
                onClick={this.deleteReply.bind(this, reply.id)}
              >x</div>
              <button className="reply-edit"
                onClick={this.finishEditReply.bind(this, reply.id, this.props.user)}
              >Confirm modifications</button>
              Author: {reply.author}, {reply.time}
            </div>
            <textarea id='edit-reply-input' rows="1" cols="50">
              {reply.text}
            </textarea>
          </div>
        );
        // SHOW COMMENTS, HIDES TEXTAREA
      }
      else if (reply.editing === false) {
        // not modifying reply
        if (this.props.user === reply.author || this.props.user === 'admin') {
          // author of the reply
          return (
            <div>
              <br></br>
              <div className="reply-author-time">
                <div className="reply-delete"
                  onClick={this.deleteReply.bind(this, reply.id)}
                >x</div>
                <div className="reply-edit"
                  onClick={this.startEditReply.bind(this, reply.id)}
                >Modify</div>
                Author: {reply.author}, {reply.time}
              </div>
              {reply.text}
            </div>
          );
        }
        else {
          // not author of the reply
          return (
            <div>
              <br></br>
              <div className="reply-author-time">
                Author: {reply.author}, {reply.time}
              </div>
              {reply.text}
            </div>
          );
        }
        // SHOW TEXTAREA TO MODIFY
      }
    }
  }

  render() {
    const replies = ReplyStore.replies;
    const renderReplies = [];
    const commentId = this.props.commentId;

    replies.forEach(reply => {
      renderReplies.push(
        <li className="reply" key={reply.id}>
          {this.renderWhich(reply, commentId)}
        </li>
      );
    });

    return (
      <div className="replies">
        {this.startAdd(commentId, renderReplies)}
      </div>
    );
  }

}

export default Reply;
