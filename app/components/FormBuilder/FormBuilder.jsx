import React from 'react';
import './FormBuilder.less';

export default class FormBuilder extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div className="FormBuilder">
        <div className="FormBuilder-container">
        </div>
      </div>
    )
  }

};
