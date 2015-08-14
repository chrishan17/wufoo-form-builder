import AppDispatcher from '../dispatcher/AppDispatcher.js';
import FieldConstants from '../constants/FieldConstants.js';

var FieldActions = {

  create(type) {
    console.log('create');
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_CREATE,
      type
    });
  },

  destroy(id) {
    console.log('destroy');
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_DESTROY,
      id
    });
  },

  edit(id, type) {
    console.log('edit');
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_EDIT,
      id,
      type
    });
  },

  changeTab(tabType) {
    console.log('changeTab');
    AppDispatcher.dispatch({
      actionType: FieldConstants.CHANGE_TAB,
      tabType
    });
  },

  update(fieldIndex, fieldContent) {
    console.log('update');
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_UPDATE,
      fieldIndex,
      fieldContent
    });
  },

  addBelow(id, type) {
    console.log('add below');
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_ADD_BELOW,
      id,
      type
    });
  }
}

export default FieldActions;
