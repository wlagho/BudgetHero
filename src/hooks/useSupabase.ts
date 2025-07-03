import { useState, useEffect } from 'react'
import { supabase, Progress } from '../lib/supabase'

export const useSupabase = () => {
  const [user, setUser] = useState<any>(null)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProgress(session.user.id)
      }
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
      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const updateProgress = async (updates: Partial<Progress>) => {
    if (!user || !progress) return

    try {
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
      throw error
    }
  }

  const getLeaderboard = async () => {
    try {
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

  return {
    user,
    progress,
    loading,
    signInAnonymously,
    updateProgress,
    getLeaderboard
  }
}