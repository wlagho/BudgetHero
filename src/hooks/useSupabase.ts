import { useState, useEffect } from 'react'
import { supabase, Progress } from '../lib/supabase'

export const useSupabase = () => {
  const [user, setUser] = useState<any>(null)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOfflineMode, setIsOfflineMode] = useState(false)

  useEffect(() => {
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
      console.log('Supabase not configured, running in offline mode')
      setIsOfflineMode(true)
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProgress(session.user.id)
      }
      setLoading(false)
    }).catch((error) => {
      console.error('Supabase error, switching to offline mode:', error)
      setIsOfflineMode(true)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          loadProgress(session.user.id)
        } else {
          setProgress(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const loadProgress = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading progress:', error)
        return
      }

      if (data) {
        setProgress(data)
      } else {
        // Create new progress record
        const newProgress = {
          user_id: userId,
          badges: [],
          money_saved: 1000, // Starting money
          current_scenario: 'rent_increase',
          scenario_state: {}
        }

        const { data: created, error: createError } = await supabase
          .from('progress')
          .insert([newProgress])
          .select()
          .single()

        if (createError) {
          console.error('Error creating progress:', createError)
        } else {
          setProgress(created)
        }
      }
    } catch (error) {
      console.error('Error in loadProgress:', error)
    }
  }

  const signInAnonymously = async () => {
    try {
      if (isOfflineMode) {
        // Create a mock user for offline mode
        const mockUser = {
          id: 'offline-user-' + Date.now(),
          email: 'offline@budgethero.game'
        }
        setUser(mockUser)
        
        // Create offline progress
        const offlineProgress = {
          user_id: mockUser.id,
          badges: [],
          money_saved: 1000,
          current_scenario: 'rent_increase',
          scenario_state: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        setProgress(offlineProgress)
        
        return { user: mockUser }
      }

      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      // Fallback to offline mode
      setIsOfflineMode(true)
      const mockUser = {
        id: 'offline-user-' + Date.now(),
        email: 'offline@budgethero.game'
      }
      setUser(mockUser)
      
      const offlineProgress = {
        user_id: mockUser.id,
        badges: [],
        money_saved: 1000,
        current_scenario: 'rent_increase',
        scenario_state: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setProgress(offlineProgress)
      
      return { user: mockUser }
    }
  }

  const updateProgress = async (updates: Partial<Progress>) => {
    if (!user || !progress) return

    try {
      if (isOfflineMode) {
        // Update local state in offline mode
        const updatedProgress = { ...progress, ...updates, updated_at: new Date().toISOString() }
        setProgress(updatedProgress)
        
        // Store in localStorage for persistence
        localStorage.setItem('budgethero-progress', JSON.stringify(updatedProgress))
        return updatedProgress
      }

      const { data, error } = await supabase
        .from('progress')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      setProgress(data)
      return data
    } catch (error) {
      console.error('Error updating progress:', error)
      // Fallback to local storage
      const updatedProgress = { ...progress, ...updates, updated_at: new Date().toISOString() }
      setProgress(updatedProgress)
      localStorage.setItem('budgethero-progress', JSON.stringify(updatedProgress))
      return updatedProgress
    }
  }

  const getLeaderboard = async () => {
    try {
      if (isOfflineMode) {
        return []
      }

      const { data, error } = await supabase
        .from('progress')
        .select('user_id, money_saved, badges')
        .order('money_saved', { ascending: false })
        .limit(10)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error getting leaderboard:', error)
      return []
    }
  }

  // Load offline progress on mount if in offline mode
  useEffect(() => {
    if (isOfflineMode && !progress) {
      const savedProgress = localStorage.getItem('budgethero-progress')
      if (savedProgress) {
        try {
          setProgress(JSON.parse(savedProgress))
        } catch (error) {
          console.error('Error loading offline progress:', error)
        }
      }
    }
  }, [isOfflineMode, progress])

  return {
    user,
    progress,
    loading,
    isOfflineMode,
    signInAnonymously,
    updateProgress,
    getLeaderboard
  }
}