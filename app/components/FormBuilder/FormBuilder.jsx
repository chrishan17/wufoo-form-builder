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

    var binding = this.getDefaultBinding();

    return (
      <div className="FormBuilder">
        <div className="FormBuilder-container">
          <FormSelector binding={binding} onCreate={this._onCreate} />
          <FormBody binding={binding} onDestroy={this._onDestroy} onEdit={this._onEdit}/>
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

  _onEdit(id) {
    FieldActions.edit(id);
  }

};

export default FormBuilder;
