import Morearty from 'morearty';
import Immutable from 'immutable';
import Store from './Store.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import FieldConstants from '../constants/FieldConstants.js';

var CHANGE_EVENT = 'change';

var lastEditId;
var lastEditIndex;

var initialState = {
  nowShowing: 'add-field',
  nowEditing: {
    type: "",
    index: -1
  },
  fields: []
}

var Ctx = Morearty.createContext({
  initialState: initialState
});

// TODO: write a function to get Ctx.getBinding()

var create = type => {
  let id = Date.now();
  Ctx.getBinding().update('fields', fields => {
    return fields.push(Immutable.Map({
      id,
      type,
      editing: false,
      content: Immutable.Map({
        fieldLabel: 'Untitled',
        fieldSize: 'medium',
        placeholder: ''
      })
    }));
  });
}

var destroy = id => {

  var fieldIndex = Ctx.getBinding().get('fields').findIndex(function(field) {
    return field.get('id') === id;
  });

  if (fieldIndex !== -1) {
    lastEditIndex = null;
    lastEditId = null;
    Ctx.getBinding().sub('fields').remove(fieldIndex);
    Ctx.getBinding().set('nowShowing', 'add-field');
    Ctx.getBinding().sub('nowEditing').atomically().set('type', '').set('index', -1).commit();
  } else {
    console.error('cannot find the field');
  }

}

var edit = (id, type) => {

  // Click on a new field
  if (id !== lastEditId) {
    // Change the last editing field's editing to false
    if (lastEditId) {
      Ctx.getBinding().sub('fields').sub(lastEditIndex).set('editing', false)
    }

    var fieldIndex = Ctx.getBinding().get('fields').findIndex(function(field) {
      return field.get('id') === id;
    });

    if (fieldIndex !== -1) {
      lastEditId = id;
      lastEditIndex = fieldIndex;
      Ctx.getBinding().sub('fields').sub(fieldIndex).set('editing', true);
      Ctx.getBinding().set('nowShowing', 'field-setting');
      Ctx.getBinding().sub('nowEditing').atomically().set('type', type).set('index', fieldIndex).commit();
    } else {
      console.error('cannot find the field');
    }
  }

}

var changeTab = tabType => {
  if (tabType === 'add-field') {
    Ctx.getBinding().sub('fields').sub(lastEditIndex).set('editing', false);
    lastEditId = null;
    lastEditIndex = null;
  }

  Ctx.getBinding().set('nowShowing', tabType);

}

var update = (fieldIndex, fieldContent) => {
  let fieldBinding = Ctx.getBinding().sub('fields').sub(fieldIndex);
  fieldBinding.sub('content').merge(Immutable.Map(fieldContent));
}

var addBelow = (id, type) => {
  var fieldIndex = Ctx.getBinding().get('fields').findIndex(function(field) {
    return field.get('id') === id;
  });
  Ctx.getBinding().update('fields', fields => {
    return fields.splice(fieldIndex+1, 0, Immutable.Map({
      id: Date.now(),
      type,
      editing: false,
      content: Immutable.Map({
        fieldLabel: 'Untitled',
        fieldSize: 'medium',
        placeholder: ''
      })
    }));
  });
}

var move = (field, afterField, fieldIndex, afterIndex) => {

  let binding = Ctx.getBinding().sub('fields');
  binding.set(fieldIndex, Immutable.fromJS(afterField));
  binding.set(afterIndex, Immutable.fromJS(field));

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
      edit(action.id, action.type);
      FieldStoreInstance.emitChange();
      break;

    case FieldConstants.CHANGE_TAB:
      changeTab(action.tabType);
      FieldStoreInstance.emitChange();
      break;

    case FieldConstants.FIELD_UPDATE:
      update(action.fieldIndex, action.fieldContent);
      FieldStoreInstance.emitChange();
      break;

    case FieldConstants.FIELD_ADD_BELOW:
      addBelow(action.id, action.type);
      FieldStoreInstance.emitChange();
      break;

    case FieldConstants.FIELD_MOVE:
      move(action.field, action.afterField, action.fieldIndex, action.afterIndex);
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
