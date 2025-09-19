import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import './App.css';

const geoUrl = "./world-simple.json";

interface Country {
  properties: {
    NAME?: string;
    name?: string;
    NAME_EN?: string;
  };
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [mapError, setMapError] = useState(false);

  const getCountryName = (country: Country): string => {
    return country.properties.NAME || 
           country.properties.name || 
           country.properties.NAME_EN || 
           'Unknown Country';
  };

  const handleCountryClick = (country: Country) => {
    const countryName = getCountryName(country);
    if (countryName === 'Unknown Country') return;
    
    setSelectedCountry(country);
    setShowInput(true);
    setGuess('');
    setFeedback('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry || !guess.trim()) return;

    const correctName = getCountryName(selectedCountry).toLowerCase();
    const userGuess = guess.toLowerCase().trim();

    if (userGuess === correctName) {
      setFeedback('✅ Correct!');
    } else {
      setFeedback(`❌ Wrong, it was ${getCountryName(selectedCountry)}`);
    }
  };

  const resetGame = () => {
    setSelectedCountry(null);
    setGuess('');
    setFeedback('');
    setShowInput(false);
  };

  if (mapError) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GeoQuiz</h1>
          <p>Sorry, the world map failed to load. Please try refreshing the page.</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>GeoQuiz</h1>
        <p>Click on a country and guess its name!</p>
      </header>
      
      <div className="map-container">
        <ComposableMap>
          <Geographies 
            geography={geoUrl}
            onError={() => setMapError(true)}
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = getCountryName(geo as Country);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo as Country)}
                    style={{
                      default: {
                        fill: selectedCountry && getCountryName(selectedCountry) === countryName ? "#FFD700" : "#D6D6DA",
                        outline: "none",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#FFD700",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {showInput && selectedCountry && (
        <div className="input-section">
          <h2>What country is highlighted?</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter country name..."
              autoFocus
            />
            <button type="submit">Submit</button>
          </form>
          
          {feedback && (
            <div className="feedback">
              <p>{feedback}</p>
              <button onClick={resetGame}>Try Another Country</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
