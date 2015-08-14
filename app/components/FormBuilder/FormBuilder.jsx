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
          <FormBody binding={fieldsBinding} onDestroy={this._onDestroy} onEdit={this._onEdit} onAddBelow={this._onAddBelow} />
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

  _onUpdate(fieldIndex, fieldContent) {
    FieldActions.update(fieldIndex, fieldContent);
  }

  _onAddBelow(id, type) {
    FieldActions.addBelow(id, type);
  }

};

export default FormBuilder;
