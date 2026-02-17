
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
  History, Video as VideoIcon, Mic, ThumbsUp, Camera,
  Smartphone, Hash, TextCursorInput, PersonStanding,
  PenTool, Music
} from 'lucide-react';
import type { Exercise } from './exercises';

export type CommunicationCategory = 
  | 'Vocal Mechanics' 
  | 'Active Listening' 
  | 'Nonverbal' 
  | 'Conversation Structure' 
  | 'Persuasion' 
  | 'clarity_language_craft' 
  | 'Storytelling' 
  | 'difficult_conversations' 
  | 'Public Speaking' 
  | 'professional_communication' 
  | 'Custom';

export const communicationPractices: Exercise[] = [
  // --- Vocal Mechanics (7) ---
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

  // --- Active Listening (7) ---
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

  // --- Nonverbal (6) ---
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

  // --- Conversation Structure (6) ---
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

  // --- Persuasion (7) ---
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

  // --- Clarity & Language Craft (21) ---
  {
    id: 'clarity_concrete',
    name: 'Concrete Language Swap',
    description: 'Replace vague abstractions with specific, tangible words.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Target,
    category: 'clarity_language_craft',
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
    category: 'clarity_language_craft',
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
    category: 'clarity_language_craft',
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
    category: 'clarity_language_craft',
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
    category: 'clarity_language_craft',
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
    category: 'clarity_language_craft',
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
  {
    id: 'clarity_alliteration',
    name: "Alliteration Chains",
    description: "Train your brain to find and deploy alliterative patterns.",
    duration: 360,
    estimatedMinutes: 6,
    icon: MessageSquare,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "alliteration", "rhythm", "memorability", "wordplay"],
    intention: "Train your brain to find and deploy alliterative patterns that make your language more memorable and rhythmic.",
    setup: ["Pick a random letter (e.g., 'S'). Set a timer for 2 minutes."],
    steps: [
      "1. Pick a random letter (e.g., 'S'). Set a timer for 2 minutes.",
      "2. Write or speak a full sentence where every major word starts with that letter. Example: 'Silent shadows slithered slowly, seeking shelter.'",
      "3. Pick a new letter and create a sentence about a specific topic (e.g., letter 'P,' topic 'work'). Example: 'Persistent professionals push past problems patiently.'",
      "4. Do this for 5 different letters. Focus on making the sentences actually mean something, not just sound pretty.",
      "5. Read your sentences out loud. Notice how alliteration creates rhythm and emphasis.",
      "6. In your next piece of writing or speech, try to naturally incorporate one alliterative phrase where it adds impact."
    ],
    modifications: [
      "Make it easier: Start with just 3-4 alliterative words per sentence instead of every word.",
      "Make it harder: Create a full paragraph (4-5 sentences) where the majority of words share the same starting sound."
    ],
    completionCue: "Alliterative rhythm mastered."
  },
  {
    id: 'clarity_syllable',
    name: "Syllable Pacing (Rhythm Control)",
    description: "Develop awareness of syllabic rhythm.",
    duration: 420,
    estimatedMinutes: 7,
    icon: Clock,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "rhythm", "pacing", "syllables", "flow"],
    intention: "Develop awareness of syllabic rhythm so you can control the pace and flow of your speech or writing.",
    setup: ["Write or say a simple sentence: 'I walked to the store.' (6 syllables)"],
    steps: [
      "1. Write or say a simple sentence: 'I walked to the store.' (6 syllables)",
      "2. Rewrite it with exactly 10 syllables: 'I walked slowly down the street to the corner store.'",
      "3. Rewrite it with exactly 4 syllables: 'I went to shop.'",
      "4. Notice how syllable count changes the feeling: short = punchy, urgent; long = flowing, descriptive.",
      "5. Take a paragraph you've written. Count the syllables in each sentence. Are they all similar length? Mix them up: short, long, medium, short.",
      "6. Read it out loud. Does the varied rhythm keep it more interesting?"
    ],
    modifications: [
      "Make it easier: Use an online syllable counter tool to help you as you practice adjusting sentence lengths.",
      "Make it harder: Write a full paragraph where you intentionally alternate between sentences of 5, 15, 5, 15 syllables to create dramatic rhythm."
    ],
    completionCue: "Rhythmic flow established."
  },
  {
    id: 'clarity_rhyme',
    name: "Rhyme Scheme Construction",
    description: "Build your ability to find and use rhyme deliberately.",
    duration: 480,
    estimatedMinutes: 8,
    icon: Sparkles,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "rhyme", "memorability", "creativity", "wordplay"],
    intention: "Build your ability to find and use rhyme deliberately, not just in poetry but in memorable phrases and speeches.",
    setup: ["Pick a simple word: 'light.'"],
    steps: [
      "1. Pick a simple word: 'light.' List 10 words that rhyme with it (fight, night, sight, bright, flight, etc.).",
      "2. Create a 4-line AABB rhyme scheme: Lines 1 and 2 rhyme, lines 3 and 4 rhyme.",
      "3. Try a different scheme (ABAB): Lines 1 and 3 rhyme, lines 2 and 4 rhyme.",
      "4. Don't worry about perfection — focus on finding rhymes quickly.",
      "5. Challenge: Take a key point from a presentation or argument and express it as a memorable rhyming couplet."
    ],
    modifications: [
      "Make it easier: Use a rhyming dictionary or online tool to help find rhymes as you practice.",
      "Make it harder: Write an 8-line poem with an ABCB DEFE rhyme scheme on a topic you're currently working on."
    ],
    completionCue: "Rhyme patterns ready."
  },
  {
    id: 'clarity_metaphor',
    name: "Metaphor Mining",
    description: "Create vivid, original metaphors for abstract ideas.",
    duration: 420,
    estimatedMinutes: 7,
    icon: Eye,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "metaphor", "imagery", "creativity", "clarity"],
    intention: "Strengthen your ability to create vivid, original metaphors that make abstract ideas concrete and memorable.",
    setup: ["Pick an abstract concept: 'stress,' 'growth,' 'communication,' 'change.'"],
    steps: [
      "1. Pick an abstract concept: 'stress,' 'growth,' 'communication,' 'change.'",
      "2. Ask: What does this feel like? Look like? Sound like? Smell like?",
      "3. Create 5 different metaphors for your concept.",
      "4. Eliminate clichés. Which metaphors feel fresh? Which have you heard before?",
      "5. Practice using one original metaphor in conversation or writing today."
    ],
    modifications: [
      "Make it easier: Start by listing 10 concrete objects, then match each one to an abstract concept (e.g., 'river = time').",
      "Make it harder: Take a complex idea from your work and create an extended metaphor (2-3 sentences) that explains it to someone unfamiliar."
    ],
    completionCue: "Imagery refined."
  },
  {
    id: 'clarity_vocabulary_constraint',
    name: "Vocabulary Constraint Writing",
    description: "Expand your vocabulary through intentional word restrictions.",
    duration: 480,
    estimatedMinutes: 8,
    icon: Pencil,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "vocabulary", "precision", "writing", "constraint"],
    intention: "Expand your vocabulary by forcing yourself to express ideas without relying on common, overused words.",
    setup: ["List banned words: good, bad, very, really, thing, stuff, nice, get, make, do, have, like, just."],
    steps: [
      "1. Write a paragraph (5-7 sentences) about your day, a recent experience, or an opinion you hold.",
      "2. Rewrite that paragraph without using any of these banned words: good, bad, very, really, thing, stuff, nice, get, make, do, have, like (as filler), just.",
      "3. You'll be forced to find more specific, precise language. 'It was a very good meal' becomes 'The meal was exceptional.'",
      "4. Read both versions out loud. The second should feel sharper and more vivid.",
      "5. Try this constraint in your next email, text, or piece of writing."
    ],
    modifications: [
      "Make it easier: Start by banning just 3-5 of the most common words, then expand the list as you improve.",
      "Make it harder: Write for 5 minutes on any topic without using the 100 most common words in English."
    ],
    completionCue: "Vocabulary expanded."
  },
  {
    id: 'clarity_sentence_shape',
    name: "Sentence Shape Variation",
    description: "Break monotonous rhythm by varying sentence length.",
    duration: 420,
    estimatedMinutes: 7,
    icon: Activity,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "sentence-structure", "rhythm", "variety", "engagement"],
    intention: "Break monotonous rhythm by intentionally varying sentence length and structure for dynamic delivery.",
    setup: ["Write or find a paragraph you've written recently."],
    steps: [
      "1. Write or find a paragraph you've written recently. Count the words in each sentence.",
      "2. If they're all 12-18 words, you have monotone rhythm.",
      "3. Rewrite using this pattern: Long (20+ words). Short (3-7 words). Medium (10-15 words). Short. Long. Medium.",
      "4. Read both versions out loud. The varied version should feel more dynamic and engaging.",
      "5. Apply this to your next email or speech draft."
    ],
    modifications: [
      "Make it easier: Mark your sentences as S, M, or L and aim for variation without rewriting yet.",
      "Make it harder: Write a full page where no two consecutive sentences are the same length category."
    ],
    completionCue: "Sentence rhythm varied."
  },
  {
    id: 'clarity_sound_symbolism',
    name: "Sound Symbolism",
    description: "Use words that sound like what they mean.",
    duration: 360,
    estimatedMinutes: 6,
    icon: Ear,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "sound", "imagery", "sensory", "onomatopoeia"],
    intention: "Use words that sound like what they mean to create more visceral, sensory language.",
    setup: ["Write a short description (3-4 sentences) of a scene."],
    steps: [
      "1. Write a short description (3-4 sentences) of a scene: a busy street, quiet forest, tense conversation, or celebration.",
      "2. First pass: write it plainly. 'The street was loud. Cars went by. People talked.'",
      "3. Second pass: rewrite using sound-symbolic words. 'The street roared with traffic. Cars whooshed past. Voices buzzed and chattered.'",
      "4. Read both out loud. The second should feel more immersive.",
      "5. Challenge: Describe an emotion using only sound-symbolic and sensory words."
    ],
    modifications: [
      "Make it easier: Make a list of 20 onomatopoeia words first, then use them in your descriptions.",
      "Make it harder: Write a full paragraph describing a complex experience using as many sound-symbolic words as possible without overloading it."
    ],
    completionCue: "Sensory language applied."
  },
  {
    id: 'clarity_word_association',
    name: "Word Association Speed Drill",
    description: "Increase mental flexibility in finding related words.",
    duration: 300,
    estimatedMinutes: 5,
    icon: Zap,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "vocabulary", "speed", "association", "fluency"],
    intention: "Increase your mental flexibility and speed in finding related words, synonyms, and verbal connections.",
    setup: ["Set a timer for 60 seconds. Pick a starting word: 'fire.'"],
    steps: [
      "1. Set a timer for 60 seconds. Pick a starting word: 'fire.'",
      "2. Say or write as many related words as you can: burn, heat, flame, smoke, ash, ember, spark, blaze, inferno, warmth, light...",
      "3. Don't filter or judge — just let your brain free-associate.",
      "4. Count how many you got. Try again with a new word. Beat your count.",
      "5. Do this daily with random words. Your retrieval speed will increase, making you more articulate in real-time."
    ],
    modifications: [
      "Make it easier: Give yourself 90 seconds instead of 60, or allow pauses between words.",
      "Make it harder: Do the drill out loud without writing, and each new word must start with the last letter of the previous word."
    ],
    completionCue: "Mental speed increased."
  },
  {
    id: 'clarity_synonym_replacement',
    name: "Synonym Replacement",
    description: "Choose the most precise word instead of the first one.",
    duration: 480,
    estimatedMinutes: 8,
    icon: ArrowLeftRight,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "vocabulary", "precision", "synonyms", "clarity"],
    intention: "Train yourself to choose the most precise word instead of settling for the first one that comes to mind.",
    setup: ["Write a paragraph about anything: a belief, an experience, a process."],
    steps: [
      "1. Write a paragraph about anything: a belief, an experience, a process.",
      "2. Circle every verb and adjective.",
      "3. For each circled word, generate 3 synonyms. Example: 'walked' → 'strolled,' 'marched,' 'wandered.'",
      "4. Ask: which synonym most accurately captures what I mean? Replace the original if a better word exists.",
      "5. 'I walked to the meeting' → 'I rushed to the meeting' (if late) or 'I wandered to the meeting' (if relaxed).",
      "6. Precision makes your language powerful. Practice this weekly."
    ],
    modifications: [
      "Make it easier: Use a thesaurus to help generate synonym options, then choose the best fit.",
      "Make it harder: Do this in real-time while speaking — catch yourself mid-sentence and replace a generic word with a precise one."
    ],
    completionCue: "Precision practiced."
  },
  {
    id: 'clarity_cadence_mimicry',
    name: "Cadence Mimicry",
    description: "Study and imitate the verbal rhythms of masters.",
    duration: 540,
    estimatedMinutes: 9,
    icon: Mic2,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "cadence", "rhythm", "imitation", "mastery"],
    intention: "Study and imitate the verbal rhythms of great speakers and writers to internalize effective cadence patterns.",
    setup: ["Find a short passage (1-2 minutes) from a speaker or writer you admire."],
    steps: [
      "1. Find a short passage (1-2 minutes) from a speaker or writer you admire.",
      "2. Listen or read it multiple times. Pay attention to sentence length, pauses, repetition, emphasis.",
      "3. Write out a few sentences exactly as they structured them. Notice the pattern.",
      "4. Take something you're working on and rewrite 2-3 sentences mimicking their cadence.",
      "5. Example (mimicking MLK's repetition): 'We must speak with clarity. We must speak with courage. We must speak with conviction.'",
      "6. Read your version out loud. Does it carry the same weight?"
    ],
    modifications: [
      "Make it easier: Start by just reading the passage out loud multiple times to feel the rhythm before mimicking it.",
      "Make it harder: Rewrite an entire opening paragraph of a speech or article in the cadence style of your chosen speaker."
    ],
    completionCue: "Cadence internalised."
  },
  {
    id: 'clarity_specificity',
    name: "Concrete vs Abstract",
    description: "Replace vague language with specific, concrete details.",
    duration: 420,
    estimatedMinutes: 7,
    icon: Target,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "specificity", "clarity", "imagery", "precision"],
    intention: "Replace vague, abstract language with concrete, specific details that create vivid mental images.",
    setup: ["Write 5 abstract sentences: 'It was a good day.' 'She was upset.' 'The place was nice.' 'He worked hard.' 'The food was amazing.'"],
    steps: [
      "1. Abstract: 'The meeting was bad.' Concrete: 'The meeting ran 45 minutes over, three people interrupted constantly, and no decisions were made.'",
      "2. Write 5 abstract sentences: 'It was a good day.' 'She was upset.' 'The place was nice.' 'He worked hard.' 'The food was amazing.'",
      "3. Rewrite each one with concrete, specific details. Replace vague adjectives with sensory details, numbers, actions.",
      "4. 'She was upset' → 'She slammed her laptop shut and left without saying goodbye.'",
      "5. Read both versions. The concrete version creates a movie in your mind.",
      "6. In your next writing or conversation, catch yourself using abstract language and immediately add concrete detail."
    ],
    modifications: [
      "Make it easier: Practice with written examples first before trying to speak more concretely in real-time.",
      "Make it harder: Go one full day where every time someone asks 'How was X?' you respond only with concrete details."
    ],
    completionCue: "Language sharpened."
  },
  {
    id: 'clarity_parallel_structure',
    name: "Parallel Structure",
    description: "Use parallel patterns for rhythm and emphasis.",
    duration: 420,
    estimatedMinutes: 7,
    icon: LayoutGrid,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "rhetoric", "repetition", "emphasis", "memorability"],
    intention: "Use parallel sentence structures to create rhythm, emphasis, and memorability in your speech or writing.",
    setup: ["Pick a point you want to make strongly. Write it as three parallel sentences."],
    steps: [
      "1. Parallel structure = repeating the same grammatical pattern for emphasis. 'I came. I saw. I conquered.'",
      "2. Pick a point you want to make strongly. Write it as three parallel sentences.",
      "3. Example: 'We need leaders who listen. We need leaders who act. We need leaders who care.'",
      "4. Try different patterns: 'If we [action], then we [result].' or 'This is not about [X]. This is about [Y].'",
      "5. Practice creating parallel structures for 3 different points or arguments.",
      "6. Use this technique in your next presentation, email, or important conversation."
    ],
    modifications: [
      "Make it easier: Start by filling in pre-made templates before creating your own parallel structures.",
      "Make it harder: Write or deliver a full 2-minute speech where every major point uses parallel structure."
    ],
    completionCue: "Structure reinforced."
  },
  {
    id: 'clarity_qualifiers',
    name: "Eliminate Qualifiers",
    description: "Remove hedging words that weaken your message.",
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldCheck,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "confidence", "clarity", "precision", "qualifiers"],
    intention: "Remove hedging words that weaken your message and make you sound uncertain.",
    setup: ["Write or record yourself speaking about an opinion or idea you hold."],
    steps: [
      "1. Qualifiers dilute your language: 'kind of,' 'sort of,' 'maybe,' 'I think,' 'possibly,' 'probably,' 'just,' 'actually.'",
      "2. Write or record yourself speaking about an opinion or idea you hold.",
      "3. Highlight every qualifier. 'I kind of think that maybe we should probably consider...'",
      "4. Rewrite with all qualifiers removed: 'We should consider...'",
      "5. Notice how much stronger and clearer it sounds.",
      "6. Exception: Sometimes uncertainty is honest. But most qualifiers are just fear of commitment.",
      "7. For one week, catch yourself using qualifiers in conversation and rephrase without them."
    ],
    modifications: [
      "Make it easier: Start by removing qualifiers only in writing, where you have time to edit.",
      "Make it harder: Record a 5-minute talk and remove every qualifier in your transcription — then deliver the stronger version."
    ],
    completionCue: "Hedging eliminated."
  },
  {
    id: 'clarity_active_voice_craft',
    name: "Active Voice Conversion (Energy & Agency)",
    description: "Transform passive constructions into active voice.",
    duration: 360,
    estimatedMinutes: 6,
    icon: User,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "active-voice", "clarity", "energy", "accountability"],
    intention: "Transform passive constructions into active voice to make your language more direct, energetic, and clear.",
    setup: ["Find or write 5 passive voice sentences."],
    steps: [
      "1. Passive voice obscures the actor and drains energy: 'Mistakes were made' (by whom?).",
      "2. Active voice is direct: 'We made mistakes.'",
      "3. Find or write 5 passive voice sentences: 'The report was completed by the team.' 'The decision was made.' 'The issue is being addressed.'",
      "4. Convert each to active: 'The team completed the report.' 'We made the decision.' 'We are addressing the issue.'",
      "5. Read both versions out loud. Active voice feels more alive and accountable.",
      "6. In your next piece of writing, scan for 'was,' 'were,' 'is being,' 'has been' and convert to active."
    ],
    modifications: [
      "Make it easier: Use a grammar tool to identify passive voice in your writing first.",
      "Make it harder: Go one week writing and speaking exclusively in active voice."
    ],
    completionCue: "Energy restored."
  },
  {
    id: 'clarity_contrast_pairing',
    name: "Contrast Pairing",
    description: "Use contrasting ideas side-by-side for impact.",
    duration: 420,
    estimatedMinutes: 7,
    icon: ArrowLeftRight,
    category: 'clarity_language_craft',
    tags: ["verbal-craft", "contrast", "rhetoric", "juxtaposition", "emphasis"],
    intention: "Use contrasting ideas side-by-side to create memorable, impactful language.",
    setup: ["Pick an idea you want to communicate. Create 3 contrast pairs."],
    steps: [
      "1. Contrast makes ideas stick: 'Ask not what your country can do for you — ask what you can do for your country.'",
      "2. The pattern: [Not this] but [that]. [This], not [that]. [This] versus [that].",
      "3. Pick an idea you want to communicate. Create 3 contrast pairs.",
      "4. Example: 'We don't need more meetings. We need more action.' or 'Success isn't about working harder. It's about working smarter.'",
      "5. Practice saying each one out loud with emphasis on the contrasting elements.",
      "6. Contrast clarifies your position by showing what you reject and what you embrace.",
      "7. Use one contrast pair in your next pitch, presentation, or argument."
    ],
    modifications: [
      "Make it easier: Start by converting existing statements into contrast pairs using the templates above.",
      "Make it harder: Build a full 3-minute talk where every major point is delivered as a contrasting pair."
    ],
    completionCue: "Juxtaposition applied."
  },

  // --- Storytelling (13) ---
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
      'Make it easier: Just use "Before, Then, After" structure.',
      'Make it harder: Include a sensory detail in the setup.'
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
    intention: "Learn to grab attention in your first sentence so listeners lean in instead of tuning out.",
    setup: ["Pick a short personal story or anecdote (30 seconds max)."],
    steps: [
      "1. Pick a short personal story or anecdote (30 seconds max).",
      "2. Identify the most surprising, emotional, or curiosity-provoking moment in that story.",
      "3. Write an opening sentence that drops the listener directly into that moment (e.g., \"I was standing on stage and completely forgot my name.\").",
      "4. Deliver the hook out loud, then pause for 2 full seconds before continuing.",
      "5. Tell the rest of the story, noticing how the hook reframes everything that follows.",
      "6. Try 2 more variations of the hook for the same story — one question-based, one sensory."
    ],
    modifications: [
      "Make it easier: Use a well-known story or movie plot instead of a personal one.",
      "Make it harder: Deliver the hook cold to someone and ask them what they expected the story to be about. Adjust based on their response."
    ],
    completionCue: "Opening sharp and compelling? Done."
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
    intention: "Use the power of contrast to make your point land with emotional impact.",
    setup: ["Choose a message or lesson you want to communicate."],
    steps: [
      "1. Choose a message or lesson you want to communicate.",
      "2. Describe the 'before' state — the problem, the struggle, or the old way of thinking. Use vivid, specific language.",
      "3. Pause. Let the 'before' sit with the listener for a beat.",
      "4. Now deliver the 'after' — the shift, the realization, the new state. Make your voice, pace, or energy shift noticeably to mark the contrast.",
      "5. Repeat the exercise, exaggerating the contrast between before and after even more.",
      "6. Reflect: where in the flip did you feel the most tension release?"
    ],
    modifications: [
      "Make it easier: Write out both the before and after statements first, then read them aloud.",
      "Make it harder: Improvise the contrast live on a random topic given by a partner."
    ],
    completionCue: "Contrast delivered clearly? Done."
  },
  {
    id: 'story_pause',
    name: 'The Pause for Power',
    description: 'Use strategic silence within a story to build tension.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Clock,
    category: 'Storytelling',
    tags: ["storytelling", "pause", "tension", "vocal-delivery", "presence"],
    intention: "Use strategic silence within a story to build tension, emphasize key moments, and hold attention.",
    setup: ["Take a 1-minute story you can already tell comfortably."],
    steps: [
      "1. Take a 1-minute story you can already tell comfortably.",
      "2. Identify three key moments: the setup, the turning point, and the payoff.",
      "3. Tell the story and insert a deliberate 2–3 second pause right before each key moment.",
      "4. Notice how the pause changes the weight of what comes after it.",
      "5. Now try a longer pause (4–5 seconds) before the single most important line. Resist the urge to fill the silence.",
      "6. Record yourself or tell it to someone — ask which pause felt most powerful."
    ],
    modifications: [
      "Make it easier: Start with just one pause before the ending/payoff line only.",
      "Make it harder: Tell a story where you use at least five intentional pauses of varying lengths, using silence as a rhythm tool throughout."
    ],
    completionCue: "Silence used for emphasis? Done."
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
    intention: "Vary your pitch, pace, and volume within a story to keep listeners emotionally engaged.",
    setup: ["Pick a short story or anecdote (under 2 minutes)."],
    steps: [
      "1. Pick a short story or anecdote (under 2 minutes).",
      "2. Tell it once at your normal speaking style. Notice where your voice stays flat.",
      "3. Now retell it with these rules: slow down and get quieter during emotional or serious moments; speed up and raise energy during exciting or fast-paced moments; drop your pitch when delivering a key insight or punchline.",
      "4. Exaggerate the dynamics to 150% of what feels natural. It will feel like too much — that is the point.",
      "5. Dial it back to about 120% of natural. This is your new baseline.",
      "6. Practice once more and notice how the dynamics guide the listener's emotions."
    ],
    modifications: [
      "Make it easier: Focus on varying just one element (pace OR volume OR pitch) rather than all three.",
      "Make it harder: Record yourself telling the story and listen back, identifying at least 2 moments where you could push the dynamics further. Re-record."
    ],
    completionCue: "Vocal range expanded? Done."
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
    intention: "Use a simple fill-in-the-blank framework to quickly structure any story with a clear arc.",
    setup: ["Complete these prompts in order, speaking out loud:"],
    steps: [
      "1. Complete these prompts in order, speaking out loud:",
      "   - \"Once upon a time...\" (set the scene/character)",
      "   - \"Every day...\" (establish the routine/normal)",
      "   - \"But one day...\" (introduce the disruption)",
      "   - \"Because of that...\" (first consequence)",
      "   - \"Because of that...\" (escalation)",
      "   - \"Until finally...\" (climax/resolution)",
      "   - \"And ever since then...\" (the new normal/lesson)",
      "2. Keep each section to 1–2 sentences maximum.",
      "3. Now retell the whole thing as a fluid story without the prompts.",
      "4. Reflect: did the structure make the story feel more complete?"
    ],
    modifications: [
      "Make it easier: Write out each section first before speaking.",
      "Make it harder: A partner gives you a random topic and you complete the story spine improvisationally in under 90 seconds."
    ],
    completionCue: "Story arc established? Done."
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
    intention: "Learn to open multiple story threads and close them in reverse order, creating satisfying narrative depth.",
    setup: ["Think of two short, related stories that connect to a theme."],
    steps: [
      "1. Think of two short, related stories or examples that connect to a single theme or point.",
      "2. Begin telling Story A, but stop at a cliffhanger or moment of tension.",
      "3. Transition into Story B with a bridging phrase (e.g., \"That reminds me of...\" or \"Meanwhile...\").",
      "4. Complete Story B fully, landing on its insight or conclusion.",
      "5. Return to Story A and complete it. The listener now hears Story A's ending with Story B's lesson still fresh in their mind.",
      "6. Reflect: did the nesting make the overall message stronger? Where was the transition smoothest?"
    ],
    modifications: [
      "Make it easier: Write out both stories and the transition phrases before speaking.",
      "Make it harder: Use three nested stories (A → B → C → close C → close B → close A). Keep total time under 3 minutes."
    ],
    completionCue: "Narrative loops closed? Done."
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
    intention: "Transport your listener into the moment by engaging specific senses instead of summarizing what happened.",
    setup: ["Think of a moment from your life that was emotionally vivid."],
    steps: [
      "1. Think of a moment from your life that was emotionally vivid.",
      "2. Describe it using only sensory details. No opinions, no labels, no emotions by name. Just what you saw, heard, felt physically, smelled, or tasted.",
      "3. Speak for 30–45 seconds of pure sensory description.",
      "4. Now add one sentence at the end that names the emotion or insight.",
      "5. Notice how the sensory setup made that final line hit differently than if you had just said the emotion up front.",
      "6. Try again with a different moment, aiming to include at least 3 different senses."
    ],
    modifications: [
      "Make it easier: Focus on just two senses (sight + sound) to start.",
      "Make it harder: Describe the scene without ever naming the emotion — let the listener infer it entirely from the sensory details. Ask them what they felt."
    ],
    completionCue: "Scene vividly rendered? Done."
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
    intention: "Plant a detail early in your story and bring it back at the end for a satisfying payoff that makes your message memorable.",
    setup: ["Choose a story or talking point you use often."],
    steps: [
      "1. Choose a story or talking point you use often.",
      "2. Identify a small, specific detail near the beginning (an image, a phrase, an object, a number).",
      "3. Tell the story, making sure to mention that detail clearly but without emphasizing it.",
      "4. At the end of the story, bring that detail back — reframe it, give it new meaning, or repeat it with a twist.",
      "5. Notice the effect. Callbacks create a sense of completeness and make audiences feel rewarded for paying attention.",
      "6. Practice with a different detail to see which callback lands strongest."
    ],
    modifications: [
      "Make it easier: Write the beginning and ending first, then fill in the middle.",
      "Make it harder: In a group conversation or presentation, plant a callback in your opening and land it in your closing without scripting the middle."
    ],
    completionCue: "Narrative payoff achieved? Done."
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
    intention: "Practice raising the stakes progressively within a story so listeners feel increasing investment and urgency.",
    setup: ["Think of a scenario that could escalate."],
    steps: [
      "1. Start with a low-stakes scenario (e.g., \"I was running late for a meeting.\").",
      "2. Add a complication that raises the stakes one level (e.g., \"...and it was the meeting where I was presenting to the CEO.\").",
      "3. Add another complication that raises them again (e.g., \"...and my laptop died in the elevator.\").",
      "4. Deliver each escalation with slightly more urgency in your voice. Let the stakes build in your delivery, not just your words.",
      "5. Land on a resolution that addresses the highest stake, not the lowest.",
      "6. Retell the full story smoothly from start to finish."
    ],
    modifications: [
      "Make it easier: Write out three levels of stakes before speaking.",
      "Make it harder: Start with a mundane scenario a partner gives you and improvise three escalations on the spot, keeping them believable."
    ],
    completionCue: "Tension effectively built? Done."
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
    intention: "Distill a story to its emotional core in a single sentence, then expand from there. Clarity before complexity.",
    setup: ["Think of a meaningful experience."],
    steps: [
      "1. Think of a meaningful experience or a point you want to make.",
      "2. Capture it in one sentence. Not a summary — a sentence that makes someone feel something (e.g., \"I spent 10 years building something that took 10 seconds to lose.\").",
      "3. Say it out loud. Does it land? Does it make someone want to ask 'what happened?'",
      "4. If not, rewrite. Strip out abstractions. Make it concrete and specific.",
      "5. Once the single sentence works, use it as your hook and tell the full story behind it in under 90 seconds.",
      "6. The one-sentence version is your anchor — every detail in the longer version should serve it."
    ],
    modifications: [
      "Make it easier: Look up famous one-sentence story examples for inspiration before writing your own.",
      "Make it harder: Write five one-sentence stories for five different experiences in under 3 minutes, then pick the strongest and expand it live."
    ],
    completionCue: "Emotional core captured? Done."
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
    intention: "Retell the same event from a different person's point of view to build empathy and discover new angles in your stories.",
    setup: ["Pick a story involving at least two people."],
    steps: [
      "1. Pick a story you already know well — ideally one involving at least two people.",
      "2. Tell it from your own perspective in about 60 seconds.",
      "3. Now retell the same event from the other person's perspective. What did they see? What were they feeling? What did they not know that you knew?",
      "4. Notice what details change, what new emotions emerge, and what becomes more interesting.",
      "5. Try telling a version that weaves both perspectives together, switching between them.",
      "6. Reflect: which version is most compelling for your intended audience?"
    ],
    modifications: [
      "Make it easier: Start with a simple, low-emotion event like a misunderstanding at a coffee shop.",
      "Make it harder: Retell from the perspective of someone you disagreed with, presenting their view as the sympathetic one."
    ],
    completionCue: "POV successfully shifted? Done."
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
    intention: "Structure examples, beats, or story points in groups of three for rhythm, memorability, and comedic or dramatic effect.",
    setup: ["Choose a lesson or point to teach."],
    steps: [
      "1. Choose a point you want to make or a lesson you want to teach.",
      "2. Come up with three examples, anecdotes, or beats that illustrate it — each escalating in intensity or importance.",
      "3. Deliver them in sequence: the first sets the pattern, the second confirms the pattern, the third either breaks the pattern (for humor/surprise) or elevates it (for drama/impact).",
      "4. Pay attention to the rhythm of your delivery. The third beat should have a noticeably different energy — either a pause before it, a shift in tone, or a change in pace.",
      "5. Try a version where the third element is the twist/punchline, and another where it is the emotional peak."
    ],
    modifications: [
      "Make it easier: Use a classic joke structure (setup, setup, punchline) as your template.",
      "Harder: Use the rule of three within an impromptu 2-minute talk on a topic a partner gives you."
    ],
    completionCue: "Rhythm and structure applied? Done."
  },

  // --- Difficult Conversations (15) ---
  {
    id: 'ei_labeling',
    name: 'Emotion Labeling Exercise',
    description: 'Reduce emotional intensity by naming what you\'re feeling.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Brain,
    category: 'difficult_conversations',
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
    category: 'difficult_conversations',
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
    category: 'difficult_conversations',
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
    category: 'difficult_conversations',
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
    category: 'difficult_conversations',
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
  {
    id: 'conflict_yes_and',
    name: 'Yes, And (De-escalation)',
    description: 'Defuse tension by acknowledging the other person\'s point before adding yours.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "de-escalation", "ego-management", "active-listening", "empathy"],
    intention: "Defuse tension by acknowledging the other person's point before adding yours—removing the need for them to defend.",
    setup: ["Recall a recent disagreement.", "Take a slow breath."],
    steps: [
      "1. Think of a recent disagreement or criticism someone directed at you.",
      "2. Notice your instinct—was it to defend, correct, or explain yourself?",
      "3. Now reframe using \"Yes, and\": Acknowledge their point first (\"Yes, I can see how that came across...\") then add your perspective (\"...and what I was trying to do was...\").",
      "4. Practice this out loud with three different scenarios: a work criticism, a personal misunderstanding, and a small conflict.",
      "5. The key is removing your ego—you're not agreeing they're right, you're validating that you heard them.",
      "6. Reflect: which scenario felt hardest to say \"yes\" to? That's where your ego is strongest."
    ],
    modifications: [
      "Make it easier: Write out both your defensive response and your \"yes, and\" response to see the difference visually.",
      "Make it harder: Use this technique live the next time someone criticizes you, without preparation. Notice how it changes their energy."
    ],
    completionCue: "Ego managed? Tension defused."
  },
  {
    id: 'conflict_separate_person',
    name: 'Separate Person from Problem',
    description: 'Focus on the issue, not the individual, so the conversation stays productive.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "reframing", "professionalism", "clarity", "boundaries"],
    intention: "Focus on the issue, not the individual, so the conversation stays productive instead of personal.",
    setup: ["Identify a conflict where you felt attacked.", "Prepare to reframe."],
    steps: [
      "1. Recall a conflict where you felt attacked or blamed by someone.",
      "2. Identify what the actual problem was versus how the person delivered the message.",
      "3. Practice restating the conflict in neutral, non-personal language: Replace \"You always...\" with \"The issue is...\" or \"What happened was...\"",
      "4. Say your reframed version out loud. Does it remove the emotional charge?",
      "5. Now imagine delivering this reframe to the other person. Keep your tone calm and matter-of-fact.",
      "6. Practice this reframing with two more conflicts—one from work, one from personal life."
    ],
    modifications: [
      "Make it easier: Start with hypothetical conflicts instead of real ones to practice the language pattern.",
      "Make it harder: Next time you're in a heated conversation, pause and reframe in the moment: \"I don't think this is about me or you—I think the issue is...\" "
    ],
    completionCue: "Issue isolated? Problem solving enabled."
  },
  {
    id: 'conflict_pause',
    name: 'The Pause Before Response',
    description: 'Use strategic silence to prevent reactive responses.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "pause", "self-regulation", "impulse-control", "calm"],
    intention: "Use strategic silence to prevent reactive responses and create space for thoughtful conflict resolution.",
    setup: ["Find a quiet moment or use a practice partner."],
    steps: [
      "1. Think of a time you responded too quickly in a conflict and regretted it.",
      "2. Set a mental rule: When someone says something that triggers you, count to three before responding.",
      "3. Practice this physically: Have a partner say something mildly provocative (e.g., \"You're always late\"), and you pause for a full 3 seconds before replying.",
      "4. During those 3 seconds, take one deep breath and ask yourself: \"What do they actually need to hear right now?\"",
      "5. Respond from that calmer place. Notice how the quality of your response changes.",
      "6. Repeat with progressively more emotionally charged statements."
    ],
    modifications: [
      "Make it easier: Practice the pause alone first by imagining triggering statements and counting before your mental response.",
      "Harder: Extend the pause to 5-7 seconds in live conflicts. Use the phrase \"Let me think about that for a second\" to make the silence feel intentional."
    ],
    completionCue: "Impulse controlled? Response measured."
  },
  {
    id: 'conflict_i_statements',
    name: 'I-Statements (Non-Defensive Communication)',
    description: 'Express your perspective without blame, making it easier for the other person to hear you.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "non-violent-communication", "clarity", "vulnerability", "boundaries"],
    intention: "Express your perspective without blame, making it easier for the other person to hear you.",
    setup: ["Think of a recurring frustration.", "Have a notepad ready."],
    steps: [
      "1. Pick a conflict where you felt hurt or frustrated by someone's behavior.",
      "2. Notice how you naturally want to frame it: \"You did X\" or \"You made me feel Y.\"",
      "3. Rewrite using the I-Statement formula: \"When [situation], I felt [emotion] because [need/impact].\"",
      "4. Example: Instead of \"You never listen to me,\" say \"When I was talking earlier and the conversation shifted, I felt unheard because I really wanted your input on that.\"",
      "5. Practice saying three I-Statements out loud for three different conflicts.",
      "6. Notice how this removes accusation and invites collaboration instead of defense."
    ],
    modifications: [
      "Make it easier: Use a fill-in-the-blank template to structure your I-Statements before saying them aloud.",
      "Harder: Deliver an I-Statement in real time during your next conflict, even when you're emotionally activated."
    ],
    completionCue: "Blame removed? Dialogue opened."
  },
  {
    id: 'conflict_clarifying_questions',
    name: 'Clarifying Questions (Stop Assumptions)',
    description: 'Ask open questions to understand the other person\'s perspective before reacting.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "active-listening", "curiosity", "assumptions", "clarity"],
    intention: "Ask open questions to understand the other person's perspective before defending or reacting.",
    setup: ["Identify a common misunderstanding."],
    steps: [
      "1. Think of a recent conflict where you assumed you knew what the other person meant or wanted.",
      "2. Identify the assumption you made. Was it accurate? Did it escalate the conflict?",
      "3. Now practice asking clarifying questions instead: \"Help me understand—what did you mean by that?\" or \"What would a good solution look like for you?\"",
      "4. The goal is curiosity, not interrogation. Your tone should be genuinely open.",
      "5. Role-play with a partner: they state a vague complaint (\"You don't respect my time\"), and you ask 2-3 clarifying questions before responding.",
      "6. Reflect: did asking questions change what you thought the conflict was about?"
    ],
    modifications: [
      "Make it easier: Write out clarifying questions for past conflicts to build your question bank.",
      "Harder: In your next real conflict, commit to asking at least two questions before making any statement or defense."
    ],
    completionCue: "Assumptions cleared? Clarity achieved."
  },
  {
    id: 'conflict_name_emotion',
    name: 'Name the Emotion (Yours and Theirs)',
    description: 'Acknowledge the emotional reality beneath the conflict to reduce defensiveness.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "emotional-intelligence", "empathy", "vulnerability", "regulation"],
    intention: "Acknowledge the emotional reality beneath the conflict to create connection and reduce defensiveness.",
    setup: ["Center yourself.", "Identify a felt emotion."],
    steps: [
      "1. Recall a conflict that felt emotionally intense but was supposedly about something \"small.\"",
      "2. Ask yourself: what emotion was I actually feeling? (e.g., disrespected, unseen, anxious, dismissed)",
      "3. Now guess: what emotion might the other person have been feeling?",
      "4. Practice saying both out loud: \"I was feeling [your emotion], and I think you were feeling [their emotion].\"",
      "5. Role-play with a partner: one person shares a conflict, the other tries to name both emotions accurately before offering any solution.",
      "6. Naming emotions disarms conflict faster than logic. Test this in your next disagreement."
    ],
    modifications: [
      "Make it easier: Use an emotion wheel or list to help you identify emotions beyond \"angry\" or \"upset.\"",
      "Harder: In a live conflict, name your emotion out loud to the other person first: \"I'm feeling really defensive right now.\" Watch how it shifts the dynamic."
    ],
    completionCue: "Emotion named? Dynamic shifted."
  },
  {
    id: 'conflict_request_not_demand',
    name: 'Request, Not Demand',
    description: 'Frame what you need as a request instead of a demand to invite collaboration.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "boundaries", "assertiveness", "collaboration", "clarity"],
    intention: "Frame what you need as a request instead of a demand to invite collaboration, not resistance.",
    setup: ["Identify a need.", "Practice a soft opening."],
    steps: [
      "1. Think of something you want someone to do differently (e.g., reply faster, listen more, follow through).",
      "2. Notice how you'd naturally say it. Does it sound like a demand? (\"You need to...\" / \"You should...\")",
      "3. Reframe as a request using this structure: \"Would you be willing to [specific behavior]? It would help me because [reason].\"",
      "4. Example: Instead of \"You need to text me back faster,\" try \"Would you be willing to send a quick reply when you see my message, even if it's just to say you'll respond later? It helps me feel less anxious.\"",
      "5. Practice making three requests out loud for three different needs.",
      "6. Notice how requests create space for negotiation; demands create resistance."
    ],
    modifications: [
      "Make it easier: Write out the request first, then practice saying it in a calm, non-urgent tone.",
      "Harder: Make a request in real time during a conflict without pre-scripting it, and stay open to hearing \"no.\""
    ],
    completionCue: "Request delivered? Door open for negotiation."
  },
  {
    id: 'conflict_apologize_no_but',
    name: 'Apologize Without "But"',
    description: 'Deliver a clean, complete apology that repairs trust.',
    duration: 300,
    estimatedMinutes: 5,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "accountability", "apology", "repair", "trust"],
    intention: "Deliver a clean, complete apology that repairs trust instead of defending yourself.",
    setup: ["Own your actions.", "Remove the caveats."],
    steps: [
      "1. Think of a time you hurt someone or made a mistake in a relationship.",
      "2. Notice your instinct—did you want to explain, justify, or add \"but I didn't mean to\" or \"but you also...\"?",
      "3. Practice a three-part apology: (1) \"I'm sorry for [specific behavior].\" (2) \"I understand that it [impact on them].\" (3) \"Going forward, I'll [corrective action].\"",
      "4. Example: \"I'm sorry for interrupting you during the meeting. I understand that it made you feel disrespected. Going forward, I'll wait until you're done before I jump in.\"",
      "5. Say it out loud. Did you add a \"but\"? If so, remove it and try again.",
      "6. A real apology has no defense in it. It just acknowledges harm and commits to change."
    ],
    modifications: [
      "Make it easier: Write out the three parts separately, then practice combining them smoothly.",
      "Harder: Deliver this apology to someone you've actually hurt, in person or via message, within the next 48 hours."
    ],
    completionCue: "Apology cleaned? Trust repair begun."
  },
  {
    id: 'conflict_shared_need',
    name: 'Find the Shared Need',
    description: 'Shift from opposing positions to shared interests.',
    duration: 420,
    estimatedMinutes: 7,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "negotiation", "collaboration", "win-win", "empathy"],
    intention: "Shift from opposing positions to shared interests so both people feel they can win.",
    setup: ["Map the conflict.", "Dig beneath the surface."],
    steps: [
      "1. Think of a conflict where you and someone else wanted different things (e.g., you wanted quiet, they wanted to play music).",
      "2. Identify your positions (what each person said they wanted).",
      "3. Now dig deeper: what need was each position trying to meet? (e.g., your need: focus; their need: energy/mood boost)",
      "4. Ask: is there a solution that meets both needs? (e.g., they use headphones, or you work in a different room, or they play music at certain times)",
      "5. Practice this with three past conflicts: position → underlying need → creative solution.",
      "6. Shared needs create collaboration; opposing positions create war."
    ],
    modifications: [
      "Make it easier: Use a worksheet to map positions vs. needs visually before brainstorming solutions.",
      "Harder: In your next conflict, ask the other person directly: \"What do you actually need here?\" and share your need too before proposing solutions."
    ],
    completionCue: "Common ground found? Win-win possible."
  },
  {
    id: 'conflict_repair_after',
    name: 'Repair After the Storm',
    description: 'Re-establish connection after a heated conflict by taking responsibility.',
    duration: 240,
    estimatedMinutes: 4,
    icon: ShieldAlert,
    category: 'difficult_conversations',
    tags: ["conflict-resolution", "repair", "accountability", "connection", "humility"],
    intention: "Re-establish connection after a heated conflict by taking responsibility for your part, regardless of who was 'right.'",
    setup: ["Identify an escalated conflict.", "Prepare a bridge."],
    steps: [
      "1. Think of a conflict that escalated and left both people feeling bad.",
      "2. Identify one thing you did that didn't help (raised your voice, shut down, brought up old issues, etc.).",
      "3. Reach out within 24 hours with a repair statement: \"Hey, I didn't handle that well. I [specific behavior] and I'm sorry. Can we talk?\"",
      "4. The goal isn't to rehash the argument—it's to re-open the relationship.",
      "5. Practice saying a repair statement out loud for three past conflicts.",
      "6. Repair isn't about who was right. It is about choosing connection over being right."
    ],
    modifications: [
      "Make it easier: Send the repair message via text first if face-to-face feels too vulnerable.",
      "Harder: Make the repair in person immediately after a conflict, before your pride hardens."
    ],
    completionCue: "Bridge built? Connection re-established."
  },

  // --- Public Speaking (15) ---
  {
    id: 'speaking_60s_story',
    name: 'The 60-Second Story',
    description: 'Build your ability to speak concisely and compellingly under time pressure.',
    duration: 480,
    estimatedMinutes: 8,
    icon: BookOpen,
    category: 'Public Speaking',
    tags: ["public-speaking", "conciseness", "storytelling", "confidence", "clarity"],
    intention: 'Build your ability to speak concisely and compellingly under time pressure without rambling.',
    setup: ['Choose a simple topic.', 'Set a timer.'],
    steps: [
      '1. Pick a simple topic: a memorable meal, a recent challenge, or something that made you laugh.',
      '2. Set a timer for 60 seconds and speak continuously about that topic out loud.',
      '3. Your goal: beginning, middle, end. Don\'t just list facts—tell it like a story with a point.',
      '4. Record yourself if possible. Listen back: Did you use filler words? Did you finish on time? Was there a clear point?',
      '5. Repeat with a new topic. This time, focus on eliminating "um," "like," "you know."',
      '6. Do this three times total with three different topics. Notice how you get sharper each round.'
    ],
    modifications: [
      'Make it easier: Write out bullet points for beginning, middle, and end before speaking.',
      'Harder: Reduce the time to 30 seconds and keep the same story structure. Every word must count.'
    ],
    completionCue: 'Three stories complete? Well done.'
  },
  {
    id: 'speaking_power_pose_ritual',
    name: 'Power Posing Before Speaking',
    description: 'Shift your nervous system from anxiety to confidence before you speak.',
    duration: 180,
    estimatedMinutes: 3,
    icon: PersonStanding,
    category: 'Public Speaking',
    tags: ["public-speaking", "body-language", "confidence", "anxiety-management", "ritual"],
    intention: 'Use your body to shift your nervous system from anxiety to confidence before you speak.',
    setup: ['Find a private space.'],
    steps: [
      '1. Before your next presentation, meeting, or even a phone call, find a private space.',
      '2. Stand in a "power pose" for 2 minutes: feet wide, hands on hips or raised in a V, chin up, chest open.',
      '3. Breathe deeply and slowly. Imagine yourself speaking with authority and ease.',
      '4. Notice the shift in your body: do you feel more grounded? More energy? Less collapsed?',
      '5. Immediately after, practice your opening line out loud in that same physical state.',
      '6. Use this ritual before every speaking opportunity for one week. Track how your confidence changes.'
    ],
    modifications: [
      'Make it easier: Start with just 1 minute of power posing and do it alone at home before practicing out loud.',
      'Harder: Do your power pose, then immediately walk into a live speaking situation without any additional prep.'
    ],
    completionCue: 'Posture set and opening line practiced? Ready.'
  },
  {
    id: 'speaking_vocal_variety',
    name: 'Vocal Variety Drills',
    description: 'Use pitch, pace, and volume intentionally to keep your audience engaged.',
    duration: 420,
    estimatedMinutes: 7,
    icon: Mic2,
    category: 'Public Speaking',
    tags: ["public-speaking", "vocal-delivery", "engagement", "expression", "practice"],
    intention: 'Train your voice to use pitch, pace, and volume intentionally to keep your audience engaged.',
    setup: ['Prepare a simple sentence.', 'Choose a book paragraph.'],
    steps: [
      '1. Choose a simple sentence: "I didn\'t say she took the money."',
      '2. Say it out loud 7 times, each time emphasizing a different word: "I didn\'t..." "I DIDN\'T..." "I didn\'t SAY..." etc.',
      '3. Notice how the meaning shifts with emphasis. This is vocal variety in action.',
      '4. Now pick a paragraph from a book or article. Read it out loud three times: (1) monotone, (2) exaggerated, (3) natural middle.',
      '5. Record all three and listen. Which one kept your attention best?',
      '6. Practice this daily with different content for one week.'
    ],
    modifications: [
      'Make it easier: Start with just one sentence and practice emphasizing different words.',
      'Harder: Take a boring, technical paragraph and make it engaging using only vocal variety.'
    ],
    completionCue: 'Three versions heard? Excellent practice.'
  },
  {
    id: 'speaking_eye_contact',
    name: 'Eye Contact Anchor Points',
    description: 'Build authentic connection by distributing eye contact deliberately.',
    duration: 360,
    estimatedMinutes: 6,
    icon: Eye,
    category: 'Public Speaking',
    tags: ["public-speaking", "eye-contact", "connection", "presence", "confidence"],
    intention: 'Build authentic connection with your audience by distributing eye contact deliberately instead of scanning or staring.',
    setup: ['Pick 3-5 objects or people as anchors.'],
    steps: [
      '1. When you speak to a group, pick 3-5 "anchor points"—specific individuals spread across the room.',
      '2. As you speak, hold eye contact with one anchor point for 3-5 seconds (one complete thought), then move to the next.',
      '3. Practice this alone: set up 3-5 objects around a room (chairs, pillows, etc.) as your anchors.',
      '4. Deliver a 2-minute talk to the objects, holding "eye contact" with each for 3-5 seconds at a time.',
      '5. This trains you to avoid: staring at one person too long, scanning too fast, or looking at the floor/ceiling.',
      '6. Next time you speak to a real group, use this anchor point method. Notice how it calms your nerves and makes others feel included.'
    ],
    modifications: [
      'Make it easier: Practice with just one or two anchor points.',
      'Harder: In a live presentation, make one anchor point someone who looks skeptical or distracted.'
    ],
    completionCue: 'Anchors held? Well connected.'
  },
  {
    id: 'speaking_pause_drill',
    name: 'The Pause (Stop Filling Silence)',
    description: 'Use strategic pauses to project confidence and land key points.',
    duration: 360,
    estimatedMinutes: 6,
    icon: Clock,
    category: 'Public Speaking',
    tags: ["public-speaking", "pauses", "confidence", "filler-words", "emphasis"],
    intention: 'Use strategic pauses to emphasize key points, reduce filler words, and project confidence.',
    setup: ['Choose a short speech or pitch (1-2 minutes).'],
    steps: [
      '1. Identify 3 places where a pause would add impact.',
      '2. Deliver the speech out loud and insert a full 3-second pause at each marked spot.',
      '3. The pause comes after a key point or before an important statement. Let the silence land.',
      '4. Record yourself. Listen back—the pauses probably sound powerful.',
      '5. Every time you feel "um" or "like" rising, replace it with a 1-2 second pause instead.',
      '6. Practice this in everyday conversation.'
    ],
    modifications: [
      'Make it easier: Start by adding pauses only in scripted, practiced talks.',
      'Harder: In your next live presentation, insert an intentional 5-second pause after your most important point.'
    ],
    completionCue: 'Pauses held without discomfort? Done.'
  },
  {
    id: 'speaking_back_row',
    name: 'Speak to the Back Row',
    description: 'Project your voice so the entire room feels included.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Users,
    category: 'Public Speaking',
    tags: ["public-speaking", "projection", "voice", "energy", "presence"],
    intention: 'Project your voice and energy so the entire room feels included, not just the people in front of you.',
    setup: ['Stand in a large room or open space.'],
    steps: [
      '1. Stand in one corner of a room.',
      '2. Imagine someone standing 20-30 feet away who needs to hear you clearly.',
      '3. Speak a full sentence at your normal volume.',
      '4. Now speak from your diaphragm: stand tall, breathe deep, and project from your core.',
      '5. Say the same sentence again with full projection. It should feel louder but not strained.',
      '6. Practice delivering a 1-minute talk at this projection level.',
      '7. Aim your energy toward the back, and the front will feel included too.'
    ],
    modifications: [
      'Make it easier: Practice by reading out loud to an empty room.',
      'Harder: Practice outside in an open area where your voice can dissipate.'
    ],
    completionCue: 'Voice filling the space? Excellent.'
  },
  {
    id: 'speaking_qa_practice',
    name: 'Handling the Blank Stare (Q&A Practice)',
    description: 'Build confidence responding to questions under pressure.',
    duration: 480,
    estimatedMinutes: 8,
    icon: MessageSquare,
    category: 'Public Speaking',
    tags: ["public-speaking", "q-and-a", "confidence", "improvisation", "composure"],
    intention: 'Build confidence responding to questions, even when you don\'t know the answer or face silence.',
    setup: ['Record 5-10 potential questions.'],
    steps: [
      '1. Record 5-10 potential questions someone might ask after your talk.',
      '2. Set a timer for 30 seconds per question. Answer each one out loud, concisely and confidently.',
      '3. Now add 2-3 curveball questions—ones you don\'t know the answer to.',
      '4. Practice responding honestly: "That\'s a great question—I don\'t have that data in front of me, but I\'d be happy to follow up."',
      '5. Practice "I\'m not sure, but here\'s what I do know..."',
      '6. Confidence is staying composed when you don\'t have all the answers.'
    ],
    modifications: [
      'Make it easier: Write out your answers to expected questions first.',
      'Harder: Have a friend ask you questions live without preparation.'
    ],
    completionCue: 'Answered all curveballs? Done.'
  },
  {
    id: 'speaking_open_strong',
    name: 'Open Strong (Your First 10 Seconds)',
    description: 'Hook your audience immediately to ensure engagement.',
    duration: 420,
    estimatedMinutes: 7,
    icon: Sparkles,
    category: 'Public Speaking',
    tags: ["public-speaking", "openings", "hooks", "engagement", "confidence"],
    intention: 'Hook your audience immediately so they lean in instead of tuning out.',
    setup: ['Identify an upcoming talk topic.'],
    steps: [
      '1. Avoid weak openings: "Um, hi everyone, thanks for having me...".',
      '2. Choose a strong opening: bold statement, question, story, or striking stat.',
      '3. Script your opening 10 seconds. Memorize it.',
      '4. Deliver it with conviction out loud.',
      '5. Practice it 5 times until it feels natural, not robotic.',
      '6. Strong openings buy you patience from the audience.'
    ],
    modifications: [
      'Make it easier: Write out 3 different opening options and test each one.',
      'Harder: Improvise a strong opening on the spot for 3 random topics.'
    ],
    completionCue: 'Opening lines memorized? Done.'
  },
  {
    id: 'speaking_conversational',
    name: 'The Conversational Tone',
    description: 'Speak like you\'re talking to a friend to build trust.',
    duration: 360,
    estimatedMinutes: 6,
    icon: Smile,
    category: 'Public Speaking',
    tags: ["public-speaking", "tone", "authenticity", "connection", "relatability"],
    intention: 'Speak like you\'re talking to a friend, not performing a script, so your audience trusts and connects with you.',
    setup: ['Prepare a paragraph from a formal script.'],
    steps: [
      '1. Read the formal paragraph out loud exactly as written.',
      '2. Now rewrite it as if you\'re explaining it to a friend over coffee.',
      '3. Use contractions, simpler words, shorter sentences.',
      '4. Read both versions out loud. Which one sounds more like you?',
      '5. Practice your next talk in conversational language.',
      '6. Imagine you\'re speaking to one person, not a crowd.'
    ],
    modifications: [
      'Make it easier: Start by converting just your opening and closing.',
      'Harder: Give your entire next presentation without any script—just bullet points.'
    ],
    completionCue: 'Which version felt most authentic? Done.'
  },
  {
    id: 'speaking_mirror_drill',
    name: 'Record and Review (The Mirror Drill)',
    description: 'Identify and fix distracting habits by reviewing your delivery.',
    duration: 600,
    estimatedMinutes: 10,
    icon: Camera,
    category: 'Public Speaking',
    tags: ["public-speaking", "self-awareness", "feedback", "improvement", "practice"],
    intention: 'See and hear yourself as your audience does so you can identify and fix distracting habits.',
    setup: ['Set up your phone to record video.'],
    steps: [
      '1. Deliver a 2-3 minute talk on any topic and record it.',
      '2. Watch the full recording without judgment—just observe.',
      '3. Look for: filler words, fidgeting, lack of eye contact, low energy.',
      '4. Pick ONE thing to improve.',
      '5. Re-record the same talk focusing only on fixing that one habit.',
      '6. Compare the two recordings. Did you improve?',
      '7. Repeat this weekly with different talks.'
    ],
    modifications: [
      'Make it easier: Start with audio-only recordings if video feels too vulnerable.',
      'Harder: Post your recording to a small group of trusted friends and ask for feedback.'
    ],
    completionCue: 'One habit targeted? Great progress.'
  },
  {
    id: 'speaking_gestures_purpose',
    name: 'Gestures with Purpose',
    description: 'Use hand movements intentionally to reinforce your message.',
    duration: 360,
    estimatedMinutes: 6,
    icon: Activity,
    category: 'Public Speaking',
    tags: ["public-speaking", "body-language", "gestures", "confidence", "presence"],
    intention: 'Use hand gestures intentionally to reinforce your message instead of distracting from it.',
    setup: ['Stand in front of a mirror.'],
    steps: [
      '1. Watch your hands while speaking for 1 minute.',
      '2. Practice three core gestures: Open hands (inclusivity), Pointing/Chopping (emphasis), Counting (structure).',
      '3. Deliver your talk again using these gestures deliberately at key moments.',
      '4. Your hands should match your words (e.g. "three reasons" = three fingers).',
      '5. Eliminate nervous gestures like pockets or wringing hands.',
      '6. Aim for natural but purposeful movement.'
    ],
    modifications: [
      'Make it easier: Practice gestures alone with a mirror before trying in front of people.',
      'Harder: Watch a great speaker and mimic their gesture patterns in your practice.'
    ],
    completionCue: 'Hand-word coordination improved? Done.'
  },
  {
    id: 'speaking_nerves_ritual',
    name: 'Manage the Nerves (Pre-Speech Ritual)',
    description: 'Channel anxiety into focused energy with a repeatable routine.',
    duration: 360,
    estimatedMinutes: 6,
    icon: ShieldCheck,
    category: 'Public Speaking',
    tags: ["public-speaking", "anxiety-management", "ritual", "preparation", "confidence"],
    intention: 'Channel nervous energy into focused energy using a repeatable pre-speech routine.',
    setup: ['Identify a repeatable 5-minute window.'],
    steps: [
      '1. 2 minutes: Power pose + deep breathing.',
      '2. 1 minute: Vocal warm-up (hum, tongue twisters).',
      '3. 1 minute: Visualization (see yourself succeeding).',
      '4. 1 minute: Shake out your body, release tension.',
      '5. Practice this ritual before low-stakes speaking like meetings.',
      '6. Use the same ritual every time to signal to your body you\'re ready.'
    ],
    modifications: [
      'Make it easier: Start with just one element (breathing or power posing).',
      'Harder: Use your ritual, then immediately walk into the room with no extra prep.'
    ],
    completionCue: 'Ritual locked in? Ready to speak.'
  },
  {
    id: 'speaking_no_slides',
    name: 'Speak Without Slides',
    description: 'Hold a room with just your voice and presence.',
    duration: 480,
    estimatedMinutes: 8,
    icon: PersonStanding,
    category: 'Public Speaking',
    tags: ["public-speaking", "confidence", "presence", "improvisation", "clarity"],
    intention: 'Develop the ability to hold a room with just your voice and presence—no crutches.',
    setup: ['Pick a topic you know well.', 'Set an 8-minute timer.'],
    steps: [
      '1. Speak for 3 minutes with no slides, no notes, no aids—just talking.',
      '2. Focus on: intro, 3 points, conclusion.',
      '3. Use vocal variety and intentional pauses.',
      '4. Record yourself. Did you keep the "imaginary audience" engaged?',
      '5. Repeat weekly with different topics.',
      '6. Build your confidence that YOU are the presentation.'
    ],
    modifications: [
      'Make it easier: Use 3 bullet points on a notecard as a backup.',
      'Harder: Deliver a full 5-10 minute talk to live friends with no visual aids.'
    ],
    completionCue: 'Held the floor solo? Excellent.'
  },
  {
    id: 'speaking_impact_closing',
    name: 'The Closing (End with Impact)',
    description: 'Leave your audience with a clear takeaway and resonance.',
    duration: 420,
    estimatedMinutes: 7,
    icon: ThumbsUp,
    category: 'Public Speaking',
    tags: ["public-speaking", "closings", "impact", "memorability", "confidence"],
    intention: 'Leave your audience with a clear takeaway and emotional resonance, not a weak trailing-off.',
    setup: ['Review your next talk closing.'],
    steps: [
      '1. Identify your current closing. Is it a weak "Any questions?".',
      '2. Script your closing 15 seconds: call to action, opening callback, or powerful quote.',
      '3. Practice three variations: (1) Call to action, (2) Inspirational close, (3) Story callback.',
      '4. Deliver each one out loud. Which feels most authentic?',
      '5. Memorize your final line. Deliver it with conviction, then STOP.',
      '6. No rambling after the final line.'
    ],
    modifications: [
      'Make it easier: Write out your full closing word-for-word and memorize it.',
      'Harder: Practice ending and then staying silent for 3 seconds before taking questions.'
    ],
    completionCue: 'Final line delivered with impact? Done.'
  },
  {
    id: 'speaking_impromptu_60s',
    name: 'Impromptu Speaking Challenge',
    description: 'Organize thoughts on the fly for spontaneous speaking.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Zap,
    category: 'Public Speaking',
    tags: ["public-speaking", "improvisation", "thinking-on-feet", "confidence", "structure"],
    intention: 'Build your ability to speak coherently on any topic with zero preparation.',
    setup: ['Get a random word generator.'],
    steps: [
      '1. Get a random word or topic.',
      '2. Take exactly 5 seconds to think.',
      '3. Speak for 60 seconds using this structure: Point → Example → Point.',
      '4. Don\'t aim for perfection—aim for coherence.',
      '5. Do this daily with different random topics.',
      '6. Your brain will get faster at organizing thoughts on the fly.'
    ],
    modifications: [
      'Make it easier: Extend your prep time to 15-30 seconds.',
      'Harder: Speak for 90-120 seconds with only 5 seconds of prep.'
    ],
    completionCue: 'Thinking on your feet? Well done.'
  },

  // --- Professional Communication (8) ---
  {
    id: 'prof_sbi',
    name: 'SBI Feedback Framework',
    description: 'Deliver clear, actionable feedback using Situation-Behavior-Impact.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Briefcase,
    category: 'professional_communication',
    tags: ['professional', 'leadership', 'clarity'],
    intention: 'Reduce ambiguity and defensiveness when delivering feedback to colleagues or team members.',
    setup: ['Think of a specific instance where someone\'s behavior needs correction.'],
    steps: [
      '1. Situation: Describe the exact time and place.',
      '2. Behavior: Describe the specific observable action (no judgments).',
      '3. Impact: Describe the effect it had on you or the project.',
      '4. Pause and allow the other person to respond.',
      '5. Collaboratively discuss a better approach for next time.'
    ],
    modifications: [
      'Make it easier: Practice writing it out before speaking.',
      'Make it harder: Use it to deliver positive feedback too, which reinforces the framework.'
    ],
    completionCue: 'Feedback delivered clearly? Done.'
  },
  {
    id: 'prof_radical_candor',
    name: 'Radical Candor Check-in',
    description: 'Build trust by pairing personal care with direct challenge.',
    duration: 300,
    estimatedMinutes: 5,
    icon: HeartHandshake,
    category: 'professional_communication',
    tags: ['professional', 'leadership', 'emotional-intelligence'],
    intention: 'Navigate the "Radical Candor" quadrant to build high-trust working relationships.',
    setup: ['Prepare for a 1-on-1 or performance review.'],
    steps: [
      '1. Care Personally: Show genuine interest in the person\'s growth and well-being.',
      '2. Challenge Directly: Be clear and un-sugarcoated about what needs to improve.',
      '3. Avoid Ruinous Empathy: Don\'t withhold truth to protect feelings.',
      '4. Avoid Obnoxious Aggression: Don\'t challenge without caring.',
      '5. Ask: "Is this message clear, and do you know I have your back?"'
    ],
    modifications: [
      'Make it easier: Start by finding one thing you genuinely appreciate about the person.',
      'Harder: Use this to deliver a very difficult "challenge" while maintaining warmth.'
    ],
    completionCue: 'Relationship anchored in candor? Done.'
  },
  {
    id: 'prof_meeting_agendas',
    name: 'Meeting Agenda Architecture',
    description: 'Design meetings for maximum cognitive efficiency.',
    duration: 180,
    estimatedMinutes: 3,
    icon: LayoutGrid,
    category: 'professional_communication',
    tags: ['professional', 'productivity', 'structure'],
    intention: 'Ensure every meeting has a clear purpose and measurable outcome.',
    setup: ['Open a meeting invite or calendar event.'],
    steps: [
      '1. State the Objective: "By the end of this meeting, we will have decided X."',
      '2. List 3 key discussion points in logical order.',
      '3. Define the desired outcome for each point (e.g., "Inform", "Discuss", "Decide").',
      '4. Assign a time limit to each section.',
      '5. Circulate the agenda at least 2 hours before the start.'
    ],
    modifications: [
      'Make it easier: Use a simple "Objective + 3 Bullets" template.',
      'Harder: Apply this to a complex, multi-stakeholder workshop.'
    ],
    completionCue: 'Meeting structure locked? Done.'
  },
  {
    id: 'digital_framing',
    name: 'Video Call Framing & Lighting',
    description: 'Optimize your digital presence for better connection.',
    duration: 120,
    estimatedMinutes: 2,
    icon: MonitorSmartphone,
    category: 'professional_communication',
    tags: ['digital', 'professional', 'nonverbal'],
    intention: 'Project professionalism and engagement during remote meetings.',
    setup: ['Open your webcam or a video preview app.'],
    steps: [
      '1. Check your lighting: Primary light should be in front of you, not behind.',
      '2. Position the camera at eye level (use a stand or books).',
      '3. Frame yourself: Head and shoulders visible, with a small gap above your head.',
      '4. Clean your background: Remove clutter that might distract listeners.',
      '5. Look directly into the lens, not the screen, when speaking.'
    ],
    modifications: [
      'Make it easier: Just fix one element (lighting or height).',
      'Make it harder: Practice maintaining "lens eye contact" for a full 1-minute intro.'
    ],
    completionCue: 'Visual presence optimized? Ready for the call.'
  },
  {
    id: 'digital_subject_line',
    name: 'Subject Line Clarity Drill',
    description: 'Increase email open rates and response speed.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Mail,
    category: 'professional_communication',
    tags: ['digital', 'professional', 'conciseness'],
    intention: 'Write subject lines that tell the recipient exactly what is needed without opening the email.',
    setup: ['Open your drafts folder.'],
    steps: [
      '1. Identify the core ask: [Action Needed], [Decision], [Info Only].',
      '2. Put the action in brackets at the start.',
      '3. Follow with a specific, noun-heavy summary (e.g., "Project X Q3 Budget").',
      '4. Include the deadline if applicable.',
      '5. Review: Can they triage this from a smartphone notification?'
    ],
    modifications: [
      'Make it easier: Just practice the [Action] bracket for 3 emails.',
      'Harder: Rewrite a 3-sentence subject line into a 5-word one without losing info.'
    ],
    completionCue: 'Subject lines sharp? Done.'
  },
  {
    id: 'digital_video_focus',
    name: 'The "One Screen" Rule',
    description: 'Maximize presence during high-stakes video calls.',
    duration: 300,
    estimatedMinutes: 5,
    icon: VideoIcon,
    category: 'professional_communication',
    tags: ['digital', 'focus', 'professional'],
    intention: 'Eliminate "Digital Split-Focus" to build trust and comprehension in remote settings.',
    setup: ['Join a low-stakes video meeting.'],
    steps: [
      '1. Close all tabs and apps not required for the meeting.',
      '2. Put your phone in another room or face-down.',
      '3. Resize the video window to be directly under the camera lens.',
      '4. Practice "Active Looking": nod and use facial expressions as if in person.',
      '5. Notice when your eyes drift to a second monitor and correct it immediately.'
    ],
    modifications: [
      'Make it easier: Do this for just the first 5 minutes of a meeting.',
      'Harder: Do this for a full 60-minute session without checking a single notification.'
    ],
    completionCue: 'Focus maintained? Great connection.'
  },
  {
    id: 'digital_slack_conciseness',
    name: 'Single-Pulse IM Rule',
    description: 'Reduce notification fatigue for your team.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Hash,
    category: 'professional_communication',
    tags: ['digital', 'professional', 'conciseness'],
    intention: 'Consolidate multiple short messages into one clear "pulse" of information.',
    setup: ['Before hitting "Enter" on a Slack/Teams message.'],
    steps: [
      '1. Draft your message. If it\'s "Hey", "How\'s it going?", "Got a sec?"—STOP.',
      '2. Combine the greeting, the context, and the ask into one paragraph.',
      '3. Use bullet points for multiple items.',
      '4. Use bold text for the specific action needed.',
      '5. Hit enter only when the full "thought" is ready.'
    ],
    modifications: [
      'Make it easier: Practice this with one teammate you know well.',
      'Harder: Apply this to a busy public channel where clarity is critical.'
    ],
    completionCue: 'Noise reduced? Done.'
  },
  {
    id: 'digital_tone_check',
    name: 'Digital Tone Calibration',
    description: 'Replace lost nonverbal cues with intentional text choices.',
    duration: 180,
    estimatedMinutes: 3,
    icon: TextCursorInput,
    category: 'professional_communication',
    tags: ['digital', 'emotional-intelligence', 'clarity'],
    intention: 'Prevent "Negative Bias" in text-based communication by adding intentional warmth.',
    setup: ['Review a "cold" or purely factual email draft.'],
    steps: [
      '1. Read the text as if you were in a bad mood. Does it sound rude or abrupt?.',
      '2. Add a specific positive opener: "Hope you had a great weekend!".',
      '3. Calibrate punctuation: Replace one period with an exclamation point if appropriate.',
      '4. Use an emoji to clarify intent (e.g., a smiley after a correction).',
      '5. Ensure the "closing" is warm: "Thanks for your help with this".'
    ],
    modifications: [
      'Make it easier: Just add a greeting and a sign-off.',
      'Harder: Rewrite a short, blunt correction to be "Warm but Direct".'
    ],
    completionCue: 'Tone calibrated? Ready to send.'
  }
];
