import React from 'react';
import './Footer.less';

export default class Footer extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div className="Footer">
        <div className="Footer-container">
          <div className="info"><strong>Wufoo · SurveyMonkey Inc. · Palo Alto, CA</strong></div>
          <div className="links">
            About · Blog · Gallery · FormBuilder · Examples · Tour · Terms · Privacy · Help
          </div>
        </div>
      </div>
    )
  }

};
