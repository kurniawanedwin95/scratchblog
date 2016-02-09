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
        this.create(action.id, action.text);
        this.emitChange();
        break;
      case 'DELETE_POST':
        console.log(action);
        this.delete(action.id);
        this.emitChange();
        break;

      default :
    }
  }

  create(id, text) {
    const post = {
      id,
      text,
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
}

export default new PostStore();
