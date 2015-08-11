import React from 'react';

export default class FormBuilder extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div className="FormBuilder">
        <div className="container">
        </div>
      </div>
    )
  }

};
