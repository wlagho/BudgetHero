import React, { useState, useEffect } from 'react'
import { ScenarioCard } from './ScenarioCard'
import { AIOutcomePopup } from './AIOutcomePopup'
import { ProgressBar } from './ProgressBar'
import { BadgeDisplay } from './BadgeDisplay'
import { scenarios, getScenarioById, getRandomScenario, Scenario, ScenarioChoice } from '../data/scenarios'
import { useAI, AIOutcome } from '../hooks/useAI'
import { useSupabase } from '../hooks/useSupabase'
import { 
  DollarSign, 
  Trophy, 
  Target, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  TrendingUp
} from 'lucide-react'

export const GameEngine: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [showOutcome, setShowOutcome] = useState(false)
  const [lastOutcome, setLastOutcome] = useState<AIOutcome | null>(null)
  const [animatingMoney, setAnimatingMoney] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { generateOutcome, loading: aiLoading } = useAI()
  const { user, progress, updateProgress, isOfflineMode } = useSupabase()

  useEffect(() => {
    if (progress && !currentScenario) {
      const scenario = getScenarioById(progress.current_scenario) || scenarios[0] || getRandomScenario()
      if (scenario) {
        setCurrentScenario(scenario)
      } else {
        setError('No scenarios available. Please check the game data.')
      }
    }
  }, [progress, currentScenario])

  useEffect(() => {
    if (user && !progress) {
      const initializeProgress = async () => {
        try {
          await updateProgress({
            user_id: user.id,
            badges: [],
            money_saved: 1000,
            current_scenario: 'rent_increase',
            scenario_state: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        } catch (error) {
          console.error('Error initializing progress:', error)
          setError('Failed to initialize game progress.')
        }
      }
      initializeProgress()
    }
  }, [user, progress, updateProgress])

  const handleChoice = async (choice: ScenarioChoice) => {
    if (!currentScenario || !progress) return

    try {
      setError(null)
      
      const outcome = await generateOutcome(choice.text, {
        scenario: currentScenario.title,
        currentMoney: progress.money_saved,
        playerState: progress.scenario_state
      })

      setLastOutcome(outcome)
      setShowOutcome(true)

      if (outcome.moneyChange !== 0) {
        setAnimatingMoney(true)
        setTimeout(() => setAnimatingMoney(false), 1000)
      }

      const newMoney = Math.max(0, progress.money_saved + outcome.moneyChange)
      const newBadges = outcome.badgeEarned && !progress.badges.includes(outcome.badgeEarned)
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
      setError('Failed to process your choice. Please try again.')
    }
  }

  const nextScenario = () => {
    setShowOutcome(false)
    setLastOutcome(null)
    setError(null)
    
    const nextScenario = getRandomScenario()
    setCurrentScenario(nextScenario)
    
    if (progress) {
      updateProgress({
        current_scenario: nextScenario.id
      })
    }
  }

  const resetGame = async () => {
    try {
      setError(null)
      if (progress) {
        await updateProgress({
          money_saved: 1000,
          badges: [],
          current_scenario: 'rent_increase',
          scenario_state: {}
        })
      }
      const startScenario = getScenarioById('rent_increase') || scenarios[0]
      setCurrentScenario(startScenario)
      setShowOutcome(false)
      setLastOutcome(null)
    } catch (error) {
      console.error('Error resetting game:', error)
      setError('Failed to reset game.')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="max-w-2xl mx-auto text-center mt-20">
          <div className="glass-card p-8">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h2 className="text-2xl font-bold mb-4 text-red-400">Game Error</h2>
            <p className="text-slate-300 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="modern-button px-6 py-3"
            >
              Reload Game
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentScenario || !progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Loading your financial adventure...</p>
          {isOfflineMode && (
            <p className="text-amber-400 text-sm mt-2">Running in demo mode</p>
          )}
        </div>
      </div>
    )
  }

  const progressPercentage = (progress.money_saved / 10000) * 100
  const levelName = progress.money_saved < 2000 ? 'Beginner' : 
                   progress.money_saved < 5000 ? 'Intermediate' : 
                   progress.money_saved < 8000 ? 'Advanced' : 'Expert'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4">
        {/* Header */}
        <header className="mb-8">
          <div className="glass-card p-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    BudgetHero
                  </h1>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 text-2xl font-bold ${animatingMoney ? 'money-change' : ''}`}>
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <span className="text-slate-100">${progress.money_saved.toLocaleString()}</span>
                  </div>
                  
                  {isOfflineMode && (
                    <div className="bg-amber-500/20 px-3 py-1 rounded-full text-xs text-amber-400 border border-amber-500/30">
                      DEMO MODE
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  <span>{progress.badges.length} badges</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span>{levelName}</span>
                </div>
                <button
                  onClick={resetGame}
                  className="modern-button bg-slate-700 hover:bg-slate-600 px-4 py-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <ProgressBar 
                current={progress.money_saved} 
                max={10000} 
                label="Wealth Goal Progress"
              />
            </div>
          </div>
        </header>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Scenario Panel */}
          <div className="xl:col-span-3">
            <ScenarioCard
              scenario={currentScenario}
              onChoice={handleChoice}
              disabled={aiLoading || showOutcome}
            />
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Progress Stats */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-100">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Current Wealth:</span>
                  <span className="text-green-400 font-bold">${progress.money_saved.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Badges Earned:</span>
                  <span className="text-purple-400 font-bold">{progress.badges.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Progress to Goal:</span>
                  <span className="text-blue-400 font-bold">{progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Financial Level:</span>
                  <span className="text-slate-100 font-bold">{levelName}</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <BadgeDisplay badges={progress.badges} />

            {/* Financial Tips */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-100">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Smart Money Tips
              </h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Build an emergency fund before investing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Always negotiate when you have leverage</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Consider long-term costs, not just upfront prices</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Diversify your financial strategies</span>
                </div>
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