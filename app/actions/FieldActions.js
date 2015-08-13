import AppDispatcher from '../dispatcher/AppDispatcher.js';
import FieldConstants from '../constants/FieldConstants.js';

var FieldActions = {

  create(type) {
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_CREATE,
      type
    });
  },

  destroy(id) {
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_DESTROY,
      id
    });
  },

  edit(id) {
    AppDispatcher.dispatch({
      actionType: FieldConstants.FIELD_EDIT,
      id
    });
  }
}

export default FieldActions;
