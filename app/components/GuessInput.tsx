'use client'

import { FormEvent } from 'react'

interface GuessInputProps {
  guess: string
  setGuess: (value: string) => void
  onSubmit: () => void
}

export default function GuessInput({ guess, setGuess, onSubmit }: GuessInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="guess-form">
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter country name..."
        className="guess-input"
        autoFocus
      />
      <button type="submit" className="button submit-button">Submit</button>
    </form>
  )
}