# BudgetHero - Retro Financial Adventure Game 🎮💰

A retro-styled, choose-your-own-adventure financial literacy game built with React, TypeScript, and Supabase. Learn money management through interactive Kenyan scenarios with authentic 8-bit gaming aesthetics and AI-powered outcomes.

## 🎮 Features

- **🕹️ Retro Gaming UI**: Authentic 8-bit aesthetic with CRT screen effects, scanlines, and pixel-perfect design
- **🇰🇪 Kenyan Market Focus**: Real scenarios adapted for Kenyan financial context with KSh currency
- **🧠 Smart AI Outcomes**: Logical consequences based on actual Kenyan financial principles
- **🏆 Achievement System**: Badge system and progress tracking with gamified rewards
- **📱 Responsive Design**: Optimized for desktop and mobile with retro styling maintained

## 🇰🇪 Kenyan Financial Context

### **Currency & Goals**
- **Starting Money**: KSh 50,000 (realistic starting point)
- **Wealth Goal**: KSh 500,000 (achievable target)
- **All scenarios**: Adapted for Kenyan market realities

### **Real Kenyan Scenarios**
- **Housing**: Kilimani vs Kasarani rent decisions
- **Transport**: Car repairs vs matatus and boda bodas
- **Healthcare**: NHIF coverage and medical expenses
- **Career**: Job opportunities and relocation decisions
- **Investment**: SACCOs, Safaricom shares, and money market funds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/budgethero.git
cd budgethero
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

## 🗄️ Database Setup

### Supabase Schema

