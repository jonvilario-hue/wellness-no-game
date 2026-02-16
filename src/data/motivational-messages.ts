
export type MessageTrigger = 
    | 'low_mood'
    | 'high_mood'
    | 'habit_streak'
    | 'missed_habit'
    | 'focus_used'
    | 'journal_used'
    | 'no_activity'
    | 'morning'
    | 'evening';

export const messages: Record<MessageTrigger, string[]> = {
    low_mood: [
        "It's okay to not be okay. Be kind to yourself today.",
        "A small step is still a step forward. You're doing your best.",
        "This feeling will pass. Treat yourself with compassion.",
        "Energy flows where attention goes. Focus on one small, kind act for yourself.",
        "Your value is not tied to your productivity. It's okay to slow down.",
        "Be gentle. You are a work in progress, and that is a beautiful place to be."
    ],
    high_mood: [
        "Channel this positive energy! It's a great day to tackle a challenge.",
        "Your positivity is a superpower. Keep shining!",
        "Awesome mood! Let's build on this momentum.",
        "Peak state detected. What big idea have you been waiting to tackle?",
        "Momentum is a gift. Use it to clear your hardest 'Deep Work' task.",
        "Your enthusiasm is contagious—let it power your next breakthrough."
    ],
    habit_streak: [
        "🔥 Habit streak! Consistency is where real growth happens.",
        "Look at you go! Every checkmark is a win for your future self.",
        "You're building an amazing routine. Keep up the great work!",
        "The power of compound interest applied to habits. Keep stacking wins.",
        "You're making the difficult look easy through sheer consistency.",
        "Each day you show up, you're voting for the person you want to become."
    ],
    missed_habit: [
        "Missed a day? No problem. The journey is never a straight line. Let's start fresh.",
        "One day doesn't define your progress. You can get right back on track today.",
        "Resilience is more important than perfection. You've got this.",
        "The 'Never Miss Twice' rule is your best friend right now. Start again.",
        "Forgive the lapse, focus on the restart. That's true grit.",
        "Your streak might have paused, but your progress remains. Jump back in."
    ],
    focus_used: [
        "Great focus session! Every minute you invest in deep work pays off.",
        "Your focus today is building the future you want. Well done.",
        "You protected your attention and got it done. That's a huge win.",
        "Deep work is a rare skill in a distracted world. You're mastering it.",
        "That level of concentration is where breakthroughs are born.",
        "You've successfully 'narrowed the lens.' Your prefrontal cortex thanks you."
    ],
    journal_used: [
        "Every insight you write down is a seed of growth. Keep planting.",
        "Taking time to reflect is a powerful act of self-awareness. Great job.",
        "You've cleared your mind and made space for new ideas. Well done.",
        "Reflection is the bridge between experience and wisdom.",
        "By naming your thoughts, you gain power over them. Excellent work.",
        "Your journal is a laboratory for your mind. Keep experimenting."
    ],
    no_activity: [
        "A new day, a new opportunity to sharpen your mind.",
        "Just one small puzzle or a single journal entry can make a difference today.",
        "Ready to invest in yourself? Your future self will thank you.",
        "Progress starts with a single intention. What's yours for today?",
        "The smallest action is better than the grandest intention left undone.",
        "Your potential is waiting for you to pick up the tools."
    ],
    morning: [
        "Good morning! What's one thing you can do to make today great?",
        "Rise and shine! Your cognitive workout is waiting.",
        "A new day brings new strength and new thoughts. Let's get started.",
        "The first hour sets the tone. Make it count.",
        "Fresh slate, fresh focus. What will you build today?",
        "Hello! Remember: you don't have to be perfect to be making progress."
    ],
    evening: [
        "Time to wind down. Reflecting on your day can bring clarity for tomorrow.",
        "As the day ends, take a moment for gratitude or quiet thought.",
        "Rest is just as important as work. Hope you had a productive day.",
        "Shutdown sequence initiated. Let the day's lessons settle in.",
        "Peace of mind is the ultimate evening win. You've earned your rest.",
        "Look back with pride, look forward with hope. Goodnight."
    ]
};
