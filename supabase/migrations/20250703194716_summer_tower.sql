/*
  # Create BudgetHero Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `last_scenario` (text, nullable)
      - `created_at` (timestamp with timezone, default now)
    - `progress`
      - `user_id` (uuid, primary key, references auth.users)
      - `badges` (text array, default empty array)
      - `money_saved` (integer, default 1000)
      - `current_scenario` (text, default 'rent_increase')
      - `scenario_state` (jsonb, default empty object)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    - Users can read, insert, and update their own records
    - Progress records can be read, inserted, updated, and deleted by owners

  3. Functions & Triggers
    - Auto-update `updated_at` timestamp on progress table changes
*/

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS progress CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table (extends auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  last_scenario TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress table
CREATE TABLE progress (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  badges TEXT[] DEFAULT '{}',
  money_saved INTEGER DEFAULT 1000,
  current_scenario TEXT DEFAULT 'rent_increase',
  scenario_state JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for progress table
CREATE POLICY "Users can read own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" ON progress
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_progress_updated_at 
    BEFORE UPDATE ON progress 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();