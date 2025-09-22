'use client'

interface NavigationProps {
  activeMode: 'maps' | 'flags'
  onModeChange: (mode: 'maps' | 'flags') => void
}

export default function Navigation({ activeMode, onModeChange }: NavigationProps) {
  return (
    <nav className="navigation">
      <button
        className={`nav-button ${activeMode === 'maps' ? 'active' : ''}`}
        onClick={() => onModeChange('maps')}
      >
        Maps
      </button>
      <button
        className={`nav-button ${activeMode === 'flags' ? 'active' : ''}`}
        onClick={() => onModeChange('flags')}
      >
        Flags
      </button>
    </nav>
  )
}