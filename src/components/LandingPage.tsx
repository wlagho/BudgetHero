import React, { useState } from 'react'
import { useSupabase } from '../hooks/useSupabase'
import { 
  TrendingUp, 
  DollarSign, 
  Trophy, 
  Brain, 
  Star, 
  Play, 
  AlertCircle,
  Sparkles,
  Target,
  Shield,
  Zap
} from 'lucide-react'

interface LandingPageProps {
  onStartGame: () => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGame }) => {
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signInAnonymously, isOfflineMode } = useSupabase()

  const handleStart = async () => {
    setIsStarting(true)
    setError(null)
    
    try {
      await signInAnonymously()
      onStartGame()
    } catch (error) {
      console.error('Error starting game:', error)
      setError('Failed to start game. Please try again.')
      setIsStarting(false)
    }
  }

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Decisions",
      description: "Learn through realistic Kenyan financial scenarios"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real Impact",
      description: "Every choice affects your virtual wealth realistically"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Earn Badges",
      description: "Master different aspects of personal finance"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Reach Goals",
      description: "Work towards KSh 500,000 and track progress"
    }
  ]

  const scenarios = [
    {
      icon: "🏠",
      title: "Housing in Nairobi",
      description: "Navigate rent increases in Kilimani vs moving to Kasarani"
    },
    {
      icon: "🚗",
      title: "Transport Choices",
      description: "Handle car repairs vs matatus and boda bodas"
    },
    {
      icon: "💼",
      title: "Career Moves",
      description: "Evaluate promotions and job opportunities"
    },
    {
      icon: "🏥",
      title: "NHIF & Health",
      description: "Manage medical expenses and insurance decisions"
    }
  ]

  return (
    <div className="min-h-screen bg-black crt-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-retro-purple border-2 border-retro-teal">
                <DollarSign className="w-10 h-10 text-retro-teal" />
              </div>
              <h1 className="text-4xl md:text-6xl font-pixel text-retro-teal glitch">
                BudgetHero
              </h1>
              <div className="p-4 bg-retro-purple border-2 border-retro-teal">
                <Zap className="w-10 h-10 text-retro-yellow" />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-retro-purple mb-4 typewriter">
              Master Your Money Through Adventure
            </p>
            <p className="text-sm text-retro-light-gray max-w-2xl mx-auto leading-relaxed">
              Experience real-world Kenyan financial challenges in a safe, gamified environment. 
              Make decisions, see consequences, and build wealth-building skills.
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="retro-card max-w-2xl mx-auto p-8 mb-12">
            <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
              <div className="flex items-center gap-2 text-retro-yellow">
                <DollarSign className="w-5 h-5" />
                <span className="text-sm font-pixel">Start: KSh 50,000</span>
              </div>
              <div className="w-2 h-2 bg-retro-purple"></div>
              <div className="flex items-center gap-2 text-retro-purple">
                <Trophy className="w-5 h-5" />
                <span className="text-sm font-pixel">Earn Badges</span>
              </div>
              <div className="w-2 h-2 bg-retro-teal"></div>
              <div className="flex items-center gap-2 text-retro-teal">
                <Target className="w-5 h-5" />
                <span className="text-sm font-pixel">Goal: KSh 500K</span>
              </div>
            </div>

            {/* Offline Mode Notice */}
            {isOfflineMode && (
              <div className="bg-retro-dark-gray border-2 border-retro-yellow p-4 mb-6">
                <div className="flex items-center gap-3 text-retro-yellow mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-pixel text-xs">DEMO MODE ACTIVE</span>
                </div>
                <p className="text-xs text-retro-light-gray">
                  Running offline - progress won't be saved between sessions.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-retro-dark-gray border-2 border-retro-pink p-4 mb-6">
                <div className="flex items-center gap-3 text-retro-pink">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-xs font-pixel">{error}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleStart}
              disabled={isStarting}
              className="pixel-button text-lg px-8 py-4"
            >
              {isStarting ? (
                <div className="flex items-center gap-3">
                  <div className="spinner w-5 h-5"></div>
                  <span>LOADING...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Play className="w-6 h-6" />
                  <span>START ADVENTURE</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="retro-card p-6 text-center hover:glitch">
              <div className="text-retro-teal mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-sm font-pixel mb-3 text-retro-teal">{feature.title}</h3>
              <p className="text-xs text-retro-light-gray leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Scenarios Preview */}
        <div className="retro-card p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-pixel mb-4 text-retro-purple">
              KENYAN SCENARIOS
            </h2>
            <p className="text-xs text-retro-light-gray max-w-2xl mx-auto">
              Face authentic financial challenges with realistic Kenyan context and consequences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((scenario, index) => (
              <div key={index} className="bg-retro-dark-gray p-6 border-2 border-retro-gray hover:border-retro-purple transition-colors">
                <div className="text-3xl mb-4">{scenario.icon}</div>
                <h3 className="font-pixel text-xs text-retro-teal mb-2">{scenario.title}</h3>
                <p className="text-xs text-retro-light-gray">{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="retro-card p-8 mb-16">
          <h2 className="text-2xl font-pixel text-center mb-8 text-retro-yellow">
            HOW IT WORKS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-retro-purple border-2 border-retro-teal flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-pixel text-retro-teal">1</span>
              </div>
              <h3 className="text-sm font-pixel mb-2 text-retro-teal">FACE SCENARIOS</h3>
              <p className="text-xs text-retro-light-gray">Encounter authentic Kenyan financial situations like rent in Kilimani or matatu vs car decisions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-retro-purple border-2 border-retro-teal flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-pixel text-retro-teal">2</span>
              </div>
              <h3 className="text-sm font-pixel mb-2 text-retro-teal">MAKE CHOICES</h3>
              <p className="text-xs text-retro-light-gray">Choose from realistic options with logical financial consequences based on Kenyan market realities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-retro-purple border-2 border-retro-teal flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-pixel text-retro-teal">3</span>
              </div>
              <h3 className="text-sm font-pixel mb-2 text-retro-teal">BUILD WEALTH</h3>
              <p className="text-xs text-retro-light-gray">Watch your virtual wealth grow as you develop real financial literacy and decision-making skills.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-retro-light-gray">
          <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-pixel">SAFE LEARNING</span>
            </div>
            <span className="text-retro-gray">•</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span className="text-xs font-pixel">KENYAN CONTEXT</span>
            </div>
            <span className="text-retro-gray">•</span>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span className="text-xs font-pixel">SKILL BUILDING</span>
            </div>
          </div>
          <p className="text-xs">© 2025 BudgetHero - Learn financial literacy through intelligent gameplay</p>
        </div>
      </div>
    </div>
  )
}