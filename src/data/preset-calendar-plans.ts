
import type { CalendarPlan } from '@/types/calendar-plans';

export const presetPlans: CalendarPlan[] = [
  {
    id: 'p-balanced-wellness',
    name: 'Balanced Wellness Plan',
    description: 'Daily movement, stillness practice, and nutrition logging for holistic health.',
    isPreset: true,
    isActive: false,
    durationType: 'ongoing',
    startDate: new Date().toISOString(),
    categories: ['Movement', 'Stillness', 'Nutrition'],
    color: '#3b82f6', // blue-500
    activities: [
      { id: 'bw-1', name: 'Morning Stillness', category: 'Stillness', recurrence: 'daily', timeOfDay: '07:00', duration: 5, reminderEnabled: true },
      { id: 'bw-2', name: 'Evening Movement', category: 'Movement', recurrence: 'daily', timeOfDay: '18:00', duration: 15, reminderEnabled: true },
      { id: 'bw-3', name: 'Meal Logging', category: 'Nutrition', recurrence: 'daily', duration: 5, reminderEnabled: true }
    ]
  },
  {
    id: 'p-budget-reset',
    name: 'Budget Reset Plan',
    description: 'Weekly finance check-ins and monthly expense reviews.',
    isPreset: true,
    isActive: false,
    durationType: 'fixed',
    startDate: new Date().toISOString(),
    categories: ['Finance'],
    color: '#10b981', // emerald-500
    activities: [
      { id: 'br-1', name: 'Spending Log', category: 'Finance', recurrence: 'daily', duration: 2, reminderEnabled: true },
      { id: 'br-2', name: 'Weekly Review', category: 'Finance', recurrence: 'weekly', timeOfDay: '19:00', duration: 30, reminderEnabled: true },
      { id: 'br-3', name: 'Subscription Audit', category: 'Finance', recurrence: 'monthly', duration: 15, reminderEnabled: true }
    ]
  },
  {
    id: 'p-mindful-mornings',
    name: 'Mindful Mornings Plan',
    description: 'Start each day with intention: journaling, breathing, light movement.',
    isPreset: true,
    isActive: false,
    durationType: 'ongoing',
    startDate: new Date().toISOString(),
    categories: ['Stillness', 'Movement', 'Journaling'],
    color: '#8b5cf6', // violet-500
    activities: [
      { id: 'mm-1', name: 'Morning Journal', category: 'Journaling', recurrence: 'daily', timeOfDay: '06:30', duration: 10, reminderEnabled: true },
      { id: 'mm-2', name: 'Deep Breathing', category: 'Stillness', recurrence: 'daily', timeOfDay: '07:00', duration: 5, reminderEnabled: true },
      { id: 'mm-3', name: 'Gentle Stretching', category: 'Movement', recurrence: 'daily', timeOfDay: '07:15', duration: 10, reminderEnabled: true }
    ]
  },
  {
    id: 'p-meal-prep',
    name: 'Meal Prep Mastery',
    description: 'Sunday prep sessions and weekday nutrition tracking.',
    isPreset: true,
    isActive: false,
    durationType: 'ongoing',
    startDate: new Date().toISOString(),
    categories: ['Nutrition'],
    color: '#f59e0b', // amber-500
    activities: [
      { id: 'mp-1', name: 'Batch Cooking', category: 'Nutrition', recurrence: 'weekly', timeOfDay: '14:00', duration: 120, reminderEnabled: true },
      { id: 'mp-2', name: 'Meal Logging', category: 'Nutrition', recurrence: 'daily', duration: 5, reminderEnabled: true },
      { id: 'mp-3', name: 'Grocery Planning', category: 'Nutrition', recurrence: 'weekly', timeOfDay: '18:00', duration: 20, reminderEnabled: true }
    ]
  },
  {
    id: 'p-consistency-30',
    name: '30-Day Consistency Challenge',
    description: 'Build habits across all wellness areas with daily check-ins.',
    isPreset: true,
    isActive: false,
    durationType: 'fixed',
    startDate: new Date().toISOString(),
    categories: ['Movement', 'Stillness', 'Nutrition', 'Finance', 'Journaling'],
    color: '#ef4444', // red-500
    activities: [
      { id: 'cc-1', name: 'Daily Wellness Check', category: 'Custom', recurrence: 'daily', duration: 10, reminderEnabled: true },
      { id: 'cc-2', name: 'Evening Reflection', category: 'Journaling', recurrence: 'daily', timeOfDay: '21:00', duration: 5, reminderEnabled: true }
    ]
  },
  {
    id: 'p-study-sprint',
    name: 'Study Sprint Plan',
    description: 'Structured study blocks with built-in breaks and progress tracking.',
    isPreset: true,
    isActive: false,
    durationType: 'fixed',
    startDate: new Date().toISOString(),
    categories: ['Study/Learning', 'Stillness'],
    color: '#ec4899', // pink-500
    activities: [
      { id: 'ss-1', name: 'Focus Study Block', category: 'Study/Learning', recurrence: 'daily', duration: 50, reminderEnabled: true },
      { id: 'ss-2', name: 'Active Recovery Break', category: 'Stillness', recurrence: 'daily', duration: 10, reminderEnabled: true },
      { id: 'ss-3', name: 'Weekly Knowledge Audit', category: 'Study/Learning', recurrence: 'weekly', duration: 45, reminderEnabled: true }
    ]
  },
  {
    id: 'p-financial-freedom',
    name: 'Financial Freedom 90-Day Plan',
    description: 'Track spending, build emergency fund, and optimize subscriptions.',
    isPreset: true,
    isActive: false,
    durationType: 'fixed',
    startDate: new Date().toISOString(),
    categories: ['Finance'],
    color: '#06b6d4', // cyan-500
    activities: [
      { id: 'ff-1', name: 'Transaction Logging', category: 'Finance', recurrence: 'daily', duration: 5, reminderEnabled: true },
      { id: 'ff-2', name: 'Budget Review', category: 'Finance', recurrence: 'weekly', duration: 20, reminderEnabled: true },
      { id: 'ff-3', name: 'Net Worth Update', category: 'Finance', recurrence: 'monthly', duration: 10, reminderEnabled: true }
    ]
  }
];
