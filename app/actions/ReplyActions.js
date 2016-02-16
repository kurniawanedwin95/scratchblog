import uuid from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher';
import BlogConstants from '../constants/BlogConstants';

class ReplyActions {
  create(commentId, author, input, time) {
    AppDispatcher.dispatch({
      action: BlogConstants.CREATE_REPLY,
      commentId,
      id: uuid.v4(),
      author,
      text: input,
      time,
      editing: false,
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      action: BlogConstants.DELETE_REPLY,
      id,
    });
  }

  startEdit(id) {
    AppDispatcher.dispatch({
      action: BlogConstants.START_EDIT_REPLY,
      id,
      editing: true,
    });
  }

  finishEdit(id, input, time) {
    AppDispatcher.dispatch({
      action: BlogConstants.FINISH_EDIT_REPLY,
      id,
      text: input,
      time,
      editing: false,
    });
  }
}

export default new ReplyActions();
