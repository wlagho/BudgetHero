import React from 'react'
import { Award, Star, Trophy, Target, Zap, Shield } from 'lucide-react'

interface BadgeDisplayProps {
  badges: string[]
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badges }) => {
  const getBadgeIcon = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'silver tongue': return <Star className="w-4 h-4" />
      case 'smart mover': return <Target className="w-4 h-4" />
      case 'side hustler': return <Zap className="w-4 h-4" />
      case 'social butterfly': return <Shield className="w-4 h-4" />
      case 'frugal champion': return <Trophy className="w-4 h-4" />
      default: return <Award className="w-4 h-4" />
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'silver tongue': return 'text-gray-300 border-gray-300'
      case 'smart mover': return 'text-blue-400 border-blue-400'
      case 'side hustler': return 'text-yellow-400 border-yellow-400'
      case 'social butterfly': return 'text-pink-400 border-pink-400'
      case 'frugal champion': return 'text-retro-teal border-retro-teal'
      default: return 'text-retro-purple border-retro-purple'
    }
  }

  return (
    <div className="retro-panel p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5" />
        Badges ({badges.length})
      </h3>
      
      {badges.length === 0 ? (
        <div className="text-center py-8">
          <Award className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p className="text-sm text-gray-400">No badges earned yet</p>
          <p className="text-xs text-gray-500 mt-2">Make smart choices to earn badges!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 rounded border ${getBadgeColor(badge)} bg-black/30`}
            >
              {getBadgeIcon(badge)}
              <span className="text-sm font-medium">{badge}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Achievement Hints */}
      <div className="mt-6 pt-4 border-t border-retro-teal/20">
        <h4 className="text-sm font-bold mb-2">Next Badges to Earn:</h4>
        <div className="space-y-1 text-xs text-gray-400">
          {!badges.includes('Silver Tongue') && <p>• Silver Tongue - Master negotiation</p>}
          {!badges.includes('Smart Mover') && <p>• Smart Mover - Make smart housing choices</p>}
          {!badges.includes('Side Hustler') && <p>• Side Hustler - Find alternative income</p>}
          {!badges.includes('Social Butterfly') && <p>• Social Butterfly - Leverage relationships</p>}
          {!badges.includes('Frugal Champion') && <p>• Frugal Champion - Save $5,000</p>}
        </div>
      </div>
    </div>
  )
}