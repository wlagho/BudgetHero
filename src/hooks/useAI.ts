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

// Enhanced Kenyan-specific financial outcome generation with premium features
const generateKenyanFinancialOutcome = (choice: string, context: any): AIOutcome => {
  const choiceLower = choice.toLowerCase()
  const currentMoney = context.currentMoney || 50000 // Starting with KSh 50,000
  const scenario = context.scenario?.toLowerCase() || ''
  const isPremium = context.isPremium || false
  
  // Premium users get more detailed and varied outcomes
  const outcomeVariety = isPremium ? 5 : 3
  const randomFactor = Math.random()
  
  // RENT INCREASE SCENARIOS (Enhanced for Kenyan Context)
  if (scenario.includes('rent') || choiceLower.includes('rent')) {
    if (choiceLower.includes('negotiate')) {
      const negotiationSkill = Math.random()
      const marketKnowledge = isPremium ? Math.random() * 0.3 + 0.3 : Math.random() * 0.2 + 0.2 // Premium users have better market insights
      
      if (negotiationSkill > 0.7 && marketKnowledge > 0.5) {
        return {
          outcome: `Outstanding negotiation! You presented comprehensive market research showing similar 2-bedroom apartments in Kilimani averaging KSh 55,000. Your landlord was impressed by your preparation and agreed to only KSh 5,000 increase instead of KSh 15,000. You also negotiated a 2-year lease lock-in.`,
          moneyChange: 15000, // Monthly savings
          badgeEarned: "Master Negotiator",
          reasoning: "Excellent preparation and market research lead to superior outcomes"
        }
      } else if (negotiationSkill > 0.5) {
        return {
          outcome: `Good negotiation! You showed the landlord some competing properties and managed to reduce the increase to KSh 10,000 instead of KSh 15,000. Your research paid off, saving you KSh 5,000 monthly.`,
          moneyChange: 8000,
          badgeEarned: randomFactor > 0.7 ? "Silver Tongue" : undefined,
          reasoning: "Moderate preparation leads to partial success"
        }
      } else {
        return {
          outcome: `Your negotiation attempt wasn't well-prepared. The landlord mentioned that you didn't bring market comparisons and stuck to the full KSh 15,000 increase. Next time, research similar properties first.`,
          moneyChange: -15000,
          consequence: "Need to improve negotiation preparation",
          reasoning: "Poor preparation leads to failed negotiations"
        }
      }
    }
    
    if (choiceLower.includes('move') || choiceLower.includes('apartment')) {
      const movingCosts = isPremium ? 
        Math.floor(Math.random() * 30000) + 60000 : // Premium users get better moving cost estimates
        Math.floor(Math.random() * 40000) + 70000
      const monthlySavings = Math.floor(Math.random() * 25000) + 10000 // KSh 10,000-35,000 savings
      
      if (currentMoney > movingCosts) {
        const location = randomFactor > 0.6 ? "Kasarani" : randomFactor > 0.3 ? "Kahawa West" : "Githurai"
        const commuteCost = location === "Kasarani" ? 4000 : location === "Kahawa West" ? 5000 : 6000
        
        return {
          outcome: `Smart move! You found a great 2-bedroom in ${location} for KSh ${monthlySavings.toLocaleString()} less monthly. After paying KSh ${movingCosts.toLocaleString()} in deposits and moving costs, plus KSh ${commuteCost.toLocaleString()} monthly commute costs, you'll still save significantly.`,
          moneyChange: -movingCosts + monthlySavings - commuteCost,
          badgeEarned: monthlySavings > 20000 ? "Smart Mover" : undefined,
          reasoning: `Moving to ${location} provides good value despite commute costs`
        }
      } else {
        return {
          outcome: `You tried to move but didn't have enough for the deposit (typically 2-3 months rent) and moving costs. You had to stay and pay the increase. Build an emergency fund of at least KSh 100,000 first.`,
          moneyChange: -15000,
          consequence: "Insufficient emergency fund for major moves",
          reasoning: "Moving in Kenya requires significant upfront capital"
        }
      }
    }
    
    if (choiceLower.includes('accept') || choiceLower.includes('tighten')) {
      const budgetingSkill = isPremium ? Math.random() * 0.4 + 0.4 : Math.random() * 0.3 + 0.3
      
      if (budgetingSkill > 0.6) {
        return {
          outcome: "You accepted the rent increase but became a budgeting master! You canceled DSTV (KSh 3,000), switched from Uber to matatus (KSh 8,000 savings), started cooking at home (KSh 12,000 savings), and negotiated better rates with your internet provider. Your overall spending actually improved!",
          moneyChange: -8000, // Net improvement due to other savings
          badgeEarned: "Budget Master",
          reasoning: "Forced budgeting can lead to better financial habits"
        }
      } else {
        return {
          outcome: "You accepted the rent increase and tried to cut expenses, but struggled to find significant savings. You reduced entertainment spending slightly but the full increase still impacts your budget.",
          moneyChange: -13000,
          reasoning: "Without systematic budgeting, expense reduction is limited"
        }
      }
    }
    
    if (choiceLower.includes('roommate') || choiceLower.includes('share')) {
      const roommateQuality = Math.random()
      const screeningSkill = isPremium ? 0.3 : 0.1 // Premium users get better screening advice
      
      if (roommateQuality > (0.6 - screeningSkill)) {
        return {
          outcome: "Excellent roommate find! You found a working professional from your network who splits all costs 50/50, keeps common areas clean, and even cooks amazing pilau on weekends. Your housing costs dropped by KSh 30,000 monthly!",
          moneyChange: 25000,
          badgeEarned: "Social Butterfly",
          reasoning: "Good screening and networking lead to quality roommates"
        }
      } else if (roommateQuality > (0.3 - screeningSkill)) {
        return {
          outcome: "Your roommate is decent but has some quirks. They pay rent on time and split utilities, but they eat your food occasionally and play music late. You still save money overall.",
          moneyChange: 18000,
          consequence: "Minor roommate conflicts to manage",
          reasoning: "Average roommate screening leads to mixed results"
        }
      } else {
        return {
          outcome: "Your roommate seemed great initially but turned out to be unreliable. They're often late with rent, leave messes, and bring friends over frequently. You save some money but the stress isn't worth it.",
          moneyChange: 8000,
          consequence: "Stressful living situation with unreliable roommate",
          reasoning: "Poor roommate screening creates ongoing problems"
        }
      }
    }
  }
  
  // TRANSPORT SCENARIOS (Enhanced)
  if (scenario.includes('transport') || scenario.includes('car') || choiceLower.includes('car')) {
    const repairCost = 75000 // KSh 75,000 for major car repair
    const carAge = Math.floor(Math.random() * 10) + 5 // 5-15 year old car
    
    if (choiceLower.includes('repair') || choiceLower.includes('fix')) {
      if (currentMoney >= repairCost) {
        const mechanicQuality = isPremium ? Math.random() * 0.3 + 0.6 : Math.random() * 0.4 + 0.4
        
        if (mechanicQuality > 0.8) {
          return {
            outcome: `You chose a reputable garage in Industrial Area recommended by your mechanic friend. They fixed the engine properly and gave you a 6-month warranty. Your ${carAge}-year-old Vitz should serve you well for another 3-4 years. Much cheaper than buying another car!`,
            moneyChange: -repairCost,
            badgeEarned: "Maintenance Master",
            reasoning: "Quality repairs extend vehicle life significantly"
          }
        } else {
          return {
            outcome: `You paid KSh ${repairCost.toLocaleString()} for repairs, but the garage did a mediocre job. The car works but you suspect you'll need more repairs soon. Next time, research mechanics more carefully.`,
            moneyChange: -repairCost,
            consequence: "May need additional repairs soon",
            reasoning: "Cheap repairs often lead to recurring problems"
          }
        }
      } else {
        return {
          outcome: "You don't have enough for the full repair. You took a digital loan at 20% monthly interest, making this repair cost KSh 90,000 total. The high interest makes this much more expensive than planned.",
          moneyChange: -repairCost - 15000, // High interest costs
          consequence: "High-interest digital loan acquired",
          reasoning: "Emergency fund needed for unexpected expenses"
        }
      }
    }
    
    if (choiceLower.includes('matatu') || choiceLower.includes('public')) {
      const routeEfficiency = Math.random()
      const monthlyMatatu = routeEfficiency > 0.6 ? 8000 : routeEfficiency > 0.3 ? 10000 : 12000
      
      return {
        outcome: `You switched to matatus and boda bodas for your daily commute. ${routeEfficiency > 0.6 ? 'You found an efficient route' : 'The route takes longer but'} you're saving KSh ${(15000 - monthlyMatatu).toLocaleString()} monthly compared to car costs. You're also getting more exercise walking to stages!`,
        moneyChange: 15000 - monthlyMatatu,
        badgeEarned: monthlyMatatu < 9000 ? "Public Transport Pro" : undefined,
        reasoning: "Matatus are cost-effective but require route optimization"
      }
    }
    
    if (choiceLower.includes('used') || choiceLower.includes('buy')) {
      const usedCarCost = Math.floor(Math.random() * 200000) + 150000 // KSh 150k-350k
      const carCondition = Math.random()
      
      if (currentMoney >= usedCarCost) {
        if (carCondition > 0.7) {
          return {
            outcome: `You found an excellent 2010 Toyota Vitz at Ngara for KSh ${usedCarCost.toLocaleString()}. The dealer provided service history, and your mechanic friend confirmed it's in great condition. Fuel-efficient and perfect for Nairobi traffic!`,
            moneyChange: -usedCarCost,
            badgeEarned: usedCarCost < 200000 ? "Bargain Hunter" : undefined,
            reasoning: "Good inspection and dealer reputation ensure quality purchases"
          }
        } else {
          return {
            outcome: `You bought a used car for KSh ${usedCarCost.toLocaleString()} but didn't inspect it thoroughly. It broke down within a month, requiring KSh 40,000 in additional repairs. Always bring a mechanic when buying used cars!`,
            moneyChange: -usedCarCost - 40000,
            consequence: "Bought unreliable vehicle without proper inspection",
            reasoning: "Insufficient inspection leads to poor vehicle choices"
          }
        }
      } else {
        return {
          outcome: "You tried to buy a used car but could only afford an unreliable one from a roadside dealer. It broke down within two weeks, requiring expensive repairs.",
          moneyChange: -currentMoney * 0.8,
          consequence: "Bought unreliable vehicle due to budget constraints",
          reasoning: "Insufficient funds lead to poor vehicle choices"
        }
      }
    }
    
    if (choiceLower.includes('carpool') || choiceLower.includes('colleagues')) {
      const organizationSkill = isPremium ? Math.random() * 0.3 + 0.5 : Math.random() * 0.4 + 0.3
      
      if (organizationSkill > 0.7) {
        return {
          outcome: "You organized an excellent carpool system with 4 colleagues from your estate. Everyone saves on fuel and parking, you've built stronger workplace relationships, and you even started a WhatsApp group for other estate residents!",
          moneyChange: 12000,
          badgeEarned: "Community Builder",
          reasoning: "Good organization creates lasting social and financial benefits"
        }
      } else {
        return {
          outcome: "You set up carpools with colleagues, but coordination is challenging. Some people are often late, and scheduling conflicts arise. You save money but it requires constant management.",
          moneyChange: 6000,
          consequence: "Carpool coordination challenges",
          reasoning: "Carpooling requires ongoing organization and commitment"
        }
      }
    }
  }
  
  // JOB PROMOTION SCENARIOS (Enhanced)
  if (scenario.includes('promotion') || scenario.includes('job')) {
    const currentSalary = Math.floor(currentMoney * 0.6) // Estimate monthly salary
    const salaryIncrease = Math.floor(currentSalary * 0.4) // 40% increase
    const relocationCosts = 180000 // Moving to another city
    const coastalCostIncrease = Math.floor(salaryIncrease * 0.15) // 15% higher living costs
    
    if (choiceLower.includes('accept') && choiceLower.includes('move')) {
      const adaptationSkill = Math.random()
      
      if (adaptationSkill > 0.6) {
        return {
          outcome: `You took the promotion and moved to Mombasa! The coastal lifestyle is amazing, and you've adapted well. After relocation costs of KSh ${relocationCosts.toLocaleString()} and slightly higher living costs, your net gain is KSh ${(salaryIncrease - coastalCostIncrease).toLocaleString()} monthly. Great career move!`,
          moneyChange: salaryIncrease - coastalCostIncrease - relocationCosts,
          badgeEarned: "Career Climber",
          reasoning: "Successful adaptation to new city maximizes promotion benefits"
        }
      } else {
        return {
          outcome: `You moved to Mombasa for the promotion but struggled with the adjustment. Higher costs, missing family, and coastal humidity affected your performance. The financial gain is there but personal costs are high.`,
          moneyChange: salaryIncrease - coastalCostIncrease - relocationCosts - 20000,
          consequence: "Struggling with relocation adjustment",
          reasoning: "Personal adaptation challenges can offset financial gains"
        }
      }
    }
    
    if (choiceLower.includes('negotiate') || choiceLower.includes('remote')) {
      const negotiationSuccess = isPremium ? Math.random() > 0.3 : Math.random() > 0.5 // Premium users get better negotiation insights
      
      if (negotiationSuccess) {
        return {
          outcome: `Excellent negotiation! You presented a compelling case about remote work productivity and your company agreed. You get the promotion, salary increase, and can stay in Nairobi. You even negotiated quarterly trips to Mombasa for team meetings.`,
          moneyChange: salaryIncrease,
          badgeEarned: "Master Negotiator",
          reasoning: "Strong negotiation skills enable win-win solutions"
        }
      } else {
        return {
          outcome: "Your company values in-person collaboration for this senior role. They offered a smaller raise to stay in your current position, but you missed the bigger opportunity.",
          moneyChange: Math.floor(salaryIncrease * 0.25),
          consequence: "Missed major career advancement opportunity",
          reasoning: "Not all remote work requests are approved"
        }
      }
    }
  }
  
  // WINDFALL SCENARIOS (Enhanced)
  if (scenario.includes('windfall') || scenario.includes('bonus') || choiceLower.includes('250000')) {
    const windfall = 250000 // KSh 250,000 bonus
    
    if (choiceLower.includes('emergency') || choiceLower.includes('fund')) {
      const investmentChoice = isPremium ? Math.random() > 0.3 : Math.random() > 0.6 // Premium users get better investment advice
      
      if (investmentChoice) {
        return {
          outcome: `Smart choice! You put KSh ${windfall.toLocaleString()} in a money market fund earning 8% annually. This emergency fund gives you financial security and will grow to KSh 270,000 in a year while remaining accessible.`,
          moneyChange: windfall,
          badgeEarned: "Emergency Fund Hero",
          reasoning: "Money market funds provide security with growth for emergency funds"
        }
      } else {
        return {
          outcome: `You built an emergency fund by putting the money in a savings account. While safe, you're only earning 2% interest. Consider money market funds for better returns while maintaining liquidity.`,
          moneyChange: windfall,
          reasoning: "Savings accounts are safe but offer minimal returns"
        }
      }
    }
    
    if (choiceLower.includes('debt') || choiceLower.includes('pay off')) {
      const debtAmount = Math.floor(windfall * 0.8) // Assume they have some debt
      const interestRate = 0.25 // 25% annual interest on digital loans
      const interestSaved = Math.floor(debtAmount * interestRate)
      
      return {
        outcome: `Excellent decision! You paid off KSh ${debtAmount.toLocaleString()} in high-interest digital loans. You'll save approximately KSh ${interestSaved.toLocaleString()} per year in interest payments. Your CRB score will also improve, giving you access to better loan terms in the future.`,
        moneyChange: windfall + interestSaved,
        badgeEarned: "Debt Destroyer",
        reasoning: "Paying off high-interest debt provides guaranteed returns and improves credit"
      }
    }
    
    if (choiceLower.includes('invest') || choiceLower.includes('sacco')) {
      const marketConditions = Math.random()
      const diversification = isPremium ? Math.random() > 0.3 : Math.random() > 0.6 // Premium users get better diversification advice
      
      if (diversification && marketConditions > 0.4) {
        const saccoReturn = Math.floor(windfall * 0.12) // 12% SACCO return
        const stockReturn = Math.floor((windfall * 0.5) * 0.08) // 8% stock return on half the amount
        
        return {
          outcome: `Smart diversification! You invested KSh 150,000 in your SACCO (earning 12% annually) and KSh 100,000 in Safaricom shares. The SACCO provides steady returns while stocks offer growth potential. Your portfolio is now worth KSh ${(windfall + saccoReturn + stockReturn).toLocaleString()}.`,
          moneyChange: windfall + saccoReturn + stockReturn,
          badgeEarned: "Smart Investor",
          reasoning: "Diversified investing reduces risk while maximizing returns"
        }
      } else if (marketConditions > 0.3) {
        const return_amount = Math.floor(windfall * 0.10)
        return {
          outcome: `You invested everything in your SACCO, which performed well with 10% returns. Your investment is now worth KSh ${(windfall + return_amount).toLocaleString()}. Consider diversifying next time for better risk management.`,
          moneyChange: windfall + return_amount,
          reasoning: "Single investment reduces diversification but can still provide good returns"
        }
      } else {
        return {
          outcome: `The market had a rough period after your investment. Your SACCO maintained value but Safaricom shares dropped 15%. Your investment is now worth KSh ${(windfall - 25000).toLocaleString()}. Markets recover over time, so hold steady.`,
          moneyChange: windfall - 25000,
          consequence: "Short-term market volatility affecting investments",
          reasoning: "Market investments carry risk but typically recover over time"
        }
      }
    }
  }
  
  // MEDICAL EMERGENCY SCENARIOS (Enhanced)
  if (scenario.includes('medical') || choiceLower.includes('hospital')) {
    const medicalCost = 150000 // KSh 150,000 medical bill
    const nhifCoverage = isPremium ? 0.85 : 0.75 // Premium users get better NHIF guidance
    
    if (choiceLower.includes('nhif') || choiceLower.includes('insurance')) {
      const nhifStatus = Math.random() > 0.2 // 80% chance NHIF is current
      
      if (nhifStatus) {
        const outOfPocket = Math.floor(medicalCost * (1 - nhifCoverage))
        return {
          outcome: `Your NHIF covered ${(nhifCoverage * 100).toFixed(0)}% of the cost! You only paid KSh ${outOfPocket.toLocaleString()} out of pocket. This shows the importance of maintaining your NHIF contributions. Your health is recovering well.`,
          moneyChange: -outOfPocket,
          badgeEarned: "Insurance Wise",
          reasoning: "Current NHIF contributions provide valuable healthcare coverage"
        }
      } else {
        return {
          outcome: `Your NHIF had lapsed due to missed contributions. You had to pay the full KSh ${medicalCost.toLocaleString()}. Always keep NHIF current - it's one of the best insurance values in Kenya.`,
          moneyChange: -medicalCost,
          consequence: "Lapsed NHIF coverage led to full payment",
          reasoning: "Maintaining NHIF contributions is crucial for healthcare coverage"
        }
      }
    }
    
    if (choiceLower.includes('payment plan') || choiceLower.includes('hospital')) {
      const hospitalFlexibility = Math.random()
      
      if (hospitalFlexibility > 0.6) {
        return {
          outcome: `The hospital offered an excellent payment plan: KSh 15,000 monthly for 10 months with no interest. This protects your cash flow and credit score. Many Kenyan hospitals are flexible with payment arrangements.`,
          moneyChange: -15000,
          reasoning: "Many Kenyan hospitals offer flexible, interest-free payment plans"
        }
      } else {
        return {
          outcome: `The hospital offered a payment plan but with 5% monthly interest. You'll pay KSh 20,000 monthly for 9 months, totaling KSh 180,000. Better than a digital loan but still expensive.`,
          moneyChange: -20000,
          consequence: "Hospital payment plan includes interest charges",
          reasoning: "Not all hospital payment plans are interest-free"
        }
      }
    }
    
    if (choiceLower.includes('family') || choiceLower.includes('harambee')) {
      const familySupport = Math.random() > 0.15 // 85% chance family can help
      const communityStrength = isPremium ? 0.3 : 0.2 // Premium users get better community organizing advice
      
      if (familySupport && Math.random() > (0.5 - communityStrength)) {
        return {
          outcome: "Your family and community organized an amazing harambee! Extended family, church members, and colleagues contributed generously. The community raised KSh 125,000, and you only paid KSh 25,000. The support was overwhelming and strengthened family bonds.",
          moneyChange: -25000,
          badgeEarned: "Community Champion",
          reasoning: "Strong community networks provide powerful financial support"
        }
      } else if (familySupport) {
        return {
          outcome: "Your family wants to help but is also facing financial challenges. They managed to raise KSh 50,000 through a small harambee, reducing your burden significantly.",
          moneyChange: -100000,
          reasoning: "Family support helps but may be limited by their own financial situations"
        }
      } else {
        return {
          outcome: "Unfortunately, your family is also struggling financially and couldn't organize significant support. You had to take the hospital payment plan instead.",
          moneyChange: -15000,
          consequence: "Limited family financial support available",
          reasoning: "Family support isn't always available during financial crises"
        }
      }
    }
  }
  
  // DEFAULT FALLBACK (Enhanced)
  const randomOutcomes = [
    {
      outcome: "You made a thoughtful decision and learned something valuable about managing money in Kenya. Your financial awareness is growing!",
      moneyChange: Math.floor(Math.random() * 3000) + 1000,
      reasoning: "Learning and awareness have financial value"
    },
    {
      outcome: "Your choice showed good financial instincts. You're developing the skills needed to build wealth in Kenya's economy.",
      moneyChange: Math.floor(Math.random() * 2000),
      reasoning: "Good financial instincts lead to positive outcomes"
    },
    {
      outcome: "This decision taught you about the importance of emergency funds and planning ahead in Kenya's economic environment.",
      moneyChange: Math.floor(Math.random() * 1000) - 500,
      reasoning: "Learning experiences have varying immediate financial impact"
    }
  ]
  
  return randomOutcomes[Math.floor(Math.random() * randomOutcomes.length)]
}