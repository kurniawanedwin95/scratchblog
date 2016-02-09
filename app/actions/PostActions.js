import uuid from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import BlogConstants from '../constants/BlogConstants.js';

class PostActions {
  create(input) {
    AppDispatcher.dispatch({
      action: BlogConstants.CREATE_POST,
      id: uuid.v4(),
      input,
    });
  }

}

export default new PostActions();
