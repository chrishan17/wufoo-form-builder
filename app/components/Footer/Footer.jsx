import React from 'react';

export default class Footer extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div className="Footer">
        <div className="container">
        </div>
      </div>
    )
  }

};
