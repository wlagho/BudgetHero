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
  category: 'housing' | 'food' | 'transportation' | 'emergency' | 'investment'
  difficulty: 'easy' | 'medium' | 'hard'
}

export const scenarios: Scenario[] = [
  {
    id: 'rent_increase',
    title: 'Rent Shock!',
    description: 'Your landlord just announced a $300/month rent increase!',
    situation: 'You come home to find a letter under your door. Your rent is going up by $300 next month! Your current rent is $1,200/month. You have $2,000 in savings and make $3,500/month after taxes. What do you do?',
    choices: [
      {
        id: 'negotiate',
        text: 'Negotiate with the landlord',
        aiPrompt: 'User chose to negotiate rent increase with landlord'
      },
      {
        id: 'move',
        text: 'Look for a new apartment',
        aiPrompt: 'User chose to move to find cheaper housing'
      },
      {
        id: 'accept',
        text: 'Accept the increase and tighten budget',
        aiPrompt: 'User chose to accept rent increase and cut expenses'
      },
      {
        id: 'roommate',
        text: 'Find a roommate to share costs',
        aiPrompt: 'User chose to find roommate to reduce housing costs'
      }
    ],
    category: 'housing',
    difficulty: 'medium'
  },
  {
    id: 'car_repair',
    title: 'Car Trouble',
    description: 'Your car broke down and needs expensive repairs!',
    situation: 'Your car made a horrible noise and died on your way to work. The mechanic says it needs $1,500 in repairs. You need transportation to get to work, but this would wipe out most of your emergency fund. What\'s your move?',
    choices: [
      {
        id: 'repair',
        text: 'Pay for the repairs',
        aiPrompt: 'User chose to pay for expensive car repairs'
      },
      {
        id: 'public_transport',
        text: 'Use public transportation temporarily',
        aiPrompt: 'User chose public transport instead of car repair'
      },
      {
        id: 'used_car',
        text: 'Buy a used car instead',
        aiPrompt: 'User chose to buy used car instead of repairing'
      },
      {
        id: 'carpool',
        text: 'Organize carpools with coworkers',
        aiPrompt: 'User chose to carpool with coworkers'
      }
    ],
    category: 'transportation',
    difficulty: 'hard'
  },
  {
    id: 'job_promotion',
    title: 'Promotion Opportunity',
    description: 'You got a promotion offer, but it requires relocating!',
    situation: 'Great news! You\'ve been offered a promotion with a 40% salary increase. The catch? You need to move to a new city with a higher cost of living. The company will cover moving expenses, but you\'ll need to break your lease early. What do you decide?',
    choices: [
      {
        id: 'accept',
        text: 'Accept the promotion and move',
        aiPrompt: 'User accepted promotion requiring relocation'
      },
      {
        id: 'negotiate',
        text: 'Try to negotiate remote work',
        aiPrompt: 'User wants to negotiate remote work for promotion'
      },
      {
        id: 'decline',
        text: 'Decline and stay in current position',
        aiPrompt: 'User declined promotion to avoid relocation'
      },
      {
        id: 'research',
        text: 'Research the new city thoroughly first',
        aiPrompt: 'User chose to research new city before deciding'
      }
    ],
    category: 'investment',
    difficulty: 'medium'
  },
  {
    id: 'windfall',
    title: 'Unexpected Money',
    description: 'You received a $5,000 tax refund!',
    situation: 'Surprise! You got a much larger tax refund than expected - $5,000! This is a nice chunk of money that could really help your financial situation. You have some credit card debt, no emergency fund, and have been wanting to invest. What\'s your strategy?',
    choices: [
      {
        id: 'emergency_fund',
        text: 'Build emergency fund',
        aiPrompt: 'User chose to build emergency fund with windfall'
      },
      {
        id: 'pay_debt',
        text: 'Pay off credit card debt',
        aiPrompt: 'User chose to pay off debt with tax refund'
      },
      {
        id: 'invest',
        text: 'Invest in index funds',
        aiPrompt: 'User chose to invest windfall in index funds'
      },
      {
        id: 'split',
        text: 'Split between debt, savings, and fun',
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
    situation: 'You need a medical procedure that costs $3,000 after insurance. You have $1,500 in savings and the procedure is necessary for your health. The hospital offers a payment plan, but you\'re worried about the debt. What do you do?',
    choices: [
      {
        id: 'payment_plan',
        text: 'Accept hospital payment plan',
        aiPrompt: 'User chose hospital payment plan for medical procedure'
      },
      {
        id: 'personal_loan',
        text: 'Take out a personal loan',
        aiPrompt: 'User chose personal loan for medical expenses'
      },
      {
        id: 'ask_family',
        text: 'Ask family for help',
        aiPrompt: 'User chose to ask family for financial help'
      },
      {
        id: 'delay',
        text: 'Delay the procedure to save money',
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