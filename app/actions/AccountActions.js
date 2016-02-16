import uuid from 'node-uuid';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import BlogConstants from '../constants/BlogConstants.js';

class AccountActions {
  create(input) {
    AppDispatcher.dispatch({
      action: BlogConstants.CREATE_ACCOUNT,
      id: uuid.v4(),
      name: input,
    });
  }

  createAdmin() {
    AppDispatcher.dispatch({
      action: BlogConstants.CREATE_ACCOUNT,
      id: uuid.v4(),
      name: 'admin',
    });
  }

}

export default new AccountActions();
