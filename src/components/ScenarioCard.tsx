import React from 'react'
import { Scenario, ScenarioChoice } from '../data/scenarios'
import { Clock, DollarSign, Home, Car, Heart, TrendingUp } from 'lucide-react'

interface ScenarioCardProps {
  scenario: Scenario
  onChoice: (choice: ScenarioChoice) => void
  disabled?: boolean
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onChoice, disabled }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'housing': return <Home className="w-5 h-5" />
      case 'transportation': return <Car className="w-5 h-5" />
      case 'emergency': return <Heart className="w-5 h-5" />
      case 'investment': return <TrendingUp className="w-5 h-5" />
      default: return <DollarSign className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'hard': return 'text-red-400'
      default: return 'text-retro-teal'
    }
  }

  return (
    <div className="retro-panel p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getCategoryIcon(scenario.category)}
          <h2 className="text-xl font-bold">{scenario.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className={`text-sm uppercase ${getDifficultyColor(scenario.difficulty)}`}>
            {scenario.difficulty}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-retro-purple mb-3">{scenario.description}</p>
        <div className="bg-black/50 p-4 rounded border border-retro-teal/30">
          <p className="text-sm leading-relaxed">{scenario.situation}</p>
        </div>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold mb-3">What's your move?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scenario.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice)}
              disabled={disabled}
              className={`
                pixel-button text-left p-4 rounded border-2 transition-all
                ${disabled 
                  ? 'opacity-50 cursor-not-allowed border-gray-500' 
                  : 'border-retro-teal hover:border-retro-purple hover:bg-retro-purple/10'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{choice.text}</span>
                <div className="w-2 h-2 bg-retro-teal rounded-full opacity-50"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {disabled && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-retro-teal">
            <div className="animate-spin w-4 h-4 border-2 border-retro-teal border-t-transparent rounded-full"></div>
            <span className="text-sm">AI is calculating your fate...</span>
          </div>
        </div>
      )}
    </div>
  )
}