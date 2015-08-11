import React from 'react'

export default class HelloWorld extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return <h1>Hello Flux</h1>
  }

};
