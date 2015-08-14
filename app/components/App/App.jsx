import React from 'react';
import Morearty from 'morearty';
import reactMixin from 'react-mixin';
import 'normalize.css/normalize.css'
import './App.less';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import FormBuilder from '../FormBuilder/FormBuilder.jsx';

@reactMixin.decorate(Morearty.Mixin)
class App extends React.Component {

  render() {
    let binding = this.getDefaultBinding();
    return (
      <div className="App">
        <div className="App-container">
          <Header />
          <FormBuilder binding={binding} />
          <Footer />
        </div>
      </div>
    )
  }

};

export default App;
