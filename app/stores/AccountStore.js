import BaseStore from './BaseStore.js';

class AccountStore extends BaseStore {
  constructor(props) {
    super(props);
    this.accounts = [];
    this.subscribe(() => this._registerToActions.bind(this));
  }

  _registerToActions(action) {
    switch (action.action) {
      case 'CREATE_ACCOUNT':
        console.log(action);
        this.create(action.id, action.name, action);
        this.emitChange();
        break;

      default :
    }
  }

  create(id, name) {
    const account = {
      id,
      name,
    };
    this.accounts.push(account);
    return account;
  }


}

export default new AccountStore();
