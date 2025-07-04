import React from 'react'
import { Target } from 'lucide-react'

interface ProgressBarProps {
  current: number
  max: number
  label: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label }) => {
  const percentage = Math.min((current / max) * 100, 100)
  
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-retro-teal" />
          <span className="text-retro-teal font-pixel text-xs">{label}</span>
        </div>
        <span className="text-retro-light-gray text-xs font-pixel">
          KSh {current.toLocaleString()} / KSh {max.toLocaleString()}
        </span>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-retro-light-gray font-pixel">
          {percentage.toFixed(1)}% COMPLETE
        </span>
        <span className="text-xs text-retro-light-gray font-pixel">
          KSh {(max - current).toLocaleString()} REMAINING
        </span>
      </div>
    </div>
  )
}