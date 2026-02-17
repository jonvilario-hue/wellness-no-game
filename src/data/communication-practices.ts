'use client';

import { 
  Wind, Mic2, MessageSquare, User, Eye, ArrowLeftRight, 
  Target, Sparkles, Brain, ShieldAlert, BookOpen, Presentation, 
  Mail, Video, ClipboardList, Heart, HeartHandshake, Compass, 
  Share2, Smile, Scale, Anchor, Clock, Pencil, Activity, 
  ListChecks, Map, Trash2, Gift, Repeat, RefreshCcw, 
  Layers, Link as LinkIcon, ShieldCheck, X, Users, Lightbulb,
  Briefcase, MonitorSmartphone, Shield, Bell, CheckCircle2, 
  LayoutGrid, Pointer, TrendingUp, DoorOpen, HeartPulse, Zap,
  History
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
    intention: 'Reduce vocal fry and strain by speaking in your natural resonant pitch.',
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
  {
    id: 'vocal_fry',
    name: 'Vocal Fry Awareness',
    description: 'Eliminate the low, rattling sound at the end of sentences.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Activity,
    category: 'Vocal Mechanics',
    tags: ['vocal', 'clarity'],
    intention: 'Project more energy and authority by maintaining vocal support through the end of phrases.',
    setup: ['Stand tall.'],
    steps: [
      '1. Read a sentence out loud.',
      '2. Notice if your voice "crackles" or drops into a low rattle at the end.',
      '3. Re-read the sentence, focusing on pushing slightly more air through the final word.',
      '4. Practice "landing" the end of each sentence on a clear note.'
    ],
    modifications: [
      'Make it easier: Focus on short 3-word sentences.',
      'Make it harder: Read a full page of text while monitoring for fry.'
    ],
    completionCue: 'End of sentence feeling strong and clear? Done.'
  },
  {
    id: 'vocal_upspeak',
    name: 'Upspeak Reduction',
    description: 'Maintain a downward inflection to sound more certain.',
    duration: 120,
    estimatedMinutes: 2,
    icon: ArrowLeftRight,
    category: 'Vocal Mechanics',
    tags: ['vocal', 'confidence'],
    intention: 'Avoid making statements sound like questions, which can undermine perceived competence.',
    setup: ['Prepare a list of 5 factual statements.'],
    steps: [
      '1. Say each statement out loud.',
      '2. Pay attention to the very last syllable of the last word.',
      '3. Consciously drop the pitch of that syllable down.',
      '4. Practice "period" inflection: a slight downward move at the end.'
    ],
    modifications: [
      'Make it easier: Record and playback to identify upspeak.',
      'Make it harder: Practice this while explaining a complex idea.'
    ],
    completionCue: 'Statements sounding like declarative periods? Done.'
  },
  {
    id: 'vocal_pauses',
    name: 'Strategic Pause Practice',
    description: 'Use silence to emphasize points and eliminate filler words.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Clock,
    category: 'Vocal Mechanics',
    tags: ['vocal', 'public-speaking', 'clarity'],
    intention: 'Give your audience time to process information and increase your perceived gravitas.',
    setup: ['Choose a short paragraph to read.'],
    steps: [
      '1. Read the paragraph, but count to two silently at every comma.',
      '2. Count to three silently at every period.',
      '3. Use the silence to take a relaxed breath.',
      '4. Notice how the silence replaces "um" or "uh" while you think.'
    ],
    modifications: [
      'Make it easier: Just pause at periods.',
      'Make it harder: Pause for emphasis in the middle of a sentence after a key word.'
    ],
    completionCue: 'Comfortable with silence? Great.'
  },
  {
    id: 'vocal_rate',
    name: 'Rate Variation Exercise',
    description: 'Control your speaking speed to keep listeners engaged.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Activity,
    category: 'Vocal Mechanics',
    tags: ['vocal', 'storytelling', 'presentations'],
    intention: 'Prevent a monotonous delivery by varying speed to match the importance of your points.',
    setup: ['Have a story or explanation ready.'],
    steps: [
      '1. Speak faster during less important details to build momentum.',
      '2. Slow down significantly for your main points.',
      '3. Practice articulating every syllable when you slow down.',
      '4. Record yourself and check if the speed changes feel natural.'
    ],
    modifications: [
      'Make it easier: Practice reading a children\'s book with exaggerated pace changes.',
      'Make it harder: Change pace 3 times during a single 1-minute explanation.'
    ],
    completionCue: 'Delivery dynamic and varied? Done.'
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
  {
    id: 'listen_reflective',
    name: 'Reflective Listening Exercise',
    description: 'Identify the underlying emotion behind someone\'s words.',
    duration: 180,
    estimatedMinutes: 3,
    icon: HeartPulse,
    category: 'Active Listening',
    tags: ['listening', 'emotional-intelligence', 'empathy'],
    intention: 'Build rapport and trust by showing the other person you understand how they feel.',
    setup: ['Recall a recent interaction where someone was venting.'],
    steps: [
      '1. Identify the core emotion (e.g., frustration, excitement, worry).',
      '2. Respond with: "It sounds like you\'re feeling [emotion] about [situation]."',
      '3. Avoid saying "I understand." Instead, reflect the feeling back.',
      '4. Wait for them to confirm or correct your reflection.'
    ],
    modifications: [
      'Make it easier: Just focus on identifying the emotion in your head first.',
      'Make it harder: Reflect the feeling even if the other person is using "you" statements to blame.'
    ],
    completionCue: 'Feeling heard validated? Done.'
  },
  {
    id: 'listen_clarifying',
    name: 'Clarifying Questions Practice',
    description: 'Dig deeper into what someone means without assuming.',
    duration: 120,
    estimatedMinutes: 2,
    icon: ShieldCheck,
    category: 'Active Listening',
    tags: ['listening', 'clarity', 'professional'],
    intention: 'Reduce ambiguity and uncover the root of a statement.',
    setup: ['Identify an upcoming meeting.'],
    steps: [
      '1. Use "Can you tell me more about [part of their statement]?"',
      '2. Use "When you say [word], what exactly do you mean by that?"',
      '3. Avoid "Why" questions, which can sound accusatory.',
      '4. Focus on "What" and "How" to encourage explanation.'
    ],
    modifications: [
      'Make it easier: Just ask "Tell me more" once per conversation.',
      'Make it harder: Use this to uncover hidden requirements in a project.'
    ],
    completionCue: 'Information gap narrowed? Great.'
  },
  {
    id: 'listen_summarizing',
    name: 'Summarizing Exercise',
    description: 'Condense a long conversation into its most important points.',
    duration: 180,
    estimatedMinutes: 3,
    icon: ListChecks,
    category: 'Active Listening',
    tags: ['listening', 'professional', 'clarity'],
    intention: 'Ensure agreement on takeaways and next steps before a conversation ends.',
    setup: ['Use after a long work call or discussion.'],
    steps: [
      '1. Wait until the end of a section or the full meeting.',
      '2. State: "Before we move on, let me summarize our main points..."',
      '3. List 2-3 key takeaways and any assigned actions.',
      '4. End with: "Did I miss anything important?"'
    ],
    modifications: [
      'Make it easier: Write down the summary points while listening.',
      'Make it harder: Summarize a chaotic or emotional group discussion.'
    ],
    completionCue: 'Everyone aligned? Perfect.'
  },
  {
    id: 'listen_wait',
    name: 'Interruption Awareness (2-3 Second Wait)',
    description: 'Build the habit of pausing before you respond.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Clock,
    category: 'Active Listening',
    tags: ['listening', 'emotional-intelligence', 'respect'],
    intention: 'Prevent accidental interruptions and ensure the other person has finished their thought.',
    setup: ['Set a mental reminder before your next meeting.'],
    steps: [
      '1. When the other person stops speaking, count "one-one-thousand, two-one-thousand" in your head.',
      '2. Breathe during this pause.',
      '3. If they continue speaking during your count, they weren\'t done—just listening!',
      '4. If they stay silent, now it\'s your turn.'
    ],
    modifications: [
      'Make it easier: Start with just a 1-second pause.',
      'Make it harder: Use the pause to specifically consider their last point before replying.'
    ],
    completionCue: 'Avoiding interruptions successfully? Done.'
  },
  {
    id: 'listen_notes',
    name: 'Note-Taking with Eye Contact',
    description: 'Balance recording info with maintaining connection.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Pencil,
    category: 'Active Listening',
    tags: ['listening', 'professional', 'engagement'],
    intention: 'Show engagement while ensuring you don\'t miss critical details.',
    setup: ['Have a notebook or app ready during a meeting.'],
    steps: [
      '1. Maintain eye contact for the first 10-15 seconds of a point.',
      '2. Look down to jot a quick keyword or short phrase.',
      '3. Immediately look back up to re-establish connection.',
      '4. Say: "I\'m just jotting this down, it\'s a great point" to signal why you\'re looking away.'
    ],
    modifications: [
      'Make it easier: Just take notes during pauses.',
      'Make it harder: Practice blind-noting (writing keywords while keeping eye contact).'
    ],
    completionCue: 'Connection maintained and info recorded? Done.'
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
      'Make it easier: Just focus on uncrossing arms for 30 seconds.',
      'Make it harder: Maintain open posture during an entire conversation.'
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
      'Make it easier: Just mirror posture (sitting/standing position).',
      'Make it harder: Mirror gesture style and speaking pace too.'
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
      'Make it easier: Start with 50/50 for both.',
      'Make it harder: Adjust percentages based on cultural context.'
    ],
    completionCue: 'Calibration complete. Gaze balanced.'
  },
  {
    id: 'nonverbal_gestures',
    name: 'Purposeful Hand Gestures',
    description: 'Enhance comprehension and memory through intentional movement.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Activity,
    category: 'Nonverbal',
    tags: ["nonverbal", "public-speaking", "clarity"],
    intention: 'Enhance comprehension and memory through intentional movement.',
    setup: ['Prepare a short 30-second explanation of a topic.'],
    steps: [
      '1. Keep hands visible above waist level.',
      '2. Use size gestures for comparisons ("this big" vs "this small").',
      '3. Use directional gestures for sequences ("first... then... finally").',
      '4. Use containment gestures for concepts ("imagine holding this idea").',
      '5. Avoid repetitive filler gestures (constant pointing, hand-wringing).'
    ],
    modifications: [
      'Make it easier: Just keep hands visible and still.',
      'Make it harder: Match gestures to specific words for maximum impact.'
    ],
    completionCue: 'Gestures feeling intentional? Done.'
  },
  {
    id: 'nonverbal_congruence',
    name: 'Facial Expression Congruence',
    description: 'Build trust by matching your expressions to your message.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Smile,
    category: 'Nonverbal',
    tags: ["nonverbal", "emotional-intelligence", "trust"],
    intention: 'Build trust by matching your expressions to your message.',
    setup: ['Practice in front of a mirror or during a call.'],
    steps: [
      '1. Notice what emotion your words convey.',
      '2. Check if your face reflects that emotion.',
      '3. Practice common mismatches: smiling while delivering bad news, blank face while expressing excitement.',
      '4. If discussing something serious, let your face show appropriate concern.',
      '5. If sharing good news, let yourself smile fully.'
    ],
    modifications: [
      'Make it easier: Just avoid smiling during serious topics.',
      'Make it harder: Practice micro-expressions that match nuanced emotions.'
    ],
    completionCue: 'Expressions matching message? Great.'
  },
  {
    id: 'nonverbal_proxemics',
    name: 'Proxemics Awareness',
    description: 'Respect spatial boundaries to create comfort and connection.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Users,
    category: 'Nonverbal',
    tags: ["nonverbal", "boundaries", "cultural-awareness"],
    intention: 'Respect spatial boundaries to create comfort and connection.',
    setup: ['Observe your distance from others today.'],
    steps: [
      '1. Default to 1.5-4 feet in Western professional contexts.',
      '2. Notice if the other person steps back (you\'re too close) or leans in (they\'re comfortable).',
      '3. Match their spatial preference - if they step back, stay where you are.',
      '4. Research appropriate distances for other cultures beforehand.',
      '5. Adjust for context: closer for friends, farther for strangers.'
    ],
    modifications: [
      'Make it easier: Just maintain arm\'s length distance.',
      'Make it harder: Calibrate in real-time based on micro-cues (body tension).'
    ],
    completionCue: 'Spatial awareness checked. Done.'
  },

  // --- Conversation Structure ---
  {
    id: 'convo_turn_taking',
    name: 'Turn-Taking Signals Practice',
    description: 'Navigate conversations smoothly without awkward interruptions or silences.',
    duration: 240,
    estimatedMinutes: 4,
    icon: MessageSquare,
    category: 'Conversation Structure',
    tags: ["conversation", "flow", "listening"],
    intention: 'Navigate conversations smoothly without awkward interruptions or silences.',
    setup: ['Identify an upcoming conversation.'],
    steps: [
      '1. When finishing your turn: drop pitch at end of sentence, make eye contact, use a slight nod.',
      '2. When wanting to speak: lean forward slightly, make eye contact, take a breath.',
      '3. Watch for others\' signals before jumping in.',
      '4. If you accidentally overlap, say "Sorry, go ahead" and yield.',
      '5. Practice in low-stakes conversations first.'
    ],
    modifications: [
      'Make it easier: Just focus on pitch drop when done speaking.',
      'Make it harder: Read multiple signals simultaneously in group conversations.'
    ],
    completionCue: 'Turns feeling more fluid? Done.'
  },
  {
    id: 'convo_topic_bridging',
    name: 'Topic Bridging Exercise',
    description: 'Change subjects smoothly without jarring transitions.',
    duration: 120,
    estimatedMinutes: 2,
    icon: LinkIcon,
    category: 'Conversation Structure',
    tags: ["conversation", "flow", "small-talk"],
    intention: 'Change subjects smoothly without jarring transitions.',
    setup: ['Think of two unrelated topics you like.'],
    steps: [
      '1. Find a small connection between current topic and new topic.',
      '2. Use bridging phrases: "Speaking of X...", "That reminds me...", "On a related note...".',
      '3. Acknowledge the shift: "Changing gears for a second...".',
      '4. If no connection exists, use: "Completely different topic, but...".',
      '5. Avoid abrupt topic drops mid-conversation.'
    ],
    modifications: [
      'Make it easier: Use any bridging phrase consistently.',
      'Harder: Find thematic connections even between unrelated topics.'
    ],
    completionCue: 'Transition smooth? Done.'
  },
  {
    id: 'convo_backchannel',
    name: 'Backchannel Response Drill',
    description: 'Show active processing without interrupting the speaker.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Repeat,
    category: 'Conversation Structure',
    tags: ["conversation", "listening", "engagement"],
    intention: 'Show active processing without interrupting the speaker.',
    setup: ['Use this during your next 1-on-1.'],
    steps: [
      '1. Use verbal nods: "Mm-hmm", "Right", "I see", "Gotcha".',
      '2. Time them during natural pauses, not over the speaker\'s words.',
      '3. Vary your responses - don\'t repeat the same one.',
      '4. Match intensity to content (thoughtful "hmm" for serious topics).',
      '5. Pair with nonverbal nods or facial expressions.'
    ],
    modifications: [
      'Make it easier: Just nod physically without verbal responses.',
      'Make it harder: Use backchannels that advance the conversation ("And then what?").'
    ],
    completionCue: 'Actively engaged? Done.'
  },
  {
    id: 'convo_repair',
    name: 'Repair Strategy Practice',
    description: 'Fix miscommunication immediately before it compounds.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: RefreshCcw,
    category: 'Conversation Structure',
    tags: ["conversation", "clarity", "repair"],
    intention: 'Fix miscommunication immediately before it compounds.',
    setup: ['Prepare a phrase for when you sense confusion.'],
    steps: [
      '1. Notice confusion cues (furrowed brow, "Huh?", silence).',
      '2. Stop and acknowledge: "Let me try that again..." or "I don\'t think I said that clearly...".',
      '3. Rephrase using different words, simpler structure, or an example.',
      '4. Check for understanding: "Does that make more sense?".',
      '5. Don\'t keep going if confusion persists.'
    ],
    modifications: [
      'Make it easier: Just say "Sorry, what I meant was..." and restate.',
      'Make it harder: Diagnose WHY they\'re confused and target that specifically.'
    ],
    completionCue: 'Misunderstanding cleared? Done.'
  },
  {
    id: 'convo_adjacency',
    name: 'Adjacency Pairs Awareness',
    description: 'Understand conversational expectations to avoid social friction.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Layers,
    category: 'Conversation Structure',
    tags: ["conversation", "social-skills", "pragmatics"],
    intention: 'Understand conversational expectations to avoid social friction.',
    setup: ['List 3 common social expectations.'],
    steps: [
      '1. Learn common pairs: Question→Answer, Greeting→Greeting, Thank you→You\'re welcome.',
      '2. Notice when someone offers the first part and respond with the expected second part.',
      '3. If you can\'t provide the expected response, acknowledge it: "I don\'t know, but...".',
      '4. Don\'t leave pairs unresolved - it creates conversational debt.',
      '5. Practice in everyday interactions.'
    ],
    modifications: [
      'Make it easier: Focus on greetings and thanks.',
      'Make it harder: Handle complex pairs like criticism→defense/acceptance.'
    ],
    completionCue: 'Social pairs closed? Done.'
  },
  {
    id: 'convo_pre_closing',
    name: 'Pre-Closing Signals',
    description: 'End conversations gracefully without abruptness or awkward lingering.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: X,
    category: 'Conversation Structure',
    tags: ["conversation", "boundaries", "social-skills"],
    intention: 'End conversations gracefully without abruptness or awkward lingering.',
    setup: ['Prepare an exit line.'],
    steps: [
      '1. Signal you\'re wrapping up: "Well...", "Anyway...", "I should let you go...".',
      '2. Summarize or reference a future action: "I\'ll send you that link".',
      '3. Use physical cues: stand up, step back, gather belongings.',
      '4. If they keep talking, repeat the pre-closing after they finish.',
      '5. End with a clear closer: "Great talking with you!".'
    ],
    modifications: [
      'Make it easier: Just say "I need to run" directly.',
      'Make it harder: Layer multiple signals for smoother exit.'
    ],
    completionCue: 'Graceful exit achieved. Done.'
  },

  // --- Persuasion ---
  {
    id: 'persuasion_reciprocity',
    name: 'Reciprocity Principle Exercise',
    description: 'Increase compliance by giving first.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Gift,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "professional"],
    intention: 'Increase compliance by giving first (Cialdini\'s research).',
    setup: ['Identify something small you can offer (info, compliment, favor).'],
    steps: [
      '1. Give it genuinely without attaching strings.',
      '2. Wait - don\'t immediately ask for something back.',
      '3. When you do ask, frame it clearly and simply.',
      '4. Notice how giving first changes the dynamic.',
      '5. Maintain the relationship even if they say no.'
    ],
    modifications: [
      'Make it easier: Compliment someone before asking for help.',
      'Make it harder: Build reciprocity over weeks with multiple small gives.'
    ],
    completionCue: 'Principle applied? Done.'
  },
  {
    id: 'persuasion_social_proof',
    name: 'Social Proof Framing',
    description: 'Leverage conformity to make your suggestion more appealing.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Users,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "professional"],
    intention: 'Leverage conformity to make your suggestion more appealing.',
    setup: ['Identify a relevant reference group relevant to your listener.'],
    steps: [
      '1. Identify relevant group ("people like you", "teams in your industry").',
      '2. State what they\'re doing: "Most of our clients start with...".',
      '3. Make it specific with numbers: "73% of users chose...".',
      '4. Avoid many claims like "Everyone does this".',
      '5. Use truthfully - false social proof destroys trust.'
    ],
    modifications: [
      'Make it easier: Just mention one other person who did it.',
      'Make it harder: Layer multiple forms of social proof (experts + peers + statistics).'
    ],
    completionCue: 'Framing tested? Done.'
  },
  {
    id: 'persuasion_fitd',
    name: 'Foot-in-the-Door Technique',
    description: 'Build commitment by starting with a small request first.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: DoorOpen,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "negotiation"],
    intention: 'Build commitment by starting with a small request first.',
    setup: ['Identify your ultimate ask and a smaller related one.'],
    steps: [
      '1. Design a much smaller related ask (low stakes).',
      '2. Make the small ask first and get agreement.',
      '3. Wait hours or days - don\'t immediately escalate.',
      '4. Make the larger request, now framed as consistent with earlier "yes".',
      '5. Be prepared for a no, and remain polite.'
    ],
    modifications: [
      'Make it easier: Just ask for the small thing and stop if they agree.',
      'Make it harder: Chain multiple escalating asks over weeks.'
    ],
    completionCue: 'Commitment ladder started? Done.'
  },
  {
    id: 'persuasion_framing',
    name: 'Positive vs Negative Framing',
    description: 'Shape decisions by emphasizing gains or losses.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Target,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "framing"],
    intention: 'Shape decisions by emphasizing gains or losses (Kahneman & Tversky).',
    setup: ['Take a message you need to deliver.'],
    steps: [
      '1. Frame A (Positive): emphasize what they\'ll gain/keep ("Save $200").',
      '2. Frame B (Negative): emphasize what they\'ll lose/avoid ("Lose $200").',
      '3. Choose based on context: positive for risk-averse, negative for urgency.',
      '4. Test both in low-stakes situations.',
      '5. Notice which one triggers more action.'
    ],
    modifications: [
      'Make it easier: Just pick one frame and stick with it.',
      'Make it harder: Switch frames mid-conversation based on response.'
    ],
    completionCue: 'Message framed? Done.'
  },
  {
    id: 'persuasion_anchoring',
    name: 'Anchoring Practice',
    description: 'Set the reference point in negotiations to influence outcomes.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Anchor,
    category: 'Persuasion',
    tags: ["persuasion", "negotiation", "professional"],
    intention: 'Set the reference point in negotiations to influence outcomes.',
    setup: ['Identify a number you need to negotiate.'],
    steps: [
      '1. Go first with a number if you have info advantage.',
      '2. Start higher (selling) or lower (buying) than your target.',
      '3. Use precise numbers ($47,300 instead of $47,000).',
      '4. If they anchor first and it\'s unreasonable, reset the baseline.',
      '5. Provide rationale for your anchor.'
    ],
    modifications: [
      'Make it easier: Just state your number first.',
      'Make it harder: Layer multiple anchors (salary + benefits).'
    ],
    completionCue: 'Reference point set? Done.'
  },
  {
    id: 'persuasion_scarcity',
    name: 'Scarcity Framing Exercise',
    description: 'Increase perceived value by highlighting limited availability.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Zap,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "sales"],
    intention: 'Increase perceived value by highlighting limited availability.',
    setup: ['Identify a genuinely limited offer.'],
    steps: [
      '1. Identify genuine scarcity (limited time, quantity).',
      '2. State it clearly: "Only 3 spots left".',
      '3. Explain WHY it\'s scarce (builds credibility).',
      '4. Avoid false scarcity - it destroys trust.',
      '5. Let them decide without pressure.'
    ],
    modifications: [
      'Make it easier: Just mention a deadline.',
      'Make it harder: Combine scarcity with social proof.'
    ],
    completionCue: 'Scarcity communicated? Done.'
  },
  {
    id: 'persuasion_inoculation',
    name: 'Inoculation (Pre-Address Counterarguments)',
    description: 'Strengthen your position by acknowledging objections first.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: ShieldCheck,
    category: 'Persuasion',
    tags: ["persuasion", "argumentation", "professional"],
    intention: 'Strengthen your position by acknowledging objections first.',
    setup: ['List 2 likely objections to your idea.'],
    steps: [
      '1. Bring up the strongest objection yourself: "You might be thinking...".',
      '2. Address it directly with evidence or mitigation.',
      '3. Don\'t over-defend - brief acknowledgment is enough.',
      '4. Return to your main point after inoculating.',
      '5. Use a calm, non-defensive tone.'
    ],
    modifications: [
      'Make it easier: Address one obvious objection.',
      'Make it harder: Inoculate against 2-3 counterarguments.'
    ],
    completionCue: 'Objections neutralized? Done.'
  },

  // --- Clarity ---
  {
    id: 'clarity_concrete',
    name: 'Concrete Language Swap',
    description: 'Replace vague abstractions with specific, tangible words.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Target,
    category: 'Clarity',
    tags: ["clarity", "writing", "professional"],
    intention: 'Replace vague abstractions with specific, tangible words.',
    setup: ['Identify 3 abstract words in your draft.'],
    steps: [
      '1. Identify abstract words: "improve", "synergy", "optimize".',
      '2. Ask: what does this actually look like? What would someone see?',
      '3. Replace with concrete specifics: "reduce response time to 1 day".',
      '4. Use names, numbers, actions.',
      '5. Test with "Can a 10-year-old visualize this?".'
    ],
    modifications: [
      'Make it easier: Focus on nouns only.',
      'Make it harder: Make verbs concrete too ("utilize" → "use").'
    ],
    completionCue: 'Message tangible? Done.'
  },
  {
    id: 'clarity_active_voice',
    name: 'Active Voice Conversion',
    description: 'Increase clarity and accountability by naming who does what.',
    duration: 240,
    estimatedMinutes: 4,
    icon: User,
    category: 'Clarity',
    tags: ["clarity", "writing", "professional"],
    intention: 'Increase clarity and accountability by naming who does what.',
    setup: ['Find 2 passive sentences in your email history.'],
    steps: [
      '1. Find passive constructions: "mistakes were made".',
      '2. Ask: who is doing this action?.',
      '3. Rewrite with actor first: "We made mistakes".',
      '4. Keep passive only when the actor is unknown.',
      '5. Practice on old emails or documents.'
    ],
    modifications: [
      'Make it easier: Convert one sentence per paragraph.',
      'Make it harder: Eliminate all passive voice in a full document.'
    ],
    completionCue: 'Responsibility clear? Done.'
  },
  {
    id: 'clarity_simple_sentences',
    name: 'One Idea Per Sentence Drill',
    description: 'Reduce cognitive load by breaking complex sentences into simple ones.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Sparkles,
    category: 'Clarity',
    tags: ["clarity", "writing", "simplicity"],
    intention: 'Reduce cognitive load by breaking complex sentences into simple ones.',
    setup: ['Find a long sentence with multiple commas.'],
    steps: [
      '1. Identify how many distinct ideas are packed in.',
      '2. Split into separate sentences - one idea each.',
      '3. Reorder if needed for logical flow.',
      '4. Read aloud to test clarity.',
      '5. Use simpler connecting words (but, so).'
    ],
    modifications: [
      'Make it easier: Just split sentences with "and".',
      'Make it harder: Apply to an entire document/speech.'
    ],
    completionCue: 'Reading easy? Done.'
  },
  {
    id: 'clarity_signposting',
    name: 'Signposting Practice',
    description: 'Guide audience attention with verbal roadmaps.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Map,
    category: 'Clarity',
    tags: ["clarity", "public-speaking", "structure"],
    intention: 'Guide audience attention with verbal roadmaps.',
    setup: ['Prepare a 3-point outline.'],
    steps: [
      '1. Use openers: "First", "To begin", "Let me start with".',
      '2. Use connectors: "However", "As a result", "Similarly".',
      '3. Use closers: "In conclusion", "To sum up".',
      '4. Preview structure upfront: "I\'ll cover three things...".',
      '5. Reference back: "As I mentioned earlier".'
    ],
    modifications: [
      'Make it easier: Just use "First, second, third".',
      'Make it harder: Layer multiple signpost types in one talk.'
    ],
    completionCue: 'Roadmap clear? Done.'
  },
  {
    id: 'clarity_jargon',
    name: 'Jargon Elimination Exercise',
    description: 'Ensure accessibility by removing insider language.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Trash2,
    category: 'Clarity',
    tags: ["clarity", "accessibility", "writing"],
    intention: 'Ensure accessibility by removing insider language.',
    setup: ['List 5 specialized terms in your field.'],
    steps: [
      '1. For each, ask: would someone outside my field know this?.',
      '2. Replace with plain language or define it.',
      '3. Test on someone unfamiliar with the topic.',
      '4. Keep only jargon that saves significant time.',
      '5. Be ruthless with acronyms.'
    ],
    modifications: [
      'Make it easier: Remove obvious acronyms.',
      'Make it harder: Eliminate ALL jargon, even semi-common terms.'
    ],
    completionCue: 'Language inclusive? Done.'
  },
  {
    id: 'clarity_analogy',
    name: 'Analogy Building',
    description: 'Explain unfamiliar concepts by comparing to familiar ones.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Lightbulb,
    category: 'Clarity',
    tags: ["clarity", "teaching", "creativity"],
    intention: 'Explain unfamiliar concepts by comparing to familiar ones.',
    setup: ['Choose a difficult concept you need to explain.'],
    steps: [
      '1. Identify the hard-to-grasp concept.',
      '2. Find something your audience knows well that shares a feature.',
      '3. State explicitly: "X is like Y because...".',
      '4. Extend only where it fits.',
      '5. Test on someone to see if it clarifies.'
    ],
    modifications: [
      'Make it easier: Use simple physical analogies.',
      'Make it harder: Build multi-step analogies.'
    ],
    completionCue: 'Concept explained? Done.'
  },

  // --- Emotional Intelligence ---
  {
    id: 'ei_labeling',
    name: 'Emotion Labeling Exercise',
    description: 'Reduce emotional intensity by naming what you\'re feeling.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Brain,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "self-awareness", "regulation"],
    intention: 'Reduce emotional intensity by naming what you\'re feeling.',
    setup: ['Pause during a stressful moment.'],
    steps: [
      '1. Pause and notice the physical sensation.',
      '2. Name the emotion specifically - not just "bad".',
      '3. Say it or write it: "I\'m feeling [emotion]".',
      '4. Notice if intensity decreases.',
      '5. Use an emotion wheel if needed.'
    ],
    modifications: [
      'Make it easier: Use mad/sad/glad/scared.',
      'Make it harder: Identify layered emotions.'
    ],
    completionCue: 'Intensity reduced? Done.'
  },
  {
    id: 'ei_i_statements',
    name: '"I" Statement Practice',
    description: 'Express feelings without blaming to reduce defensiveness.',
    duration: 120,
    estimatedMinutes: 2,
    icon: MessageSquare,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "conflict", "assertiveness"],
    intention: 'Express feelings without blaming to reduce defensiveness.',
    setup: ['Identify a minor annoyance.'],
    steps: [
      '1. Structure: "I feel [emotion] when [behavior] because [impact]".',
      '2. Example: "I feel frustrated when meetings start late...".',
      '3. Avoid "you" statements.',
      '4. Be specific about behavior, not character.',
      '5. Practice on minor things first.'
    ],
    modifications: [
      'Make it easier: Just use "I feel [emotion]" without the full structure.',
      'Make it harder: Use in real-time conflict.'
    ],
    completionCue: 'Statement structured? Done.'
  },
  {
    id: 'ei_validation',
    name: 'Validation Before Advice',
    description: 'Build trust by acknowledging emotion before problem-solving.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: HeartHandshake,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "listening", "empathy"],
    intention: 'Build trust by acknowledging emotion before problem-solving.',
    setup: ['Next time someone vents to you.'],
    steps: [
      '1. Listen for the emotion.',
      '2. Name it: "That sounds really frustrating".',
      '3. Resist the urge to immediately fix.',
      '4. Wait for them to feel heard.',
      '5. If you must advise, ask first.'
    ],
    modifications: [
      'Make it easier: Just say "That makes sense".',
      'Make it harder: Validate even when you disagree.'
    ],
    completionCue: 'Trust built? Done.'
  },
  {
    id: 'ei_perspective',
    name: 'Perspective-Taking Drill',
    description: 'Reduce conflict by genuinely seeing the other person\'s viewpoint.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Users,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "empathy", "conflict"],
    intention: 'Reduce conflict by genuinely seeing the other person\'s viewpoint.',
    setup: ['Recall a disagreement.'],
    steps: [
      '1. State their position in your own words.',
      '2. Ask: what would have to be true for this to make sense?.',
      '3. Identify their underlying needs/fears.',
      '4. Share understanding: "From your perspective...".',
      '5. Notice how this changes your emotional response.'
    ],
    modifications: [
      'Make it easier: List 3 reasons why they might hold that view.',
      'Make it harder: Steelman their argument.'
    ],
    completionCue: 'Empathy felt? Done.'
  },
  {
    id: 'ei_self_disclosure',
    name: 'Appropriate Self-Disclosure',
    description: 'Build connection by sharing strategically.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Heart,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "connection", "boundaries"],
    intention: 'Build connection by sharing strategically.',
    setup: ['In a casual networking setting.'],
    steps: [
      '1. Ask: is this relevant to what they shared?.',
      '2. Keep it brief - match their disclosure.',
      '3. Focus on the feeling/lesson.',
      '4. Watch their response.',
      '5. Avoid one-upping or trauma-dumping.'
    ],
    modifications: [
      'Make it easier: Share only positive experiences.',
      'Make it harder: Share current struggles appropriately.'
    ],
    completionCue: 'Connection made? Done.'
  },

  // --- Storytelling ---
  {
    id: 'story_3act',
    name: 'Three-Act Micro-Story',
    description: 'Structure a point using a simple narrative arc.',
    duration: 180,
    estimatedMinutes: 3,
    icon: BookOpen,
    category: 'Storytelling',
    tags: ['storytelling', 'clarity'],
    intention: 'Make your points more engaging and memorable by using a narrative structure.',
    setup: ['Choose a point you want to make.'],
    steps: [
      '1. Setup: State the initial situation or context.',
      '2. Conflict: Introduce the challenge or turning point.',
      '3. Resolution: State the outcome or lesson learned.',
      '4. Keep it under 60 seconds.',
      '5. Connect the resolution back to your main point.'
    ],
    modifications: [
      'Easier: Just use "Before, Then, After" structure.',
      'Harder: Include a sensory detail in the setup.'
    ],
    completionCue: 'Story arc complete? Done.'
  },
  {
    id: 'story_hook',
    name: 'The Hook Opening',
    description: 'Grab attention in your first sentence.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Zap,
    category: 'Storytelling',
    tags: ["storytelling", "hook", "attention", "opening", "confidence"],
    intention: 'Learn to grab attention in your first sentence so listeners lean in instead of tuning out.',
    setup: ['Pick a short personal story or anecdote (30 seconds max).'],
    steps: [
      '1. Pick a short personal story or anecdote (30 seconds max).',
      '2. Identify the most surprising, emotional, or curiosity-provoking moment in that story.',
      '3. Write an opening sentence that drops the listener directly into that moment (e.g., "I was standing on stage and completely forgot my name.").',
      '4. Deliver the hook out loud, then pause for 2 full seconds before continuing.',
      '5. Tell the rest of the story, noticing how the hook reframes everything that follows.',
      '6. Try 2 more variations of the hook for the same story — one question-based, one sensory.'
    ],
    modifications: [
      'Easier: Use a well-known story or movie plot instead of a personal one.',
      'Harder: Deliver the hook cold to someone and ask them what they expected the story to be about. Adjust based on their response.'
    ],
    completionCue: 'Opening sharp and compelling? Done.'
  },
  {
    id: 'story_contrast_flip',
    name: 'Contrast & Flip',
    description: 'Use the power of contrast for emotional impact.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ArrowLeftRight,
    category: 'Storytelling',
    tags: ["storytelling", "contrast", "emotional-impact", "delivery", "structure"],
    intention: 'Use the power of contrast to make your point land with emotional impact.',
    setup: ['Choose a message or lesson you want to communicate.'],
    steps: [
      '1. Choose a message or lesson you want to communicate.',
      '2. Describe the \'before\' state — the problem, the struggle, or the old way of thinking. Use vivid, specific language.',
      '3. Pause. Let the \'before\' sit with the listener for a beat.',
      '4. Now deliver the \'after\' — the shift, the realization, the new state. Make your voice, pace, or energy shift noticeably to mark the contrast.',
      '5. Repeat the exercise, exaggerating the contrast between before and after even more.',
      '6. Reflect: where in the flip did you feel the most tension release?'
    ],
    modifications: [
      'Easier: Write out both the before and after statements first, then read them aloud.',
      'Harder: Improvise the contrast live on a random topic given by a partner.'
    ],
    completionCue: 'Contrast delivered clearly? Done.'
  },
  {
    id: 'story_pause',
    name: 'The Pause for Power',
    description: 'Use strategic silence to build tension.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Clock,
    category: 'Storytelling',
    tags: ["storytelling", "pause", "tension", "vocal-delivery", "presence"],
    intention: 'Use strategic silence within a story to build tension, emphasize key moments, and hold attention.',
    setup: ['Take a 1-minute story you can already tell comfortably.'],
    steps: [
      '1. Take a 1-minute story you can already tell comfortably.',
      '2. Identify three key moments: the setup, the turning point, and the payoff.',
      '3. Tell the story and insert a deliberate 2–3 second pause right before each key moment.',
      '4. Notice how the pause changes the weight of what comes after it.',
      '5. Now try a longer pause (4–5 seconds) before the single most important line. Resist the urge to fill the silence.',
      '6. Record yourself or tell it to someone — ask which pause felt most powerful.'
    ],
    modifications: [
      'Easier: Start with just one pause before the ending/payoff line only.',
      'Harder: Tell a story where you use at least five intentional pauses of varying lengths, using silence as a rhythm tool throughout.'
    ],
    completionCue: 'Silence used for emphasis? Done.'
  },
  {
    id: 'story_dynamics',
    name: 'Vocal Dynamics in Story',
    description: 'Vary pitch, pace, and volume for engagement.',
    duration: 420,
    estimatedMinutes: 7,
    icon: Activity,
    category: 'Storytelling',
    tags: ["storytelling", "vocal-variety", "delivery", "pitch", "pace", "engagement"],
    intention: 'Vary your pitch, pace, and volume within a story to keep listeners emotionally engaged.',
    setup: ['Pick a short story or anecdote (under 2 minutes).'],
    steps: [
      '1. Pick a short story or anecdote (under 2 minutes).',
      '2. Tell it once at your normal speaking style. Notice where your voice stays flat.',
      '3. Now retell it with these rules: slow down and get quieter during emotional or serious moments; speed up and raise energy during exciting or fast-paced moments; drop your pitch when delivering a key insight or punchline.',
      '4. Exaggerate the dynamics to 150% of what feels natural. It will feel like too much — that is the point.',
      '5. Dial it back to about 120% of natural. This is your new baseline.',
      '6. Practice once more and notice how the dynamics guide the listener\'s emotions.'
    ],
    modifications: [
      'Easier: Focus on varying just one element (pace OR volume OR pitch) rather than all three.',
      'Harder: Record yourself telling the story and listen back, identifying at least 2 moments where you could push the dynamics further. Re-record.'
    ],
    completionCue: 'Vocal range expanded? Done.'
  },
  {
    id: 'story_spine',
    name: 'Story Spine',
    description: 'Quickly structure any story with a clear arc.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ListChecks,
    category: 'Storytelling',
    tags: ["storytelling", "structure", "framework", "clarity", "quick"],
    intention: 'Use a simple fill-in-the-blank framework to quickly structure any story with a clear arc.',
    setup: ['Set aside a few minutes to speak aloud.'],
    steps: [
      '1. Complete these prompts in order, speaking out loud:',
      '   - "Once upon a time..." (set the scene/character)',
      '   - "Every day..." (establish the routine/normal)',
      '   - "But one day..." (introduce the disruption)',
      '   - "Because of that..." (first consequence)',
      '   - "Because of that..." (escalation)',
      '   - "Until finally..." (climax/resolution)',
      '   - "And ever since then..." (the new normal/lesson)',
      '2. Keep each section to 1–2 sentences maximum.',
      '3. Now retell the whole thing as a fluid story without the prompts.',
      '4. Reflect: did the structure make the story feel more complete?'
    ],
    modifications: [
      'Easier: Write out each section first before speaking.',
      'Harder: A partner gives you a random topic and you complete the story spine improvisationally in under 90 seconds.'
    ],
    completionCue: 'Story arc established? Done.'
  },
  {
    id: 'story_nested_loop',
    name: 'The Nested Loop',
    description: 'Story within a story for narrative depth.',
    duration: 480,
    estimatedMinutes: 8,
    icon: Repeat,
    category: 'Storytelling',
    tags: ["storytelling", "structure", "advanced", "nested-loop", "depth"],
    intention: 'Learn to open multiple story threads and close them in reverse order, creating satisfying narrative depth.',
    setup: ['Think of two short, related stories that connect to a theme.'],
    steps: [
      '1. Think of two short, related stories or examples that connect to a single theme or point.',
      '2. Begin telling Story A, but stop at a cliffhanger or moment of tension.',
      '3. Transition into Story B with a bridging phrase (e.g., "That reminds me of..." or "Meanwhile...").',
      '4. Complete Story B fully, landing on its insight or conclusion.',
      '5. Return to Story A and complete it. The listener now hears Story A\'s ending with Story B\'s lesson still fresh in their mind.',
      '6. Reflect: did the nesting make the overall message stronger? Where was the transition smoothest?'
    ],
    modifications: [
      'Easier: Write out both stories and the transition phrases before speaking.',
      'Harder: Use three nested stories (A → B → C → close C → close B → close A). Keep total time under 3 minutes.'
    ],
    completionCue: 'Narrative loops closed? Done.'
  },
  {
    id: 'story_sensory',
    name: 'Sensory Scene Setting',
    description: 'Engage senses instead of summarizing.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Eye,
    category: 'Storytelling',
    tags: ["storytelling", "sensory", "vivid", "show-dont-tell", "immersion"],
    intention: 'Transport your listener into the moment by engaging specific senses instead of summarizing what happened.',
    setup: ['Think of a moment from your life that was emotionally vivid.'],
    steps: [
      '1. Think of a moment from your life that was emotionally vivid.',
      '2. Describe it using only sensory details. No opinions, no labels, no emotions by name. Just what you saw, heard, felt physically, smelled, or tasted.',
      '3. Speak for 30–45 seconds of pure sensory description.',
      '4. Now add one sentence at the end that names the emotion or insight.',
      '5. Notice how the sensory setup made that final line hit differently than if you had just said the emotion up front.',
      '6. Try again with a different moment, aiming to include at least 3 different senses.'
    ],
    modifications: [
      'Easier: Focus on just two senses (sight + sound) to start.',
      'Harder: Describe the scene without ever naming the emotion — let the listener infer it entirely from the sensory details. Ask them what they felt.'
    ],
    completionCue: 'Scene vividly rendered? Done.'
  },
  {
    id: 'story_callback',
    name: 'The Callback',
    description: 'Plant a detail early and bring it back.',
    duration: 300,
    estimatedMinutes: 5,
    icon: History,
    category: 'Storytelling',
    tags: ["storytelling", "callback", "payoff", "memorability", "structure"],
    intention: 'Plant a detail early in your story and bring it back at the end for a satisfying payoff that makes your message memorable.',
    setup: ['Choose a story or talking point you use often.'],
    steps: [
      '1. Choose a story or talking point you use often.',
      '2. Identify a small, specific detail near the beginning (an image, a phrase, an object, a number).',
      '3. Tell the story, making sure to mention that detail clearly but without emphasizing it.',
      '4. At the end of the story, bring that detail back — reframe it, give it new meaning, or repeat it with a twist.',
      '5. Notice the effect. Callbacks create a sense of completeness and make audiences feel rewarded for paying attention.',
      '6. Practice with a different detail to see which callback lands strongest.'
    ],
    modifications: [
      'Easier: Write the beginning and ending first, then fill in the middle.',
      'Harder: In a group conversation or presentation, plant a callback in your opening and land it in your closing without scripting the middle.'
    ],
    completionCue: 'Narrative payoff achieved? Done.'
  },
  {
    id: 'story_stakes',
    name: 'Stakes Escalation',
    description: 'Raise the stakes progressively.',
    duration: 300,
    estimatedMinutes: 5,
    icon: TrendingUp,
    category: 'Storytelling',
    tags: ["storytelling", "stakes", "tension", "escalation", "engagement"],
    intention: 'Practice raising the stakes progressively within a story so listeners feel increasing investment and urgency.',
    setup: ['Think of a scenario that could escalate.'],
    steps: [
      '1. Start with a low-stakes scenario (e.g., "I was running late for a meeting.").',
      '2. Add a complication that raises the stakes one level (e.g., "...and it was the meeting where I was presenting to the CEO.").',
      '3. Add another complication that raises them again (e.g., "...and my laptop died in the elevator.").',
      '4. Deliver each escalation with slightly more urgency in your voice. Let the stakes build in your delivery, not just your words.',
      '5. Land on a resolution that addresses the highest stake, not the lowest.',
      '6. Retell the full story smoothly from start to finish.'
    ],
    modifications: [
      'Easier: Write out three levels of stakes before speaking.',
      'Harder: Start with a mundane scenario a partner gives you and improvise three escalations on the spot, keeping them believable.'
    ],
    completionCue: 'Tension effectively built? Done.'
  },
  {
    id: 'story_one_sentence',
    name: 'One-Sentence Story',
    description: 'Distill a story to its emotional core.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Target,
    category: 'Storytelling',
    tags: ["storytelling", "clarity", "concise", "hook", "focus", "quick"],
    intention: 'Distill a story to its emotional core in a single sentence, then expand from there. Clarity before complexity.',
    setup: ['Think of a meaningful experience.'],
    steps: [
      '1. Think of a meaningful experience or a point you want to make.',
      '2. Capture it in one sentence. Not a summary — a sentence that makes someone feel something (e.g., "I spent 10 years building something that took 10 seconds to lose.").',
      '3. Say it out loud. Does it land? Does it make someone want to ask \'what happened?\'',
      '4. If not, rewrite. Strip out abstractions. Make it concrete and specific.',
      '5. Once the single sentence works, use it as your hook and tell the full story behind it in under 90 seconds.',
      '6. The one-sentence version is your anchor — every detail in the longer version should serve it.'
    ],
    modifications: [
      'Easier: Look up famous one-sentence story examples for inspiration before writing your own.',
      'Harder: Write five one-sentence stories for five different experiences in under 3 minutes, then pick the strongest and expand it live.'
    ],
    completionCue: 'Emotional core captured? Done.'
  },
  {
    id: 'story_perspective_shift',
    name: 'Perspective Shift',
    description: 'Retell the same event from a different POV.',
    duration: 420,
    estimatedMinutes: 7,
    icon: Users,
    category: 'Storytelling',
    tags: ["storytelling", "perspective", "empathy", "active-listening", "depth"],
    intention: 'Retell the same event from a different person\'s point of view to build empathy and discover new angles in your stories.',
    setup: ['Pick a story involving at least two people.'],
    steps: [
      '1. Pick a story you already know well — ideally one involving at least two people.',
      '2. Tell it from your own perspective in about 60 seconds.',
      '3. Now retell the same event from the other person\'s perspective. What did they see? What were they feeling? What did they not know that you knew?',
      '4. Notice what details change, what new emotions emerge, and what becomes more interesting.',
      '5. Try telling a version that weaves both perspectives together, switching between them.',
      '6. Reflect: which version is most compelling for your intended audience?'
    ],
    modifications: [
      'Easier: Start with a simple, low-emotion event like a misunderstanding at a coffee shop.',
      'Harder: Retell from the perspective of someone you disagreed with, presenting their view as the sympathetic one.'
    ],
    completionCue: 'POV successfully shifted? Done.'
  },
  {
    id: 'story_rule_of_three',
    name: 'The Rule of Three',
    description: 'Structure points in groups of three for rhythm.',
    duration: 300,
    estimatedMinutes: 5,
    icon: LayoutGrid,
    category: 'Storytelling',
    tags: ["storytelling", "rule-of-three", "structure", "rhythm", "memorability"],
    intention: 'Structure examples, beats, or story points in groups of three for rhythm, memorability, and comedic or dramatic effect.',
    setup: ['Choose a lesson or point to teach.'],
    steps: [
      '1. Choose a point you want to make or a lesson you want to teach.',
      '2. Come up with three examples, anecdotes, or beats that illustrate it — each escalating in intensity or importance.',
      '3. Deliver them in sequence: the first sets the pattern, the second confirms the pattern, the third either breaks the pattern (for humor/surprise) or elevates it (for drama/impact).',
      '4. Pay attention to the rhythm of your delivery. The third beat should have a noticeably different energy — either a pause before it, a shift in tone, or a change in pace.',
      '5. Try a version where the third element is the twist/punchline, and another where it is the emotional peak.'
    ],
    modifications: [
      'Easier: Use a classic joke structure (setup, setup, punchline) as your template.',
      'Harder: Use the rule of three within an impromptu 2-minute talk on a topic a partner gives you.'
    ],
    completionCue: 'Rhythm and structure applied? Done.'
  },

  // --- Conflict Resolution ---
  {
    id: 'conflict_yes_and',
    name: 'Yes, And (De-escalation)',
    description: 'Defuse tension by acknowledging the other person\'s point before adding yours.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "de-escalation", "ego-management", "active-listening", "empathy"],
    intention: 'Defuse tension by acknowledging the other person\'s point before adding yours—removing the need for them to defend.',
    setup: ['Recall a recent disagreement.', 'Take a slow breath.'],
    steps: [
      '1. Think of a recent disagreement or criticism someone directed at you.',
      '2. Notice your instinct—was it to defend, correct, or explain yourself?',
      '3. Now reframe using "Yes, and": Acknowledge their point first ("Yes, I can see how that came across...") then add your perspective ("...and what I was trying to do was...").',
      '4. Practice this out loud with three different scenarios: a work criticism, a personal misunderstanding, and a small conflict.',
      '5. The key is removing your ego—you\'re not agreeing they\'re right, you\'re validating that you heard them.',
      '6. Reflect: which scenario felt hardest to say "yes" to? That\'s where your ego is strongest.'
    ],
    modifications: [
      'Easier: Write out both your defensive response and your "yes, and" response to see the difference visually.',
      'Harder: Use this technique live the next time someone criticizes you, without preparation. Notice how it changes their energy.'
    ],
    completionCue: 'Ego managed? Tension defused.'
  },
  {
    id: 'conflict_separate_person',
    name: 'Separate Person from Problem',
    description: 'Focus on the issue, not the individual, so the conversation stays productive.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "reframing", "professionalism", "clarity", "boundaries"],
    intention: 'Focus on the issue, not the individual, so the conversation stays productive instead of personal.',
    setup: ['Identify a conflict where you felt attacked.', 'Prepare to reframe.'],
    steps: [
      '1. Recall a conflict where you felt attacked or blamed by someone.',
      '2. Identify what the actual problem was versus how the person delivered the message.',
      '3. Practice restating the conflict in neutral, non-personal language: Replace "You always..." with "The issue is..." or "What happened was..."',
      '4. Say your reframed version out loud. Does it remove the emotional charge?',
      '5. Now imagine delivering this reframe to the other person. Keep your tone calm and matter-of-fact.',
      '6. Practice this reframing with two more conflicts—one from work, one from personal life.'
    ],
    modifications: [
      'Easier: Start with hypothetical conflicts instead of real ones to practice the language pattern.',
      'Harder: Next time you\'re in a heated conversation, pause and reframe in the moment: "I don\'t think this is about me or you—I think the issue is..." '
    ],
    completionCue: 'Issue isolated? Problem solving enabled.'
  },
  {
    id: 'conflict_pause',
    name: 'The Pause Before Response',
    description: 'Use strategic silence to prevent reactive responses.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "pause", "self-regulation", "impulse-control", "calm"],
    intention: 'Use strategic silence to prevent reactive responses and create space for thoughtful conflict resolution.',
    setup: ['Find a quiet moment or use a practice partner.'],
    steps: [
      '1. Think of a time you responded too quickly in a conflict and regretted it.',
      '2. Set a mental rule: When someone says something that triggers you, count to three before responding.',
      '3. Practice this physically: Have a partner say something mildly provocative (e.g., "You\'re always late"), and you pause for a full 3 seconds before replying.',
      '4. During those 3 seconds, take one deep breath and ask yourself: "What do they actually need to hear right now?"',
      '5. Respond from that calmer place. Notice how the quality of your response changes.',
      '6. Repeat with progressively more emotionally charged statements.'
    ],
    modifications: [
      'Easier: Practice the pause alone first by imagining triggering statements and counting before your mental response.',
      'Harder: Extend the pause to 5-7 seconds in live conflicts. Use the phrase "Let me think about that for a second" to make the silence feel intentional.'
    ],
    completionCue: 'Impulse controlled? Response measured.'
  },
  {
    id: 'conflict_i_statements',
    name: 'I-Statements (Non-Defensive Communication)',
    description: 'Express your perspective without blame, making it easier for the other person to hear you.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "non-violent-communication", "clarity", "vulnerability", "boundaries"],
    intention: 'Express your perspective without blame, making it easier for the other person to hear you.',
    setup: ['Think of a recurring frustration.', 'Have a notepad ready.'],
    steps: [
      '1. Pick a conflict where you felt hurt or frustrated by someone\'s behavior.',
      '2. Notice how you naturally want to frame it: "You did X" or "You made me feel Y."',
      '3. Rewrite using the I-Statement formula: "When [situation], I felt [emotion] because [need/impact]."',
      '4. Example: Instead of "You never listen to me," say "When I was talking earlier and the conversation shifted, I felt unheard because I really wanted your input on that."',
      '5. Practice saying three I-Statements out loud for three different conflicts.',
      '6. Notice how this removes accusation and invites collaboration instead of defense.'
    ],
    modifications: [
      'Easier: Use a fill-in-the-blank template to structure your I-Statements before saying them aloud.',
      'Harder: Deliver an I-Statement in real time during your next conflict, even when you\'re emotionally activated.'
    ],
    completionCue: 'Blame removed? Dialogue opened.'
  },
  {
    id: 'conflict_clarifying_questions',
    name: 'Clarifying Questions (Stop Assumptions)',
    description: 'Ask open questions to understand the other person\'s perspective before reacting.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "active-listening", "curiosity", "assumptions", "clarity"],
    intention: 'Ask open questions to understand the other person\'s perspective before defending or reacting.',
    setup: ['Identify a common misunderstanding.'],
    steps: [
      '1. Think of a recent conflict where you assumed you knew what the other person meant or wanted.',
      '2. Identify the assumption you made. Was it accurate? Did it escalate the conflict?',
      '3. Now practice asking clarifying questions instead: "Help me understand—what did you mean by that?" or "What would a good solution look like for you?"',
      '4. The goal is curiosity, not interrogation. Your tone should be genuinely open.',
      '5. Role-play with a partner: they state a vague complaint ("You don\'t respect my time"), and you ask 2-3 clarifying questions before responding.',
      '6. Reflect: did asking questions change what you thought the conflict was about?'
    ],
    modifications: [
      'Easier: Write out clarifying questions for past conflicts to build your question bank.',
      'Harder: In your next real conflict, commit to asking at least two questions before making any statement or defense.'
    ],
    completionCue: 'Assumptions cleared? Clarity achieved.'
  },
  {
    id: 'conflict_name_emotion',
    name: 'Name the Emotion (Yours and Theirs)',
    description: 'Acknowledge the emotional reality beneath the conflict to reduce defensiveness.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "emotional-intelligence", "empathy", "vulnerability", "regulation"],
    intention: 'Acknowledge the emotional reality beneath the conflict to create connection and reduce defensiveness.',
    setup: ['Center yourself.', 'Identify a felt emotion.'],
    steps: [
      '1. Recall a conflict that felt emotionally intense but was supposedly about something "small."',
      '2. Ask yourself: what emotion was I actually feeling? (e.g., disrespected, unseen, anxious, dismissed)',
      '3. Now guess: what emotion might the other person have been feeling?',
      '4. Practice saying both out loud: "I was feeling [your emotion], and I think you were feeling [their emotion]."',
      '5. Role-play with a partner: one person shares a conflict, the other tries to name both emotions accurately before offering any solution.',
      '6. Naming emotions disarms conflict faster than logic. Test this in your next disagreement.'
    ],
    modifications: [
      'Easier: Use an emotion wheel or list to help you identify emotions beyond "angry" or "upset."',
      'Harder: In a live conflict, name your emotion out loud to the other person first: "I\'m feeling really defensive right now." Watch how it shifts the dynamic.'
    ],
    completionCue: 'Emotion named? Dynamic shifted.'
  },
  {
    id: 'conflict_request_not_demand',
    name: 'Request, Not Demand',
    description: 'Frame what you need as a request instead of a demand to invite collaboration.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "boundaries", "assertiveness", "collaboration", "clarity"],
    intention: 'Frame what you need as a request instead of a demand to invite collaboration, not resistance.',
    setup: ['Identify a need.', 'Practice a soft opening.'],
    steps: [
      '1. Think of something you want someone to do differently (e.g., reply faster, listen more, follow through).',
      '2. Notice how you\'d naturally say it. Does it sound like a demand? ("You need to..." / "You should...")',
      '3. Reframe as a request using this structure: "Would you be willing to [specific behavior]? It would help me because [reason]."',
      '4. Example: Instead of "You need to text me back faster," try "Would you be willing to send a quick reply when you see my message, even if it\'s just to say you\'ll respond later? It helps me feel less anxious."',
      '5. Practice making three requests out loud for three different needs.',
      '6. Notice how requests create space for negotiation; demands create resistance.'
    ],
    modifications: [
      'Easier: Write out the request first, then practice saying it in a calm, non-urgent tone.',
      'Harder: Make a request in real time during a conflict without pre-scripting it, and stay open to hearing "no."'
    ],
    completionCue: 'Request delivered? Door open for negotiation.'
  },
  {
    id: 'conflict_apologize_no_but',
    name: 'Apologize Without "But"',
    description: 'Deliver a clean, complete apology that repairs trust.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "accountability", "apology", "repair", "trust"],
    intention: 'Deliver a clean, complete apology that repairs trust instead of defending yourself.',
    setup: ['Own your actions.', 'Remove the caveats.'],
    steps: [
      '1. Think of a time you hurt someone or made a mistake in a relationship.',
      '2. Notice your instinct—did you want to explain, justify, or add "but I didn\'t mean to" or "but you also..."?',
      '3. Practice a three-part apology: (1) "I\'m sorry for [specific behavior]." (2) "I understand that it [impact on them]." (3) "Going forward, I\'ll [corrective action]."',
      '4. Example: "I\'m sorry for interrupting you during the meeting. I understand that it made you feel disrespected. Going forward, I\'ll wait until you\'re done before I jump in."',
      '5. Say it out loud. Did you add a "but"? If so, remove it and try again.',
      '6. A real apology has no defense in it. It just acknowledges harm and commits to change.'
    ],
    modifications: [
      'Easier: Write out the three parts separately, then practice combining them smoothly.',
      'Harder: Deliver this apology to someone you\'ve actually hurt, in person or via message, within the next 48 hours.'
    ],
    completionCue: 'Apology cleaned? Trust repair begun.'
  },
  {
    id: 'conflict_shared_need',
    name: 'Find the Shared Need',
    description: 'Shift from opposing positions to shared interests.',
    duration: 420,
    estimatedMinutes: 7,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "negotiation", "collaboration", "win-win", "empathy"],
    intention: 'Shift from opposing positions to shared interests so both people feel they can win.',
    setup: ['Map the conflict.', 'Dig beneath the surface.'],
    steps: [
      '1. Think of a conflict where you and someone else wanted different things (e.g., you wanted quiet, they wanted to play music).',
      '2. Identify your positions (what each person said they wanted).',
      '3. Now dig deeper: what need was each position trying to meet? (e.g., your need: focus; their need: energy/mood boost)',
      '4. Ask: is there a solution that meets both needs? (e.g., they use headphones, or you work in a different room, or they play music at certain times)',
      '5. Practice this with three past conflicts: position → underlying need → creative solution.',
      '6. Shared needs create collaboration; opposing positions create war.'
    ],
    modifications: [
      'Easier: Use a worksheet to map positions vs. needs visually before brainstorming solutions.',
      'Harder: In your next conflict, ask the other person directly: "What do you actually need here?" and share your need too before proposing solutions.'
    ],
    completionCue: 'Common ground found? Win-win possible.'
  },
  {
    id: 'conflict_repair',
    name: 'Repair After the Storm',
    description: 'Re-establish connection after a heated conflict by taking responsibility.',
    duration: 240,
    estimatedMinutes: 4,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ["conflict-resolution", "repair", "accountability", "connection", "humility"],
    intention: 'Re-establish connection after a heated conflict by taking responsibility for your part, regardless of who was \'right.\'',
    setup: ['Identify an escalated conflict.', 'Prepare a bridge.'],
    steps: [
      '1. Think of a conflict that escalated and left both people feeling bad.',
      '2. Identify one thing you did that didn\'t help (raised your voice, shut down, brought up old issues, etc.).',
      '3. Reach out within 24 hours with a repair statement: "Hey, I didn\'t handle that well. I [specific behavior] and I\'m sorry. Can we talk?"',
      '4. The goal isn\'t to rehash the argument—it\'s to re-open the relationship.',
      '5. Practice saying a repair statement out loud for three past conflicts.',
      '6. Repair isn\'t about who was right. It is about choosing connection over being right.'
    ],
    modifications: [
      'Easier: Send the repair message via text first if face-to-face feels too vulnerable.',
      'Harder: Make the repair in person immediately after a conflict, before your pride hardens.'
    ],
    completionCue: 'Bridge built? Connection re-established.'
  },

  // --- Public Speaking ---
  {
    id: 'speaking_extemporaneous',
    name: 'Extemporaneous Delivery',
    description: 'Speak from notes, not a script, for a more natural feel.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Presentation,
    category: 'Public Speaking',
    tags: ['public-speaking', 'confidence'],
    intention: 'Develop a natural, engaging delivery by relying on key points rather than a rigid script.',
    setup: ['Prepare a 3-point outline on a topic you know well.'],
    steps: [
      '1. Review your outline for 1 minute.',
      '2. Speak for 2 minutes using ONLY your outline as a guide.',
      '3. Focus on eye contact and natural gestures.',
      '4. If you lose your place, pause, breathe, and check your notes.',
      '5. Record yourself and listen for "um" and "uh" counts.'
    ],
    modifications: [
      'Easier: Use a highly detailed outline with sub-points.',
      'Harder: Use only 3 single words as your entire outline.'
    ],
    completionCue: 'Delivery felt conversational? Done.'
  },
  {
    id: 'speaking_power_pose',
    name: 'The Power Pose',
    description: 'Boost confidence and lower stress hormones before speaking.',
    duration: 120,
    estimatedMinutes: 2,
    icon: User,
    category: 'Public Speaking',
    tags: ['public-speaking', 'confidence', 'quick'],
    intention: 'Physically prime your body for confidence and reduce performance anxiety.',
    setup: ['Find a private space.'],
    steps: [
      '1. Stand tall with feet wide apart.',
      '2. Hands on hips or reaching high in a "V" shape.',
      '3. Chin tilted slightly up.',
      '4. Hold for 2 full minutes.',
      '5. Focus on slow, deep breaths.'
    ],
    modifications: [
      'Easier: Just focus on standing tall with arms wide.',
      'Harder: Combine with positive visualizations of your successful talk.'
    ],
    completionCue: 'Feeling more expansive and capable? Ready.'
  }
];
