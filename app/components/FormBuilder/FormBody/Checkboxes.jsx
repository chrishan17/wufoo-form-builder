import React from 'react';

class Checkboxes extends React.Component {
  render() {
    let fieldContent = this.props.fieldContent;
    return (
      <div className="field-container">
        <label>{fieldContent.fieldLabel}</label>
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
  }
}

export default Checkboxes;
