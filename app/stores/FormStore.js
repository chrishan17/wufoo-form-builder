import Morearty from 'morearty';
import Immutable from 'immutable';
import Store from './Store.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import FormConstants from '../constants/FormConstants.js';

var CHANGE_EVENT = 'change';

var initialState = {
  name: 'Untitled',
  description: 'This is my form'
}

var Ctx = Morearty.createContext({
  initialState: initialState
});

class FormStore extends Store {
  constructor() {
    super();
  }
}

let FormStoreInstance = new FormStore();

FormStoreInstance.dispatchToken = AppDispatcher.register(action => {

  switch (action.actionType) {

    case FormConstants.FORM_UPDATE:
      update(action.form);
      FormStoreInstance.emitChange();
      break;

    default:
  }

  return true;

});

export default {
  Ctx,
  FormStore:FormStoreInstance
}
