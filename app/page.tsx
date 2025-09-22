'use client'

import { useState } from 'react'
import WorldMap from './components/WorldMap'
import GuessInput from './components/GuessInput'
import Navigation from './components/Navigation'
import FlagQuiz from './components/FlagQuiz'

export default function Home() {
  const [gameMode, setGameMode] = useState<'maps' | 'flags'>('maps')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const handleModeChange = (mode: 'maps' | 'flags') => {
    setGameMode(mode)
    // Reset game state when switching modes
    setSelectedCountry(null)
    setGuess('')
    setFeedback('')
  }

  const handleCountryClick = (countryName: string) => {
    if (countryName === 'Unknown') return
    
    setSelectedCountry(countryName)
    setGuess('')
    setFeedback('')
  }

  const handleScoreUpdate = (isCorrect: boolean) => {
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
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
        <Navigation activeMode={gameMode} onModeChange={handleModeChange} />
        <p className="instructions">
          {gameMode === 'maps' 
            ? 'Click on a country and guess its name!' 
            : 'Look at the flag and guess the country name!'
          }
        </p>
        {score.total > 0 && (
          <p className="score">Score: {score.correct}/{score.total}</p>
        )}
      </header>

      {gameMode === 'maps' ? (
        <>
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
        </>
      ) : (
        <div className="game-panel">
          <FlagQuiz score={score} onScoreUpdate={handleScoreUpdate} />
        </div>
      )}
    </main>
  )
}