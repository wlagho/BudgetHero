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
          <Target className="w-5 h-5 text-blue-400" />
          <span className="text-slate-300 font-medium">{label}</span>
        </div>
        <span className="text-slate-400 text-sm">
          ${current.toLocaleString()} / ${max.toLocaleString()}
        </span>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-slate-500">
          {percentage.toFixed(1)}% complete
        </span>
        <span className="text-xs text-slate-500">
          ${(max - current).toLocaleString()} remaining
        </span>
      </div>
    </div>
  )
}