import React from 'react';
import './FormBuilder.less';
import FormSelector from './FormSelector/FormSelector.jsx';
import FormBody from './FormBody/FormBody.jsx';

export default class FormBuilder extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div className="FormBuilder">
        <div className="FormBuilder-container">
          <FormSelector />
          <FormBody />
        </div>
      </div>
    )
  }

};
