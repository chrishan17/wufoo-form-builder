import React from 'react';
import Morearty from 'morearty';
import reactMixin from 'react-mixin';
import './FormBody.less';
import FieldActions from '../../../actions/FieldActions.js'

@reactMixin.decorate(Morearty.Mixin)
class FormBody extends React.Component {

  render() {
    let binding = this.getDefaultBinding();
    let fields = binding.get();

    let fieldsDivs = fields.map((field, index) => {
      let fieldBinding = binding.sub(index);
      return (
        <Field binding={fieldBinding} onDestroy={this.props.onDestroy} onEdit={this.props.onEdit} key={fieldBinding.toJS('id')} />
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

  _onEdit(id) {
    this.props.onEdit(id);
  }

  render() {
    let binding = this.getDefaultBinding();

    let fieldType = binding.get('type');
    let fieldId = binding.get('id');

    let fieldFormDiv;

    switch (fieldType) {
      case 'single-line':
        fieldFormDiv = (
          <div>
            <label>Untitled</label>
            <div>
              <input type="text" />
            </div>
          </div>
        )
        break;
      case 'multiple-line':
        fieldFormDiv = (
          <div>
            <label>Untitled</label>
            <div>
              <textarea />
            </div>
          </div>
        )
        break;
      case 'multiple-choice':
        fieldFormDiv = (
          <div>
            <label>Untitled</label>
            <div>
              <div>
                <input type="radio" name="first" value="First Choice" />  First Choice
              </div>
              <div>
                <input type="radio" name="second" value="Second Choice" />  Second Choice
              </div>
              <div>
                <input type="radio" name="third" value="Third Choice" />  Third Choice
              </div>
            </div>
          </div>
        )
        break;
      case 'checkboxes':
        fieldFormDiv = (
          <div>
            <label>Untitled</label>
            <div>
              <div>
                <input type="checkbox" name="first" value="First Choice" /> First Choice
              </div>
              <div>
                <input type="checkbox" name="second" value="Second Choice" /> Second Choice
              </div>
              <div>
                <input type="checkbox" name="third" value="Third Choice" /> Third Choice
              </div>

            </div>
          </div>
        )
        break;
      case 'dropdown':
        fieldFormDiv = (
          <div>
            <label>Untitled</label>
            <div>
              <select>
                <option value=""></option>
                <option value="first">First Choice</option>
                <option value="second">Second Choice</option>
                <option value="third">Third Choice</option>
              </select>
            </div>
          </div>
        )
        break;
      case 'address':
        fieldFormDiv = (
          <div>
            <label>Address</label>
            <div className="container">
              <div className="street-address">
                <input name="Field" type="text" />
                <label htmlFor="Field">Street Address</label>
              </div>
              <div className="address-line">
                <input name="Field" type="text" />
                <label htmlFor="Field">Address Line2</label>
              </div>
              <div className="city">
                <input name="Field" type="text" />
                <label htmlFor="Field">City</label>
              </div>
              <div className="state-province-region">
                <input name="Field" type="text" />
                <label htmlFor="Field">State / Province / Region</label>
              </div>
              <div className="postal-zip-code">
                <input name="Field" type="text" />
                <label htmlFor="Field">Postal / Zip Code</label>
              </div>
              <div className="country">
                <select>
                  <option value=""></option>
                  <option value="china">China</option>
                  <option value="america">America</option>
                  <option value="canada">Canada</option>
                </select>
                <label htmlFor="Field">Country</label>
              </div>
            </div>
          </div>
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
      <li className={"Field " + fieldType + fieldStatus} onClick={this._onEdit.bind(this, fieldId)}>
        {fieldFormDiv}
        <div className="fieldActions" onClick={ (function(e) { e.stopPropagation(); this._onDestroy(fieldId)}).bind(this) }>
          <img className="delete" />
        </div>
      </li>
    )

    return fieldForm

  }

}
export default FormBody;
