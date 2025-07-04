import React, { useState } from 'react'
import { Brain, MessageCircle, TrendingUp, Target, Lightbulb, Mic, MicOff } from 'lucide-react'

interface AICoachPanelProps {
  userProgress: any
  isPremium: boolean
  onUpgrade: () => void
}

export const AICoachPanel: React.FC<AICoachPanelProps> = ({ userProgress, isPremium, onUpgrade }) => {
  const [isListening, setIsListening] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'coach',
      message: isPremium 
        ? "Hello! I'm your AI Financial Coach. I've analyzed your progress and have some personalized advice for you."
        : "Hi! I'm your AI Coach. Upgrade to Premium to unlock personalized financial guidance!"
    }
  ])

  const coachInsights = isPremium ? [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: "Spending Pattern",
      insight: "You're making smart housing decisions! Your rent-to-income ratio is improving.",
      color: "retro-teal"
    },
    {
      icon: <Target className="w-4 h-4" />,
      title: "Next Goal",
      insight: "Focus on building your emergency fund to KSh 150,000 for 3 months of expenses.",
      color: "retro-purple"
    },
    {
      icon: <Lightbulb className="w-4 h-4" />,
      title: "Market Tip",
      insight: "NSE is showing good performance. Consider diversifying with Safaricom shares.",
      color: "retro-yellow"
    }
  ] : [
    {
      icon: <Brain className="w-4 h-4" />,
      title: "Upgrade for Insights",
      insight: "Get personalized financial advice based on your progress and Kenyan market data.",
      color: "retro-gray"
    }
  ]

  const toggleVoice = () => {
    if (!isPremium) {
      onUpgrade()
      return
    }
    setIsListening(!isListening)
  }

  return (
    <div className="retro-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-retro-purple" />
          <h3 className="text-sm font-pixel text-retro-purple">AI FINANCIAL COACH</h3>
        </div>
        {isPremium && (
          <div className="bg-retro-purple text-retro-teal px-2 py-1 text-xs font-pixel">
            PRO
          </div>
        )}
      </div>

      {/* Voice Interface */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={toggleVoice}
            className={`p-3 border-2 transition-all ${
              isListening 
                ? 'bg-retro-pink border-retro-pink text-retro-black' 
                : isPremium 
                  ? 'bg-retro-dark-gray border-retro-purple text-retro-purple hover:bg-retro-purple hover:text-retro-black'
                  : 'bg-retro-gray border-retro-gray text-retro-light-gray cursor-not-allowed'
            }`}
            disabled={!isPremium}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
          <div className="flex-1">
            <p className="text-xs text-retro-light-gray">
              {isPremium 
                ? (isListening ? "Listening... Ask me anything about your finances!" : "Click to ask your AI coach a question")
                : "Voice coaching available in Premium"
              }
            </p>
            {isPremium && (
              <p className="text-xs text-retro-gray mt-1">
                Supports English and Swahili
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4 mb-6">
        <h4 className="text-xs font-pixel text-retro-teal">PERSONALIZED INSIGHTS</h4>
        {coachInsights.map((insight, index) => (
          <div key={index} className={`bg-retro-black p-4 border border-${insight.color}`}>
            <div className="flex items-start gap-3">
              <div className={`text-${insight.color} mt-1`}>
                {insight.icon}
              </div>
              <div className="flex-1">
                <h5 className={`text-xs font-pixel text-${insight.color} mb-2`}>{insight.title}</h5>
                <p className="text-xs text-retro-light-gray leading-relaxed">{insight.insight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="border-t-2 border-retro-gray pt-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-4 h-4 text-retro-teal" />
          <span className="text-xs font-pixel text-retro-teal">QUICK CHAT</span>
        </div>
        
        <div className="bg-retro-black p-3 border border-retro-gray mb-3 max-h-32 overflow-y-auto">
          {chatMessages.map((msg, index) => (
            <div key={index} className="mb-2 last:mb-0">
              <div className={`text-xs ${msg.type === 'coach' ? 'text-retro-purple' : 'text-retro-teal'}`}>
                {msg.type === 'coach' ? '🤖 Coach:' : '👤 You:'}
              </div>
              <div className="text-xs text-retro-light-gray mt-1">{msg.message}</div>
            </div>
          ))}
        </div>

        {isPremium ? (
          <input
            type="text"
            placeholder="Ask about budgeting, investments, or any financial question..."
            className="w-full bg-retro-dark-gray border border-retro-gray p-2 text-xs text-retro-light-gray placeholder-retro-gray focus:border-retro-teal focus:outline-none"
          />
        ) : (
          <button
            onClick={onUpgrade}
            className="w-full pixel-button bg-retro-purple text-xs py-2"
          >
            UPGRADE FOR AI CHAT
          </button>
        )}
      </div>
    </div>
  )
}