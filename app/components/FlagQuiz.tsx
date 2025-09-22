'use client'

import { useState, useEffect } from 'react'
import { Country, Continent, getRandomCountry, continents } from '../data/countries'
import GuessInput from './GuessInput'

interface FlagQuizProps {
  score: { correct: number; total: number }
  onScoreUpdate: (isCorrect: boolean) => void
}

export default function FlagQuiz({ score, onScoreUpdate }: FlagQuizProps) {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null)
  const [selectedContinent, setSelectedContinent] = useState<Continent>('All')
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState('')

  const generateNewCountry = () => {
    const country = getRandomCountry(selectedContinent)
    setCurrentCountry(country)
    setGuess('')
    setFeedback('')
  }

  useEffect(() => {
    generateNewCountry()
  }, [selectedContinent])

  const checkGuess = () => {
    if (!currentCountry || !guess.trim()) return

    const isCorrect = guess.trim().toLowerCase() === currentCountry.name.toLowerCase()
    
    setFeedback(
      isCorrect
        ? '✅ Correct!'
        : `❌ Wrong, it was ${currentCountry.name}`
    )
    
    onScoreUpdate(isCorrect)
  }

  const playAgain = () => {
    generateNewCountry()
  }

  if (!currentCountry) return null

  return (
    <div className="flag-quiz">
      <div className="continent-selector">
        <label htmlFor="continent-select">Select continent:</label>
        <select
          id="continent-select"
          value={selectedContinent}
          onChange={(e) => setSelectedContinent(e.target.value as Continent)}
          className="continent-select"
        >
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>

      <div className="flag-container">
        <div className="flag-display">
          <span className="flag-emoji">{currentCountry.flag}</span>
        </div>
        <h2>What country does this flag represent?</h2>
        
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
              Try Another Flag
            </button>
          </div>
        )}
      </div>
    </div>
  )
}