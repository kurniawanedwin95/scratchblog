import uuid from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import BlogConstants from '../constants/BlogConstants.js';

class CommentActions {

  create(postId, input) {
    AppDispatcher.dispatch({
      action: BlogConstants.CREATE_COMMENT,
      postId,
      id: uuid.v4(),
      text: input,
    });
  }
}

export default new CommentActions();