Run these SQL commands in your Supabase dashboard:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  last_scenario TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progress table
CREATE TABLE IF NOT EXISTS progress (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  badges TEXT[] DEFAULT '{}',
  money_saved INTEGER DEFAULT 50000, -- Starting with KSh 50,000
  current_scenario TEXT DEFAULT 'rent_increase',
  scenario_state JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" ON progress
  FOR DELETE USING (auth.uid() = user_id);
```

## 🎯 Game Mechanics

### Starting Money & Goals
- **Starting Amount**: KSh 50,000 (realistic for young Kenyan professionals)
- **Wealth Goal**: KSh 500,000 (achievable financial milestone)
- **Progress Levels**: Beginner → Intermediate → Advanced → Expert

### Kenyan-Specific Badges
- **🗣️ Silver Tongue**: Master negotiation in Kenyan rental market
- **🏠 Smart Mover**: Make wise housing decisions (Kilimani vs Kasarani)
- **🚌 Public Transport Pro**: Effectively use matatus and boda bodas
- **🤝 Social Butterfly**: Leverage social connections and carpools
- **💰 Budget Master**: Excel at expense management
- **🏥 Insurance Wise**: Maintain NHIF and make smart health decisions
- **🏦 Emergency Fund Hero**: Build solid financial safety net
- **💳 Debt Destroyer**: Eliminate high-interest digital loans

### Realistic Kenyan Scenarios

#### **Housing Decisions**
- **Rent Increases**: Kilimani landlord raises rent by KSh 15,000
- **Location Choices**: Expensive Kilimani vs affordable Kasarani
- **Roommate Situations**: Sharing costs with working professionals
- **Negotiation**: Using market research to negotiate rent

#### **Transport Challenges**
- **Car Repairs**: KSh 75,000 engine repair vs alternatives
- **Public Transport**: Matatus and boda bodas as cost-effective options
- **Used Cars**: Buying reliable Toyota Vitz from Ngara dealers
- **Carpooling**: Organizing with colleagues from your estate

#### **Career Opportunities**
- **Promotions**: 40% salary increase requiring move to Mombasa
- **Remote Work**: Negotiating work-from-home arrangements
- **Cost of Living**: Balancing salary increases with living expenses

#### **Healthcare & Insurance**
- **NHIF Coverage**: Medical procedures with insurance support
- **Payment Plans**: Hospital financing options
- **Harambees**: Community support for medical expenses

#### **Investment & Savings**
- **SACCOs**: Traditional Kenyan savings and credit cooperatives
- **Blue-chip Stocks**: Safaricom and other NSE investments
- **Money Market Funds**: Emergency fund placement
- **Digital Loans**: Managing high-interest mobile lending

## 🎨 Retro Design System

### **8-bit Aesthetic**
- **Font**: "Press Start 2P" for authentic retro gaming feel
- **Colors**: Teal (#00FF9D), Purple (#BD00FF), Pink (#FF006E), Yellow (#FFD60A)
- **Effects**: CRT scanlines, glitch animations, pixel-perfect borders

### **Visual Elements**
- **CRT Screen Effect**: Authentic old-school monitor simulation
- **Pixel Buttons**: Chunky, retro-styled interactive elements
- **Progress Bars**: Animated with scrolling pixel patterns
- **Badge Animations**: Spinning unlock effects with glow
- **Typewriter Text**: Classic terminal-style text reveal

### **Responsive Retro**
- **Mobile Optimization**: Smaller fonts and touch-friendly buttons
- **Consistent Aesthetic**: Retro feel maintained across all screen sizes
- **Performance**: Optimized animations for smooth mobile experience

## 🧠 Intelligent Financial Logic

### **Realistic Outcomes**
The AI generates outcomes based on actual Kenyan financial principles:

- **Negotiation Success**: Based on preparation and market research
- **Moving Costs**: Realistic deposits and relocation expenses
- **Transport Economics**: Actual costs of cars vs public transport
- **Investment Returns**: Realistic SACCO and stock market performance
- **Healthcare Costs**: Accurate NHIF coverage and payment plans

### **Educational Value**
Every scenario teaches real financial concepts:
- **Emergency Funds**: Importance of financial safety nets
- **Debt Management**: Avoiding high-interest digital loans
- **Location Economics**: Housing cost vs commute trade-offs
- **Insurance Value**: NHIF and health coverage benefits
- **Investment Basics**: SACCOs, stocks, and money market funds

## 🔧 Adding New Kenyan Scenarios

1. Create a new scenario object in `src/data/scenarios.ts`:

```typescript
{
  id: 'matatu_vs_uber',
  title: 'Transport Dilemma',
  description: 'Choose between matatu and Uber for daily commute',
  situation: 'Your usual matatu route increased fares. Uber is convenient but expensive...',
  choices: [
    {
      id: 'stick_matatu',
      text: 'Continue using matatus despite fare increase',
      aiPrompt: 'User chose to stick with matatus despite higher fares'
    },
    {
      id: 'switch_uber',
      text: 'Switch to Uber for convenience',
      aiPrompt: 'User chose Uber over matatus for daily transport'
    }
  ],
  category: 'transport',
  difficulty: 'easy'
}
```

2. Update the AI logic in `src/hooks/useAI.ts` to handle new scenarios with Kenyan context.

## 🤖 AI Integration

The app uses intelligent outcome generation that considers:

### **Kenyan Market Factors**
- **Rental Market**: Kilimani vs Kasarani pricing dynamics
- **Transport Costs**: Matatu fares vs car ownership expenses
- **Salary Ranges**: Realistic income levels for different professions
- **Investment Options**: SACCO returns, NSE performance, money market rates

### **Financial Principles**
- **Emergency Funds**: 3-6 months of expenses recommended
- **Debt-to-Income**: Avoiding over-leverage with digital loans
- **Location Value**: Balancing rent costs with commute expenses
- **Insurance Coverage**: NHIF contribution importance

## 📱 Mobile Experience

### **Retro Mobile Design**
- **Smaller Pixel Fonts**: Readable on mobile screens
- **Touch-Friendly Buttons**: Properly sized for finger taps
- **Simplified Animations**: Optimized for mobile performance
- **Portrait Layout**: Stacked elements for narrow screens

### **Offline Support**
- **Demo Mode**: Full functionality without Supabase connection
- **Local Storage**: Progress saved locally in offline mode
- **Graceful Degradation**: Seamless fallback to offline experience

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel --prod
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=dist
```

## 🇰🇪 Kenyan Financial Education

### **Key Learning Outcomes**
- **Housing Strategy**: Understanding Nairobi's rental market dynamics
- **Transport Economics**: Cost-benefit analysis of different transport modes
- **Healthcare Planning**: Importance of NHIF and medical insurance
- **Investment Basics**: SACCOs, stocks, and savings options
- **Debt Management**: Avoiding predatory digital lending

### **Real-World Application**
- **Negotiation Skills**: Practical techniques for rent and salary discussions
- **Budgeting**: Managing expenses in Kenyan urban context
- **Emergency Planning**: Building financial resilience
- **Investment Literacy**: Understanding local investment options

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with Kenyan context in mind
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Email: support@budgethero.game

---

**BudgetHero** - Level up your financial literacy through retro gaming! 🎮💰🇰🇪

*Experience authentic Kenyan financial scenarios in a safe, gamified environment with classic 8-bit aesthetics.*