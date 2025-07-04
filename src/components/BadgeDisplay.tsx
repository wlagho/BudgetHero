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
        return <Star className="w-4 h-4" />
      case 'smart mover': 
        return <Target className="w-4 h-4" />
      case 'side hustler': 
        return <Zap className="w-4 h-4" />
      case 'social butterfly':
      case 'team player': 
        return <Shield className="w-4 h-4" />
      case 'budget master': 
        return <Trophy className="w-4 h-4" />
      case 'emergency fund hero': 
        return <Crown className="w-4 h-4" />
      case 'debt destroyer': 
        return <Gem className="w-4 h-4" />
      default: 
        return <Award className="w-4 h-4" />
    }
  }

  const upcomingBadges = [
    { name: 'Silver Tongue', description: 'Master negotiation skills' },
    { name: 'Smart Mover', description: 'Make intelligent housing decisions' },
    { name: 'Public Transport Pro', description: 'Use matatus effectively' },
    { name: 'Social Butterfly', description: 'Leverage social connections' },
    { name: 'Emergency Fund Hero', description: 'Build solid emergency fund' },
    { name: 'Debt Destroyer', description: 'Eliminate high-interest debt' },
    { name: 'Budget Master', description: 'Excel at expense management' }
  ].filter(badge => !badges.includes(badge.name))

  return (
    <div className="retro-card p-6">
      <h3 className="text-sm font-pixel mb-4 flex items-center gap-2 text-retro-purple">
        <Trophy className="w-4 h-4" />
        ACHIEVEMENTS ({badges.length})
      </h3>
      
      {badges.length === 0 ? (
        <div className="text-center py-8">
          <Award className="w-12 h-12 mx-auto mb-4 text-retro-gray" />
          <p className="text-retro-light-gray mb-2 text-xs font-pixel">NO BADGES YET</p>
          <p className="text-xs text-retro-gray">Make smart choices to unlock achievements!</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 bg-retro-dark-gray border border-retro-purple"
            >
              <div className="text-retro-yellow">
                {getBadgeIcon(badge)}
              </div>
              <span className="font-pixel text-xs text-retro-teal">{badge}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Upcoming Badges */}
      {upcomingBadges.length > 0 && (
        <div className="pt-4 border-t-2 border-retro-gray">
          <h4 className="text-xs font-pixel mb-3 text-retro-light-gray">NEXT ACHIEVEMENTS:</h4>
          <div className="space-y-2">
            {upcomingBadges.slice(0, 3).map((badge, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-retro-black border border-retro-gray">
                <div className="text-retro-gray">
                  {getBadgeIcon(badge.name)}
                </div>
                <div>
                  <p className="text-xs font-pixel text-retro-light-gray">{badge.name}</p>
                  <p className="text-xs text-retro-gray">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}