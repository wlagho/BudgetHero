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
  Shield
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
      title: "Smart Decision Making",
      description: "Learn through realistic financial scenarios with logical consequences"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-World Impact",
      description: "Every choice affects your virtual wealth based on actual financial principles"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Achievement System",
      description: "Earn badges for mastering different aspects of personal finance"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal-Oriented",
      description: "Work towards financial milestones and track your progress"
    }
  ]

  const scenarios = [
    {
      icon: "🏠",
      title: "Housing Decisions",
      description: "Navigate rent increases, moving costs, and roommate situations"
    },
    {
      icon: "🚗",
      title: "Transportation Choices",
      description: "Handle car repairs, public transit, and transportation budgeting"
    },
    {
      icon: "💼",
      title: "Career Moves",
      description: "Evaluate job offers, promotions, and career investments"
    },
    {
      icon: "🏥",
      title: "Emergency Planning",
      description: "Manage unexpected expenses and build financial resilience"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                BudgetHero
              </h1>
            </div>
            <p className="text-2xl md:text-3xl text-slate-300 mb-4">
              Master Your Money Through Adventure
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Experience real-world financial challenges in a safe, gamified environment. 
              Make decisions, see consequences, and build wealth-building skills.
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="glass-card max-w-2xl mx-auto p-8 mb-12">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-3 text-green-400">
                <DollarSign className="w-6 h-6" />
                <span className="text-lg font-semibold">Start with $1,000</span>
              </div>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex items-center gap-3 text-purple-400">
                <Trophy className="w-6 h-6" />
                <span className="text-lg font-semibold">Earn Achievements</span>
              </div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex items-center gap-3 text-blue-400">
                <Target className="w-6 h-6" />
                <span className="text-lg font-semibold">Reach $10,000</span>
              </div>
            </div>

            {/* Offline Mode Notice */}
            {isOfflineMode && (
              <div className="bg-amber-500/20 border border-amber-500/50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-amber-400 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">Demo Mode Active</span>
                </div>
                <p className="text-sm text-amber-200">
                  Running offline - progress won't be saved between sessions.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleStart}
              disabled={isStarting}
              className="modern-button text-lg px-8 py-4 disabled:opacity-50"
            >
              {isStarting ? (
                <div className="flex items-center gap-3">
                  <div className="spinner w-5 h-5"></div>
                  <span>Starting Your Journey...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Play className="w-6 h-6" />
                  <span>Begin Your Financial Adventure</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="text-blue-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Scenarios Preview */}
        <div className="glass-card p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Real-World Scenarios
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Face authentic financial challenges with logical consequences based on sound financial principles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map((scenario, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                <div className="text-4xl mb-4">{scenario.icon}</div>
                <h3 className="font-bold text-slate-100 mb-2">{scenario.title}</h3>
                <p className="text-sm text-slate-400">{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-100">Face Real Scenarios</h3>
              <p className="text-slate-400">Encounter authentic financial situations like rent increases, car repairs, and job opportunities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-100">Make Smart Choices</h3>
              <p className="text-slate-400">Choose from realistic options, each with logical financial consequences based on real-world principles.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-100">Build Wealth & Skills</h3>
              <p className="text-slate-400">Watch your virtual wealth grow as you develop real financial literacy and decision-making skills.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5" />
            <span>Safe Learning Environment</span>
            <span className="mx-2">•</span>
            <Star className="w-5 h-5" />
            <span>Evidence-Based Outcomes</span>
            <span className="mx-2">•</span>
            <Trophy className="w-5 h-5" />
            <span>Skill Building Focus</span>
          </div>
          <p>© 2025 BudgetHero - Learn financial literacy through intelligent gameplay</p>
        </div>
      </div>
    </div>
  )
}