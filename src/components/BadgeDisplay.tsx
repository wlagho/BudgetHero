import React from 'react'
import { Award, Star, Trophy, Target, Zap, Shield, Crown, Gem } from 'lucide-react'

interface BadgeDisplayProps {
  badges: string[]
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges }) => {
  const getBadgeIcon = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'silver tongue':
      case 'master negotiator': 
        return <Star className="w-5 h-5" />
      case 'smart mover': 
        return <Target className="w-5 h-5" />
      case 'side hustler': 
        return <Zap className="w-5 h-5" />
      case 'social butterfly':
      case 'team player': 
        return <Shield className="w-5 h-5" />
      case 'frugal champion':
      case 'budget master': 
        return <Trophy className="w-5 h-5" />
      case 'emergency fund hero': 
        return <Crown className="w-5 h-5" />
      case 'debt destroyer': 
        return <Gem className="w-5 h-5" />
      default: 
        return <Award className="w-5 h-5" />
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'silver tongue':
      case 'master negotiator': 
        return 'from-gray-400 to-gray-600'
      case 'smart mover': 
        return 'from-blue-400 to-blue-600'
      case 'side hustler': 
        return 'from-yellow-400 to-yellow-600'
      case 'social butterfly':
      case 'team player': 
        return 'from-pink-400 to-pink-600'
      case 'frugal champion':
      case 'budget master': 
        return 'from-green-400 to-green-600'
      case 'emergency fund hero': 
        return 'from-purple-400 to-purple-600'
      case 'debt destroyer': 
        return 'from-red-400 to-red-600'
      default: 
        return 'from-blue-400 to-purple-600'
    }
  }

  const upcomingBadges = [
    { name: 'Silver Tongue', description: 'Master the art of negotiation' },
    { name: 'Smart Mover', description: 'Make intelligent housing decisions' },
    { name: 'Side Hustler', description: 'Find alternative income sources' },
    { name: 'Social Butterfly', description: 'Leverage social connections' },
    { name: 'Emergency Fund Hero', description: 'Build a solid emergency fund' },
    { name: 'Debt Destroyer', description: 'Eliminate high-interest debt' },
    { name: 'Budget Master', description: 'Excel at expense management' }
  ].filter(badge => !badges.includes(badge.name))

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-100">
        <Trophy className="w-6 h-6 text-purple-400" />
        Achievements ({badges.length})
      </h3>
      
      {badges.length === 0 ? (
        <div className="text-center py-8">
          <Award className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <p className="text-slate-400 mb-2">No badges earned yet</p>
          <p className="text-xs text-slate-500">Make smart financial choices to unlock achievements!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 mb-6">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${getBadgeColor(badge)} bg-opacity-20 border border-current border-opacity-30`}
            >
              <div className="text-white">
                {getBadgeIcon(badge)}
              </div>
              <span className="font-medium text-slate-100">{badge}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Upcoming Badges */}
      {upcomingBadges.length > 0 && (
        <div className="pt-4 border-t border-slate-700">
          <h4 className="text-sm font-semibold mb-3 text-slate-300">Next Achievements:</h4>
          <div className="space-y-2">
            {upcomingBadges.slice(0, 3).map((badge, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700">
                <div className="text-slate-500">
                  {getBadgeIcon(badge.name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">{badge.name}</p>
                  <p className="text-xs text-slate-500">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}