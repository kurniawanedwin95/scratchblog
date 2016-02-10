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
        this.create(action.postId, action.id, action.text, action.time);
        this.emitChange();
        break;
      case 'DELETE_COMMENT':
        console.log(action);
        this.delete(action.id);
        this.emitChange();
        break;

      default:
    }
  }

  create(postId, id, text, time) {
    const comment = {
      postId,
      id,
      text,
      time,
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


}

export default new CommentStore();
