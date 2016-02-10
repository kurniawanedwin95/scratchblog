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
      editing: false,
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      action: BlogConstants.DELETE_COMMENT,
      id,
    });
  }

  startEdit(id) {
    AppDispatcher.dispatch({
      action: BlogConstants.START_EDIT_COMMENT,
      id,
      editing: true,
    });
  }

  finishEdit(id, input, time) {
    AppDispatcher.dispatch({
      action: BlogConstants.FINISH_EDIT_COMMENT,
      id,
      text: input,
      time,
      editing: false,
    });
  }
}

export default new CommentActions();
