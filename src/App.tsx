import React, { useState } from 'react'
import { LandingPage } from './components/LandingPage'
import { GameEngine } from './components/GameEngine'
import { useSupabase } from './hooks/useSupabase'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const { user, loading } = useSupabase()

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-retro-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-retro-teal text-lg">Loading BudgetHero...</p>
        </div>
      </div>
    )
  }

  // Show game if user is authenticated or game is started
  if (user || gameStarted) {
    return <GameEngine />
  }

  // Show landing page
  return <LandingPage onStartGame={() => setGameStarted(true)} />
}

export default App