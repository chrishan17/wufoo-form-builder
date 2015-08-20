import React from 'react';
import Morearty from 'morearty';
import reactMixin from 'react-mixin';
import './FormBody.less';
import FieldActions from '../../../actions/FieldActions.js';
import SingleLine from './SingleLine.jsx';
import MultipleLine from './MultipleLine.jsx';
import MultipleChoice from './MultipleChoice.jsx';
import Checkboxes from './Checkboxes.jsx';
import Dropdown from './Dropdown.jsx'
import Address from './Address.jsx';

var fieldWidth = {
  'small': '30%',
  'medium': '50%',
  'large': '100%'
}

@reactMixin.decorate(Morearty.Mixin)
class FormBody extends React.Component {

  render() {
    let binding = this.getDefaultBinding();
    let fields = binding.get();

    let fieldsDivs = fields.map((field, index) => {
      let fieldBinding = binding.sub(index);
      return (
        <Field binding={fieldBinding} onDestroy={this.props.onDestroy} onEdit={this.props.onEdit} onAddBelow={this.props.onAddBelow} key={fieldBinding.toJS('id')} />
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

@reactMixin.decorate(Morearty.Mixin)
class Field extends React.Component {

  _onDestroy(id) {
    this.props.onDestroy(id);
  }

  _onEdit(id, type) {
    this.props.onEdit(id, type);
  }

  _onAddBelow(id, type) {
    this.props.onAddBelow(id, type);
  }

  render() {
    let binding = this.getDefaultBinding();

    let fieldType = binding.get('type');
    let fieldId = binding.get('id');
    let fieldContent = binding.get('content').toJS();
    let fieldSizeStyle = {
      width: fieldWidth[fieldContent.fieldSize]
    }

    let fieldFormDiv;

    switch (fieldType) {
      case 'single-line':
        fieldFormDiv = (
          <SingleLine fieldContent={fieldContent} fieldSizeStyle={fieldSizeStyle} />
        )
        break;
      case 'multiple-line':
        fieldFormDiv = (
          <MultipleLine fieldContent={fieldContent} />
        )
        break;
      case 'multiple-choice':
        fieldFormDiv = (
          <MultipleChoice fieldContent={fieldContent} />
        )
        break;
      case 'checkboxes':
        fieldFormDiv = (
          <Checkboxes fieldContent={fieldContent} />
        )
        break;
      case 'dropdown':
        fieldFormDiv = (
          <Dropdown fieldContent={fieldContent} />
        )
        break;
      case 'address':
        fieldFormDiv = (
          <Address fieldContent={fieldContent} />
        )
        break;

      default:

    }

    let fieldStatus;

    if (binding.get('editing')) {
      fieldStatus = ' editing';
    } else {
      fieldStatus = '';
    }

    let fieldForm = (
      <li className={"Field " + fieldType + fieldStatus} onClick={this._onEdit.bind(this, fieldId, fieldType)}>
        {fieldFormDiv}
        <div className="fieldActions">
          <img className="add" onClick={ (function(e) { e.stopPropagation(); this._onAddBelow(fieldId, fieldType)}).bind(this) }/>
          <img className="delete" onClick={ (function(e) { e.stopPropagation(); this._onDestroy(fieldId)}).bind(this) }/>
        </div>
      </li>
    )

    return fieldForm

  }

}
export default FormBody;
