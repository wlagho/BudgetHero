import React, { useState, useEffect } from 'react'
import { X, Clock, Brain, CheckCircle, Play, Pause } from 'lucide-react'

interface MicrolearningModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (lessonId: string) => void
  isPremium: boolean
}

interface Lesson {
  id: string
  title: string
  duration: number
  content: string[]
  quiz: {
    question: string
    options: string[]
    correct: number
  }
  premium: boolean
}

export const MicrolearningModal: React.FC<MicrolearningModalProps> = ({ 
  isOpen, 
  onClose, 
  onComplete,
  isPremium 
}) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const lessons: Lesson[] = [
    {
      id: 'emergency_fund_basics',
      title: 'Emergency Fund Essentials',
      duration: 3,
      premium: false,
      content: [
        "An emergency fund is money set aside for unexpected expenses like medical bills or job loss.",
        "In Kenya, aim for 3-6 months of living expenses in your emergency fund.",
        "Keep it in a money market fund for easy access and some growth.",
        "Start small - even KSh 5,000 is better than nothing!"
      ],
      quiz: {
        question: "How much should your emergency fund cover in Kenya?",
        options: [
          "1 month of expenses",
          "3-6 months of expenses", 
          "1 year of expenses",
          "Just KSh 10,000"
        ],
        correct: 1
      }
    },
    {
      id: 'kenyan_investment_basics',
      title: 'Investing in Kenya 101',
      duration: 4,
      premium: true,
      content: [
        "SACCOs are a great starting point for Kenyan investors - they offer good returns and are community-based.",
        "The Nairobi Securities Exchange (NSE) has blue-chip stocks like Safaricom and Equity Bank.",
        "Government bonds are low-risk investments available through your bank or CBK.",
        "Money market funds offer better returns than savings accounts with daily liquidity.",
        "Always diversify - don't put all your money in one investment type."
      ],
      quiz: {
        question: "Which is typically the safest investment option in Kenya?",
        options: [
          "Cryptocurrency",
          "Government bonds",
          "Real estate only",
          "Digital lending"
        ],
        correct: 1
      }
    },
    {
      id: 'digital_loan_dangers',
      title: 'Digital Loan Traps',
      duration: 3,
      premium: true,
      content: [
        "Digital loans in Kenya often have interest rates of 15-20% per month - that's over 400% annually!",
        "Missing payments can hurt your CRB credit score, affecting future loan applications.",
        "The convenience is tempting, but the cost is extremely high.",
        "Always calculate the total cost before borrowing - a KSh 1,000 loan might cost KSh 1,200 in just one month."
      ],
      quiz: {
        question: "What's a major risk of digital loans in Kenya?",
        options: [
          "They're too slow to process",
          "Very high interest rates (400%+ annually)",
          "They require too much paperwork",
          "They're not available on mobile"
        ],
        correct: 1
      }
    }
  ]

  useEffect(() => {
    if (isOpen && !currentLesson) {
      // Select an appropriate lesson
      const availableLessons = lessons.filter(lesson => !lesson.premium || isPremium)
      if (availableLessons.length > 0) {
        setCurrentLesson(availableLessons[0])
        setCurrentStep(0)
        setIsPlaying(false)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }
  }, [isOpen, isPremium])

  if (!isOpen || !currentLesson) return null

  const isContentStep = currentStep < currentLesson.content.length
  const isQuizStep = currentStep === currentLesson.content.length

  const handleNext = () => {
    if (isContentStep) {
      setCurrentStep(currentStep + 1)
    } else if (isQuizStep && selectedAnswer !== null) {
      setShowResult(true)
    }
  }

  const handleComplete = () => {
    onComplete(currentLesson.id)
    onClose()
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real app, this would control text-to-speech
  }

  return (
    <div className="fixed inset-0 popup-overlay flex items-center justify-center z-50 p-4">
      <div className="popup-content max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-retro-light-gray hover:text-retro-teal transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-retro-purple" />
            <h2 className="text-xl font-pixel text-retro-teal">MICROLEARNING SESSION</h2>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-retro-yellow">
              <Clock className="w-4 h-4" />
              <span className="font-pixel">{currentLesson.duration} MIN</span>
            </div>
            <div className="w-2 h-2 bg-retro-purple"></div>
            <span className="text-retro-light-gray font-pixel">{currentLesson.title}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-pixel text-retro-teal">PROGRESS</span>
            <span className="text-xs font-pixel text-retro-light-gray">
              {currentStep + 1} / {currentLesson.content.length + 1}
            </span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / (currentLesson.content.length + 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-retro-dark-gray p-6 border-2 border-retro-gray mb-8 min-h-[200px]">
          {isContentStep ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-pixel text-retro-teal">LESSON CONTENT</h3>
                {isPremium && (
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 text-retro-purple hover:text-retro-teal transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span className="text-xs font-pixel">
                      {isPlaying ? 'PAUSE' : 'LISTEN'}
                    </span>
                  </button>
                )}
              </div>
              <p className="text-sm text-retro-light-gray leading-relaxed">
                {currentLesson.content[currentStep]}
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-pixel text-retro-yellow mb-4">QUICK QUIZ</h3>
              {!showResult ? (
                <div>
                  <p className="text-sm text-retro-light-gray mb-6">
                    {currentLesson.quiz.question}
                  </p>
                  <div className="space-y-3">
                    {currentLesson.quiz.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full text-left p-3 border-2 transition-all ${
                          selectedAnswer === index
                            ? 'border-retro-teal bg-retro-teal bg-opacity-20'
                            : 'border-retro-gray hover:border-retro-light-gray'
                        }`}
                      >
                        <span className="text-xs text-retro-light-gray">{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    {selectedAnswer === currentLesson.quiz.correct ? (
                      <CheckCircle className="w-12 h-12 text-retro-teal mx-auto" />
                    ) : (
                      <X className="w-12 h-12 text-retro-pink mx-auto" />
                    )}
                  </div>
                  <p className="text-sm font-pixel mb-2 text-retro-teal">
                    {selectedAnswer === currentLesson.quiz.correct ? 'CORRECT!' : 'NOT QUITE!'}
                  </p>
                  <p className="text-xs text-retro-light-gray">
                    {selectedAnswer === currentLesson.quiz.correct 
                      ? 'Great job! You\'ve mastered this concept.'
                      : `The correct answer was: ${currentLesson.quiz.options[currentLesson.quiz.correct]}`
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="pixel-button bg-retro-gray px-6 py-3"
          >
            SKIP FOR NOW
          </button>
          
          {showResult ? (
            <button
              onClick={handleComplete}
              className="pixel-button px-6 py-3"
            >
              COMPLETE LESSON
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isQuizStep && selectedAnswer === null}
              className="pixel-button px-6 py-3"
            >
              {isContentStep ? 'NEXT' : 'SUBMIT ANSWER'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}