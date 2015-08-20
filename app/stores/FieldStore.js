import Morearty from 'morearty';
import Immutable from 'immutable';
import Store from './Store.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import FieldConstants from '../constants/FieldConstants.js';

const CHANGE_EVENT = 'change';

let lastEditId;
let lastEditIndex;

let initialState = {
  nowShowing: 'add-field',
  nowEditing: {
    type: "",
    index: -1
  },
  fields: []
}

let Ctx = Morearty.createContext({

  initialState: initialState

});

let getBinding = () => {

  return Ctx.getBinding();

}

let create = type => {

  let id = Date.now();

  getBinding().update('fields', fields => {
    return fields.push(Immutable.fromJS({
      id,
      type,
      editing: false,
      content: {
        fieldLabel: 'Untitled',
        fieldSize: 'medium',
        placeholder: '',
        checkboxes: [{
          name: 'first',
          value: 'First Choice'
        }, {
          name: 'second',
          value: 'Second Choice'
        }, {
          name: 'third',
          value: 'Third Choice'
        }],
        multipleChoice: [{
          name: 'first',
          value: 'First Choice'
        }, {
          name: 'second',
          value: 'Second Choice'
        }, {
          name: 'third',
          value: 'Third Choice'
        }]
      }
    }));
  });
}

let destroy = id => {

  var binding = getBinding();

  let fieldIndex = binding.get('fields').findIndex(function(field) {
    return field.get('id') === id;
  });

  if (fieldIndex !== -1) {
    lastEditIndex = null;
    lastEditId = null;
    binding.sub('fields').remove(fieldIndex);
    binding.set('nowShowing', 'add-field');
    binding.sub('nowEditing').atomically().set('type', '').set('index', -1).commit();
  } else {
    console.error('cannot find the field');
  }

}

let edit = (id, type) => {

  let binding = getBinding();
  // Click on a new field
  if (id !== lastEditId) {
    // Change the last editing field's editing to false
    if (lastEditId) {
      binding.sub('fields').sub(lastEditIndex).set('editing', false)
    }

    let fieldIndex = binding.get('fields').findIndex(function(field) {
      return field.get('id') === id;
    });

    if (fieldIndex !== -1) {
      lastEditId = id;
      lastEditIndex = fieldIndex;
      binding.sub('fields').sub(fieldIndex).set('editing', true);
      binding.set('nowShowing', 'field-setting');
      binding.sub('nowEditing').atomically().set('type', type).set('index', fieldIndex).commit();
    } else {
      console.error('cannot find the field');
    }
  }

}

let changeTab = tabType => {

  if (tabType === 'add-field') {
    getBinding().sub('fields').sub(lastEditIndex).set('editing', false);
    lastEditId = null;
    lastEditIndex = null;
  }

  getBinding().set('nowShowing', tabType);

}

let update = (fieldIndex, newFieldContent, type, subIndex) => {

  let fieldContent = getBinding().sub('fields').sub(fieldIndex).sub('content');

  switch (type) {

    case 'LABEL_UPDATE':
      fieldContent.set('fieldLabel', newFieldContent);
      break;

    case 'SIZE_UPDATE':
      fieldContent.set('fieldSize', newFieldContent);
      break;

    case 'CHECKBOX_UPDATE':
      fieldContent.sub('checkboxes').sub(subIndex).set('value', newFieldContent);
      break;

    case 'CHECKBOX_ADD_BELOW':
      fieldContent.update('checkboxes', checkboxes => {
        return checkboxes.splice(subIndex+1, 0, Immutable.fromJS({
          name: 'new',
          value: ''
        }))
      })
      break;

    case 'CHECKBOX_DELETE':
      fieldContent.sub('checkboxes').remove(subIndex)
      break;

    case 'MULTIPLE_CHOICE_UPDATE':
      fieldContent.sub('multipleChoice').sub(subIndex).set('value', newFieldContent);
      break;

    case 'MULTIPLE_CHOICE_ADD_BELOW':
      fieldContent.update('multipleChoice', checkboxes => {
        return checkboxes.splice(subIndex+1, 0, Immutable.fromJS({
          name: 'new',
          value: ''
        }))
      })
      break;

    case 'MULTIPLE_CHOICE_DELETE':
      fieldContent.sub('multipleChoice').remove(subIndex)
      break;

    default:

  }

}

let addBelow = (id, type) => {

  let fieldIndex = getBinding().get('fields').findIndex(function(field) {
    return field.get('id') === id;
  });

  getBinding().update('fields', fields => {
    return fields.splice(fieldIndex+1, 0, Immutable.fromJS({
      id: Date.now(),
      type,
      editing: false,
      content: {
        fieldLabel: 'Untitled',
        fieldSize: 'medium',
        placeholder: '',
        checkboxes: [{
          name: 'first',
          value: 'First Choice'
        }, {
          name: 'second',
          value: 'Second Choice'
        }, {
          name: 'third',
          value: 'Third Choice'
        }],
        multipleChoice: [{
          name: 'first',
          value: 'First Choice'
        }, {
          name: 'second',
          value: 'Second Choice'
        }, {
          name: 'third',
          value: 'Third Choice'
        }]
      }
    }));
  });

}

let move = (field, afterField, fieldIndex, afterIndex) => {

  let binding = getBinding().sub('fields');
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
      update(action.fieldIndex, action.fieldContent, action.type, action.subIndex);
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
