'use client'

import { useState } from 'react'
import WorldMap from './components/WorldMap'
import GuessInput from './components/GuessInput'

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const handleCountryClick = (countryName: string) => {
    if (countryName === 'Unknown') return
    
    setSelectedCountry(countryName)
    setGuess('')
    setFeedback('')
  }

  const checkGuess = () => {
    if (!selectedCountry || !guess.trim()) return

    const isCorrect = guess.trim().toLowerCase() === selectedCountry.toLowerCase()
    
    setFeedback(
      isCorrect
        ? '✅ Correct!'
        : `❌ Wrong, it was ${selectedCountry}`
    )
    
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
  }

  const playAgain = () => {
    setSelectedCountry(null)
    setGuess('')
    setFeedback('')
  }

  return (
    <main className="container">
      <header className="header">
        <h1>GeoQuiz</h1>
        <p className="instructions">Click on a country and guess its name!</p>
        {score.total > 0 && (
          <p className="score">Score: {score.correct}/{score.total}</p>
        )}
      </header>

      <div className="map-container">
        <WorldMap 
          onCountryClick={handleCountryClick} 
          selectedCountry={selectedCountry}
        />
      </div>

      {selectedCountry && (
        <div className="game-panel">
          <h2>What country is highlighted?</h2>
          
          {!feedback ? (
            <GuessInput 
              guess={guess} 
              setGuess={setGuess} 
              onSubmit={checkGuess} 
            />
          ) : (
            <div className="feedback-container">
              <p className="feedback">{feedback}</p>
              <button onClick={playAgain} className="button play-again-button">
                Try Another Country
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  )
}