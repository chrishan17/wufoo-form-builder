import React from 'react';
import './FormSelector.less';

export default class FormSelector extends React.Component {

  _onCreate(type) {
    this.props.onCreate(type)
  }

  _fieldMap(field, index) {
    return <div className={"field " + field.type} key={index} onClick={this._onCreate.bind(this, field.type)}>{field.content}</div>
  }

  render() {
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

    const standardFields = standardFieldTypes.map(this._fieldMap.bind(this));

    const fancyFields = fancyFieldTypes.map(this._fieldMap.bind(this));

    return (
      <div className="FormSelector">
        <div className="FormSelector-container">
          <ul className="tabs">
            <li className="afi"><a>Add a Field</a></li>
            <li className="cfi"><a>Field Settings</a></li>
            <li className="cfo"><a>Form Settings</a></li>
          </ul>
          <div className="add-fields">
            <div className="standard">
              <h3>Standard</h3>
              <div className="fields">
                {standardFields}
              </div>
            </div>
            <div className="fancy">
              <h3>Fancy Pants</h3>
              <div className="fields">
                {fancyFields}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

};
