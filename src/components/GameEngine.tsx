import React, { useState, useEffect } from 'react'
import { ScenarioCard } from './ScenarioCard'
import { AIOutcomePopup } from './AIOutcomePopup'
import { ProgressBar } from './ProgressBar'
import { BadgeDisplay } from './BadgeDisplay'
import { PricingModal } from './PricingModal'
import { AICoachPanel } from './AICoachPanel'
import { MicrolearningModal } from './MicrolearningModal'
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
  TrendingUp,
  Zap,
  Star,
  Crown,
  Brain,
  BookOpen
} from 'lucide-react'

export const GameEngine: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [showOutcome, setShowOutcome] = useState(false)
  const [lastOutcome, setLastOutcome] = useState<AIOutcome | null>(null)
  const [animatingMoney, setAnimatingMoney] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPricing, setShowPricing] = useState(false)
  const [showMicrolearning, setShowMicrolearning] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [dailyLessonsCompleted, setDailyLessonsCompleted] = useState(0)
  
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
            money_saved: 50000, // Starting with KSh 50,000
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

  // Show microlearning modal on first visit or daily
  useEffect(() => {
    const lastLearningDate = localStorage.getItem('lastMicrolearningDate')
    const today = new Date().toDateString()
    
    if (lastLearningDate !== today && progress && dailyLessonsCompleted === 0) {
      setTimeout(() => setShowMicrolearning(true), 2000)
    }
  }, [progress, dailyLessonsCompleted])

  const handleChoice = async (choice: ScenarioChoice) => {
    if (!currentScenario || !progress) return

    try {
      setError(null)
      
      const outcome = await generateOutcome(choice.text, {
        scenario: currentScenario.title,
        currentMoney: progress.money_saved,
        playerState: progress.scenario_state,
        isPremium
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
          money_saved: 50000, // Reset to KSh 50,000
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

  const handleUpgrade = (plan: string) => {
    // In a real app, this would integrate with payment processing
    if (plan === 'premium') {
      setIsPremium(true)
      setShowPricing(false)
      // Simulate payment success
      alert('🎉 Welcome to AI Coach Pro! Your premium features are now active.')
    } else if (plan === 'enterprise') {
      alert('📞 Our sales team will contact you within 24 hours to set up your corporate account.')
      setShowPricing(false)
    }
  }

  const handleLessonComplete = (lessonId: string) => {
    setDailyLessonsCompleted(prev => prev + 1)
    localStorage.setItem('lastMicrolearningDate', new Date().toDateString())
    
    // Award bonus money for completing lessons
    if (progress) {
      updateProgress({
        money_saved: progress.money_saved + 2500 // KSh 2,500 bonus for learning
      })
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black crt-screen p-4">
        <div className="max-w-2xl mx-auto text-center mt-20">
          <div className="retro-card p-8">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-retro-pink" />
            <h2 className="text-xl font-pixel mb-4 text-retro-pink">GAME ERROR</h2>
            <p className="text-retro-light-gray mb-6 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="pixel-button px-6 py-3"
            >
              RELOAD GAME
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentScenario || !progress) {
    return (
      <div className="min-h-screen bg-black crt-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-retro-teal text-sm font-pixel">LOADING ADVENTURE...</p>
          {isOfflineMode && (
            <p className="text-retro-yellow text-xs mt-2 font-pixel">DEMO MODE</p>
          )}
        </div>
      </div>
    )
  }

  const progressPercentage = (progress.money_saved / 500000) * 100 // Goal: KSh 500,000
  const levelName = progress.money_saved < 100000 ? 'BEGINNER' : 
                   progress.money_saved < 250000 ? 'INTERMEDIATE' : 
                   progress.money_saved < 400000 ? 'ADVANCED' : 'EXPERT'

  return (
    <div className="min-h-screen bg-black crt-screen">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <header className="mb-8">
          <div className="retro-card p-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-retro-purple border-2 border-retro-teal">
                    <DollarSign className="w-6 h-6 text-retro-teal" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-pixel text-retro-teal">
                      BUDGETHERO
                    </h1>
                    <p className="text-xs text-retro-purple font-pixel">AI MICROLEARNING COACH</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 money-display ${animatingMoney ? 'money-change' : ''}`}>
                    <span>KSh {progress.money_saved.toLocaleString()}</span>
                  </div>
                  
                  {isPremium ? (
                    <div className="bg-retro-purple text-retro-teal px-3 py-1 text-xs font-pixel flex items-center gap-2">
                      <Crown className="w-3 h-3" />
                      PRO
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowPricing(true)}
                      className="bg-retro-yellow text-retro-black px-3 py-1 text-xs font-pixel hover:bg-retro-teal transition-colors"
                    >
                      UPGRADE
                    </button>
                  )}
                  
                  {isOfflineMode && (
                    <div className="bg-retro-yellow text-retro-black px-3 py-1 text-xs font-pixel">
                      DEMO
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMicrolearning(true)}
                  className="pixel-button bg-retro-purple hover:bg-retro-teal px-4 py-2 text-xs flex items-center gap-2"
                >
                  <BookOpen className="w-3 h-3" />
                  DAILY LESSON
                  {dailyLessonsCompleted > 0 && (
                    <span className="bg-retro-teal text-retro-black px-2 py-1 text-xs">
                      {dailyLessonsCompleted}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center gap-2 text-retro-purple">
                  <Trophy className="w-4 h-4" />
                  <span className="text-xs font-pixel">{progress.badges.length} BADGES</span>
                </div>
                <div className="flex items-center gap-2 text-retro-teal">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-pixel">{levelName}</span>
                </div>
                <button
                  onClick={resetGame}
                  className="pixel-button bg-retro-gray hover:bg-retro-light-gray px-4 py-2 text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-2" />
                  RESET
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <ProgressBar 
                current={progress.money_saved} 
                max={500000} 
                label="WEALTH GOAL PROGRESS"
              />
            </div>
          </div>
        </header>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Scenario Panel */}
          <div className="xl:col-span-2">
            <ScenarioCard
              scenario={currentScenario}
              onChoice={handleChoice}
              disabled={aiLoading || showOutcome}
            />
          </div>

          {/* Side Panels */}
          <div className="xl:col-span-2 space-y-6">
            {/* AI Coach Panel */}
            <AICoachPanel 
              userProgress={progress}
              isPremium={isPremium}
              onUpgrade={() => setShowPricing(true)}
            />

            {/* Progress Stats */}
            <div className="retro-card p-6">
              <h3 className="text-sm font-pixel mb-4 flex items-center gap-2 text-retro-teal">
                <TrendingUp className="w-4 h-4" />
                YOUR PROGRESS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-retro-light-gray">Current Wealth:</span>
                  <span className="text-retro-yellow font-pixel text-xs">KSh {progress.money_saved.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-retro-light-gray">Badges Earned:</span>
                  <span className="text-retro-purple font-pixel text-xs">{progress.badges.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-retro-light-gray">Progress to Goal:</span>
                  <span className="text-retro-teal font-pixel text-xs">{progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-retro-light-gray">Financial Level:</span>
                  <span className="text-retro-teal font-pixel text-xs">{levelName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-retro-light-gray">Lessons Today:</span>
                  <span className="text-retro-purple font-pixel text-xs">{dailyLessonsCompleted}</span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <BadgeDisplay badges={progress.badges} />

            {/* Monetization CTA */}
            {!isPremium && (
              <div className="retro-card p-6 border-retro-yellow">
                <h3 className="text-sm font-pixel mb-4 flex items-center gap-2 text-retro-yellow">
                  <Zap className="w-4 h-4" />
                  UNLOCK AI COACH PRO
                </h3>
                <div className="space-y-3 text-xs text-retro-light-gray mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-retro-teal mt-1">•</span>
                    <span>Personal AI Financial Coach with voice support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-retro-purple mt-1">•</span>
                    <span>Real-time NSE market data integration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-retro-yellow mt-1">•</span>
                    <span>Advanced scenarios and unlimited gameplay</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-retro-pink mt-1">•</span>
                    <span>Detailed analytics and goal tracking</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPricing(true)}
                  className="w-full pixel-button bg-retro-yellow text-retro-black text-xs py-3"
                >
                  UPGRADE FOR KSh 500/MONTH
                </button>
              </div>
            )}

            {/* Kenyan Financial Tips */}
            <div className="retro-card p-6">
              <h3 className="text-sm font-pixel mb-4 flex items-center gap-2 text-retro-yellow">
                <Sparkles className="w-4 h-4" />
                KENYAN MONEY TIPS
              </h3>
              <div className="space-y-3 text-xs text-retro-light-gray">
                <div className="flex items-start gap-2">
                  <span className="text-retro-teal mt-1">•</span>
                  <span>Keep NHIF contributions current for medical coverage</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-retro-purple mt-1">•</span>
                  <span>Consider Kasarani/Kahawa for affordable housing</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-retro-yellow mt-1">•</span>
                  <span>Join a SACCO for better savings rates</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-retro-pink mt-1">•</span>
                  <span>Avoid high-interest digital loans when possible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showOutcome && lastOutcome && (
        <AIOutcomePopup
          outcome={lastOutcome}
          onClose={nextScenario}
          moneyBefore={progress.money_saved - (lastOutcome.moneyChange || 0)}
          moneyAfter={progress.money_saved}
        />
      )}

      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        onUpgrade={handleUpgrade}
      />

      <MicrolearningModal
        isOpen={showMicrolearning}
        onClose={() => setShowMicrolearning(false)}
        onComplete={handleLessonComplete}
        isPremium={isPremium}
      />
    </div>
  )
}