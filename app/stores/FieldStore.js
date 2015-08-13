import Morearty from 'morearty';
import Immutable from 'immutable';
import Store from './Store.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import FieldConstants from '../constants/FieldConstants.js';

var CHANGE_EVENT = 'change';

var lastEditId;
var lastEditIndex;

var initialState = {
  fields: [{
    id: 1,
    type: 'single-line',
    editing: false
  }]
}

var Ctx = Morearty.createContext({
  initialState: initialState
});

var create = type => {
  let id = Date.now();
  Ctx.getBinding().update('fields', fields => {
    return fields.push(Immutable.Map({
      id,
      type,
      editing: false
    }));
  });
}

var destroy = id => {
  Ctx.getBinding().update('fields', fields => {
    let fieldIndex = fields.findIndex(item => {
      return item.get('id') === id;
    });
    return fields.delete(fieldIndex);
  });
}

var edit = id => {

  if (id !== lastEditId) {
    if (lastEditId) {
      Ctx.getBinding().sub('fields').sub(lastEditIndex).set('editing', false)
    }

    var fieldIndex = Ctx.getBinding().get('fields').findIndex(function(field) {
      return field.get('id') === id;
    });

    lastEditId = id;
    lastEditIndex = fieldIndex;
    Ctx.getBinding().sub('fields').sub(fieldIndex).set('editing', true);;
  }

}

class FieldStore extends Store {
  constructor() {
    super();
  }
}

let FieldStoreInstance = new FieldStore();

FieldStoreInstance.dispatchToken = AppDispatcher.register(action => {

  switch (action.actionType) {

    case FieldConstants.FIELD_CREATE:
      create(action.type);
      FieldStoreInstance.emitChange();
      break;

    case FieldConstants.FIELD_DESTROY:
      destroy(action.id);
      FieldStoreInstance.emitChange();
      break;

    case FieldConstants.FIELD_EDIT:
      edit(action.id);
      FieldStoreInstance.emitChange();
      break;

    default:
  }

  return true;

});

export default {
  Ctx,
  FieldStore: FieldStoreInstance
}
