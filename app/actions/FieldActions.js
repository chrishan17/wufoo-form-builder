import AppDispatcher from '../dispatcher/AppDispatcher.js';
import FieldConstants from '../constants/FieldConstants.js';

var FieldActions = {

  create(type) {
    console.log('create');
    AppDispatcher.dispatch({
      type,
      actionType: FieldConstants.FIELD_CREATE
    });
  },

  destroy(id) {
    console.log('destroy');
    AppDispatcher.dispatch({
      id,
      actionType: FieldConstants.FIELD_DESTROY
    });
  },

  edit(id, type) {
    console.log('edit');
    AppDispatcher.dispatch({
      id,
      type,
      actionType: FieldConstants.FIELD_EDIT
    });
  },

  changeTab(tabType) {
    console.log('changeTab');
    AppDispatcher.dispatch({
      tabType,
      actionType: FieldConstants.CHANGE_TAB
    });
  },

  update(fieldIndex, fieldContent, type, subIndex) {
    console.log('update');
    AppDispatcher.dispatch({
      fieldIndex,
      fieldContent,
      type,
      subIndex,
      actionType: FieldConstants.FIELD_UPDATE
    });
  },

  addBelow(id, type) {
    console.log('add below');
    AppDispatcher.dispatch({
      id,
      type,
      actionType: FieldConstants.FIELD_ADD_BELOW
    });
  },

  move(field, afterField, fieldIndex, afterIndex) {
    console.log('move');
    AppDispatcher.dispatch({
      field,
      afterField,
      fieldIndex,
      afterIndex,
      actionType: FieldConstants.FIELD_MOVE
    })
  }

}

export default FieldActions;
