import React from 'react';

class Dropdown extends React.Component {
  render() {
    let fieldContent = this.props.fieldContent;
    return (
      <div className="field-container">
        <label>{fieldContent.fieldLabel}</label>
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
  }
}

export default Dropdown;
