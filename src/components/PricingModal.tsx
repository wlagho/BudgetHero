import React, { useState } from 'react'
import { X, Check, Star, Zap, Crown, Shield, Brain, TrendingUp } from 'lucide-react'

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: (plan: string) => void
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium')

  if (!isOpen) return null

  const plans = [
    {
      id: 'free',
      name: 'Free Explorer',
      price: 'KSh 0',
      period: 'forever',
      icon: <Star className="w-6 h-6" />,
      color: 'retro-teal',
      features: [
        '5 scenarios per day',
        'Basic AI outcomes',
        'Progress tracking',
        'Community leaderboard'
      ],
      limitations: [
        'Limited scenario variety',
        'No personal AI coach',
        'No advanced analytics'
      ]
    },
    {
      id: 'premium',
      name: 'AI Coach Pro',
      price: 'KSh 500',
      period: 'per month',
      icon: <Brain className="w-6 h-6" />,
      color: 'retro-purple',
      popular: true,
      features: [
        'Unlimited scenarios',
        'Personal AI Financial Coach',
        'Advanced market scenarios',
        'Real-time NSE data integration',
        'Voice interactions (Swahili/English)',
        'Detailed progress analytics',
        'Custom goal setting',
        'Priority support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Corporate Training',
      price: 'KSh 15,000',
      period: 'per month',
      icon: <Crown className="w-6 h-6" />,
      color: 'retro-yellow',
      features: [
        'Everything in Pro',
        'Team management dashboard',
        'Custom corporate scenarios',
        'Bulk user management',
        'Advanced reporting',
        'White-label options',
        'Dedicated account manager',
        'API access'
      ]
    }
  ]

  return (
    <div className="fixed inset-0 popup-overlay flex items-center justify-center z-50 p-4">
      <div className="popup-content max-w-6xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-retro-light-gray hover:text-retro-teal transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-retro-yellow" />
            <h2 className="text-2xl font-pixel text-retro-teal">UPGRADE YOUR FINANCIAL JOURNEY</h2>
          </div>
          <p className="text-sm text-retro-light-gray max-w-2xl mx-auto">
            Unlock advanced AI coaching, unlimited scenarios, and personalized financial guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-retro-dark-gray border-2 p-6 cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? `border-${plan.color} shadow-lg` 
                  : 'border-retro-gray hover:border-retro-light-gray'
              } ${plan.popular ? 'transform scale-105' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-retro-purple text-retro-teal px-4 py-1 text-xs font-pixel border-2 border-retro-teal">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`text-${plan.color} mb-3 flex justify-center`}>
                  {plan.icon}
                </div>
                <h3 className={`text-lg font-pixel text-${plan.color} mb-2`}>{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-2xl font-pixel text-retro-yellow">{plan.price}</span>
                  <span className="text-xs text-retro-light-gray ml-2">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-retro-teal mt-1 flex-shrink-0" />
                    <span className="text-xs text-retro-light-gray">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations && plan.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-start gap-3 opacity-60">
                    <X className="w-4 h-4 text-retro-gray mt-1 flex-shrink-0" />
                    <span className="text-xs text-retro-gray line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onUpgrade(plan.id)}
                className={`w-full pixel-button ${
                  selectedPlan === plan.id ? 'bg-retro-purple' : 'bg-retro-gray'
                }`}
                disabled={plan.id === 'free'}
              >
                {plan.id === 'free' ? 'CURRENT PLAN' : 'UPGRADE NOW'}
              </button>
            </div>
          ))}
        </div>

        {/* Partnership Section */}
        <div className="bg-retro-dark-gray border-2 border-retro-yellow p-6 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-retro-yellow" />
              <h3 className="text-lg font-pixel text-retro-yellow">PARTNERSHIP OPPORTUNITIES</h3>
            </div>
            <p className="text-sm text-retro-light-gray mb-4">
              We partner with banks, SACCOs, and corporations to provide financial education
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-retro-black p-4 border border-retro-gray">
                <TrendingUp className="w-5 h-5 text-retro-teal mx-auto mb-2" />
                <p className="text-retro-teal font-pixel mb-1">BANK PARTNERSHIPS</p>
                <p className="text-retro-light-gray">Customer financial education programs</p>
              </div>
              <div className="bg-retro-black p-4 border border-retro-gray">
                <Crown className="w-5 h-5 text-retro-purple mx-auto mb-2" />
                <p className="text-retro-purple font-pixel mb-1">CORPORATE TRAINING</p>
                <p className="text-retro-light-gray">Employee financial wellness programs</p>
              </div>
              <div className="bg-retro-black p-4 border border-retro-gray">
                <Star className="w-5 h-5 text-retro-yellow mx-auto mb-2" />
                <p className="text-retro-yellow font-pixel mb-1">GOVERNMENT PROGRAMS</p>
                <p className="text-retro-light-gray">Youth financial literacy initiatives</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-retro-light-gray mb-4">
            🔒 Secure payments via M-Pesa, Airtel Money, and Bank Transfer
          </p>
          <button
            onClick={onClose}
            className="pixel-button bg-retro-gray px-6 py-3"
          >
            MAYBE LATER
          </button>
        </div>
      </div>
    </div>
  )
}