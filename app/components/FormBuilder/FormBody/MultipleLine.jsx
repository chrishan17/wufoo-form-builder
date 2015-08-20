import React from 'react';

class MultipleLine extends React.Component {
  render() {
    let fieldContent = this.props.fieldContent;
    return (
      <div className="field-container">
        <label>{fieldContent.fieldLabel}</label>
        <div>
          <textarea />
        </div>
      </div>
    )
  }
}

export default MultipleLine;
