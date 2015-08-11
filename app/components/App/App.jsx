import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'normalize.css/normalize.css'
import './App.less';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import FormBuilder from '../FormBuilder/FormBuilder.jsx';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <Header />
          <FormBuilder />
          <Footer />
        </div>
      </div>
    )
  }

};
