
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Brain, HelpCircle, Info } from "lucide-react"

interface MiniKit {
  title: string
  emoji: string
  description: string
  practices: { type: "Movement" | "Stillness"; title: string }[]
  whenToUse: string;
  whyItWorks: string;
  howToUse: string;
}

const kits: MiniKit[] = [
  {
    title: "Emotional First Aid",
    emoji: "🌪️",
    description: "For when you’re overwhelmed, upset, or in a storm of feelings.",
    practices: [
      { type: "Stillness", title: "5-4-3-2-1 Grounding" },
      { type: "Movement", title: "Shakeout + Spinal Twist" },
      { type: "Stillness", title: "4-7-8 Breathing" },
      { type: "Stillness", title: "Self-Compassion Prompt" },
    ],
    whenToUse: "You’re in emotional turbulence — overwhelmed, anxious, or reactive.",
    whyItWorks: "Combines grounding techniques with small, manageable movements and comforting sensory tools. Helps calm the nervous system and restore a sense of safety and control.",
    howToUse: "Use this kit during or after emotional stress. Follow the grounding practice first, then use movement to re-anchor, followed by soothing or journaling techniques."
  },
  {
    title: "Morning Activation",
    emoji: "🌞",
    description: "Clear mental fog and wake up your body with intention.",
    practices: [
      { type: "Movement", title: "Full-Body Reach & Shoulder Rolls" },
      { type: "Movement", title: "Standing Core Taps" },
      { type: "Stillness", title: "Box Breathing" },
      { type: "Stillness", title: "3-Minute Visualization" },
    ],
    whenToUse: "You’ve just woken up and feel sluggish, foggy, or disconnected.",
    whyItWorks: "Light mobility and sensory-focused practices activate your body and brain without jolting your system. A breath or visualization step sharpens clarity and intention for the day.",
    howToUse: "Complete before diving into tasks or screens. Movement first, then breath or visualization."
  },
  {
    title: "Unfreeze Toolkit",
    emoji: "🧊",
    description: "For when you feel emotionally numb, disconnected, or dissociated.",
    practices: [
      { type: "Movement", title: "Cold Object Hold + Stomp" },
      { type: "Stillness", title: "Coherent Breathing" },
      { type: "Stillness", title: "Tactile Self-Check" },
      { type: "Movement", title: "Light Rocking or March-in-Place" },
    ],
    whenToUse: "You feel emotionally flat, numb, or paralyzed in place.",
    whyItWorks: "Understimulation and dissociation can be gently reversed by combining tactile, breath, and small motion cues. These techniques bring awareness back into the body.",
    howToUse: "Start small. Even if you don't feel like doing it, try holding something cold or rocking. This will help gradually pull your awareness back online."
  },
  {
    title: "Evening Soft Landing",
    emoji: "🌙",
    description: "Wind down your body and nervous system before bed.",
    practices: [
      { type: "Stillness", title: "Heart-Focused Breathing" },
      { type: "Movement", title: "Reclined Spinal Twist" },
      { type: "Stillness", title: "Gratitude Reflection" },
    ],
    whenToUse: "You’ve had a long day and want to relax or prepare for sleep.",
    whyItWorks: "Movement helps discharge tension, while calming breath and reflective focus prepare the body for parasympathetic rest mode.",
    howToUse: "Use this after work or right before bed. Dim lights, reduce stimulation, and complete the kit in a slow rhythm."
  },
  {
    title: "Focus Reboot Pack",
    emoji: "🎯",
    description: "For midday distractions and mental fog.",
    practices: [
        { type: "Stillness", title: "2-Minute Breath Focus" },
        { type: "Movement", title: "Seated Core Twists" },
        { type: "Stillness", title: "'3 Wins' Prompt" },
    ],
    whenToUse: "You’re distracted, scattered, or stuck in foggy loops.",
    whyItWorks: "Simple movement wakes up alertness, and breathing focuses attention. Paired with short journaling, it helps you re-anchor into productive clarity.",
    howToUse: "Best used mid-task when you notice slipping. Use movement first, then breath, then a quick “reset intention” writing prompt."
  },
  {
    title: "Emotional Recovery Kit",
    emoji: "❤️‍🩹",
    description: "For after emotional conflict, grief, or burnout.",
    practices: [
        { type: "Stillness", title: "Loving-Kindness Meditation" },
        { type: "Movement", title: "Gentle Cat-Cow" },
        { type: "Stillness", title: "Self-Compassion Journal Prompt" },
    ],
    whenToUse: "After crying, rejection, embarrassment, or emotional vulnerability.",
    whyItWorks: "Provides safe, restorative techniques that calm your emotional center while allowing the body to gently integrate what just happened.",
    howToUse: "This kit is slow-paced. Use after emotionally heavy moments, ideally alone or in a quiet space."
  },
  {
    title: "Stress Shakeoff",
    emoji: "💥",
    description: "For when stress is peaking physically.",
    practices: [
        { type: "Movement", title: "Jumping Jacks or Shakeout" },
        { type: "Stillness", title: "Box Breathing" },
        { type: "Stillness", title: "'Drop Your Shoulders' Mind Cue" },
    ],
    whenToUse: "You’re ramped up, irritable, and feel stress bubbling in your body.",
    whyItWorks: "Uses motion to discharge adrenaline, followed by calming breathwork and posture resets. Interrupts the stress loop.",
    howToUse: "Use at first signs of stress. Do the movement part at medium intensity, then shift into slowing your system."
  },
  {
    title: "Creative Flow Primer",
    emoji: "🎨",
    description: "For before creative work or brainstorming.",
    practices: [
        { type: "Movement", title: "Breath-Squat Sync" },
        { type: "Stillness", title: "Alternate Nostril Breathing" },
        { type: "Stillness", title: "Visualization: 'Creative Doorway'" },
    ],
    whenToUse: "Before creative work, brainstorming, or content creation.",
    whyItWorks: "Energizes the core, balances brain hemispheres, and uses visualization to prime your mind for creative thinking.",
    howToUse: "Use this kit just before you sit down to create. The goal is to shift your state, not to complete a long workout."
  },
  {
    title: "Boundaries Booster",
    emoji: "🧱",
    description: "For before difficult conversations or when feeling drained.",
    practices: [
        { type: "Movement", title: "Power Pose + Grounded Feet" },
        { type: "Stillness", title: "Breath-into-the-Belly Practice" },
        { type: "Stillness", title: "'What I Will & Won’t Accept' Prompt" },
    ],
    whenToUse: "Before difficult conversations or when feeling drained.",
    whyItWorks: "Combines physical posture to signal confidence to the brain with breathwork to ground the nervous system, preparing you to hold your space.",
    howToUse: "Use this as a prep routine. The power pose sets your physical state, the breath calms you, and the prompt clarifies your verbal boundaries."
  },
  {
    title: "Inner Calm SOS",
    emoji: "🕊️",
    description: "For acute anxiety or sensory overwhelm.",
    practices: [
        { type: "Stillness", title: "5-Second Gaze Fix (visual anchor)" },
        { type: "Stillness", title: "Coherent Breathing (6 sec in/out)" },
        { type: "Movement", title: "Gentle Self-Hold or Rocking" },
    ],
    whenToUse: "In the middle of acute anxiety or sensory overwhelm.",
    whyItWorks: "This sequence rapidly de-escalates the nervous system by providing a visual anchor to stop racing thoughts, using coherent breath to signal safety, and gentle movement to self-soothe.",
    howToUse: "Use immediately when you feel anxiety rising. The gaze fix is your first step. Follow with breath. The self-hold can be done discreetly anywhere."
  },
  {
    title: "Self-Talk Reset",
    emoji: "💬",
    description: "For when you're stuck in a critical loop or inner judgment.",
    practices: [
        { type: "Stillness", title: "Heart-Focused Breath" },
        { type: "Stillness", title: "Mirror Mantra: 'I’m learning'" },
        { type: "Stillness", title: "Journaling: 'What would I say to a friend?'" },
    ],
    whenToUse: "When you're stuck in a critical loop or inner judgment.",
    whyItWorks: "Interrupts the negative feedback loop of self-criticism by shifting from judgment to compassion. It uses breath to soothe, a mantra to reframe, and a prompt to externalize.",
    howToUse: "This is a quiet, reflective kit. Find a private space if possible. The goal is to change your internal channel from criticism to support."
  },
  {
    title: "Screen Fatigue Recovery",
    emoji: "📱",
    description: "For after long screen exposure or digital overload.",
    practices: [
        { type: "Movement", title: "Wrist Rolls + Palming Eyes" },
        { type: "Stillness", title: "Distance Gaze Reset (20-20-20 Rule)" },
        { type: "Stillness", title: "2-Minute Breath Check-In" },
    ],
    whenToUse: "After too much time online, scrolling, or zoning out from devices.",
    whyItWorks: "This kit targets eye strain, attention drain, and nervous system exhaustion. It combines gentle movement, visual resets, and rest cues.",
    howToUse: "Use during breaks or after long screen sessions. Don’t skip the gaze-reset or breath cue — they restore attention better than just “taking a break.”"
  },
]

export function MiniKitsContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {kits.map((kit, index) => (
        <Card key={index} className="hover:shadow-md">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{kit.emoji}</span>
              <h2 className="text-lg font-semibold">{kit.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{kit.description}</p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <Info className="w-4 h-4 text-primary" />
                        Why this kit helps
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div>
                      <p className="font-bold text-xs">WHEN TO USE</p>
                      <p className="text-xs text-muted-foreground">{kit.whenToUse}</p>
                  </div>
                   <div>
                      <p className="font-bold text-xs">WHY IT WORKS</p>
                      <p className="text-xs text-muted-foreground">{kit.whyItWorks}</p>
                  </div>
                   <div>
                      <p className="font-bold text-xs">HOW TO USE</p>
                      <p className="text-xs text-muted-foreground italic">{kit.howToUse}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <ul className="list-disc list-inside text-sm text-muted-foreground pl-2 space-y-1 pt-2">
              {kit.practices.map((practice, i) => (
                <li key={i}>
                  <span className="font-medium text-foreground">{practice.type}:</span> {practice.title}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 pt-2">
              <Button variant="outline">Save Kit</Button>
              <Button>Try All Now</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

    