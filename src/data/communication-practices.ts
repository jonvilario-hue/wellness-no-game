'use client';

import { 
  Wind, Mic2, MessageSquare, User, Eye, ArrowLeftRight, 
  Target, Sparkles, Brain, ShieldAlert, BookOpen, Presentation, 
  Mail, Video, ClipboardList, Heart, HeartHandshake, Compass, 
  Share2, Smile, Scale, Anchor, Clock, Pencil, Activity, 
  ListChecks, Map, Trash2, Gift, Repeat, RefreshCcw, 
  Layers, Link as LinkIcon, ShieldCheck, X, Users, Lightbulb,
  Briefcase, MonitorSmartphone, Shield, Bell, CheckCircle2, 
  LayoutGrid, Pointer, TrendingUp, DoorOpen, HeartPulse, Zap
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
    setup: ['Identify a reference group relevant to your listener.'],
    steps: [
      '1. Identify relevant group ("people like you", "teams in your industry").',
      '2. State what they\'re doing: "Most of our clients start with...".',
      '3. Make it specific with numbers: "73% of users chose...".',
      '4. Avoid vague claims like "Everyone does this".',
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
    intention: 'Reduce emotional intelligence by naming what you\'re feeling.',
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

  // --- Digital Communication ---
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
      '1) State the action needed: "Action Required:", "FYI:", "Question:", "Decision Needed:", 2) Include the topic: "Action Required: Budget Approval by Friday", 3) Add relevant identifiers: project name, date, meeting reference, 4) Keep under 60 characters for mobile visibility, 5) Update subject line if thread topic changes mid-conversation.'
    ],
    modifications: [
      'Easier: Just make subjects descriptive rather than vague ("Meeting" → "Q1 Planning Meeting - Thursday 2pm").',
      'Harder: Use subject line tags consistently across your team ([URGENT], [LOW PRIORITY]).'
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
    intention: 'Set appropriate expectations and reduce communication anxiety (based on workplace communication research).',
    setup: ['Review your active messaging threads.'],
    steps: [
      '1) Learn standard norms: email = 24-48 hours, Slack/Teams = 1-4 hours, urgent = phone call, 2) Set your own boundaries in email signature or auto-responder: "I respond to emails within 24 hours on weekdays", 3) Use status indicators in chat apps when unavailable (Do Not Disturb, Away, In a Meeting), 4) If you can\'t respond fully within the expected window, send a quick acknowledgment: "Got this, will respond by Tuesday", 5) Respect others\' response windows - don\'t expect instant replies to non-urgent messages.'
    ],
    modifications: [
      'Easier: Just respond within 24 hours to everything.',
      'Harder: Differentiate response times by message urgency and communicate this to frequent contacts.'
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
    intention: 'Prevent misinterpretation in asynchronous communication (computer-mediated communication studies).',
    setup: ['Draft a quick Slack or Teams message.'],
    steps: [
      '1) Recognize that text defaults to neutral/negative tone without cues, 2) Add warmth with: exclamation points (but not excessive), friendly emoji (😊 👍), casual sign-offs ("Cheers!", "Thanks so much!"), 3) Soften requests: "Would you mind..." instead of "Do this", 4) Use positive framing: "Great question!" not just answering bluntly, 5) Re-read before sending and ask: could this sound colder than I intend?'
    ],
    modifications: [
      'Easier: Add one exclamation point to friendly messages.',
      'Harder: Calibrate tone indicators by relationship (more formal with executives, warmer with peers).'
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
    intention: 'Maximize presence and professionalism in remote communication (remote work research).',
    setup: ['Open your webcam or photo booth app.'],
    steps: [
      '1) Position camera at eye level (stack books under laptop if needed), 2) Sit arm\'s length from camera, 3) Check framing: head and shoulders visible, some space above head, not cut off at neck, 4) Lighting: face the light source (window or lamp), avoid backlighting, 5) Background: clean, non-distracting, or use subtle blur, 6) Test before important calls with Photo Booth or camera app.'
    ],
    modifications: [
      'Easier: Just raise your laptop to eye level.',
      'Harder: Invest in ring light and external webcam for consistently professional setup.'
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
    intention: 'Choose the right communication medium based on complexity and urgency (media richness theory).',
    setup: ['Identify an upcoming communication task.'],
    steps: [
      '1) Use async (email, Slack, doc comments) for: updates, non-urgent questions, reference information, decisions that need reflection time, 2) Use sync (call, video, in-person) for: complex explanations, brainstorming, conflict resolution, sensitive topics, urgent decisions, 3) When in doubt, ask: "Does this need immediate back-and-forth, or can we think and respond?", 4) Default to async to respect others\' time and focus, 5) If a thread goes back-and-forth 3+ times, suggest moving to a call.'
    ],
    modifications: [
      'Easier: Just use email for everything non-urgent, calls for everything urgent.',
      'Harder: Layer communication (async for context → sync for decision → async for follow-up).'
    ],
    completionCue: 'Medium chosen. Decision made.'
  },
  {
    id: 'digital_chat_etiquette',
    name: 'Meeting Chat Etiquette',
    description: 'Use chat features productively without disrupting meeting flow.',
    duration: 180,
    estimatedMinutes: 3,
    icon: MessageSquare,
    category: 'Digital',
    tags: ['digital', 'professional', 'meetings', 'etiquette'],
    intention: 'Use chat features productively without disrupting the meeting flow.',
    setup: ['Identify an upcoming virtual meeting.'],
    steps: [
      '1) Use chat for: questions that don\'t need immediate answers, links/resources for the group, "+1" to support someone\'s point, 2) Avoid: side conversations, jokes that distract from speaker, asking questions already answered, 3) If your question is urgent, raise hand or verbally interrupt politely, 4) Monitor chat if you\'re presenting/facilitating - assign someone to surface important chat questions, 5) After meeting, review chat for action items or unanswered questions.'
    ],
    modifications: [
      'Easier: Just stay quiet in chat unless you have a resource to share.',
      'Harder: Actively moderate chat as a facilitator to ensure questions get addressed.'
    ],
    completionCue: 'Chat norms applied. Flow maintained.'
  },
  {
    id: 'digital_screen_share',
    name: 'Screen Share Best Practices',
    description: 'Deliver clear, professional virtual presentations.',
    duration: 180,
    estimatedMinutes: 3,
    icon: MonitorSmartphone,
    category: 'Digital',
    tags: ['digital', 'professional', 'presentations', 'video'],
    intention: 'Deliver clear, professional presentations in virtual settings.',
    setup: ['Open a test video meeting.'],
    steps: [
      '1) Close unnecessary tabs/apps before sharing (especially email, Slack, personal content), 2) Share specific window, not entire screen, to avoid accidental exposure, 3) Zoom to 125-150% if sharing detailed content (spreadsheets, code, designs), 4) Narrate what you\'re doing: "I\'m clicking on the budget tab now...", 5) Pause periodically to check if everyone can see: "Can everyone see this chart clearly?", 6) Have a backup plan if screen sharing fails (send screenshots in chat).'
    ],
    modifications: [
      'Easier: Just close email before sharing anything.',
      'Harder: Use annotation tools (pointer, highlighter) to guide attention.'
    ],
    completionCue: 'Sharing handled like a pro. Done.'
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
    intention: 'Deliver clear, actionable feedback without triggering defensiveness (Center for Creative Leadership model).',
    setup: ['Recall a recent observation you need to share.'],
    steps: [
      '1) Situation: "In yesterday\'s client meeting..." (specific time/place), 2) Behavior: "...when you interrupted Sarah twice..." (observable action, not interpretation), 3) Impact: "...the client seemed confused about who was leading, and Sarah stopped contributing." (concrete consequence), 4) Pause and let them respond - don\'t pile on, 5) If appropriate, collaborate on solution: "How could we handle that differently next time?"'
    ],
    modifications: [
      'Make it easier: Use just Behavior + Impact if Situation is obvious.',
      'Make it harder: Layer in positive SBI before corrective SBI in same conversation.'
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
    intention: 'Balance caring personally with challenging directly (Kim Scott\'s framework).',
    setup: ['Identify a peer or direct report who needs feedback.'],
    steps: [
      '1) Build relationship first - show you genuinely care about the person\'s growth and wellbeing, 2) Challenge directly: give specific, honest feedback about behavior/work, not personality, 3) Avoid ruinous empathy (caring but not challenging) or obnoxious aggression (challenging without caring), 4) Make it a dialogue: "Tell me if I\'m off base here...", 5) Follow up: check in on whether they made progress, offer support.'
    ],
    modifications: [
      'Make it easier: Start with "praise specifically, criticize specifically" formula.',
      'Make it harder: Give radical candor upward (to your manager) or laterally (to peers).'
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
    intention: 'Express needs and make requests without blame or judgment (Marshall Rosenberg\'s method).',
    setup: ['Identify a request you need to make.'],
    steps: [
      '1) Observation: State facts without evaluation - "The report was submitted 2 days late" not "You\'re always late", 2) Feeling: Name your emotion - "I felt stressed", 3) Need: Identify underlying need - "...because I need reliability to meet client deadlines", 4) Request: Make specific, actionable request - "Would you be willing to let me know if you\'ll miss a deadline 24 hours in advance?", 5) Listen to their needs and feelings in return.'
    ],
    modifications: [
      'Make it easier: Use just Observation + Request for low-stakes situations.',
      'Make it harder: Use full NVC in heated conflicts where emotions are high.'
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
    intention: 'Create a "pool of shared meaning" during high-stakes dialogue (Patterson et al.).',
    setup: ['Identify a high-stakes conversation coming up.'],
    steps: [
      '1) Notice when conversation becomes crucial (high stakes, differing opinions, strong emotions), 2) Make it safe: establish mutual purpose ("We both want the project to succeed"), mutual respect, 3) Share your story, not your conclusion: "I\'m worried that..." instead of "You obviously don\'t care about...", 4) Encourage others to share their perspective: "Help me understand your thinking...", 5) Pool all viewpoints before deciding - don\'t force premature consensus.'
    ],
    modifications: [
      'Make it easier: Just pause and establish mutual purpose when tension rises.',
      'Make it harder: Facilitate crucial conversations for groups (mediation).'
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
    intention: 'Cultivate gravitas, communication, and appearance (Sylvia Ann Hewlett\'s research).',
    setup: ['Before a meeting or presentation.'],
    steps: [
      '1) Gravitas: Project confidence under pressure - maintain composure during challenges, make decisions decisively, own mistakes without excuses, 2) Communication: Speak with clarity and command attention - use pauses for emphasis, eliminate filler words ("um", "like"), vary vocal tone, 3) Appearance: Dress appropriately for your context - slightly more formal than your audience, groomed, intentional choices, 4) Self-assess: record yourself in a meeting or presentation and watch for these elements, 5) Get trusted feedback from mentor or peer.'
    ],
    modifications: [
      'Make it easier: Focus on just one element (start with communication).',
      'Make it harder: Adapt executive presence across different cultures and organizational contexts.'
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
    intention: 'Communicate effectively with managers and executives to advance your work and career.',
    setup: ['Prepare for a 1-on-1 with a lead.'],
    steps: [
      '1) Learn their communication preferences: email vs. chat vs. in-person, morning vs. afternoon, detail level, 2) Lead with the bottom line: "Here\'s my recommendation, here\'s why, here are the trade-offs" (executives are time-constrained), 3) Bring solutions, not just problems: "Here\'s the issue, here are 3 options I see, I recommend option 2 because...", 4) Respect their time: consolidate questions into one message/meeting, prepare agenda in advance, 5) Update proactively on high-visibility projects - don\'t wait for them to ask.'
    ],
    modifications: [
      'Make it easier: Just send weekly status updates in their preferred format.',
      'Harder: Anticipate their concerns and address them before they raise them.'
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
    intention: 'Protect your time and energy while maintaining professionalism and relationships.',
    setup: ['Identify your non-negotiables.'],
    steps: [
      '1) Identify your non-negotiables (e.g., no emails after 7pm, no meetings before 9am, lunch break protected), 2) Communicate boundaries clearly and early: "I don\'t check email after 7pm, but you can text me if it\'s urgent", 3) Offer alternatives when saying no: "I can\'t take this on, but have you asked Jordan?", 4) Be consistent - boundaries only work if you enforce them repeatedly, 5) Revisit and adjust as needed - boundaries aren\'t static.'
    ],
    modifications: [
      'Make it easier: Set just one boundary and hold it.',
      'Make it harder: Navigate boundary-setting with difficult personalities or high-pressure cultures.'
    ],
    completionCue: 'Boundaries communicated. Space protected.'
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
  }
];
