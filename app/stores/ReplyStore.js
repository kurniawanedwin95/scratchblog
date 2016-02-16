import BaseStore from './BaseStore.js';

class PostStore extends BaseStore {
  constructor(props) {
    super(props);
    this.subscribe(() => this._registerToActions.bind(this));
    this.replies = [];
  }

  _registerToActions(action) {
    switch (action.action) {
      case 'CREATE_REPLY':
        console.log(action);
        this.create(action.commentId, action.id, action.author, action.text,
          action.time, action.editing);
        this.emitChange();
        break;
      case 'DELETE_REPLY':
        console.log(action);
        this.delete(action.id);
        this.emitChange();
        break;
      case 'START_EDIT_REPLY':
        console.log(action);
        this.startEdit(action.id, action.editing);
        this.emitChange();
        break;
      case 'FINISH_EDIT_REPLY':
        console.log(action);
        this.finishEdit(action.id, action.text, action.time, action.editing);
        this.emitChange();
        break;

      default :
    }
  }

  create(commentId, id, author, text, time, editing) {
    const reply = {
      commentId,
      id,
      author,
      text,
      time,
      editing,
    };
    this.replies.push(reply);
    return reply;
  }

  delete(id) {
    this.replies.map((reply, index) => {
      if (reply.id === id) {
        this.replies.splice(index, 1);
      }
    });
  }

  startEdit(id, editing) {
    this.replies.forEach(reply => {
      if (reply.id === id) {
        reply.editing = editing;
      }
    });
  }

  finishEdit(id, text, time, editing) {
    this.replies.forEach(reply => {
      if (reply.id === id) {
        reply.text = text;
        reply.time = time;
        reply.editing = editing;
      }
    });
  }
}

export default new PostStore();
