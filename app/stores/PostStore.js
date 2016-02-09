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
        this.create(action.id, action.input);
        this.emitChange();
        break;

      default :
    }
  }

  create(id, input) {
    console.log(input);
    const post = {
      id,
      text: input,
    };
    this.posts.push(post);
    return post;
  }
}

export default new PostStore();
