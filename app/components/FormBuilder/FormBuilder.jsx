import React from 'react';
import Morearty from 'morearty';
import reactMixin from 'react-mixin';
import './FormBuilder.less';
import FormSelector from './FormSelector/FormSelector.jsx';
import FormBody from './FormBody/FormBody.jsx';
import FieldActions from '../../actions/FieldActions.js';

@reactMixin.decorate(Morearty.Mixin)
class FormBuilder extends React.Component {

  render() {

    let binding = this.getDefaultBinding();
    let fieldsBinding = binding.sub('fields');
    let nowShowing = binding.get('nowShowing');

    return (
      <div className="FormBuilder">
        <div className={"FormBuilder-container " + nowShowing}>
          <FormSelector binding={binding} onCreate={this._onCreate} onChangeTab={this._onChangeTab} onUpdate={this._onUpdate} />
          <FormBody binding={fieldsBinding} onDestroy={this._onDestroy} onEdit={this._onEdit} onAddBelow={this._onAddBelow} onMove={this._onMove}/>
        </div>
      </div>
    )
  }

  _onCreate(type) {
    FieldActions.create(type);
  }

  _onDestroy(id) {
    FieldActions.destroy(id);
  }

  _onEdit(id, type) {
    FieldActions.edit(id, type);
  }

  _onChangeTab(tabType) {
    FieldActions.changeTab(tabType);
  }

  _onUpdate(fieldIndex, fieldContent, type, subIndex) {
    FieldActions.update(fieldIndex, fieldContent, type, subIndex);
  }

  _onAddBelow(id, type) {
    FieldActions.addBelow(id, type);
  }

  _onMove(fields, id, afterId) {
    const field = fields.filter(c => c.id === id)[0];
    const afterField = fields.filter(c => c.id === afterId)[0];
    const fieldIndex = fields.indexOf(field);
    const afterIndex = fields.indexOf(afterField);

    FieldActions.move(field, afterField, fieldIndex, afterIndex);
  }

};

export default FormBuilder;
