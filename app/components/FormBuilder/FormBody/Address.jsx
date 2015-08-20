import React from 'react';

class Address extends React.Component {
  render() {
    let fieldContent = this.props.fieldContent;
    return (
      <div className="field-container">
        <label>{fieldContent.fieldLabel}</label>
        <div className="container">
          <div className="street-address">
            <input name="Field" type="text" />
            <label htmlFor="Field">Street Address</label>
          </div>
          <div className="address-line">
            <input name="Field" type="text" />
            <label htmlFor="Field">Address Line2</label>
          </div>
          <div className="city">
            <input name="Field" type="text" />
            <label htmlFor="Field">City</label>
          </div>
          <div className="state-province-region">
            <input name="Field" type="text" />
            <label htmlFor="Field">State / Province / Region</label>
          </div>
          <div className="postal-zip-code">
            <input name="Field" type="text" />
            <label htmlFor="Field">Postal / Zip Code</label>
          </div>
          <div className="country">
            <select>
              <option value=""></option>
              <option value="china">China</option>
              <option value="america">America</option>
              <option value="canada">Canada</option>
            </select>
            <label htmlFor="Field">Country</label>
          </div>
        </div>
      </div>
    )
  }
}

export default Address;
