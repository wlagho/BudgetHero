import React from 'react'

interface ProgressBarProps {
  current: number
  max: number
  label: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, max, label }) => {
  const percentage = Math.min((current / max) * 100, 100)
  
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-retro-teal">{label}</span>
        <span className="text-sm text-retro-purple">
          ${current.toLocaleString()} / ${max.toLocaleString()}
        </span>
      </div>
      <div className="progress-bar h-4 rounded">
        <div 
          className="progress-fill h-full rounded transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-center mt-1 text-retro-teal">
        {percentage.toFixed(1)}% to goal
      </div>
    </div>
  )
}