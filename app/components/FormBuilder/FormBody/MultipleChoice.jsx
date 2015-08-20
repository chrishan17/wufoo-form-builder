import React from 'react';

class MultipleChoice extends React.Component {

  render() {
    let fieldContent = this.props.fieldContent;
    let multipleChoice = fieldContent.multipleChoice;

    let multipleChoiceDivs = multipleChoice.map((choice, index) => {
      return (
        <div key={index}>
          <input type="radio" name={choice.name} value={choice.value} /> {choice.value}
        </div>
      )
    })

    return (
      <div className="field-container">
        <label>{fieldContent.fieldLabel}</label>
        <div>
          {multipleChoiceDivs}
        </div>
      </div>
    )
  }

}

export default MultipleChoice;
