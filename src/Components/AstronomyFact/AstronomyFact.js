import React from 'react';
import './AstronomyFact.css';

const AstronomyFact = ({ dailyFact, saveFact }) => {
  return (
    <div className='astronomy-card'>
      <h4>{dailyFact.title}</h4>
      <img className='astronomy-image' src={dailyFact.url} alt={`${dailyFact.title}`}/>
      <h4>{dailyFact.explanation}</h4>
      <h4>{dailyFact.copyright}</h4>
      <button className='save-button' onClick={(event) => saveFact(dailyFact)}>Save Fact</button>
    </div>
  )
}

export default AstronomyFact;
