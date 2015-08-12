import React from 'react';
import './FormSelector.less';

export default class FormSelector extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
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
                <div className="field single-line">Single Line Text</div>
                <div className="field multiple-line">Multiple Line Text</div>
                <div className="field multiple-choice">Multiple Choice</div>
                <div className="field checkboxes">Checkboxes</div>
                <div className="field dropdown">Dropdown</div>
              </div>
            </div>
            <div className="fancy">
              <h3>Fancy Pants</h3>
              <div className="field address">Address</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

};
