import React from 'react';

class MultipleChoice extends React.Component {
  render() {
    let fieldContent = this.props.fieldContent;
    return (
      <div className="field-container">
        <label>{fieldContent.fieldLabel}</label>
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
  }
}

export default MultipleChoice;
