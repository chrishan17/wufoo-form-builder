import React from 'react';
import './Header.less';

export default class Header extends React.Component {

  shouldComponentUpdate() {
    return React.addons.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  render() {
    return (
      <div className="Header">
        <nav className="Header-container">
          <a className="logo" href="#"></a>
          <ul className="menu">
            <li className="frm"><a href="#">Forms</a></li>
            <li className="rpt"><a href="#">Reports</a></li>
            <li className="thm"><a href="#">Themes</a></li>
            <li className="usr"><a href="#">Users</a></li>
            <li className="pln"><a href="#">Plans & Pricing</a></li>
            <li className="act"><a href="#">Account</a></li>
            <li className="inf"><a href="#">Help</a></li>
            <li className="lgo"><a href="#">Logout</a></li>
          </ul>
        </nav>
      </div>
    )
  }

};
