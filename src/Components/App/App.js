import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Astronomy from '../Astronomy/Astronomy';
import Astrology from '../Astrology/Astrology';
import SavedFacts from '../SavedFacts/SavedFacts';
import SavedScopes from '../SavedScopes/SavedScopes';
import Form from '../Form/Form';
import { signs } from './../../Utils/signs.js'
import './App.css';

class App extends Component {
  constructor() {
    super();
      this.state = {
        allSigns: signs,
        selectedSign: null,
        isClicked: false,
        savedHoroscopes: [],
        savedFacts: [],
        error: ''
      }
  }

  setZodiacSign = (sign) => {
    let foundSign = this.state.allSigns.find(zodiac => zodiac.name === sign);
    this.setState({ selectedSign: foundSign });
    this.setState({ isClicked: true });
  };

  saveScope = (horoscopeData) => {
    if (!this.state.savedHoroscopes.find(scope => scope.current_date === horoscopeData.current_date)) {
      this.setState({ savedHoroscopes: [...this.state.savedHoroscopes, horoscopeData]})
      localStorage.setItem('savedHoroscopes', JSON.stringify([...this.state.savedHoroscopes, horoscopeData]));
    }
  }

  saveFact = (dailyFact) => {
    if (!this.state.savedFacts.find(fact => fact.date === dailyFact.date)) {
      this.setState({ savedFacts: [...this.state.savedFacts, dailyFact]})
      localStorage.setItem('savedFacts', JSON.stringify([...this.state.savedFacts, dailyFact]));
    }
  }

  getSavedScopes = () => {
    var storage = window.localStorage;
    if (storage[0].length > 0) {
      return storage[0];
    }
  }

  getSavedFacts = () => {
    var storage = window.localStorage;
    if (storage[1].length > 0) {
      return storage[1];
    }
  }

  render() {
    return (
      <>
        <article className='app'>
          <Header
            savedHoroscopes={this.displaySavedScopes}
            savedFacts={this.displaySavedFacts}
          />
          <Route exact path="/" render={() => {
            return <Form setZodiacSign={this.setZodiacSign} />
          }}
          />
          {this.state.error &&
            <h3 className='error-msg'>{this.state.error}</h3>
          }
          {!this.state.error &&
          <Switch>
          <div className='app-container'>
            <Route exact path="/" render={() => {
              return <Astronomy
                saveFact={this.saveFact}
                isClicked={this.state.isClicked}
              />
            }}
            />
            <Route exact path="/" render={() => {
              return <Astrology
                selectedSign={this.state.selectedSign}
                isClicked={this.state.isClicked}
                saveScope={this.saveScope}
              />
              }}
            />
          </div>
          <Route path="/saved-astronomy-facts" render={() => {
            return <SavedFacts
              selectedSign={this.state.savedFacts}
              getSavedFacts={this.getSavedFacts}
            />
            }}
          />
          <Route path="/saved-horoscopes" render={() => {
            return <SavedScopes
              selectedSign={this.state.savedHoroscopes}
              displaySavedScopes={this.getSavedScopes}
            />
            }}
          />
          </Switch>
          }
        </article>
      </>
    )
  }
}

export default App;
