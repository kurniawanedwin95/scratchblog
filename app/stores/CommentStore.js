import BaseStore from './BaseStore.js';

class CommentStore extends BaseStore {
  constructor() {
    super();

    this.subscribe(() => this._registerToActions.bind(this));
    this.comments = [];
  }

  _registerToActions(action) {
    switch (action.action) {
      case 'CREATE_COMMENT':
        console.log(action);
        this.create(action.postId, action.id, action.text, action.time, action.editing);
        this.emitChange();
        break;
      case 'DELETE_COMMENT':
        console.log(action);
        this.delete(action.id);
        this.emitChange();
        break;
      case 'START_EDIT_COMMENT':
        console.log(action);
        this.startEdit(action.id, action.editing);
        this.emitChange();
        break;
      case 'FINISH_EDIT_COMMENT':
        console.log(action);
        this.finishEdit(action.id, action.text, action.time, action.editing);
        this.emitChange();
        break;

      default:
    }
  }

  create(postId, id, text, time, editing) {
    const comment = {
      postId,
      id,
      text,
      time,
      editing,
    };
    this.comments.push(comment);
    return comment;
  }

  delete(id) {
    this.comments.map((comment, index) => {
      if (comment.id === id) {
        this.comments.splice(index, 1);
      }
    });
  }

  startEdit(id, editing) {
    this.comments.forEach(comment => {
      if (comment.id === id) {
        comment.editing = editing;
      }
    });
  }

  finishEdit(id, text, time, editing) {
    this.comments.forEach(comment => {
      if (comment.id === id) {
        comment.text = text;
        comment.time = time;
        comment.editing = editing;
      }
    });
  }


}

export default new CommentStore();
