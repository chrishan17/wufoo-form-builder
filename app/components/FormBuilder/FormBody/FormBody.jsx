import React from 'react';
import Morearty from 'morearty';
import reactMixin from 'react-mixin';
import Immutable from 'immutable';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import './FormBody.less';
import FieldActions from '../../../actions/FieldActions.js';
import Field from './Field.jsx';

@DragDropContext(HTML5Backend)
@reactMixin.decorate(Morearty.Mixin)
class FormBody extends React.Component {

  moveField(fields, id, afterId) {
    const field = fields.filter(c => c.id === id)[0];
    const afterField = fields.filter(c => c.id === afterId)[0];
    const fieldIndex = fields.indexOf(field);
    const afterIndex = fields.indexOf(afterField);

    FieldActions.move(field, afterField, fieldIndex, afterIndex);
  }

  render() {
    let binding = this.getDefaultBinding();
    let fields = binding.get();

    let fieldsDivs = fields.map((field, index) => {
      let fieldBinding = binding.sub(index);
      return (
        <Field binding={fieldBinding} onDestroy={this.props.onDestroy} onEdit={this.props.onEdit} onAddBelow={this.props.onAddBelow} key={fieldBinding.toJS('id')} id={fieldBinding.toJS('id')} moveField={this.moveField.bind(this, fields.toJS())}/>
      );
    });

    return (
      <div className="FormBody">
        <div className="FormBody-container">
          <form>
            <div className="wuform"></div>
            <ul className="field-list">{fieldsDivs}</ul>
          </form>
          <div className="form-buttons">
          </div>
        </div>
      </div>
    )
  }

};

export default FormBody;
