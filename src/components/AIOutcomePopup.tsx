import React, { useState, useEffect } from 'react'
import { AIOutcome } from '../hooks/useAI'
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  AlertTriangle, 
  DollarSign,
  Brain,
  ArrowRight
} from 'lucide-react'

interface AIOutcomePopupProps {
  outcome: AIOutcome
  onClose: () => void
  moneyBefore: number
  moneyAfter: number
}

export const AIOutcomePopup: React.FC<AIOutcomePopupProps> = ({ 
  outcome, 
  onClose, 
  moneyBefore, 
  moneyAfter 
}) => {
  const [showText, setShowText] = useState(false)
  const [showMoney, setShowMoney] = useState(false)
  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 300)
    const timer2 = setTimeout(() => setShowMoney(true), 1000)
    const timer3 = setTimeout(() => setShowBadge(true), 1500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const moneyChange = outcome.moneyChange || 0
  const isPositive = moneyChange > 0

  return (
    <div className="fixed inset-0 popup-overlay flex items-center justify-center z-50 p-4">
      <div className="popup-content max-w-3xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-retro-light-gray hover:text-retro-teal transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-8 pr-8">
          {/* Title */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-retro-purple" />
              <h2 className="text-2xl font-pixel text-retro-teal">
                DECISION OUTCOME
              </h2>
            </div>
            <p className="text-xs text-retro-light-gray font-pixel">HERE'S HOW YOUR CHOICE PLAYED OUT</p>
          </div>

          {/* Outcome Text */}
          {showText && (
            <div className="bg-retro-dark-gray p-6 border-2 border-retro-gray">
              <p className="text-sm leading-relaxed text-retro-light-gray">
                {outcome.outcome}
              </p>
            </div>
          )}

          {/* Money Change */}
          {showMoney && moneyChange !== 0 && (
            <div className="bg-retro-dark-gray p-6 border-2 border-retro-purple">
              <h3 className="text-sm font-pixel text-retro-teal mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                FINANCIAL IMPACT
              </h3>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-retro-light-gray text-xs mb-1 font-pixel">BEFORE</p>
                  <p className="text-lg font-pixel text-retro-yellow">KSh {moneyBefore.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-retro-light-gray" />
                  <div className="flex items-center gap-2">
                    {isPositive ? (
                      <TrendingUp className="w-5 h-5 text-retro-teal" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-retro-pink" />
                    )}
                    <span className={`text-lg font-pixel ${isPositive ? 'text-retro-teal' : 'text-retro-pink'}`}>
                      {isPositive ? '+' : ''}KSh {moneyChange.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-retro-light-gray text-xs mb-1 font-pixel">AFTER</p>
                  <p className="text-lg font-pixel text-retro-yellow">KSh {moneyAfter.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Badge Earned */}
          {showBadge && outcome.badgeEarned && (
            <div className="bg-retro-dark-gray p-6 border-2 border-retro-yellow badge-earned">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-retro-yellow" />
                  <span className="text-lg font-pixel text-retro-yellow">ACHIEVEMENT UNLOCKED!</span>
                </div>
                <div className="badge text-sm px-4 py-2 inline-block">
                  {outcome.badgeEarned}
                </div>
              </div>
            </div>
          )}

          {/* Consequence */}
          {outcome.consequence && (
            <div className="bg-retro-dark-gray p-6 border-2 border-retro-yellow">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-retro-yellow mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-pixel text-retro-yellow mb-2">ONGOING CONSEQUENCE</h4>
                  <p className="text-xs text-retro-light-gray leading-relaxed">{outcome.consequence}</p>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="text-center pt-4">
            <button
              onClick={onClose}
              className="pixel-button px-8 py-4 text-sm"
            >
              CONTINUE JOURNEY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}