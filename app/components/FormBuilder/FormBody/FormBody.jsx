import React from 'react';
import './FormBody.less';

export default class FormBody extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div className="FormBody">
        <div className="FormBody-container">
        </div>
      </div>
    )
  }

};
