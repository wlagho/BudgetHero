export interface ScenarioChoice {
  id: string
  text: string
  consequence?: string
  moneyChange?: number
  nextScenario?: string
  aiPrompt?: string
}

export interface Scenario {
  id: string
  title: string
  description: string
  situation: string
  choices: ScenarioChoice[]
  category: 'housing' | 'transport' | 'career' | 'emergency' | 'investment'
  difficulty: 'easy' | 'medium' | 'hard'
}

export const scenarios: Scenario[] = [
  {
    id: 'rent_increase',
    title: 'Rent Shock!',
    description: 'Your landlord just announced a KSh 15,000/month rent increase!',
    situation: 'You come home to find a notice under your door. Your rent in Kilimani is going up by KSh 15,000 next month! Your current rent is KSh 60,000/month. You have KSh 100,000 in savings and earn KSh 175,000/month after tax. What do you do?',
    choices: [
      {
        id: 'negotiate',
        text: 'Negotiate with the landlord using market research',
        aiPrompt: 'User chose to negotiate rent increase with landlord'
      },
      {
        id: 'move',
        text: 'Look for a cheaper apartment in Kasarani or Kahawa',
        aiPrompt: 'User chose to move to find cheaper housing'
      },
      {
        id: 'accept',
        text: 'Accept the increase and cut other expenses',
        aiPrompt: 'User chose to accept rent increase and cut expenses'
      },
      {
        id: 'roommate',
        text: 'Find a roommate to share the costs',
        aiPrompt: 'User chose to find roommate to reduce housing costs'
      }
    ],
    category: 'housing',
    difficulty: 'medium'
  },
  {
    id: 'car_breakdown',
    title: 'Car Trouble',
    description: 'Your car broke down and needs expensive repairs!',
    situation: 'Your Toyota Vitz made a horrible noise and died on Thika Road during rush hour. The mechanic says it needs KSh 75,000 in engine repairs. You need transport to get to work in Westlands, but this would use most of your emergency fund. What\'s your move?',
    choices: [
      {
        id: 'repair',
        text: 'Pay for the repairs at a trusted garage',
        aiPrompt: 'User chose to pay for expensive car repairs'
      },
      {
        id: 'matatu',
        text: 'Use matatus and boda bodas temporarily',
        aiPrompt: 'User chose public transport instead of car repair'
      },
      {
        id: 'used_car',
        text: 'Buy another used car from Ngara',
        aiPrompt: 'User chose to buy used car instead of repairing'
      },
      {
        id: 'carpool',
        text: 'Organize carpools with colleagues from your estate',
        aiPrompt: 'User chose to carpool with colleagues'
      }
    ],
    category: 'transport',
    difficulty: 'hard'
  },
  {
    id: 'job_promotion',
    title: 'Promotion Opportunity',
    description: 'You got a promotion offer, but it requires moving to Mombasa!',
    situation: 'Great news! You\'ve been offered a promotion with a 40% salary increase to manage the Mombasa branch. The company will cover moving expenses, but you\'ll need to leave your life in Nairobi. The cost of living is slightly lower, but you\'ll be far from family. What do you decide?',
    choices: [
      {
        id: 'accept',
        text: 'Accept the promotion and move to Mombasa',
        aiPrompt: 'User accepted promotion requiring relocation'
      },
      {
        id: 'negotiate',
        text: 'Try to negotiate remote work from Nairobi',
        aiPrompt: 'User wants to negotiate remote work for promotion'
      },
      {
        id: 'decline',
        text: 'Decline and stay in current position',
        aiPrompt: 'User declined promotion to avoid relocation'
      },
      {
        id: 'research',
        text: 'Research Mombasa thoroughly before deciding',
        aiPrompt: 'User chose to research new city before deciding'
      }
    ],
    category: 'career',
    difficulty: 'medium'
  },
  {
    id: 'windfall',
    title: 'Unexpected Bonus',
    description: 'You received a KSh 250,000 performance bonus!',
    situation: 'Surprise! Your company gave you a KSh 250,000 performance bonus for exceeding targets! This is a significant amount that could really improve your financial situation. You have some loans from digital lenders, no emergency fund, and have been wanting to invest. What\'s your strategy?',
    choices: [
      {
        id: 'emergency_fund',
        text: 'Build emergency fund in money market fund',
        aiPrompt: 'User chose to build emergency fund with windfall'
      },
      {
        id: 'pay_debt',
        text: 'Pay off high-interest digital loans',
        aiPrompt: 'User chose to pay off debt with bonus'
      },
      {
        id: 'invest',
        text: 'Invest in SACCO and buy Safaricom shares',
        aiPrompt: 'User chose to invest windfall'
      },
      {
        id: 'split',
        text: 'Split between debt, savings, and family support',
        aiPrompt: 'User chose to split windfall between multiple goals'
      }
    ],
    category: 'investment',
    difficulty: 'easy'
  },
  {
    id: 'medical_emergency',
    title: 'Medical Emergency',
    description: 'You need an expensive medical procedure!',
    situation: 'You need a medical procedure that costs KSh 150,000 after NHIF. You have KSh 75,000 in savings and the procedure is necessary for your health. The hospital offers a payment plan, but you\'re worried about the debt. What do you do?',
    choices: [
      {
        id: 'nhif',
        text: 'Use NHIF and pay the balance',
        aiPrompt: 'User chose to use NHIF for medical procedure'
      },
      {
        id: 'payment_plan',
        text: 'Accept hospital payment plan',
        aiPrompt: 'User chose hospital payment plan for medical procedure'
      },
      {
        id: 'family',
        text: 'Organize a family harambee for support',
        aiPrompt: 'User chose to organize harambee for medical expenses'
      },
      {
        id: 'delay',
        text: 'Delay the procedure to save money first',
        aiPrompt: 'User chose to delay medical procedure to save money'
      }
    ],
    category: 'emergency',
    difficulty: 'hard'
  }
]

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id)
}

export const getRandomScenario = (): Scenario => {
  return scenarios[Math.floor(Math.random() * scenarios.length)]
}