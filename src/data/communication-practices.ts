import type { LucideIcon } from 'lucide-react';
import { 
  Wind, Mic2, MessageSquare, User, Eye, ArrowLeftRight, 
  Target, Sparkles, Brain, ShieldAlert, BookOpen, Presentation, 
  Mail, Video, ClipboardList, Heart, HeartHandshake, Compass, 
  Share2, Smile, Scale, Anchor, Clock, Pencil, Activity, 
  ListChecks, Map, Trash2, Gift, Repeat, RefreshCcw, 
  Layers, Link as LinkIcon, ShieldCheck, X, Users, Lightbulb,
  Briefcase, MonitorSmartphone, Shield, Bell, CheckCircle2, 
  LayoutGrid, Pointer
} from 'lucide-react';
import type { Exercise } from './exercises';

export type CommunicationCategory = 
  | 'Vocal Mechanics' 
  | 'Active Listening' 
  | 'Nonverbal' 
  | 'Conversation Structure' 
  | 'Persuasion' 
  | 'Clarity' 
  | 'Emotional Intelligence' 
  | 'Conflict Resolution' 
  | 'Storytelling' 
  | 'Public Speaking' 
  | 'Professional' 
  | 'Digital'
  | 'Custom';

export const communicationPractices: Exercise[] = [
  // --- Vocal Mechanics ---
  {
    id: 'vocal_diaphragmatic',
    name: 'Diaphragmatic Breathing for Voice',
    description: 'Power your voice from your core rather than your throat.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Wind,
    category: 'Vocal Mechanics',
    tags: ['vocal', 'foundation', 'confidence'],
    intention: 'Increase vocal resonance and prevent vocal fatigue during long speaking sessions.',
    setup: ['Sit tall or stand.', 'Place one hand on your belly and one on your chest.'],
    steps: [
      '1. Inhale deeply through your nose, ensuring the hand on your belly moves out while your chest stays still.',
      '2. Exhale slowly on a "hiss" sound (ssssssss), keeping the release steady.',
      '3. Inhale again, and this time exhale while humming a comfortable note.',
      '4. Feel the vibration in your belly and chest, not just your throat.'
    ],
    modifications: [
      'Make it easier: Lie on your back to feel the natural movement of the diaphragm.',
      'Make it harder: Speak a full sentence on a single exhaled breath without losing volume.'
    ],
    completionCue: 'Voice feeling powered from the core? Ready.'
  },
  {
    id: 'vocal_pitch',
    name: 'Optimal Pitch Finding',
    description: 'Find the natural register where your voice sounds most resonant.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Mic2,
    category: 'Vocal Mechanics',
    tags: ['vocal', 'clarity'],
    intention: 'Reduce vocal fry and strain by speaking in your natural resonant frequency.',
    setup: ['Relax your shoulders and jaw.'],
    steps: [
      '1. Say "Mmm-hmmm" as if you are agreeing with someone enthusiastically.',
      '2. Notice the pitch of the "hmmm" — this is usually your natural resonant pitch.',
      '3. Count from 1 to 5, starting each number at that "hmmm" pitch.',
      '4. Try to maintain that resonance throughout the count.'
    ],
    modifications: [
      'Make it easier: Record yourself to hear the difference between pitches.',
      'Make it harder: Read a short paragraph while consciously returning to your "hmmm" pitch after each sentence.'
    ],
    completionCue: 'When your voice feels "placed" and easy to produce, you are done.'
  },
  {
    id: 'vocal_articulation',
    name: 'Articulation Drill',
    description: 'Sharpen your speech and eliminate mumbling.',
    duration: 180,
    estimatedMinutes: 3,
    icon: MessageSquare,
    category: 'Vocal Mechanics',
    tags: ['vocal', 'clarity', 'quick'],
    intention: 'Improve the clarity of your consonants to ensure you are understood the first time.',
    setup: ['Take a sip of water.', 'Warm up your jaw with a gentle massage.'],
    steps: [
      '1. Repeat "The tip of the tongue, the teeth, and the lips" 5 times, exaggerating each sound.',
      '2. Practice the "Red Leather, Yellow Leather" tongue twister, increasing speed.',
      '3. Say "Unique New York" 10 times rapidly without merging the words.',
      '4. Focus on the hard "k" and "t" sounds at the ends of words.'
    ],
    modifications: [
      'Make it easier: Say each twister very slowly, focusing purely on perfect sound.',
      'Make it harder: Hold a clean pen or cork between your teeth while reciting the twisters.'
    ],
    completionCue: 'If your mouth feels "tired" but your speech sounds crisp, excellent.'
  },

  // --- Active Listening ---
  {
    id: 'listen_paraphrasing',
    name: 'Paraphrasing Practice',
    description: 'Verify understanding by reflecting the speaker\'s core message back to them.',
    duration: 180,
    estimatedMinutes: 3,
    icon: ArrowLeftRight,
    category: 'Active Listening',
    tags: ['listening', 'clarity', 'professional'],
    intention: 'Demonstrate active engagement and prevent misunderstandings in complex conversations.',
    setup: ['Can be done with a partner or using a podcast/video.'],
    steps: [
      '1. Listen to a 30-second segment of speech.',
      '2. Begin your response with "What I\'m hearing is..." or "So, in other words..."',
      '3. Rephrase the main point using your own words, without adding your opinion.',
      '4. Ask: "Is that a fair summary?"'
    ],
    modifications: [
      'In public: Use this during your next low-stakes meeting.',
      'Solo: Listen to a news clip and summarize it out loud to yourself.'
    ],
    completionCue: 'When you can capture the essence of a message accurately, you’ve mastered this.'
  },
  {
    id: 'listen_encouragers',
    name: 'Minimal Encouragers Drill',
    description: 'Use brief verbal cues to keep the speaker engaged without interrupting.',
    duration: 120,
    estimatedMinutes: 2,
    icon: MessageSquare,
    category: 'Active Listening',
    tags: ['listening', 'emotional-intelligence'],
    intention: 'Create a supportive environment that encourages the other person to share more deeply.',
    setup: ['Identify a conversation you will have today.'],
    steps: [
      '1. Identify 3-4 "minimal encouragers" (e.g., "I see", "Uh-huh", "Go on", "Right").',
      '2. Practice varying the tone of these cues to show genuine interest.',
      '3. In your next conversation, use one every 20-30 seconds during long stretches of listening.',
      '4. Notice how it affects the speaker\'s flow.'
    ],
    modifications: [
      'Make it easier: Just focus on "Uh-huh" and a head nod.',
      'Make it harder: Use purely non-verbal encouragers (eyebrow raises, leans) for one minute.'
    ],
    completionCue: 'Natural engagement established. Done.'
  },

  // --- Nonverbal ---
  {
    id: 'nonverbal_open_posture',
    name: 'Open Body Posture Check',
    description: 'Project approachability and confidence through accessible body language.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: User,
    category: 'Nonverbal',
    tags: ["nonverbal", "confidence", "quick"],
    intention: 'Project approachability and confidence through accessible body language.',
    setup: ['Stand or sit in a comfortable space.'],
    steps: [
      '1. Stand or sit with feet shoulder-width apart.',
      '2. Uncross arms and legs completely.',
      '3. Roll shoulders back and down to open chest.',
      '4. Keep hands visible and relaxed at sides or on lap.',
      '5. Scan body for tension and consciously release it.'
    ],
    modifications: [
      'Easier: Just focus on uncrossing arms for 30 seconds.',
      'Harder: Maintain open posture during an entire conversation.'
    ],
    completionCue: 'Feeling open and ready? Done.'
  },
  {
    id: 'nonverbal_mirroring',
    name: 'Mirroring Exercise',
    description: 'Build subconscious rapport by subtly matching another person\'s body language.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Repeat,
    category: 'Nonverbal',
    tags: ["nonverbal", "rapport", "empathy"],
    intention: 'Build subconscious rapport by subtly matching another person\'s body language.',
    setup: ['Use this during an active interaction or observation.'],
    steps: [
      '1. Observe the other person\'s posture and gestures.',
      '2. Wait 2-3 seconds, then subtly match their position (crossed legs, lean direction, hand placement).',
      '3. Keep it natural - match 1-2 elements, not everything.',
      '4. Notice if the conversation feels more connected.',
      '5. Practice with different people to build the skill.'
    ],
    modifications: [
      'Easier: Just mirror posture (sitting/standing position).',
      'Harder: Mirror gesture style and speaking pace too.'
    ],
    completionCue: 'Rapport established? Excellent.'
  },
  {
    id: 'nonverbal_eye_contact',
    name: 'Eye Contact Calibration',
    description: 'Optimize eye contact for engagement without discomfort.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Eye,
    category: 'Nonverbal',
    tags: ["nonverbal", "listening", "confidence"],
    intention: 'Optimize eye contact for engagement without discomfort.',
    setup: ['Observe your eye contact during your next conversation.'],
    steps: [
      '1. When listening: maintain eye contact 60-70% of the time, looking away briefly to process.',
      '2. When speaking: maintain eye contact 30-40% of the time, looking away to gather thoughts.',
      '3. Practice the 3-second rule: hold eye contact for 3 seconds before looking away.',
      '4. Look at the bridge of the nose if direct eye contact feels intense.',
      '5. Notice when the other person looks away and give them space.'
    ],
    modifications: [
      'Easier: Start with 50/50 for both.',
      'Harder: Adjust percentages based on cultural context.'
    ],
    completionCue: 'Calibration complete. Gaze balanced.'
  },

  // --- Digital ---
  {
    id: 'digital_email_clarity',
    name: 'Email Subject Line Clarity',
    description: 'Increase response rates through specific subject lines.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Mail,
    category: 'Digital',
    tags: ['digital', 'professional', 'email', 'clarity'],
    intention: 'Increase response rates and inbox prioritization through specific subject lines.',
    setup: ['Open your email client and draft a new message.'],
    steps: [
      '1. State the action needed: "Action Required:", "FYI:", "Question:", "Decision Needed:".',
      '2. Include the topic: "Action Required: Budget Approval by Friday".',
      '3. Add relevant identifiers: project name, date, or meeting reference.',
      '4. Keep under 60 characters for mobile visibility.',
      '5. Update subject line if thread topic changes mid-conversation.'
    ],
    modifications: [
      'Easier: Just make subjects descriptive rather than vague.',
      'Harder: Use subject line tags consistently across your team ([URGENT], [LOW]).'
    ],
    completionCue: 'Subject line locked and clear. Send away.'
  },
  {
    id: 'digital_response_norms',
    name: 'Response Time Norms',
    description: 'Set appropriate expectations and reduce communication anxiety.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Clock,
    category: 'Digital',
    tags: ['digital', 'professional', 'boundaries', 'email'],
    intention: 'Set appropriate expectations and reduce communication anxiety.',
    setup: ['Review your active messaging threads.'],
    steps: [
      '1. Learn standard norms: email = 24-48 hours, Slack/Teams = 1-4 hours, urgent = phone call.',
      '2. Set your own boundaries in email signature or auto-responder.',
      '3. Use status indicators in chat apps when unavailable (DND, Away, In a Meeting).',
      '4. If you can\'t respond fully, send a quick acknowledgment: "Got this, will respond by Tuesday".',
      '5. Respect others\' response windows - don\'t expect instant replies.'
    ],
    modifications: [
      'Easier: Just respond within 24 hours to everything.',
      'Harder: Differentiate response times by message urgency and communicate this.'
    ],
    completionCue: 'Expectations set. Pressure released.'
  },
  {
    id: 'digital_tone_indicators',
    name: 'Tone Indicators in Text',
    description: 'Prevent misinterpretation in asynchronous communication.',
    duration: 120,
    estimatedMinutes: 2,
    icon: MessageSquare,
    category: 'Digital',
    tags: ['digital', 'emotional-intelligence', 'warmth', 'email'],
    intention: 'Prevent misinterpretation in asynchronous communication.',
    setup: ['Draft a quick Slack or Teams message.'],
    steps: [
      '1. Recognize that text defaults to neutral/negative tone without cues.',
      '2. Add warmth with: exclamation points (sparingly), friendly emoji (😊, 👍).',
      '3. Soften requests: "Would you mind..." instead of "Do this".',
      '4. Use positive framing: "Great question!" not just answering bluntly.',
      '5. Re-read and ask: could this sound colder than I intend?'
    ],
    modifications: [
      'Easier: Add one exclamation point to friendly messages.',
      'Harder: Calibrate tone indicators by relationship (formal vs peer).'
    ],
    completionCue: 'Message calibrated for warmth. Sent.'
  },
  {
    id: 'digital_video_framing',
    name: 'Video Call Framing Setup',
    description: 'Maximize presence and professionalism in remote communication.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Video,
    category: 'Digital',
    tags: ['digital', 'professional', 'video', 'presence'],
    intention: 'Maximize presence and professionalism in remote communication.',
    setup: ['Open your webcam or photo booth app.'],
    steps: [
      '1. Position camera at eye level (use a stand or books).',
      '2. Sit arm\'s length from camera.',
      '3. Check framing: head and shoulders visible, space above head.',
      '4. Lighting: face the light source, avoid backlighting.',
      '5. Background: clean, non-distracting, or use a subtle blur.'
    ],
    modifications: [
      'Easier: Just raise your laptop to eye level.',
      'Harder: Invest in a ring light and external webcam setup.'
    ],
    completionCue: 'Framing optimized. You look like a pro.'
  },
  {
    id: 'digital_sync_vs_async',
    name: 'Async vs Sync Decision',
    description: 'Choose the right communication medium for the message.',
    duration: 60,
    estimatedMinutes: 1,
    icon: ArrowLeftRight,
    category: 'Digital',
    tags: ['digital', 'professional', 'efficiency', 'boundaries'],
    intention: 'Choose the right communication medium based on complexity and urgency.',
    setup: ['Identify an upcoming communication task.'],
    steps: [
      '1. Use async (email, Slack) for: updates, non-urgent questions, reference info.',
      '2. Use sync (call, video) for: complex explanations, brainstorming, conflict resolution.',
      '3. When in doubt, ask: "Does this need immediate back-and-forth?".',
      '4. Default to async to respect others\' time and focus.',
      '5. If a thread goes 3+ times, suggest moving to a call.'
    ],
    modifications: [
      'Easier: Just use email for everything non-urgent.',
      'Harder: Layer communication (async context → sync decision → async follow-up).'
    ],
    completionCue: 'Medium chosen. Decision made.'
  },

  // --- Professional ---
  {
    id: 'prof_sbi_feedback',
    name: 'SBI Feedback (Situation-Behavior-Impact)',
    description: 'Deliver clear, actionable feedback without triggering defensiveness.',
    duration: 240,
    estimatedMinutes: 4,
    icon: ClipboardList,
    category: 'Professional',
    tags: ['professional', 'feedback', 'leadership', 'clarity'],
    intention: 'Deliver clear, actionable feedback without triggering defensiveness.',
    setup: ['Recall a recent observation you need to share.'],
    steps: [
      '1. Situation: "In yesterday\'s client meeting..." (specific time/place).',
      '2. Behavior: "...when you interrupted Sarah twice..." (observable action).',
      '3. Impact: "...the client seemed confused, and Sarah stopped contributing.".',
      '4. Pause and let them respond - don\'t pile on.',
      '5. Collaborate on solution: "How could we handle that differently next time?"'
    ],
    modifications: [
      'Easier: Use just Behavior + Impact if Situation is obvious.',
      'Harder: Layer in positive SBI before corrective SBI.'
    ],
    completionCue: 'Feedback structured. Ready to deliver.'
  },
  {
    id: 'prof_radical_candor',
    name: 'Radical Candor Practice',
    description: 'Balance caring personally with challenging directly.',
    duration: 600,
    estimatedMinutes: 10,
    icon: Heart,
    category: 'Professional',
    tags: ['professional', 'feedback', 'leadership', 'honesty'],
    intention: 'Balance caring personally with challenging directly.',
    setup: ['Identify a peer or direct report who needs feedback.'],
    steps: [
      '1. Build relationship first - show you genuinely care.',
      '2. Challenge directly: give specific, honest feedback about behavior/work.',
      '3. Avoid ruinous empathy or obnoxious aggression.',
      '4. Make it a dialogue: "Tell me if I\'m off base here...".',
      '5. Follow up: check in on progress and offer support.'
    ],
    modifications: [
      'Easier: Start with "praise specifically, criticize specifically" formula.',
      'Harder: Give radical candor upward to your manager.'
    ],
    completionCue: 'Conversation plan set. Candor enabled.'
  },
  {
    id: 'prof_nvc_framework',
    name: 'Nonviolent Communication (NVC)',
    description: 'Express needs and make requests without blame or judgment.',
    duration: 300,
    estimatedMinutes: 5,
    icon: HeartHandshake,
    category: 'Professional',
    tags: ['professional', 'conflict', 'emotional-intelligence', 'nvc'],
    intention: 'Express needs and make requests without blame or judgment.',
    setup: ['Identify a request you need to make.'],
    steps: [
      '1. Observation: State facts without evaluation.',
      '2. Feeling: Name your emotion - "I felt stressed".',
      '3. Need: Identify underlying need - "...because I need reliability".',
      '4. Request: Make a specific, actionable request.',
      '5. Listen to their needs and feelings in return.'
    ],
    modifications: [
      'Easier: Use just Observation + Request.',
      'Harder: Use full NVC in heated conflicts.'
    ],
    completionCue: 'Request framed with empathy. Done.'
  },
  {
    id: 'prof_crucial_convo',
    name: 'Crucial Conversations Technique',
    description: 'Create a "pool of shared meaning" during high-stakes dialogue.',
    duration: 1200,
    estimatedMinutes: 20,
    icon: MessageSquare,
    category: 'Professional',
    tags: ['professional', 'conflict', 'leadership', 'high-stakes'],
    intention: 'Create a "pool of shared meaning" during high-stakes dialogue.',
    setup: ['Identify a high-stakes conversation coming up.'],
    steps: [
      '1. Notice when conversation becomes crucial (high stakes, strong emotions).',
      '2. Make it safe: establish mutual purpose and mutual respect.',
      '3. Share your story, not your conclusion: "I\'m worried that...".',
      '4. Encourage others to share: "Help me understand your thinking...".',
      '5. Pool all viewpoints before deciding.'
    ],
    modifications: [
      'Easier: Just pause and establish mutual purpose when tension rises.',
      'Harder: Facilitate crucial conversations for groups.'
    ],
    completionCue: 'Safety established. Conversation can proceed.'
  },
  {
    id: 'prof_exec_presence',
    name: 'Executive Presence Check',
    description: 'Cultivate gravitas, communication, and appearance.',
    duration: 600,
    estimatedMinutes: 10,
    icon: User,
    category: 'Professional',
    tags: ['professional', 'leadership', 'presence', 'confidence'],
    intention: 'Cultivate gravitas, communication, and appearance.',
    setup: ['Before a meeting or presentation.'],
    steps: [
      '1. Gravitas: Maintain composure during challenges, own mistakes.',
      '2. Communication: Use pauses for emphasis, eliminate filler words.',
      '3. Appearance: Dress appropriately for your context.',
      '4. Self-assess: record yourself and watch for these elements.',
      '5. Get trusted feedback from a mentor.'
    ],
    modifications: [
      'Easier: Focus on just one element (communication).',
      'Harder: Adapt presence across different cultures.'
    ],
    completionCue: 'Presence audited. Ready to lead.'
  },
  {
    id: 'prof_upward_mgmt',
    name: 'Upward Management',
    description: 'Communicate effectively with managers and executives.',
    duration: 600,
    estimatedMinutes: 10,
    icon: TrendingUp,
    category: 'Professional',
    tags: ['professional', 'leadership', 'strategic', 'influence'],
    intention: 'Communicate effectively with managers and executives.',
    setup: ['Prepare for a 1-on-1 with a lead.'],
    steps: [
      '1. Learn their preferences: email vs chat, morning vs afternoon.',
      '2. Lead with the bottom line: "Here\'s my recommendation...".',
      '3. Bring solutions, not just problems.',
      '4. Respect their time: consolidate questions, prepare agenda.',
      '5. Update proactively on high-visibility projects.'
    ],
    modifications: [
      'Easier: Just send weekly status updates.',
      'Harder: Anticipate their concerns and address them first.'
    ],
    completionCue: 'Manager aligned. Path cleared.'
  },
  {
    id: 'prof_boundary_setting',
    name: 'Boundary Setting at Work',
    description: 'Protect your time and energy while maintaining professionalism.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Shield,
    category: 'Professional',
    tags: ['professional', 'boundaries', 'wellness', 'assertiveness'],
    intention: 'Protect your time and energy while maintaining professionalism.',
    setup: ['Identify your non-negotiables.'],
    steps: [
      '1. Identify your limits (e.g., no emails after 7pm).',
      '2. Communicate boundaries clearly and early.',
      '3. Offer alternatives when saying no.',
      '4. Be consistent - boundaries only work if enforced.',
      '5. Revisit and adjust as needed.'
    ],
    modifications: [
      'Easier: Set just one boundary and hold it.',
      'Harder: Navigate boundary-setting with difficult cultures.'
    ],
    completionCue: 'Boundaries communicated. Space protected.'
  }
];
