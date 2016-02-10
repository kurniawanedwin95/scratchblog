import uuid from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import BlogConstants from '../constants/BlogConstants.js';

class CommentActions {

  create(postId, input, time) {
    AppDispatcher.dispatch({
      action: BlogConstants.CREATE_COMMENT,
      postId,
      id: uuid.v4(),
      text: input,
      time,
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      action: BlogConstants.DELETE_COMMENT,
      id,
    });
  }
}

export default new CommentActions();
