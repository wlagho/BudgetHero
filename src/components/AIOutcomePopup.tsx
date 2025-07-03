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
  const [showReasoning, setShowReasoning] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 300)
    const timer2 = setTimeout(() => setShowMoney(true), 1000)
    const timer3 = setTimeout(() => setShowBadge(true), 1500)
    const timer4 = setTimeout(() => setShowReasoning(true), 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [])

  const moneyChange = outcome.moneyChange || 0
  const isPositive = moneyChange > 0

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-200 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-8 pr-8">
          {/* Title */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Decision Outcome
              </h2>
            </div>
            <p className="text-slate-400">Here's how your choice played out in the real world</p>
          </div>

          {/* Outcome Text */}
          {showText && (
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-lg leading-relaxed text-slate-200">
                {outcome.outcome}
              </p>
            </div>
          )}

          {/* Money Change */}
          {showMoney && moneyChange !== 0 && (
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 rounded-xl border border-slate-600">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Financial Impact
              </h3>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-slate-400 text-sm mb-1">Before</p>
                  <p className="text-2xl font-bold text-slate-300">${moneyBefore.toLocaleString()}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-6 h-6 text-slate-400" />
                  <div className="flex items-center gap-2">
                    {isPositive ? (
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-red-400" />
                    )}
                    <span className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}${moneyChange.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-slate-400 text-sm mb-1">After</p>
                  <p className="text-2xl font-bold text-blue-400">${moneyAfter.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Badge Earned */}
          {showBadge && outcome.badgeEarned && (
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-xl border border-purple-500/30 badge-earned">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Award className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl font-bold text-purple-400">Achievement Unlocked!</span>
                </div>
                <div className="badge text-lg px-4 py-2 inline-block">
                  {outcome.badgeEarned}
                </div>
              </div>
            </div>
          )}

          {/* Consequence */}
          {outcome.consequence && (
            <div className="bg-orange-500/20 p-6 rounded-xl border border-orange-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">Ongoing Consequence</h4>
                  <p className="text-orange-200 leading-relaxed">{outcome.consequence}</p>
                </div>
              </div>
            </div>
          )}

          {/* AI Reasoning (Optional) */}
          {showReasoning && outcome.reasoning && (
            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-600">
              <h4 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Why this happened
              </h4>
              <p className="text-sm text-slate-300 italic">{outcome.reasoning}</p>
            </div>
          )}

          {/* Continue Button */}
          <div className="text-center pt-4">
            <button
              onClick={onClose}
              className="modern-button px-8 py-4 text-lg"
            >
              Continue Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}