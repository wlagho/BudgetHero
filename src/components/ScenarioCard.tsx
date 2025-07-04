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
  Brain,
  Zap
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
      case 'transport': return <Car className="w-6 h-6" />
      case 'emergency': return <Heart className="w-6 h-6" />
      case 'investment': return <TrendingUp className="w-6 h-6" />
      case 'career': return <Briefcase className="w-6 h-6" />
      default: return <DollarSign className="w-6 h-6" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-retro-teal border-retro-teal'
      case 'medium': return 'text-retro-yellow border-retro-yellow'
      case 'hard': return 'text-retro-pink border-retro-pink'
      default: return 'text-retro-purple border-retro-purple'
    }
  }

  return (
    <div className="retro-card p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-retro-dark-gray border-2 border-retro-purple text-retro-teal">
            {getCategoryIcon(scenario.category)}
          </div>
          <div>
            <h2 className="text-xl font-pixel text-retro-teal mb-1">{scenario.title}</h2>
            <p className="text-xs text-retro-light-gray uppercase font-pixel">{scenario.category} CHALLENGE</p>
          </div>
        </div>
        <div className={`px-3 py-1 border-2 text-xs font-pixel ${getDifficultyColor(scenario.difficulty)}`}>
          {scenario.difficulty.toUpperCase()}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-sm text-retro-purple mb-4 font-pixel">{scenario.description}</p>
        <div className="bg-retro-dark-gray p-6 border-2 border-retro-gray">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="w-4 h-4 text-retro-yellow mt-1 flex-shrink-0" />
            <span className="text-retro-yellow font-pixel text-xs">SITUATION:</span>
          </div>
          <p className="text-xs text-retro-light-gray leading-relaxed">{scenario.situation}</p>
        </div>
      </div>

      {/* Choices */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-5 h-5 text-retro-purple" />
          <h3 className="text-sm font-pixel text-retro-teal">WHAT'S YOUR STRATEGY?</h3>
        </div>
        
        <div className="space-y-3">
          {scenario.choices.map((choice, index) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice)}
              disabled={disabled}
              className={`choice-button w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 bg-retro-purple border border-retro-teal flex items-center justify-center text-retro-teal font-pixel text-xs">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-retro-teal font-pixel text-xs text-left">{choice.text}</span>
                  </div>
                </div>
                <div className="w-2 h-2 bg-retro-teal flex-shrink-0 ml-3"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {disabled && (
        <div className="mt-8 text-center">
          <div className="bg-retro-dark-gray p-6 border-2 border-retro-gray">
            <div className="flex items-center justify-center gap-3 text-retro-teal mb-2">
              <div className="spinner"></div>
              <span className="text-xs font-pixel">ANALYZING DECISION...</span>
            </div>
            <p className="text-retro-light-gray text-xs">
              Calculating realistic outcomes based on Kenyan financial principles.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}