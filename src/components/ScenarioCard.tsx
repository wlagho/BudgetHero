import React from 'react'
import { Scenario, ScenarioChoice } from '../data/scenarios'
import { 
  Clock, 
  DollarSign, 
  Home, 
  Car, 
  Heart, 
  TrendingUp,
  Briefcase,
  AlertTriangle,
  Brain
} from 'lucide-react'

interface ScenarioCardProps {
  scenario: Scenario
  onChoice: (choice: ScenarioChoice) => void
  disabled?: boolean
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onChoice, disabled }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'housing': return <Home className="w-6 h-6" />
      case 'transportation': return <Car className="w-6 h-6" />
      case 'emergency': return <Heart className="w-6 h-6" />
      case 'investment': return <TrendingUp className="w-6 h-6" />
      default: return <DollarSign className="w-6 h-6" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'hard': return 'text-red-400 bg-red-400/20 border-red-400/30'
      default: return 'text-blue-400 bg-blue-400/20 border-blue-400/30'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'housing': return 'text-blue-400'
      case 'transportation': return 'text-green-400'
      case 'emergency': return 'text-red-400'
      case 'investment': return 'text-purple-400'
      default: return 'text-slate-400'
    }
  }

  return (
    <div className="glass-card p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-slate-800/50 ${getCategoryColor(scenario.category)}`}>
            {getCategoryIcon(scenario.category)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-1">{scenario.title}</h2>
            <p className="text-slate-400 capitalize">{scenario.category} Challenge</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(scenario.difficulty)}`}>
          {scenario.difficulty.toUpperCase()}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-lg text-slate-300 mb-4">{scenario.description}</p>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
            <span className="text-yellow-400 font-semibold">Situation:</span>
          </div>
          <p className="text-slate-200 leading-relaxed">{scenario.situation}</p>
        </div>
      </div>

      {/* Choices */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-slate-100">What's your strategy?</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.choices.map((choice, index) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice)}
              disabled={disabled}
              className={`choice-button ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-slate-100 font-medium">{choice.text}</span>
                  </div>
                </div>
                <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60 flex-shrink-0 ml-3"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {disabled && (
        <div className="mt-8 text-center">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-center gap-3 text-blue-400">
              <div className="spinner"></div>
              <span className="text-lg">Analyzing your decision and calculating outcomes...</span>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Our AI is considering market conditions, financial principles, and real-world consequences.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}