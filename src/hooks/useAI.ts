import { useState } from 'react'

export interface AIOutcome {
  outcome: string
  moneyChange: number
  badgeEarned?: string
  consequence?: string
}

export const useAI = () => {
  const [loading, setLoading] = useState(false)

  const generateOutcome = async (choice: string, context: any = {}): Promise<AIOutcome> => {
    setLoading(true)
    
    try {
      // TODO: Replace with actual AI API call
      // For now, we'll simulate with predefined outcomes
      const outcomes = getSimulatedOutcomes(choice, context)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)]
      return randomOutcome
    } catch (error) {
      console.error('Error generating AI outcome:', error)
      return {
        outcome: "The universe is unpredictable! Your choice had unexpected results.",
        moneyChange: Math.floor(Math.random() * 200) - 100
      }
    } finally {
      setLoading(false)
    }
  }

  return { generateOutcome, loading }
}

// Simulated AI outcomes - replace with actual AI integration
const getSimulatedOutcomes = (choice: string, context: any): AIOutcome[] => {
  const choiceLower = choice.toLowerCase()
  
  if (choiceLower.includes('negotiate') || choiceLower.includes('talk')) {
    return [
      {
        outcome: "Your negotiation skills impressed the landlord! They agreed to a smaller increase.",
        moneyChange: 150,
        badgeEarned: "Silver Tongue"
      },
      {
        outcome: "The landlord wasn't impressed, but you tried! They reduced the increase slightly.",
        moneyChange: 50
      },
      {
        outcome: "Your negotiation backfired! The landlord is now considering additional fees.",
        moneyChange: -100,
        consequence: "Landlord is now suspicious of you"
      }
    ]
  }
  
  if (choiceLower.includes('move') || choiceLower.includes('find')) {
    return [
      {
        outcome: "You found an amazing apartment for less money! Moving was the right choice.",
        moneyChange: 300,
        badgeEarned: "Smart Mover"
      },
      {
        outcome: "Moving was expensive, but you found a cheaper place. It'll pay off long-term!",
        moneyChange: -200
      },
      {
        outcome: "The moving costs were higher than expected, and the new place has issues!",
        moneyChange: -500,
        consequence: "New apartment has problems"
      }
    ]
  }
  
  if (choiceLower.includes('accept') || choiceLower.includes('pay')) {
    return [
      {
        outcome: "You accepted the increase without question. Your landlord thinks you're wealthy now!",
        moneyChange: -300,
        consequence: "Landlord may increase rent again soon"
      },
      {
        outcome: "You paid the increase but started a side hustle to cover it. Entrepreneurial spirit!",
        moneyChange: -200,
        badgeEarned: "Side Hustler"
      }
    ]
  }
  
  if (choiceLower.includes('roommate') || choiceLower.includes('share')) {
    return [
      {
        outcome: "Your roommate is amazing! They cook, clean, and split everything fairly.",
        moneyChange: 400,
        badgeEarned: "Social Butterfly"
      },
      {
        outcome: "Your roommate is... quirky. They eat your food but pay rent on time.",
        moneyChange: 200,
        consequence: "Roommate steals snacks"
      },
      {
        outcome: "Your roommate turned out to be a nightmare! They're loud and messy.",
        moneyChange: 100,
        consequence: "Annoying roommate"
      }
    ]
  }
  
  // Default outcomes for any choice
  return [
    {
      outcome: "Life is unpredictable! Your choice led to unexpected results.",
      moneyChange: Math.floor(Math.random() * 200) - 100
    },
    {
      outcome: "Sometimes the best choice is just to adapt and learn!",
      moneyChange: Math.floor(Math.random() * 150) - 50
    }
  ]
}