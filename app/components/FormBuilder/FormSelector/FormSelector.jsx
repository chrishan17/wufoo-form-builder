import React from 'react';
import Morearty from 'morearty';
import reactMixin from 'react-mixin';
import './FormSelector.less';

@reactMixin.decorate(Morearty.Mixin)
class FormSelector extends React.Component {

  _onCreate(type) {
    this.props.onCreate(type);
  }

  _onChangeTab(tabType) {
    this.props.onChangeTab(tabType);
  }


  /**
   * update the field property, like filed label, field size, field placeholder, ...
   * @param  {Number} fieldIndex   [the index of the editing field]
   * @param  {[type]} fieldContent [the editing field content]
   */
  _onUpdate(fieldIndex, fieldContent) {
    this.props.onUpdate(fieldIndex, fieldContent);
  }

  _buttonMap(field, index) {
    return <div className={"field " + field.type} key={index} onClick={this._onCreate.bind(this, field.type)}>{field.content}</div>
  }

  _fieldMap(fieldEditingContent, nowEditing, fieldType, index) {
    switch (fieldType) {
      case 'label':
        return (
          <div key={index}>
            <label className="field-label">Field Label</label>
            <textarea name="field-label" value={fieldEditingContent.fieldLabel} onChange={(event) => {this._onUpdate(nowEditing.index, {fieldLabel: event.target.value})}} />
          </div>
        )
        break;
      case 'size':
        return (
          <div key={index}>
            <label className="field-label">Field Size</label>
            <select value={fieldEditingContent.fieldSize} onChange={(event) => {this._onUpdate(nowEditing.index, {fieldSize: event.target.value})}} >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        )
        break;
      default:
        return (
          <div>
            Choose one to Edit
          </div>
        )
    }
  }

  render() {

    let nowShowing = this.getDefaultBinding().get('nowShowing');
    let nowEditing = this.getDefaultBinding().get('nowEditing').toJS();
    if (nowEditing.index >= 0) {
      var fieldEditingContent = this.getDefaultBinding().sub('fields').get(nowEditing.index).toJS().content;
    }

    const standardFieldTypes = [{
      type: 'single-line',
      content: 'Single Line'
    }, {
      type: 'multiple-line',
      content: 'Multiple Line'
    }, {
      type: 'multiple-choice',
      content: 'Multiple Choice'
    }, {
      type: 'checkboxes',
      content: 'Checkboxes'
    }, {
      type: 'dropdown',
      content: 'Dropdown'
    }];

    const fancyFieldTypes = [{
      type: 'address',
      content: 'Address'
    }];

    const tabTypes = [{
      type: 'add-field',
      content: 'Add a Field'
    }, {
      type: 'field-setting',
      content: 'Field Setting'
    }, {
      type: 'form-setting',
      content: 'Form Setting'
    }];

    const standardFields = standardFieldTypes.map(this._buttonMap.bind(this));

    const fancyFields = fancyFieldTypes.map(this._buttonMap.bind(this));

    const tabs = tabTypes.map((tab, index) => {
      let isShowing = nowShowing === tab.type ? ' showing' : '';
      return (
        <li className={'tab ' + tab.type + isShowing} key={index} onClick={this._onChangeTab.bind(this, tab.type)}><a>{tab.content}</a></li>
      )
    });

    var tabToShow;

    if (nowShowing === 'add-field') {

      tabToShow = (
        <div className="tab-body add-field">
          <div className="standard-field">
            <h3>Standard</h3>
            <div className="fields">
              {standardFields}
            </div>
          </div>
          <div className="fancy-field">
            <h3>Fancy Pants</h3>
            <div className="fields">
              {fancyFields}
            </div>
          </div>
        </div>
      )

    } else if (nowShowing === 'field-setting') {

      let fieldsToEdit;
      switch (nowEditing.type) {
        case 'single-line':
          fieldsToEdit = ['label', 'size'];
          break;
        case 'multiple-line':
          fieldsToEdit = ['label'];
          break;
        case 'multiple-choice':
          fieldsToEdit = ['label'];
          break;
        case 'checkboxes':
          fieldsToEdit = ['label'];
          break;
        case 'dropdown':
          fieldsToEdit = ['label'];
          break;
        case 'address':
          fieldsToEdit = ['label'];
          break;
        default:
          fieldsToEdit = ['nothing'];
      }

      let fields = fieldsToEdit.map(this._fieldMap.bind(this, fieldEditingContent, nowEditing));

      tabToShow = (
        <div className="tab-body field-setting">
          {fields}
        </div>
      )

    } else {

      tabToShow = (
        <div className="tab-body form-setting">

        </div>
      )

    }

    return (
      <div className="FormSelector">
        <div className={"FormSelector-container " + nowShowing}>
          <ul className={"tabs"}>
            {tabs}
          </ul>
          {tabToShow}
        </div>
      </div>
    )
  }
};

export default FormSelector;
