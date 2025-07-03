import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface User {
  id: string
  last_scenario?: string
  created_at: string
}

export interface Progress {
  user_id: string
  badges: string[]
  money_saved: number
  current_scenario: string
  scenario_state: any
  created_at: string
  updated_at: string
}

export interface Leaderboard {
  user_id: string
  money_saved: number
  badges: string[]
  rank: number
}