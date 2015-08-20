import React from 'react';

class Checkboxes extends React.Component {

  render() {
    let fieldContent = this.props.fieldContent;
    let checkboxes = fieldContent.checkboxes;

    let checkboxDivs = checkboxes.map((checkbox, index) => {
      return (
        <div key={index}>
          <input type="checkbox" name={checkbox.name} value={checkbox.value} /> {checkbox.value}
        </div>
      )
    })

    return (
      <div className="field-container">
        <label>{fieldContent.fieldLabel}</label>
        <div>
          {checkboxDivs}
        </div>
      </div>
    )
  }

}

export default Checkboxes;
