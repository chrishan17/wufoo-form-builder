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

  edit(id) {
    console.log('edit');
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_EDIT,
      id
    });
  }
}

export default FieldActions;
