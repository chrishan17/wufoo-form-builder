import React from 'react';
import {Button} from 'react-bootstrap';

export default class HelloWorld extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div>
        <Button bsStyle="info">Primary</Button>
      </div>
    )
  }

};
