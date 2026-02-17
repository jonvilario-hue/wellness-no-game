import type { LucideIcon } from 'lucide-react';
import { 
  Wind, Mic2, MessageSquare, User, Eye, ArrowLeftRight, 
  Target, Sparkles, Brain, ShieldAlert, BookOpen, Presentation, 
  Mail, Video, ClipboardList, Heart, HeartHandshake, Compass, 
  Share2, Smile, Scale, Anchor, Clock, Pencil, Activity, 
  ListChecks, Map, Trash2, Gift, Repeat, RefreshCcw, 
  Layers, Link as LinkIcon, ShieldCheck, X
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
  | 'Digital';

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
      '2. Wait 2-3 seconds, then subtly match their position (crossed legs, lean direction).',
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
  {
    id: 'nonverbal_hand_gestures',
    name: 'Purposeful Hand Gestures',
    description: 'Enhance comprehension and memory through intentional movement.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Activity,
    category: 'Nonverbal',
    tags: ["nonverbal", "public-speaking", "clarity"],
    intention: 'Enhance comprehension and memory through intentional movement.',
    setup: ['Stand up or sit without a desk in front of you.'],
    steps: [
      '1. Keep hands visible above waist level.',
      '2. Use size gestures for comparisons ("this big" vs "this small").',
      '3. Use directional gestures for sequences ("first... then... finally").',
      '4. Use containment gestures for concepts ("imagine holding this idea").',
      '5. Avoid repetitive filler gestures (constant pointing, hand-wringing).'
    ],
    modifications: [
      'Easier: Just keep hands visible and still.',
      'Harder: Match gestures to specific words for maximum impact.'
    ],
    completionCue: 'Hands feeling expressive? Great.'
  },
  {
    id: 'nonverbal_facial_congruence',
    name: 'Facial Expression Congruence',
    description: 'Build trust by matching your expressions to your message.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Smile,
    category: 'Nonverbal',
    tags: ["nonverbal", "emotional-intelligence", "trust"],
    intention: 'Build trust by matching your expressions to your message.',
    setup: ['Look in a mirror or record a video.'],
    steps: [
      '1. Notice what emotion your words convey.',
      '2. Check if your face reflects that emotion.',
      '3. Practice common mismatches: smiling while delivering bad news.',
      '4. If discussing something serious, let your face show appropriate concern.',
      '5. If sharing good news, let yourself smile fully.'
    ],
    modifications: [
      'Easier: Just avoid smiling during serious topics.',
      'Harder: Practice micro-expressions that match nuanced emotions.'
    ],
    completionCue: 'Expression aligned. Done.'
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
    setup: ['Observe distances in social settings.'],
    steps: [
      '1. Default to 1.5-4 feet in Western professional contexts.',
      '2. Notice if the other person steps back or leans in.',
      '3. Match their spatial preference - if they step back, stay where you are.',
      '4. In other cultures, research appropriate distances beforehand.',
      '5. Adjust for context: closer for friends, farther for strangers.'
    ],
    modifications: [
      'Easier: Just maintain arm\'s length distance.',
      'Harder: Calibrate in real-time based on micro-cues (body tension, eye shifts).'
    ],
    completionCue: 'Space calibrated. Safe.'
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
    setup: ['Use this during a live group or 1-on-1 interaction.'],
    steps: [
      '1. Finishing turn: drop pitch at end, make eye contact, use a completion gesture.',
      '2. Wanting to speak: lean forward slightly, make eye contact, take a breath.',
      '3. Watch for others\' signals before jumping in.',
      '4. If you accidentally overlap, say "Sorry, go ahead" and yield.',
      '5. Practice in low-stakes conversations first.'
    ],
    modifications: [
      'Easier: Just focus on pitch drop when done speaking.',
      'Harder: Read multiple signals simultaneously in group conversations.'
    ],
    completionCue: 'Turn-taking mastered. Fluid.'
  },
  {
    id: 'convo_bridging',
    name: 'Topic Bridging Exercise',
    description: 'Change subjects smoothly without jarring transitions.',
    duration: 120,
    estimatedMinutes: 2,
    icon: LinkIcon,
    category: 'Conversation Structure',
    tags: ["conversation", "flow", "small-talk"],
    intention: 'Change subjects smoothly without jarring transitions.',
    setup: ['Choose two unrelated topics.'],
    steps: [
      '1. Find a small connection between current topic and new topic.',
      '2. Use bridging phrases: "Speaking of X...", "That reminds me...".',
      '3. Acknowledge the shift: "Changing gears for a second...".',
      '4. If no connection exists, use: "Completely different topic, but...".',
      '5. Avoid abrupt topic drops mid-conversation.'
    ],
    modifications: [
      'Easier: Use any bridging phrase consistently.',
      'Harder: Find thematic connections even between unrelated topics.'
    ],
    completionCue: 'Bridge built. Transition smooth.'
  },
  {
    id: 'convo_backchannel',
    name: 'Backchannel Response Drill',
    description: 'Show active processing without interrupting the speaker.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: MessageSquare,
    category: 'Conversation Structure',
    tags: ["conversation", "listening", "engagement"],
    intention: 'Show active processing without interrupting the speaker.',
    setup: ['Listen to a podcast or partner.'],
    steps: [
      '1. Use verbal nods: "Mm-hmm", "Right", "I see", "Gotcha".',
      '2. Time them during natural pauses, not over words.',
      '3. Vary your responses - don\'t repeat the same one.',
      '4. Match intensity to content.',
      '5. Pair with nonverbal nods or facial expressions.'
    ],
    modifications: [
      'Easier: Just nod physically without verbal responses.',
      'Harder: Use backchannels that advance the conversation ("And then what?").'
    ],
    completionCue: 'Backchannels active. Engaged.'
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
    setup: ['Recall a recent misunderstanding.'],
    steps: [
      '1. Notice confusion cues (furrowed brow, silence).',
      '2. Stop and acknowledge: "Let me try that again...".',
      '3. Rephrase using different words or a simpler structure.',
      '4. Check for understanding: "Does that make more sense?".',
      '5. Don\'t keep going if confusion persists.'
    ],
    modifications: [
      'Easier: Just say "Sorry, what I meant was..." and restate.',
      'Harder: Diagnose WHY they\'re confused and target that specifically.'
    ],
    completionCue: 'Repair strategy ready. Clear.'
  },
  {
    id: 'convo_adjacency_pairs',
    name: 'Adjacency Pairs Awareness',
    description: 'Understand conversational expectations to avoid social friction.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Layers,
    category: 'Conversation Structure',
    tags: ["conversation", "social-skills", "pragmatics"],
    intention: 'Understand conversational expectations to avoid social friction.',
    setup: ['Think of common greetings and questions.'],
    steps: [
      '1. Learn common pairs: Question→Answer, Greeting→Greeting, Thank you→Welcome.',
      '2. Notice when someone offers the first part and respond with the second.',
      '3. If you can\'t provide expected response, acknowledge it.',
      '4. Don\'t leave pairs unresolved - it creates debt.',
      '5. Practice in everyday interactions.'
    ],
    modifications: [
      'Easier: Focus on greetings and thanks.',
      'Harder: Handle complex pairs like criticism→acceptance.'
    ],
    completionCue: 'Pairs matched. Friction reduced.'
  },
  {
    id: 'convo_pre_closing',
    name: 'Pre-Closing Signals',
    description: 'End conversations gracefully without abruptness.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: X,
    category: 'Conversation Structure',
    tags: ["conversation", "boundaries", "social-skills"],
    intention: 'End conversations gracefully without abruptness or awkward lingering.',
    setup: ['Practice during your next conversation wrap-up.'],
    steps: [
      '1. Signal you\'re wrapping up: "Well...", "Anyway...".',
      '2. Summarize or reference future action: "I\'ll send you that link".',
      '3. Use physical cues: stand up, step back.',
      '4. If they keep talking, repeat signals gently.',
      '5. End with clear closer: "Great talking with you!".'
    ],
    modifications: [
      'Easier: Just say "I need to run" directly.',
      'Harder: Layer multiple signals for smoother exit.'
    ],
    completionCue: 'Exit strategy locked. Done.'
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
    setup: ['Identify a request you need to make this week.'],
    steps: [
      '1. Identify something small you can offer first (info, favor).',
      '2. Give it genuinely without strings.',
      '3. Wait - don\'t immediately ask for something back.',
      '4. When you ask, frame it simply.',
      '5. Notice the dynamic change.'
    ],
    modifications: [
      'Easier: Compliment someone before asking for help.',
      'Harder: Build reciprocity over weeks with multiple gives.'
    ],
    completionCue: 'Reciprocity cycle started. Done.'
  },
  {
    id: 'persuasion_social_proof',
    name: 'Social Proof Framing',
    description: 'Leverage conformity to make suggestions appealing.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Users,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "professional"],
    intention: 'Leverage conformity to make your suggestion more appealing.',
    setup: ['Draft a proposal or suggestion.'],
    steps: [
      '1. Identify relevant reference group ("people like you").',
      '2. State what they\'re doing: "Most clients start with...".',
      '3. Make it specific with numbers: "73% of users chose...".',
      '4. Avoid vague claims: "Everyone does this".',
      '5. Use truthfully - false proof damages trust.'
    ],
    modifications: [
      'Easier: Just mention one other person who did it.',
      'Harder: Layer multiple forms of proof (experts + peers).'
    ],
    completionCue: 'Social proof integrated. Persuasive.'
  },
  {
    id: 'persuasion_foot_door',
    name: 'Foot-in-the-Door Technique',
    description: 'Build commitment by starting with a small request.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Activity,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "negotiation"],
    intention: 'Build commitment by starting with a small request first.',
    setup: ['Define your large ultimate request.'],
    steps: [
      '1. Identify your ultimate ask.',
      '2. Design a much smaller related ask (<5 min).',
      '3. Make the small ask first and get agreement.',
      '4. Wait hours or days - don\'t escalate yet.',
      '5. Make larger request, consistent with the first "yes".'
    ],
    modifications: [
      'Easier: Just ask for the small thing and stop.',
      'Harder: Chain multiple escalating asks over weeks.'
    ],
    completionCue: 'Commitment path established. Ready.'
  },
  {
    id: 'persuasion_framing',
    name: 'Positive vs Negative Framing',
    description: 'Shape decisions by emphasizing gains or losses.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Scale,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "framing"],
    intention: 'Shape decisions by emphasizing gains or losses (Kahneman & Tversky).',
    setup: ['Take one proposal and write it two ways.'],
    steps: [
      '1. Identify the core message.',
      '2. Frame A (Positive): emphasize gain ("Save $200").',
      '3. Frame B (Negative): emphasize loss ("Lose $200").',
      '4. Choose based on context: positive for risk-averse.',
      '5. Test both in low-stakes situations.'
    ],
    modifications: [
      'Easier: Just pick one frame and stick with it.',
      'Harder: Switch frames mid-convo based on response.'
    ],
    completionCue: 'Frames mastered. Choice influenced.'
  },
  {
    id: 'persuasion_anchoring',
    name: 'Anchoring Practice',
    description: 'Set the reference point in negotiations.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Anchor,
    category: 'Persuasion',
    tags: ["persuasion", "negotiation", "professional"],
    intention: 'Set the reference point in negotiations to influence outcomes.',
    setup: ['Prepare for a salary or price negotiation.'],
    steps: [
      '1. Go first with a number if you have info advantage.',
      '2. Start higher/lower than target, not absurdly so.',
      '3. Use precise numbers ($47,300) for stronger effect.',
      '4. If they anchor first, reset the baseline.',
      '5. Provide rationale to make it credible.'
    ],
    modifications: [
      'Easier: Just state your number first.',
      'Harder: Layer multiple anchors (salary + benefits).'
    ],
    completionCue: 'Anchor dropped. Negotiating.'
  },
  {
    id: 'persuasion_scarcity',
    name: 'Scarcity Framing Exercise',
    description: 'Increase value by highlighting limited availability.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Clock,
    category: 'Persuasion',
    tags: ["persuasion", "influence", "sales"],
    intention: 'Increase perceived value by highlighting limited availability.',
    setup: ['Identify a limited offer.'],
    steps: [
      '1. Identify genuine scarcity (time, quantity).',
      '2. State it: "Only 3 spots left", "Offer closes Friday".',
      '3. Explain WHY it\'s scarce (builds credibility).',
      '4. Avoid false scarcity - it destroys trust.',
      '5. Let them decide without pressure.'
    ],
    modifications: [
      'Easier: Just mention a deadline.',
      'Harder: Combine scarcity with social proof.'
    ],
    completionCue: 'Scarcity highlighted. Value boosted.'
  },
  {
    id: 'persuasion_inoculation',
    name: 'Inoculation',
    description: 'Strengthen your position by acknowledging objections first.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: ShieldCheck,
    category: 'Persuasion',
    tags: ["persuasion", "argumentation", "professional"],
    intention: 'Strengthen your position by acknowledging objections first.',
    setup: ['List potential objections to your idea.'],
    steps: [
      '1. List likely counterarguments.',
      '2. Bring up the strongest one yourself.',
      '3. Address it directly with evidence.',
      '4. Don\'t over-defend - keep it brief.',
      '5. Return to main point after inoculating.'
    ],
    modifications: [
      'Easier: Address one obvious objection.',
      'Harder: Inoculate against 2-3 arguments smoothly.'
    ],
    completionCue: 'Argument inoculated. Robust.'
  },

  // --- Clarity ---
  {
    id: 'clarity_concrete',
    name: 'Concrete Language Swap',
    description: 'Replace vague abstractions with specific words.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Pencil,
    category: 'Clarity',
    tags: ["clarity", "writing", "professional"],
    intention: 'Replace vague abstractions with specific, tangible words.',
    setup: ['Open a recent email or draft.'],
    steps: [
      '1. Identify abstract words: "improve", "synergy".',
      '2. Ask: what does this actually LOOK like?.',
      '3. Replace with concrete specifics: "reduce time".',
      '4. Use names, numbers, actions.',
      '5. Test: "Can a 10-year-old visualize this?".'
    ],
    modifications: [
      'Easier: Focus on nouns only.',
      'Harder: Make verbs concrete too ("use" not "utilize").'
    ],
    completionCue: 'Language concrete. Visualized.'
  },
  {
    id: 'clarity_active_voice',
    name: 'Active Voice Conversion',
    description: 'Increase clarity by naming who does what.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Activity,
    category: 'Clarity',
    tags: ["clarity", "writing", "professional"],
    intention: 'Increase clarity and accountability by naming who does what.',
    setup: ['Find passive sentences in your writing.'],
    steps: [
      '1. Find passive: "mistakes were made".',
      '2. Ask: who is doing this action?.',
      '3. Rewrite with actor first: "We made mistakes".',
      '4. Keep passive only if actor is unknown.',
      '5. Practice on old emails or documents.'
    ],
    modifications: [
      'Easier: Convert one sentence per paragraph.',
      'Harder: Eliminate all passive voice in a full doc.'
    ],
    completionCue: 'Voice active. Clear.'
  },
  {
    id: 'clarity_one_idea',
    name: 'One Idea Per Sentence Drill',
    description: 'Break complex sentences into simple ones.',
    duration: 240,
    estimatedMinutes: 4,
    icon: ListChecks,
    category: 'Clarity',
    tags: ["clarity", "writing", "simplicity"],
    intention: 'Reduce cognitive load by breaking complex sentences into simple ones.',
    setup: ['Pick a dense paragraph.'],
    steps: [
      '1. Find sentences with "and", "but", "however".',
      '2. Identify how many distinct ideas are inside.',
      '3. Split into separate sentences - one idea each.',
      '4. Reorder for logical flow.',
      '5. Read aloud to test clarity.'
    ],
    modifications: [
      'Easier: Just split sentences with "and".',
      'Harder: Apply to an entire speech/document.'
    ],
    completionCue: 'One sentence, one idea. Simple.'
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
    setup: ['Prepare a short intro for a talk.'],
    steps: [
      '1. Use openers: "First", "To begin".',
      '2. Use connectors: "However", "Similarly".',
      '3. Use closers: "In conclusion", "To sum up".',
      '4. Preview structure: "I\'ll cover three things...".',
      '5. Reference back: "As I mentioned earlier".'
    ],
    modifications: [
      'Easier: Just use "First, second, third".',
      'Harder: Layer multiple signpost types.'
    ],
    completionCue: 'Roadmap laid. Attention guided.'
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
    setup: ['Scan a technical document.'],
    steps: [
      '1. List specialized terms in your content.',
      '2. For each, ask: would an outsider know this?.',
      '3. If no: replace with plain language or define it.',
      '4. Test on someone unfamiliar.',
      '5. Keep only jargon that saves significant time.'
    ],
    modifications: [
      'Easier: Remove obvious acronyms.',
      'Harder: Eliminate ALL jargon, even semi-common.'
    ],
    completionCue: 'Jargon purged. Accessible.'
  },
  {
    id: 'clarity_analogy',
    name: 'Analogy Building',
    description: 'Explain unfamiliar concepts by comparing them to familiar ones.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Lightbulb,
    category: 'Clarity',
    tags: ["clarity", "teaching", "creativity"],
    intention: 'Explain unfamiliar concepts by comparing to familiar ones.',
    setup: ['Pick a hard-to-explain topic.'],
    steps: [
      '1. Identify the hard-to-grasp concept.',
      '2. Find something familiar with a similar feature.',
      '3. State: "X is like Y because...".',
      '4. Extend only where it fits.',
      '5. Test if it clarifies or confuses.'
    ],
    modifications: [
      'Easier: Use simple physical analogies.',
      'Harder: Build multi-step analogies.'
    ],
    completionCue: 'Analogy built. Concept clear.'
  },

  // --- Emotional Intelligence ---
  {
    id: 'ei_labeling',
    name: 'Emotion Labeling Exercise',
    description: 'Reduce emotional intensity by naming what you\'re feeling.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Smile,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "self-awareness", "regulation"],
    intention: 'Reduce emotional intensity by naming what you\'re feeling.',
    setup: ['Pause during a moment of stress.'],
    steps: [
      '1. Notice physical sensation (chest, jaw).',
      '2. Name the emotion specifically (not just "bad").',
      '3. Say it or write it: "I\'m feeling [emotion]".',
      '4. Notice if intensity decreases.',
      '5. Use an emotion wheel if struggling.'
    ],
    modifications: [
      'Easier: Use broad categories (mad/sad/glad).',
      'Harder: Identify layered emotions.'
    ],
    completionCue: 'Feeling labeled. Intensity down.'
  },
  {
    id: 'ei_i_statement',
    name: '"I" Statement Practice',
    description: 'Express feelings without blaming to reduce defensiveness.',
    duration: 120,
    estimatedMinutes: 2,
    icon: User,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "conflict", "assertiveness"],
    intention: 'Express feelings without blaming to reduce defensiveness.',
    setup: ['Think of a minor annoyance.'],
    steps: [
      '1. Structure: "I feel [X] when [Y] because [Z]".',
      '2. Example: "I feel frustrated when meetings start late...".',
      '3. Avoid "you" statements.',
      '4. Be specific about behavior, not character.',
      '5. Practice on minor things first.'
    ],
    modifications: [
      'Easier: Just use "I feel [emotion]".',
      'Harder: Use in real-time conflict.'
    ],
    completionCue: 'Statement drafted. Ready to speak.'
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
    setup: ['Listen to a friend or coworker vent.'],
    steps: [
      '1. Listen for the underlying emotion.',
      '2. Name it: "That sounds really frustrating".',
      '3. Resist the urge to fix or minimize.',
      '4. Wait for them to feel heard.',
      '5. If advising, ask first: "Do you want suggestions?".'
    ],
    modifications: [
      'Easier: Just say "That makes sense" first.',
      'Harder: Validate even when you disagree.'
    ],
    completionCue: 'Validation delivered. Trust built.'
  },
  {
    id: 'ei_perspective',
    name: 'Perspective-Taking Drill',
    description: 'Reduce conflict by genuinely seeing the other person\'s viewpoint.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Compass,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "empathy", "conflict"],
    intention: 'Reduce conflict by genuinely seeing the other person\'s viewpoint.',
    setup: ['Recall a disagreement.'],
    steps: [
      '1. State their position in your own words.',
      '2. Ask: what would have to be true for this to make sense?.',
      '3. Identify needs/fears driving their stance.',
      '4. Share understanding: "From your perspective...".',
      '5. Notice your emotional shift toward them.'
    ],
    modifications: [
      'Easier: List 3 reasons why a reasonable person holds their view.',
      'Harder: Steelman their argument (make it stronger).'
    ],
    completionCue: 'Perspective shifted. Conflict cooled.'
  },
  {
    id: 'ei_disclosure',
    name: 'Appropriate Self-Disclosure',
    description: 'Build connection by sharing strategically, not oversharing.',
    duration: 150,
    estimatedMinutes: 2.5,
    icon: Share2,
    category: 'Emotional Intelligence',
    tags: ["emotional-intelligence", "connection", "boundaries"],
    intention: 'Build connection by sharing strategically, not oversharing.',
    setup: ['Prepare a small personal story.'],
    steps: [
      '1. Ask: is this relevant to what THEY shared?.',
      '2. Keep it brief - match their disclosure.',
      '3. Focus on feeling/lesson, not just details.',
      '4. Watch their response for comfort.',
      '5. Avoid one-upping or trauma-dumping.'
    ],
    modifications: [
      'Easier: Share only positive/resolved experiences.',
      'Harder: Share current struggles appropriately.'
    ],
    completionCue: 'Disclosure complete. Connection built.'
  },

  // --- Conflict Resolution ---
  {
    id: 'conflict_deescalation',
    name: 'De-Escalation Technique',
    description: 'Use your voice and body to lower the tension in a heated moment.',
    duration: 180,
    estimatedMinutes: 3,
    icon: ShieldAlert,
    category: 'Conflict Resolution',
    tags: ['conflict', 'de-escalation', 'emotional-intelligence'],
    intention: 'Maintain control of the environment by regulating your own nervous system response.',
    setup: ['Recall a recent moment of tension.'],
    steps: [
      '1. Lower your volume by 10-20% below the other person\'s level.',
      '2. Consciously slow your speaking rate.',
      '3. Soften your facial muscles and relax your jaw.',
      '4. Keep your hands visible and open.',
      '5. Practice saying: "I want to make sure I understand your perspective correctly."'
    ],
    modifications: [
      'Solo: Practice the physical "shift" in front of a mirror.',
      'Make it harder: Practice this while listening to loud or aggressive music to simulate pressure.'
    ],
    completionCue: 'Pulse steady? Voice calm? You are ready.'
  },
  {
    id: 'conflict_i_statements',
    name: '"I" Statement Practice',
    description: 'Express your needs without triggering defensiveness in others.',
    duration: 120,
    estimatedMinutes: 2,
    icon: User,
    category: 'Conflict Resolution',
    tags: ['conflict', 'emotional-intelligence', 'vulnerability'],
    intention: 'Take ownership of your feelings to foster collaboration rather than blame.',
    setup: ['Identify a small frustration you currently have.'],
    steps: [
      '1. Identify the feeling: "I feel [emotion]..."',
      '2. Identify the specific behavior: "...when [fact-based observation]..."',
      '3. Identify the impact: "...because [the effect on you]..."',
      '4. State the need: "I would appreciate it if [request]."',
      '5. Combine: "I feel frustrated when meetings start late because it affects my afternoon schedule. I’d appreciate it if we could start on time."'
    ],
    modifications: [
      'Make it easier: Write it down first to ensure no "You" language sneaks in.',
      'Make it harder: Deliver the statement out loud with a neutral tone.'
    ],
    completionCue: 'Statement formulated and clear. Well done.'
  },

  // --- Public Speaking ---
  {
    id: 'speaking_extemporaneous',
    name: 'Extemporaneous Delivery',
    description: 'Speak from an outline to maintain eye contact and natural flow.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Presentation,
    category: 'Public Speaking',
    tags: ['public-speaking', 'confidence', 'clarity'],
    intention: 'Avoid the "robotic" feel of reading a script while remaining structured.',
    setup: ['Choose a topic you know well.', 'Grab a small note card.'],
    steps: [
      '1. Write 3-5 bullet points (keywords only) on your card.',
      '2. Stand up and set a timer for 2 minutes.',
      '3. Deliver a talk using ONLY the keywords as anchors.',
      '4. Allow yourself to use different words each time you practice a point.',
      '5. Maintain "audience" eye contact (3-5 seconds per imaginary person).'
    ],
    modifications: [
      'Make it easier: Use a fuller outline for the first attempt.',
      'Make it harder: Use only ONE word per bullet point.'
    ],
    completionCue: 'When you can speak fluently without reading, you are ready.'
  },
  {
    id: 'speaking_power_pose',
    name: 'Pre-Speaking Power Pose',
    description: 'Use body language to chemically reduce stress before a talk.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Target,
    category: 'Public Speaking',
    tags: ['public-speaking', 'confidence', 'quick'],
    intention: 'Lower cortisol and increase testosterone to feel more dominant and less threatened.',
    setup: ['Find a private space (restroom, hallway, etc.).'],
    steps: [
      '1. Stand with feet wide and hands on hips (Wonder Woman/Superman).',
      '2. Alternatively, reach arms high in a "V" shape.',
      '3. Take slow, deep breaths.',
      '4. Hold for 2 full minutes.',
      '5. Notice the shift in your felt sense of confidence.'
    ],
    modifications: [
      'Solo: Do this in front of a mirror.',
      'Make it easier: 1 minute is often enough if you are in a rush.'
    ],
    completionCue: 'Feeling larger and more present? Go get them.'
  },

  // --- Storytelling ---
  {
    id: 'story_three_act',
    name: 'Three-Act Micro-Story',
    description: 'Structure any anecdote for maximum impact in under 60 seconds.',
    duration: 180,
    estimatedMinutes: 3,
    icon: BookOpen,
    category: 'Storytelling',
    tags: ['storytelling', 'small-talk', 'professional'],
    intention: 'Deliver information in a narrative format that is 22x more likely to be remembered than facts.',
    setup: ['Think of a recent accomplishment or interesting event.'],
    steps: [
      '1. The Setup: Describe the baseline (Where? Who? What was normal?).',
      '2. The Conflict: The "But" moment (What went wrong? What changed?).',
      '3. The Resolution: The "Therefore" (How was it solved? What was the lesson?).',
      '4. Practice telling the story in exactly three sentences.'
    ],
    modifications: [
      'Make it easier: Use the "Once upon a time... Every day... Until one day..." prompt.',
      'Make it harder: Add one sensory detail (smell, sound, texture) to the setup.'
    ],
    completionCue: 'Story arc clear? Narrative locked.'
  }
];