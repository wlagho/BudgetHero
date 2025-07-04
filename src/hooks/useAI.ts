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
      const outcome = generateKenyanFinancialOutcome(choice, context)
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

// Kenyan-specific financial outcome generation
const generateKenyanFinancialOutcome = (choice: string, context: any): AIOutcome => {
  const choiceLower = choice.toLowerCase()
  const currentMoney = context.currentMoney || 50000 // Starting with KSh 50,000
  const scenario = context.scenario?.toLowerCase() || ''
  
  // RENT INCREASE SCENARIOS (Kenyan Context)
  if (scenario.includes('rent') || choiceLower.includes('rent')) {
    if (choiceLower.includes('negotiate')) {
      // Negotiation in Kenyan rental market
      const negotiationSkill = Math.random()
      if (negotiationSkill > 0.6) {
        return {
          outcome: "Excellent negotiation! You showed the landlord similar properties in the area with lower rents. They agreed to increase by only KSh 5,000 instead of KSh 15,000, saving you KSh 10,000 monthly.",
          moneyChange: 10000,
          badgeEarned: "Silver Tongue",
          reasoning: "Good market research and negotiation skills work well in Kenya's rental market"
        }
      } else if (negotiationSkill > 0.3) {
        return {
          outcome: "Your negotiation was decent. The landlord reduced the increase to KSh 10,000 instead of KSh 15,000. You saved KSh 5,000 monthly through your effort.",
          moneyChange: 5000,
          reasoning: "Moderate negotiation success in Kenyan rental market"
        }
      } else {
        return {
          outcome: "Your negotiation wasn't well-prepared. The landlord stuck to the KSh 15,000 increase. Next time, research market rates first.",
          moneyChange: -15000,
          consequence: "Need to improve negotiation skills",
          reasoning: "Poor preparation leads to failed negotiations"
        }
      }
    }
    
    if (choiceLower.includes('move') || choiceLower.includes('apartment')) {
      const movingCosts = 75000 // Deposit + moving costs in Kenya
      const monthlySavings = Math.floor(Math.random() * 20000) + 5000 // KSh 5,000-25,000 savings
      
      if (currentMoney > movingCosts) {
        return {
          outcome: `Smart move! You found a place in Kasarani that's KSh ${monthlySavings.toLocaleString()} cheaper monthly. After paying KSh ${movingCosts.toLocaleString()} in deposits and moving costs, you'll break even in ${Math.ceil(movingCosts/monthlySavings)} months.`,
          moneyChange: -movingCosts + monthlySavings,
          badgeEarned: monthlySavings > 15000 ? "Smart Mover" : undefined,
          reasoning: "Moving to affordable areas like Kasarani can save money long-term"
        }
      } else {
        return {
          outcome: `You tried to move but didn't have enough for the deposit and moving costs. You had to stay and pay the increase. Build an emergency fund first.`,
          moneyChange: -15000,
          consequence: "Insufficient emergency fund",
          reasoning: "Moving in Kenya requires significant upfront capital"
        }
      }
    }
    
    if (choiceLower.includes('accept') || choiceLower.includes('tighten')) {
      return {
        outcome: "You accepted the rent increase and cut other expenses. You canceled DSTV, started using matatus instead of Uber, and cook at home more. Your overall spending actually improved!",
        moneyChange: -10000, // Less than full increase due to other savings
        badgeEarned: "Budget Master",
        reasoning: "Adapting to higher costs can lead to better financial habits"
      }
    }
    
    if (choiceLower.includes('roommate') || choiceLower.includes('share')) {
      const roommateQuality = Math.random()
      if (roommateQuality > 0.6) {
        return {
          outcome: "Great roommate find! They're a working professional who splits all costs 50/50. Your housing costs dropped significantly, and you gained a reliable housemate.",
          moneyChange: 20000,
          badgeEarned: "Social Butterfly",
          reasoning: "Good roommates significantly reduce living costs in Nairobi"
        }
      } else {
        return {
          outcome: "Your roommate seemed great initially but is unreliable with rent payments. You still save some money, but dealing with late payments is stressful.",
          moneyChange: 8000,
          consequence: "Unreliable roommate situation",
          reasoning: "Roommate screening is crucial in shared living arrangements"
        }
      }
    }
  }
  
  // MATATU/TRANSPORT SCENARIOS
  if (scenario.includes('transport') || scenario.includes('matatu') || choiceLower.includes('car')) {
    const repairCost = 75000 // KSh 75,000 for major car repair
    
    if (choiceLower.includes('repair') || choiceLower.includes('fix')) {
      if (currentMoney >= repairCost) {
        return {
          outcome: `You paid KSh ${repairCost.toLocaleString()} for repairs at a trusted garage in Industrial Area. Your car is reliable again and should serve you well for years. Much cheaper than buying another car.`,
          moneyChange: -repairCost,
          reasoning: "Repairing is often more economical than replacing in Kenya"
        }
      } else {
        return {
          outcome: "You don't have enough for the full repair. You took a loan from a digital lender at high interest, making this much more expensive than planned.",
          moneyChange: -repairCost - 15000, // High interest costs
          consequence: "High-interest digital loan acquired",
          reasoning: "Emergency fund needed for unexpected expenses"
        }
      }
    }
    
    if (choiceLower.includes('matatu') || choiceLower.includes('public')) {
      return {
        outcome: "You switched to using matatus and boda bodas. It takes longer but costs much less. You're saving KSh 10,000 monthly while figuring out your next move.",
        moneyChange: 10000, // Monthly savings
        badgeEarned: "Public Transport Pro",
        reasoning: "Matatus are a cost-effective transport solution in Kenya"
      }
    }
    
    if (choiceLower.includes('used') || choiceLower.includes('buy')) {
      const usedCarCost = Math.floor(Math.random() * 150000) + 100000 // KSh 100k-250k
      if (currentMoney >= usedCarCost) {
        return {
          outcome: `You bought a reliable used Toyota Vitz for KSh ${usedCarCost.toLocaleString()} from a dealer in Ngara. It's fuel-efficient and perfect for Nairobi traffic.`,
          moneyChange: -usedCarCost,
          badgeEarned: usedCarCost < 150000 ? "Bargain Hunter" : undefined,
          reasoning: "Used Japanese cars are reliable and affordable in Kenya"
        }
      } else {
        return {
          outcome: "You tried to buy a used car but could only afford an unreliable one. It broke down within a month, requiring more repairs.",
          moneyChange: -currentMoney * 0.8,
          consequence: "Bought unreliable vehicle",
          reasoning: "Insufficient funds lead to poor vehicle choices"
        }
      }
    }
    
    if (choiceLower.includes('carpool') || choiceLower.includes('colleagues')) {
      return {
        outcome: "You organized carpools with colleagues from your estate. Everyone saves on fuel and parking in town, plus you've built stronger workplace relationships!",
        moneyChange: 8000,
        badgeEarned: "Team Player",
        reasoning: "Carpooling is popular and effective in Nairobi"
      }
    }
  }
  
  // JOB PROMOTION SCENARIOS (Kenyan Context)
  if (scenario.includes('promotion') || scenario.includes('job')) {
    const salaryIncrease = Math.floor(currentMoney * 0.4) // 40% increase
    const relocationCosts = 150000 // Moving to another city
    const costOfLivingIncrease = Math.floor(salaryIncrease * 0.25) // 25% eaten by COL
    
    if (choiceLower.includes('accept') && choiceLower.includes('move')) {
      return {
        outcome: `You took the promotion and moved to Mombasa! After relocation costs of KSh ${relocationCosts.toLocaleString()} and slightly higher living costs, your net gain is KSh ${(salaryIncrease - costOfLivingIncrease).toLocaleString()} monthly. Great career move!`,
        moneyChange: salaryIncrease - costOfLivingIncrease - relocationCosts,
        badgeEarned: "Career Climber",
        reasoning: "Promotions usually pay off long-term despite initial costs"
      }
    }
    
    if (choiceLower.includes('negotiate') || choiceLower.includes('remote')) {
      const negotiationSuccess = Math.random() > 0.5
      if (negotiationSuccess) {
        return {
          outcome: `Excellent negotiation! Your company agreed to let you work remotely from Nairobi for the new role. You get the promotion and salary increase without relocation costs.`,
          moneyChange: salaryIncrease,
          badgeEarned: "Master Negotiator",
          reasoning: "Remote work is becoming more accepted in Kenyan companies"
        }
      } else {
        return {
          outcome: "Your company prefers in-person collaboration for this role. They offered a smaller raise to stay in your current position instead.",
          moneyChange: Math.floor(salaryIncrease * 0.3),
          reasoning: "Not all remote work requests are approved"
        }
      }
    }
  }
  
  // WINDFALL SCENARIOS (Kenyan Context)
  if (scenario.includes('windfall') || scenario.includes('bonus') || choiceLower.includes('250000')) {
    const windfall = 250000 // KSh 250,000 bonus
    
    if (choiceLower.includes('emergency') || choiceLower.includes('fund')) {
      return {
        outcome: `Smart choice! You built a KSh ${windfall.toLocaleString()} emergency fund in a money market fund. This gives you financial security for unexpected expenses.`,
        moneyChange: windfall,
        badgeEarned: "Emergency Fund Hero",
        reasoning: "Emergency funds are crucial for financial security in Kenya"
      }
    }
    
    if (choiceLower.includes('debt') || choiceLower.includes('pay off')) {
      const interestSaved = Math.floor(windfall * 0.25) // 25% annual interest saved
      return {
        outcome: `Excellent decision! You paid off high-interest loans from digital lenders. You'll save approximately KSh ${interestSaved.toLocaleString()} per year in interest payments.`,
        moneyChange: windfall + interestSaved,
        badgeEarned: "Debt Destroyer",
        reasoning: "Paying off high-interest debt provides guaranteed returns"
      }
    }
    
    if (choiceLower.includes('invest') || choiceLower.includes('sacco')) {
      const marketReturn = Math.random() > 0.3 ? 1 : -1
      const returnAmount = Math.floor(windfall * 0.12 * marketReturn) // 12% return
      return {
        outcome: `You invested in your SACCO and bought some Safaricom shares. ${marketReturn > 0 ? 'The investments performed well' : 'The market had a rough period'}, and your investment is now worth KSh ${(windfall + returnAmount).toLocaleString()}.`,
        moneyChange: windfall + returnAmount,
        badgeEarned: marketReturn > 0 ? "Smart Investor" : undefined,
        reasoning: "SACCOs and blue-chip stocks are popular investment options in Kenya"
      }
    }
  }
  
  // MEDICAL EMERGENCY SCENARIOS (Kenyan Context)
  if (scenario.includes('medical') || choiceLower.includes('hospital')) {
    const medicalCost = 150000 // KSh 150,000 medical bill
    
    if (choiceLower.includes('nhif') || choiceLower.includes('insurance')) {
      return {
        outcome: `Your NHIF covered most of the cost! You only paid KSh 30,000 out of pocket. This shows the importance of maintaining your NHIF contributions.`,
        moneyChange: -30000,
        badgeEarned: "Insurance Wise",
        reasoning: "NHIF provides valuable healthcare coverage in Kenya"
      }
    }
    
    if (choiceLower.includes('payment plan') || choiceLower.includes('hospital')) {
      return {
        outcome: `You negotiated a payment plan with the hospital. You'll pay KSh 15,000 monthly for 10 months. This protects your cash flow and credit.`,
        moneyChange: -15000,
        reasoning: "Many Kenyan hospitals offer flexible payment plans"
      }
    }
    
    if (choiceLower.includes('family') || choiceLower.includes('harambee')) {
      const familyHelp = Math.random() > 0.2 // 80% chance family can help
      if (familyHelp) {
        return {
          outcome: "Your family organized a harambee and raised most of the medical costs. The community support was overwhelming, and you only paid KSh 25,000.",
          moneyChange: -25000,
          badgeEarned: "Community Support",
          reasoning: "Harambees are a strong tradition of community support in Kenya"
        }
      } else {
        return {
          outcome: "Your family wants to help but is also facing financial challenges. You had to take the hospital payment plan instead.",
          moneyChange: -15000,
          reasoning: "Family support isn't always available"
        }
      }
    }
  }
  
  // DEFAULT FALLBACK
  return {
    outcome: "You made a thoughtful decision and learned something valuable about managing money in Kenya.",
    moneyChange: Math.floor(Math.random() * 5000) - 2500, // Small random change
    reasoning: "Default outcome for unrecognized scenarios"
  }
}