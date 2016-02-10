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
      editing: false,
    });
  }

  delete(id) {
    AppDispatcher.dispatch({
      action: BlogConstants.DELETE_POST,
      id,
    });
  }

  startEdit(id) {
    AppDispatcher.dispatch({
      action: BlogConstants.START_EDIT_POST,
      id,
      editing: true,
    });
  }

  finishEdit(id, title, input, time) {
    AppDispatcher.dispatch({
      action: BlogConstants.FINISH_EDIT_POST,
      id,
      title,
      text: input,
      time,
      editing: false,
    });
  }

}

export default new PostActions();
