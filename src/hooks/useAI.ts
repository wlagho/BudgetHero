import { useState } from 'react'

export interface AIOutcome {
  outcome: string
  moneyChange: number
  badgeEarned?: string
  consequence?: string
  reasoning?: string
}

export const useAI = () => {
  const [loading, setLoading] = useState(false)

  const generateOutcome = async (choice: string, context: any = {}): Promise<AIOutcome> => {
    setLoading(true)
    
    try {
      // Simulate API delay for realism
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      // Generate logical outcome based on choice and context
      const outcome = generateLogicalOutcome(choice, context)
      return outcome
    } catch (error) {
      console.error('Error generating AI outcome:', error)
      return {
        outcome: "Something unexpected happened, but you learned from the experience.",
        moneyChange: 0,
        reasoning: "Error in outcome generation"
      }
    } finally {
      setLoading(false)
    }
  }

  return { generateOutcome, loading }
}

// Intelligent outcome generation based on financial logic
const generateLogicalOutcome = (choice: string, context: any): AIOutcome => {
  const choiceLower = choice.toLowerCase()
  const currentMoney = context.currentMoney || 1000
  const scenario = context.scenario?.toLowerCase() || ''
  
  // RENT INCREASE SCENARIOS
  if (scenario.includes('rent') || choiceLower.includes('rent')) {
    if (choiceLower.includes('negotiate')) {
      // Negotiation outcomes based on realistic scenarios
      const negotiationSkill = Math.random()
      if (negotiationSkill > 0.7) {
        return {
          outcome: "Excellent negotiation! You presented market research showing your rent was above average. The landlord agreed to only a $100 increase instead of $300, saving you $200/month.",
          moneyChange: 200,
          badgeEarned: "Silver Tongue",
          reasoning: "Good negotiation with evidence typically works"
        }
      } else if (negotiationSkill > 0.4) {
        return {
          outcome: "Your negotiation was decent. The landlord reduced the increase to $200/month instead of $300. You saved $100/month through your effort.",
          moneyChange: 100,
          reasoning: "Moderate negotiation success"
        }
      } else {
        return {
          outcome: "Your negotiation attempt wasn't well-prepared. The landlord stuck to the $300 increase, but appreciated your communication. No change in rent.",
          moneyChange: -300,
          consequence: "Need to improve negotiation skills",
          reasoning: "Poor negotiation preparation"
        }
      }
    }
    
    if (choiceLower.includes('move') || choiceLower.includes('apartment')) {
      // Moving costs vs. long-term savings
      const movingCosts = 1500 // Security deposit, moving truck, etc.
      const monthlySavings = Math.floor(Math.random() * 400) + 100 // $100-500 savings
      
      if (currentMoney > movingCosts) {
        return {
          outcome: `Smart move! You found a place that's $${monthlySavings} cheaper per month. After paying $${movingCosts} in moving costs, you'll break even in ${Math.ceil(movingCosts/monthlySavings)} months and save money long-term.`,
          moneyChange: -movingCosts + monthlySavings,
          badgeEarned: monthlySavings > 300 ? "Smart Mover" : undefined,
          reasoning: "Moving can be cost-effective if you have savings"
        }
      } else {
        return {
          outcome: `You tried to move but didn't have enough for deposits and moving costs. You had to stay and pay the increase. Consider building an emergency fund first.`,
          moneyChange: -300,
          consequence: "Insufficient emergency fund",
          reasoning: "Moving requires upfront capital"
        }
      }
    }
    
    if (choiceLower.includes('accept') || choiceLower.includes('tighten')) {
      return {
        outcome: "You accepted the rent increase and cut other expenses. You canceled subscriptions and started cooking more at home, which actually improved your overall financial habits.",
        moneyChange: -200, // Less than full increase due to other savings
        badgeEarned: "Budget Master",
        reasoning: "Accepting change while adapting can lead to better habits"
      }
    }
    
    if (choiceLower.includes('roommate') || choiceLower.includes('share')) {
      const roommateQuality = Math.random()
      if (roommateQuality > 0.6) {
        return {
          outcome: "Great roommate find! They're clean, responsible, and you split all costs 50/50. Your housing costs dropped significantly, and you gained a friend.",
          moneyChange: 400,
          badgeEarned: "Social Butterfly",
          reasoning: "Good roommates can significantly reduce costs"
        }
      } else {
        return {
          outcome: "Your roommate seemed great initially but turned out to be unreliable with payments. You still save some money, but it's stressful dealing with late payments.",
          moneyChange: 150,
          consequence: "Unreliable roommate situation",
          reasoning: "Roommate screening is crucial"
        }
      }
    }
  }
  
  // CAR REPAIR SCENARIOS
  if (scenario.includes('car') || choiceLower.includes('car') || choiceLower.includes('repair')) {
    const repairCost = 1500
    
    if (choiceLower.includes('repair') || choiceLower.includes('fix')) {
      if (currentMoney >= repairCost) {
        return {
          outcome: `You paid $${repairCost} for repairs. Your car is now reliable again and should last several more years. This was more cost-effective than buying a new car.`,
          moneyChange: -repairCost,
          reasoning: "Repairing is often cheaper than replacing"
        }
      } else {
        return {
          outcome: "You don't have enough money for the full repair. You had to take a high-interest loan, making this much more expensive than planned.",
          moneyChange: -repairCost - 300, // Interest costs
          consequence: "High-interest debt acquired",
          reasoning: "Emergency fund needed for unexpected expenses"
        }
      }
    }
    
    if (choiceLower.includes('public') || choiceLower.includes('transport')) {
      return {
        outcome: "You switched to public transportation temporarily. It takes longer but costs much less. You're saving money while figuring out your next move.",
        moneyChange: 200, // Monthly savings
        badgeEarned: "Eco Warrior",
        reasoning: "Public transport is cost-effective short-term solution"
      }
    }
    
    if (choiceLower.includes('used') || choiceLower.includes('buy')) {
      const usedCarCost = Math.floor(Math.random() * 3000) + 2000 // $2000-5000
      if (currentMoney >= usedCarCost) {
        return {
          outcome: `You bought a reliable used car for $${usedCarCost}. It's not fancy, but it gets you to work and is more cost-effective than the expensive repair.`,
          moneyChange: -usedCarCost,
          badgeEarned: usedCarCost < 3000 ? "Bargain Hunter" : undefined,
          reasoning: "Sometimes replacement is more economical than repair"
        }
      } else {
        return {
          outcome: "You tried to buy a used car but couldn't afford a reliable one. You ended up with a car that needs more repairs soon.",
          moneyChange: -currentMoney * 0.8,
          consequence: "Bought unreliable vehicle",
          reasoning: "Insufficient funds lead to poor purchasing decisions"
        }
      }
    }
    
    if (choiceLower.includes('carpool')) {
      return {
        outcome: "You organized carpools with coworkers. Everyone saves on gas and parking, and you've built stronger relationships at work. Win-win!",
        moneyChange: 150,
        badgeEarned: "Team Player",
        reasoning: "Collaborative solutions often work well"
      }
    }
  }
  
  // JOB PROMOTION SCENARIOS
  if (scenario.includes('promotion') || scenario.includes('job')) {
    const salaryIncrease = Math.floor(currentMoney * 0.4) // 40% increase
    const movingCosts = 3000
    const costOfLivingIncrease = Math.floor(salaryIncrease * 0.3) // 30% of raise eaten by COL
    
    if (choiceLower.includes('accept') && choiceLower.includes('move')) {
      return {
        outcome: `You took the promotion! After moving costs of $${movingCosts} and higher living expenses, your net gain is $${salaryIncrease - costOfLivingIncrease} monthly. Great career move!`,
        moneyChange: salaryIncrease - costOfLivingIncrease - movingCosts,
        badgeEarned: "Career Climber",
        reasoning: "Promotions usually pay off long-term despite initial costs"
      }
    }
    
    if (choiceLower.includes('negotiate') || choiceLower.includes('remote')) {
      const negotiationSuccess = Math.random() > 0.4
      if (negotiationSuccess) {
        return {
          outcome: `Excellent negotiation! Your company agreed to let you work remotely for the new role. You get the promotion and salary increase without moving costs.`,
          moneyChange: salaryIncrease,
          badgeEarned: "Master Negotiator",
          reasoning: "Remote work negotiations are increasingly successful"
        }
      } else {
        return {
          outcome: "Your company values in-person collaboration for this role. They offered a smaller raise to stay in your current position instead.",
          moneyChange: Math.floor(salaryIncrease * 0.3),
          reasoning: "Not all remote work requests are approved"
        }
      }
    }
    
    if (choiceLower.includes('decline') || choiceLower.includes('stay')) {
      return {
        outcome: "You declined the promotion to maintain work-life balance. Your company respected your decision and gave you a small raise for your loyalty.",
        moneyChange: Math.floor(salaryIncrease * 0.15),
        badgeEarned: "Work-Life Balance Champion",
        reasoning: "Sometimes stability is worth more than money"
      }
    }
  }
  
  // WINDFALL SCENARIOS
  if (scenario.includes('windfall') || scenario.includes('refund') || choiceLower.includes('5000')) {
    const windfall = 5000
    
    if (choiceLower.includes('emergency') || choiceLower.includes('fund')) {
      return {
        outcome: `Smart choice! You built a $${windfall} emergency fund. This gives you financial security and peace of mind for future unexpected expenses.`,
        moneyChange: windfall,
        badgeEarned: "Emergency Fund Hero",
        reasoning: "Emergency funds are the foundation of financial security"
      }
    }
    
    if (choiceLower.includes('debt') || choiceLower.includes('pay off')) {
      const interestSaved = Math.floor(windfall * 0.2) // 20% annual interest saved
      return {
        outcome: `Excellent decision! You paid off high-interest debt. You'll save approximately $${interestSaved} per year in interest payments going forward.`,
        moneyChange: windfall + interestSaved,
        badgeEarned: "Debt Destroyer",
        reasoning: "Paying off high-interest debt provides guaranteed returns"
      }
    }
    
    if (choiceLower.includes('invest') || choiceLower.includes('index')) {
      const marketReturn = Math.random() > 0.3 ? 1 : -1 // 70% chance of positive return
      const returnAmount = Math.floor(windfall * 0.1 * marketReturn) // 10% return (positive or negative)
      return {
        outcome: `You invested in index funds. ${marketReturn > 0 ? 'The market performed well' : 'The market had a rough period'}, and your investment is now worth $${windfall + returnAmount}.`,
        moneyChange: windfall + returnAmount,
        badgeEarned: marketReturn > 0 ? "Smart Investor" : undefined,
        reasoning: "Investing has risks but potential for growth"
      }
    }
    
    if (choiceLower.includes('split')) {
      const emergencyPortion = Math.floor(windfall * 0.5)
      const debtPortion = Math.floor(windfall * 0.3)
      const funPortion = Math.floor(windfall * 0.2)
      return {
        outcome: `Balanced approach! You put $${emergencyPortion} in emergency savings, $${debtPortion} toward debt, and $${funPortion} for enjoyment. This covers all your financial bases.`,
        moneyChange: windfall,
        badgeEarned: "Balanced Planner",
        reasoning: "Diversifying windfall use is often wise"
      }
    }
  }
  
  // MEDICAL EMERGENCY SCENARIOS
  if (scenario.includes('medical') || choiceLower.includes('medical') || choiceLower.includes('procedure')) {
    const medicalCost = 3000
    
    if (choiceLower.includes('payment plan') || choiceLower.includes('hospital')) {
      return {
        outcome: `You set up a 0% interest payment plan with the hospital. You'll pay $250/month for 12 months. This protects your credit and cash flow.`,
        moneyChange: -250,
        reasoning: "Hospital payment plans are often interest-free"
      }
    }
    
    if (choiceLower.includes('personal loan')) {
      const loanInterest = Math.floor(medicalCost * 0.15) // 15% interest
      return {
        outcome: `You took a personal loan at 15% interest. The total cost will be $${medicalCost + loanInterest}, but you got the treatment immediately.`,
        moneyChange: -medicalCost - loanInterest,
        consequence: "High-interest debt acquired",
        reasoning: "Personal loans for medical expenses are expensive"
      }
    }
    
    if (choiceLower.includes('family') || choiceLower.includes('ask')) {
      const familyHelp = Math.random() > 0.3 // 70% chance family can help
      if (familyHelp) {
        return {
          outcome: "Your family was able to help with the medical costs. You're grateful for their support and plan to pay them back gradually.",
          moneyChange: -500, // Partial payment to family
          badgeEarned: "Family Support",
          reasoning: "Family support can be invaluable in emergencies"
        }
      } else {
        return {
          outcome: "Your family wants to help but is also facing financial challenges. You had to find another solution and took the hospital payment plan.",
          moneyChange: -250,
          reasoning: "Family support isn't always available"
        }
      }
    }
    
    if (choiceLower.includes('delay')) {
      return {
        outcome: "You delayed the procedure to save money, but your condition worsened. You ended up needing emergency treatment that cost even more.",
        moneyChange: -medicalCost - 1000,
        consequence: "Health deteriorated from delay",
        reasoning: "Delaying necessary medical care often costs more"
      }
    }
  }
  
  // DEFAULT FALLBACK - Should rarely be reached
  return {
    outcome: "You made a thoughtful decision and learned something valuable about personal finance in the process.",
    moneyChange: Math.floor(Math.random() * 100) - 50, // Small random change
    reasoning: "Default outcome for unrecognized scenarios"
  }
}