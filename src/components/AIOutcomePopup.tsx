import React, { useState, useEffect } from 'react'
import { AIOutcome } from '../hooks/useAI'
import { X, TrendingUp, TrendingDown, Award, AlertTriangle } from 'lucide-react'

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
    const timer1 = setTimeout(() => setShowText(true), 500)
    const timer2 = setTimeout(() => setShowMoney(true), 1500)
    const timer3 = setTimeout(() => setShowBadge(true), 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const moneyChange = outcome.moneyChange || 0
  const isPositive = moneyChange > 0

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="retro-panel max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-retro-teal hover:text-retro-purple z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-6 pr-8">
          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold text-retro-purple">OUTCOME</h2>

          {/* Outcome Text */}
          {showText && (
            <div className="bg-black/50 p-4 rounded border border-retro-teal/30">
              <p className="text-sm md:text-base leading-relaxed text-left break-words whitespace-pre-wrap">
                {outcome.outcome}
              </p>
            </div>
          )}

          {/* Money Change */}
          {showMoney && moneyChange !== 0 && (
            <div className="bg-black/30 p-4 rounded border border-retro-teal/20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-sm md:text-base">${moneyBefore.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                  )}
                  <span className={`text-base md:text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}${moneyChange.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-retro-teal">
                  <span className="text-lg md:text-xl font-bold">${moneyAfter.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Badge Earned */}
          {showBadge && outcome.badgeEarned && (
            <div className="bg-gradient-to-r from-retro-purple/20 to-retro-teal/20 p-4 rounded border border-retro-purple/50">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-retro-purple" />
                <span className="text-base md:text-lg font-bold text-retro-purple">NEW BADGE!</span>
              </div>
              <p className="text-retro-teal text-sm md:text-base break-words">{outcome.badgeEarned}</p>
            </div>
          )}

          {/* Consequence */}
          {outcome.consequence && (
            <div className="bg-orange-500/20 p-4 rounded border border-orange-500/50">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                <span className="text-orange-400 font-bold text-sm md:text-base">CONSEQUENCE</span>
              </div>
              <p className="text-orange-200 text-xs md:text-sm break-words leading-relaxed">
                {outcome.consequence}
              </p>
            </div>
          )}

          {/* Continue Button */}
          <div className="pt-4">
            <button
              onClick={onClose}
              className="pixel-button text-retro-teal border-retro-teal hover:bg-retro-teal hover:text-black px-6 md:px-8 py-3 text-sm md:text-base"
            >
              Continue Adventure
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}