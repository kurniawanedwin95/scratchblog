import uuid from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import BlogConstants from '../constants/BlogConstants.js';

class PostActions {
  create(title, input, time) {
    AppDispatcher.dispatch({
      action: BlogConstants.CREATE_POST,
      id: uuid.v4(),
      title,
      text: input,
      time,
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      action: BlogConstants.DELETE_POST,
      id,
    });
  }

}

export default new PostActions();
