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
        this.create(action.postId, action.id, action.text);
        this.emitChange();
        break;

      default:
    }
  }

  create(postId, id, text) {
    const comment = {
      postId,
      id,
      text,
    };
    this.comments.push(comment);
    return comment;
  }


}

export default new CommentStore();
