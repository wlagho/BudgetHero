import React, { useState, useEffect } from 'react'
import { ScenarioCard } from './ScenarioCard'
import { AIOutcomePopup } from './AIOutcomePopup'
import { ProgressBar } from './ProgressBar'
import { BadgeDisplay } from './BadgeDisplay'
import { scenarios, getScenarioById, getRandomScenario, Scenario, ScenarioChoice } from '../data/scenarios'
import { useAI, AIOutcome } from '../hooks/useAI'
import { useSupabase } from '../hooks/useSupabase'
import { Coins, Trophy, Target } from 'lucide-react'

export const GameEngine: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [showOutcome, setShowOutcome] = useState(false)
  const [lastOutcome, setLastOutcome] = useState<AIOutcome | null>(null)
  const [animatingCoins, setAnimatingCoins] = useState(false)
  
  const { generateOutcome, loading: aiLoading } = useAI()
  const { user, progress, updateProgress } = useSupabase()

  useEffect(() => {
    if (progress && !currentScenario) {
      const scenario = getScenarioById(progress.current_scenario) || getRandomScenario()
      setCurrentScenario(scenario)
    }
  }, [progress, currentScenario])

  const handleChoice = async (choice: ScenarioChoice) => {
    if (!currentScenario || !progress) return

    try {
      // Generate AI outcome
      const outcome = await generateOutcome(choice.text, {
        scenario: currentScenario.title,
        currentMoney: progress.money_saved,
        playerState: progress.scenario_state
      })

      setLastOutcome(outcome)
      setShowOutcome(true)

      // Animate coins if money changed
      if (outcome.moneyChange !== 0) {
        setAnimatingCoins(true)
        setTimeout(() => setAnimatingCoins(false), 1000)
      }

      // Update progress
      const newMoney = Math.max(0, progress.money_saved + outcome.moneyChange)
      const newBadges = outcome.badgeEarned 
        ? [...progress.badges, outcome.badgeEarned]
        : progress.badges

      await updateProgress({
        money_saved: newMoney,
        badges: newBadges,
        scenario_state: {
          ...progress.scenario_state,
          lastChoice: choice.id,
          lastOutcome: outcome.outcome
        }
      })

    } catch (error) {
      console.error('Error handling choice:', error)
    }
  }

  const nextScenario = () => {
    setShowOutcome(false)
    setLastOutcome(null)
    
    // Get next scenario
    const nextScenario = getRandomScenario()
    setCurrentScenario(nextScenario)
    
    // Update current scenario in progress
    if (progress) {
      updateProgress({
        current_scenario: nextScenario.id
      })
    }
  }

  const resetGame = () => {
    if (progress) {
      updateProgress({
        money_saved: 1000,
        badges: [],
        current_scenario: 'rent_increase',
        scenario_state: {}
      })
    }
    setCurrentScenario(getScenarioById('rent_increase'))
    setShowOutcome(false)
    setLastOutcome(null)
  }

  if (!currentScenario || !progress) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-retro-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-retro-teal">Loading your financial adventure...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-retro-teal p-4">
      <div className="crt-overlay"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold glitch">BUDGETHERO</h1>
              <div className="flex items-center gap-2 text-retro-teal">
                <Coins className="w-5 h-5" />
                <span className="text-lg">${progress.money_saved.toLocaleString()}</span>
                {animatingCoins && <div className="coin"></div>}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span className="text-sm">{progress.badges.length} badges</span>
              </div>
              <button
                onClick={resetGame}
                className="pixel-button text-retro-purple border-retro-purple hover:bg-retro-purple hover:text-black"
              >
                Reset Game
              </button>
            </div>
          </div>
          
          <ProgressBar 
            current={progress.money_saved} 
            max={10000} 
            label="Wealth Goal"
          />
        </header>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scenario Panel */}
          <div className="lg:col-span-2">
            <ScenarioCard
              scenario={currentScenario}
              onChoice={handleChoice}
              disabled={aiLoading || showOutcome}
            />
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <div className="retro-panel p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Money Saved:</span>
                  <span className="text-retro-teal">${progress.money_saved.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Badges Earned:</span>
                  <span className="text-retro-purple">{progress.badges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Current Level:</span>
                  <span className="text-retro-teal">
                    {progress.money_saved < 2000 ? 'Beginner' : 
                     progress.money_saved < 5000 ? 'Intermediate' : 'Advanced'}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <BadgeDisplay badges={progress.badges} />

            {/* Tips */}
            <div className="retro-panel p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4">💡 Pro Tips</h3>
              <div className="space-y-2 text-sm">
                <p>• Always negotiate when possible</p>
                <p>• Build an emergency fund first</p>
                <p>• Consider long-term consequences</p>
                <p>• Don't be afraid to ask for help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Outcome Popup */}
      {showOutcome && lastOutcome && (
        <AIOutcomePopup
          outcome={lastOutcome}
          onClose={nextScenario}
          moneyBefore={progress.money_saved - (lastOutcome.moneyChange || 0)}
          moneyAfter={progress.money_saved}
        />
      )}
    </div>
  )
}