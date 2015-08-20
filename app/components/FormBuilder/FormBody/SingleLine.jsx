import React from 'react';

class SingleLine extends React.Component {
  render() {
    let fieldContent = this.props.fieldContent;
    return (
      <div className="field-container">
        <label>{fieldContent.fieldLabel}</label>
        <div>
          <input type="text" style={this.props.fieldSizeStyle} />
        </div>
      </div>
    )
  }
}

export default SingleLine;
