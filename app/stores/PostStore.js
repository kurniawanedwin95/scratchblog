import BaseStore from './BaseStore.js';

// const CHANGE_EVENT = 'change';

class PostStore extends BaseStore {
  constructor(props) {
    super(props);
    this.subscribe(() => this._registerToActions.bind(this));
    this.posts = [];
  }

  _registerToActions(action) {
    switch (action.action) {
      case 'CREATE_POST':
        console.log(action);
        this.create(action.id, action.title, action.text, action.time, action.editing);
        this.emitChange();
        break;
      case 'DELETE_POST':
        console.log(action);
        this.delete(action.id);
        this.emitChange();
        break;
      case 'START_EDIT_POST':
        console.log(action);
        this.startEdit(action.id, action.editing);
        this.emitChange();
        break;
      case 'FINISH_EDIT_POST':
        console.log(action);
        this.finishEdit(action.id, action.title, action.text, action.time, action.editing);
        this.emitChange();
        break;

      default :
    }
  }

  create(id, title, text, time, editing) {
    const post = {
      id,
      title,
      text,
      time,
      editing,
    };
    this.posts.push(post);
    return post;
  }

  delete(id) {
    this.posts.map((post, index) => {
      if (post.id === id) {
        this.posts.splice(index, 1);
      }
    });
  }

  startEdit(id, editing) {
    this.posts.forEach(post => {
      if (post.id === id) {
        post.editing = editing;
      }
    });
  }

  finishEdit(id, title, text, time, editing) {
    this.posts.forEach(post => {
      if (post.id === id) {
        post.title = title;
        post.text = text;
        post.time = time;
        post.editing = editing;
      }
    });
  }
}

export default new PostStore();
