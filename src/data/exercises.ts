
import type { LucideIcon } from 'lucide-react';
import { Dumbbell, StretchHorizontal, Brain, Wind, Waves, PersonStanding, Cat, Mountain, Bird, TreeDeciduous, Zap, Shield, HeartHandshake, Eye, Sunrise, Moon, Activity, Sparkles, Smile } from 'lucide-react';

// --- CATEGORY TYPES ---
export type ExerciseCategory = 'Stretching' | 'Strength' | 'Energizer' | 'Wakeup & Wind-Down' | 'Mind-Body';
export type MindfulnessCategory = 'Breathwork' | 'Clarity & Focus' | 'Grounding & Safety' | 'Self-Compassion' | 'Appreciation & Gratitude';

type BasePractice = {
  id: string;
  name: string;
  description: string;
  duration: number; // in seconds
  icon: LucideIcon;
  tags: string[];
  estimatedMinutes: number;
};

export type Exercise = BasePractice & {
  category: ExerciseCategory | MindfulnessCategory;
  intention: string;
  setup: string[];
  steps: string[];
  modifications: string[];
  completionCue: string;
};

export type MindfulnessPractice = Exercise & {
  category: MindfulnessCategory;
};

// --- MOVEMENT MODULES ---

export const movementExercises: Exercise[] = [
  // --- Mind-Body Category ---
  {
    id: 'yoga_morning_flow',
    name: '5-Minute Morning Flow',
    description: 'A balanced yoga sequence to wake up the spine and focus the mind.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Waves,
    category: 'Mind-Body',
    tags: ['flow', 'mindful', 'yoga', 'morning', 'energizing'],
    intention: 'Wake up your body and sharpen your mind with a balanced sequence.',
    setup: ['Find a quiet space with enough room to stretch.', 'Wear comfortable clothing.'],
    steps: [
      'Start in Mouse Pose (knees wide, big toes touching, forehead on floor).',
      'Move to all fours for Cat-Cow (arching and rounding the back with breath).',
      'Tuck toes and lift hips high for Downward Facing Dog.',
      'Step forward slowly into a Forward Fold, letting the head hang.',
      'Rise up slowly, reaching arms overhead into Mountain Pose.',
      'Bring hands to heart center and breathe deeply.'
    ],
    modifications: [
      'Make it easier: Keep knees bent significantly in Downward Dog and Forward Fold.',
      'Make it harder: Hold each pose for 10 deep breaths instead of moving through'
    ],
    completionCue: 'Feel your body awake and mind centered? You are ready.'
  },
  {
    id: 'yoga_evening_sequence',
    name: 'Gentle Evening Yoga',
    description: 'Release physical tension and quiet the mind before the end of the day.',
    duration: 480,
    estimatedMinutes: 8,
    icon: Moon,
    category: 'Mind-Body',
    tags: ['flow', 'mindful', 'yoga', 'sleep', 'restorative'],
    intention: 'Release physical tension and quiet the mind before rest.',
    setup: ['Dim the lights.', 'Use a mat or a soft carpet.'],
    steps: [
      'Sit cross-legged and roll your neck slowly in both directions.',
      'Take a gentle seated spinal twist to each side, holding for 5 breaths.',
      'Move to Butterfly pose, soles of feet together, knees dropping open.',
      'Lie on your back and hug knees into your chest, rocking side to side.',
      'Happy Baby pose: hold the outsides of your feet, pulling knees toward armpits.',
      'Final resting pose (Savasana): Lie flat, eyes closed, for 2 minutes.'
    ],
    modifications: [
      'Make it easier: Support your knees with pillows or blocks in Butterfly pose.',
      'Make it harder: Lengthen the final resting pose to 5 minutes for deeper calm.'
    ],
    completionCue: 'When your mind feels quiet and body heavy, you are done.'
  },
  {
    id: 'taichi_fundamentals',
    name: 'Tai Chi Fundamentals',
    description: 'Improve balance and internal calm with basic circular motions.',
    duration: 360,
    estimatedMinutes: 6,
    icon: Wind,
    category: 'Mind-Body',
    tags: ['flow', 'mindful', 'tai-chi'],
    intention: 'Improve balance and internal calm with slow, circular movements.',
    setup: ['Stand with feet shoulder-width apart.', 'Relax your shoulders and sink your weight slightly.'],
    steps: [
      'Opening Stance: Inhale and slowly lift arms to shoulder height, then exhale and push down.',
      'Cloud Hands: Move hands in slow, horizontal circles in front of your body while shifting weight.',
      'Parting the Wild Horse\'s Mane: Step forward gently while moving one hand up and one down.',
      'Brush Knee: Step forward, one hand "brushes" the knee while the other pushes forward.',
      'Closing: Return to center, feet together, and breathe slowly to finish.'
    ],
    modifications: [
      'Make it easier: Perform the arm movements while seated in a sturdy chair.',
      'Make it harder: Move even slower and sink lower into your legs for leg strength.'
    ],
    completionCue: 'Feel the flow of energy and centeredness? That is the goal.'
  },
  {
    id: 'taichi_weight_shift',
    name: 'Harmonious Balance Form',
    description: 'A short sequence focused on weight shifting and coordination.',
    duration: 420,
    estimatedMinutes: 7,
    icon: Activity,
    category: 'Mind-Body',
    tags: ['flow', 'mindful', 'tai-chi', 'balance'],
    intention: 'Enhance coordination and physical stability through controlled weight shifting.',
    setup: ['Clear a space where you can take 2-3 steps in any direction.', 'Stand tall but relaxed.'],
    steps: [
      'Rooting: Shift weight entirely to one leg, then the other, feeling the connection to the ground.',
      'Single Whip: Extend one arm out while the other forms a "hook" hand.',
      'Wave Hands like Clouds: Slow, continuous circles while stepping sideways.',
      'Golden Rooster Stands on One Leg: Lift one knee and opposite arm slowly, maintaining balance.',
      'Centering: Stand with feet together, hands on the lower abdomen, breathing naturally.'
    ],
    modifications: [
      'Make it easier: Keep the lifted foot closer to the ground during the balance phase.',
      'Make it harder: Increase the width of your steps and the depth of your stance.'
    ],
    completionCue: 'Once you feel steady and synchronized, you have finished.'
  },

  // --- Wakeup & Wind-Down ---
  {
    id: 'yoga_sun_salutation',
    name: 'Morning Sun Salutation',
    description: 'A classic energizing sequence to build heat and mobility.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Sunrise,
    category: 'Wakeup & Wind-Down',
    tags: ['morning', 'yoga', 'energizing', 'quick'],
    intention: 'Build heat and full-body mobility to start the day.',
    setup: ['Stand at the front of your mat/space.', 'Inhale deeply.'],
    steps: [
      'Mountain Pose: Stand tall, arms at sides.',
      'Upward Salute: Inhale, reach arms high.',
      'Forward Fold: Exhale, fold forward toward your toes.',
      'Plank to Cobra: Step back, lower down, then lift chest forward.',
      'Downward Dog: Lift hips back and up.',
      'Return: Step forward to fold, then rise back to Mountain Pose.'
    ],
    modifications: [
      'Make it easier: Place knees on the ground for the "Cobra" transition.',
      'Make it harder: Hold Plank for 3 breaths before lowering down.'
    ],
    completionCue: 'Feel the heat in your body? You are ready for the day.'
  },
  {
    id: 'yoga_bedtime_flow',
    name: 'Bedtime Restorative Flow',
    description: 'Restorative sequence to calm the nervous system for sleep.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Moon,
    category: 'Wakeup & Wind-Down',
    tags: ['sleep', 'yoga', 'restorative', 'calming'],
    intention: 'Prepare the body and mind for deep, restorative sleep.',
    setup: ['Wear comfortable pajamas.', 'Do this practice on your bed or a soft rug.'],
    steps: [
      'Seated Side Stretch: Sit comfortably and reach one arm over your head, switch sides.',
      'Reclined Twist: Lie on your back, drop knees to the left, then the right.',
      'Legs Up the Wall (or resting on bed headboard): Hold for 2 minutes.',
      'Supine Butterfly: Lie back with soles of feet together, knees falling open.',
      'Conscious Relaxation: Close eyes and focus on the weight of your limbs.'
    ],
    modifications: [
      'Make it easier: Use a pillow behind your back for the butterfly pose.',
      'Make it harder: Focus on making each exhale twice as long as the inhale.'
    ],
    completionCue: 'Feel heavy and relaxed? It is time for sleep.'
  },
  {
    id: 'taichi_morning',
    name: 'Energizing Morning Form',
    description: 'Cultivate internal energy and focus for the day ahead.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Activity,
    category: 'Wakeup & Wind-Down',
    tags: ['morning', 'tai-chi', 'energizing'],
    intention: 'Awaken the senses and circulate internal energy.',
    setup: ['Stand outside if possible, or near an open window.', 'Take three deep breaths.'],
    steps: [
      'Gathering Breath: Scoop arms up from the sides, then press down the center.',
      'Pushing the Wave: Step forward and push hands forward in a wave-like motion.',
      'Spinning the Wheel: Large vertical circles with both arms to wake up the core.',
      'Expanding Chest: Open arms wide to inhale, bring them together to exhale.',
      'Final Balance: Stand tall and still for 30 seconds.'
    ],
    modifications: [
      'Make it easier: Reduce the range of motion in the arm circles.',
      'Make it harder: Coordinate every movement strictly with a slow, full breath.'
    ],
    completionCue: 'When you feel alert and centered, the form is complete.'
  },
  {
    id: 'taichi_evening',
    name: 'Calming Evening Form',
    description: 'Slow down your heart rate and center your energy for rest.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Moon,
    category: 'Wakeup & Wind-Down',
    tags: ['sleep', 'tai-chi', 'calming'],
    intention: 'Gently lower the body\'s arousal level before bedtime.',
    setup: ['Stand in a dimly lit room.', 'Soften your gaze.'],
    steps: [
      'Sinking Qi: Very slow lifting and lowering of the arms.',
      'Carrying the Moon: Rotate torso slowly while holding an "imaginary ball".',
      'Stroking the Peacock\'s Tail: Gentle sweeping motions with the palms.',
      'Repulsing the Monkey (Slow): Very slow backward steps with rhythmic arm pulls.',
      'Stillness: Stand with hands over the heart for 1 minute.'
    ],
    modifications: [
      'Make it easier: Do the upper body movements while sitting.',
      'Make it harder: Move as slowly as possible, trying to take 10 seconds per motion.'
    ],
    completionCue: 'Feel your pulse slowing? You are ready for rest.'
  },

  // --- Stretching ---
  {
    id: 'yoga_down_dog',
    name: 'Classic Downward Dog',
    description: 'Stretch the entire back body and build shoulder stability.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: PersonStanding,
    category: 'Stretching',
    tags: ['yoga', 'flexibility', 'quick', 'desk'],
    intention: 'Relieve tension in the hamstrings, calves, and back.',
    setup: ['Start on hands and knees.', 'Hands should be shoulder-width apart.'],
    steps: [
      'Spread fingers wide and press palms into the floor.',
      'Tuck your toes and lift your knees off the ground.',
      'Send your hips back and up toward the ceiling.',
      'Pedal your feet (bend one knee, then the other) to stretch the calves.',
      'Hold the static pose, reaching heels toward the floor.'
    ],
    modifications: [
      'Make it easier: Keep a deep bend in the knees if your hamstrings are tight.',
      'Make it harder: Lift one leg at a time toward the ceiling (Three-legged dog).'
    ],
    completionCue: 'When your spine feels long and legs feel stretched, you are done.'
  },
  {
    id: 'yoga_mouse_pose',
    name: 'Deep Mouse Pose',
    description: 'A grounding pose to release the lower back and shoulders.',
    duration: 120,
    estimatedMinutes: 2,
    icon: PersonStanding,
    category: 'Stretching',
    tags: ['yoga', 'flexibility', 'quick', 'sleep', 'low-energy'],
    intention: 'Gently release the lower back and promote a sense of calm.',
    setup: ['Kneel on the floor.', 'Big toes touching, knees wide apart.'],
    steps: [
      'Sit back on your heels.',
      'Fold forward, resting your torso between your thighs.',
      'Rest your forehead on the mat or a pillow.',
      'Extend your arms forward or rest them back by your feet.',
      'Breathe deeply into your back ribs for the duration.'
    ],
    modifications: [
      'Make it easier: Place a pillow between your heels and sit-bones for comfort.',
      'Make it harder: Walk your hands to the left, then the right, for a side-body stretch.'
    ],
    completionCue: 'When you feel a release in your back and mind, you have finished.'
  },
  {
    id: 'yoga_cat_cow',
    name: 'Cat-Cow Spine Mobility',
    description: 'Synchronize breath with movement to mobilize the spine.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Cat,
    category: 'Stretching',
    tags: ['yoga', 'flexibility', 'quick', 'morning', 'desk'],
    intention: 'Improve spinal flexibility and coordinate breath with movement.',
    setup: ['Start on hands and knees (tabletop position).', 'Wrists under shoulders, knees under hips.'],
    steps: [
      'Cow: Inhale, drop your belly, and look up toward the ceiling.',
      'Cat: Exhale, round your spine, and tuck your chin toward your chest.',
      'Continue flowing between the two, following your breath rhythm.',
      'Move through the entire length of your spine from tailbone to neck.'
    ],
    modifications: [
      'Make it easier: Reduce the depth of the arch if you have back sensitivity.',
      'Make it harder: Add gentle circular movements of the hips during the flow.'
    ],
    completionCue: 'Spine feels loose and fluid? Excellent.'
  },

  // --- Strength (Balance & Stability) ---
  {
    id: 'balance_tree_pose',
    name: 'Tree Pose Balance',
    description: 'Strengthen ankles and improve single-leg stability.',
    duration: 120,
    estimatedMinutes: 2,
    icon: PersonStanding,
    category: 'Strength',
    tags: ['balance', 'stability', 'core', 'quick', 'yoga'],
    intention: 'Strengthen the stabilizing muscles of the feet and legs.',
    setup: ['Stand tall with feet together.', 'Clear a space near a wall or chair for support.'],
    steps: [
      'Shift your weight into your left foot.',
      'Place the sole of your right foot on your left ankle (like a kickstand).',
      'If steady, move the foot to your calf or inner thigh (never the knee).',
      'Bring hands to heart center and hold for 45 seconds.',
      'Switch legs and repeat.'
    ],
    modifications: [
      'Make it easier: Keep one hand on a wall or chair for balance.',
      'Make it harder: Reach your arms overhead like "branches" or close your eyes.'
    ],
    completionCue: 'Steady on both sides? Well balanced.'
  },
  {
    id: 'balance_airplane',
    name: 'Airplane Balance Hold',
    description: 'Improve total body control and posterior chain strength.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Bird,
    category: 'Strength',
    tags: ['balance', 'stability', 'core', 'quick'],
    intention: 'Strengthen the back, glutes, and core while testing stability.',
    setup: ['Stand with feet hip-width apart.', 'Arms out to the sides for balance.'],
    steps: [
      'Shift weight to one leg, keeping the knee slightly soft.',
      'Hinge forward at the hips, lifting the other leg behind you.',
      'Keep your torso and back leg parallel to the floor.',
      'Engage your core to keep your hips level.',
      'Hold for 30 seconds, then switch legs.'
    ],
    modifications: [
      'Make it easier: Hold onto the back of a chair for support.',
      'Make it harder: Reach arms forward instead of out to the sides.'
    ],
    completionCue: 'Balanced and strong? Done.'
  },
  {
    id: 'balance_deadlift_hold',
    name: 'Single-Leg Deadlift Hold',
    description: 'Build functional balance and hamstring strength.',
    duration: 120,
    estimatedMinutes: 2,
    icon: PersonStanding,
    category: 'Strength',
    tags: ['balance', 'stability', 'core', 'quick'],
    intention: 'Develop eccentric strength in the hamstrings and stability in the hip.',
    setup: ['Stand tall.', 'Have a wall nearby if you feel unsteady.'],
    steps: [
      'Lift one foot slightly off the floor.',
      'Hinge at the hip to lower your torso toward the ground.',
      'Reach your hands toward your standing foot.',
      'Go only as low as you can while keeping a flat back.',
      'Hold the lowest point for 5 seconds, then return to standing.',
      'Do 5 reps on each side.'
    ],
    modifications: [
      'Make it easier: Keep the back toe lightly touching the floor for balance.',
      'Make it harder: Hold a light weight or a water bottle in the opposite hand.'
    ],
    completionCue: 'When hamstrings feel worked and balance held, you\'re finished.'
  },
  {
    id: 'balance_warrior_iii',
    name: 'Warrior III Stability',
    description: 'An advanced balance pose for core and leg integration.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Activity,
    category: 'Strength',
    tags: ['balance', 'stability', 'core', 'yoga'],
    intention: 'Build immense strength and focus through a full-body balance hold.',
    setup: ['Start in a standing lunge position.', 'Take a deep breath.'],
    steps: [
      'Lean forward over your front leg.',
      'Launch off the back foot, lifting it into the air.',
      'Straighten both legs as you form a "T" shape with your body.',
      'Reach arms forward or alongside your body.',
      'Hold for 30 seconds on each side.'
    ],
    modifications: [
      'Make it easier: Use a wall or the back of a couch to rest your hands.',
      'Make it harder: Flex the back foot and imagine pushing it against a wall.'
    ],
    completionCue: 'Both sides complete. Great stability work.'
  },

  // --- Energizer (Striking Drills) ---
  {
    id: 'strike_shadow_boxing',
    name: 'Shadow Boxing Combo',
    description: 'A rhythmic striking drill to boost heart rate and coordination.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Zap,
    category: 'Energizer',
    tags: ['cardio', 'explosive', 'martial-arts', 'quick'],
    intention: 'Elevate heart rate and sharpen reaction time.',
    setup: ['Stand with feet staggered (boxing stance).', 'Keep hands up by your jaw.'],
    steps: [
      'Throw 2 quick jabs (lead hand).',
      'Throw 1 powerful cross (rear hand).',
      '"Slip" or dodge to the left and right.',
      'Add a lead hook.',
      'Keep your feet light and constantly moving.'
    ],
    modifications: [
      'Make it easier: Move slower and keep both feet planted on the floor.',
      'Make it harder: Add two squats or "level changes" after every 3 combos.'
    ],
    completionCue: 'Sweating and energized? You nailed it.'
  },
  {
    id: 'strike_front_kicks',
    name: 'Front Kick Cardio Series',
    description: 'Develop lower body power and core stability.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Zap,
    category: 'Energizer',
    tags: ['cardio', 'explosive', 'martial-arts'],
    intention: 'Build lower body power while challenging dynamic balance.',
    setup: ['Stand with feet hip-width apart.', 'Engage your core.'],
    steps: [
      'Lift your right knee toward your chest.',
      'Snap your foot forward, pushing with the ball of the foot.',
      'Retract the foot and return to standing.',
      'Repeat on the left side.',
      'Establish a fast but controlled alternating rhythm.'
    ],
    modifications: [
      'Make it easier: Kick lower (toward shins) and move slower.',
      'Make it harder: Add a "teep" (push kick) motion, using more hip drive.'
    ],
    completionCue: 'Legs and core feeling powerful? Great drill.'
  },
  {
    id: 'strike_jab_cross',
    name: 'Jab-Cross Speed Drill',
    description: 'Sharpen reaction time and upper body speed.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Activity,
    category: 'Energizer',
    tags: ['cardio', 'explosive', 'martial-arts', 'quick'],
    intention: 'Improve upper body endurance and striking speed.',
    setup: ['Boxing stance.', 'Set your focus on an imaginary target.'],
    steps: [
      'Throw 10 rapid jab-cross combinations.',
      'Rest for 5 seconds.',
      'Repeat for 2 minutes.',
      'Focus on full extension of the arms and rotating the hips.'
    ],
    modifications: [
      'Make it easier: Sit in a chair and throw rhythmic punches.',
      'Make it harder: Throw non-stop for the full 2 minutes without the rest breaks.'
    ],
    completionCue: 'When the timer hits zero, you are done.'
  },
  {
    id: 'strike_roundhouse',
    name: 'Roundhouse Practice',
    description: 'Improve hip mobility and lower body coordination.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Zap,
    category: 'Energizer',
    tags: ['cardio', 'explosive', 'martial-arts'],
    intention: 'Increase hip range of motion and striking power.',
    setup: ['Clear space around you.', 'Hold onto a wall if needed for balance.'],
    steps: [
      'Pivot on your lead foot.',
      'Swing your rear leg in an arc toward the target.',
      'Strike with the shin or top of the foot.',
      'Return to your starting stance.',
      'Do 10 on each side, then alternate.'
    ],
    modifications: [
      'Make it easier: Slow down the motion and keep the kick low.',
      'Make it harder: Do "double kicks" (kick twice before putting foot down).'
    ],
    completionCue: 'Hips feeling mobile and heart pumping? Excellent work.'
  },

  // --- Original Content ---
  {
    id: 'stretch_neck',
    name: 'Neck & Shoulder Release',
    description: 'Gently release tension from sitting or stress.',
    duration: 120,
    estimatedMinutes: 2,
    icon: PersonStanding,
    category: 'Stretching',
    tags: ['neck', 'desk', 'low-energy', 'quick'],
    intention: 'Release neck and upper shoulder tension from stress or sitting.',
    setup: ['Sit or stand comfortably, spine tall.', 'Relax your arms at your sides or on your lap.'],
    steps: [
      'Inhale, gently roll your shoulders up toward your ears.',
      'Exhale, roll them down and back.',
      'Tilt your head slowly to the left (hold 3–5 seconds), then switch sides.',
      'Slowly roll your head in a semi-circle forward from left to right.',
      'Shrug shoulders up, hold for a second, then drop.'
    ],
    modifications: ['Do it seated if standing is uncomfortable.', 'Use a heat pack beforehand for deeper release.'],
    completionCue: 'When your breath and shoulders feel lighter, you’re done.'
  },
  {
    id: 'stretch_hips',
    name: 'Hip Openers',
    description: 'Counteract the effects of long sitting periods.',
    duration: 180,
    estimatedMinutes: 3,
    icon: PersonStanding,
    category: 'Stretching',
    tags: ['hips', 'low-back', 'desk'],
    intention: 'Open stiff hips and counteract long sitting.',
    setup: ['Sit on the floor or a firm bed.', 'Cross legs or place soles of feet together (butterfly pose).'],
    steps: [
        'Sit tall, hands on ankles or knees.',
        'Gently push knees down with elbows (don’t force).',
        'Rock side-to-side or lean forward slightly.',
        'Hold for 20–30 seconds while breathing slowly.',
        'Switch to lying on your back, hug knees into chest and rotate gently side to side.'
    ],
    modifications: ['Sit on a folded blanket for more support.', 'Keep one leg extended if both knees up is hard.'],
    completionCue: 'When hips feel looser or less stiff, you’ve completed it.'
  },
  {
    id: 'stretch_spine',
    name: 'Thoracic Spine Rotations',
    description: 'Improve mid-back mobility and posture.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Cat,
    category: 'Stretching',
    tags: ['desk', 'low-back', 'quick'],
    intention: 'Mobilize mid-back, improve posture.',
    setup: ['Sit on a chair or mat.', 'Place hands behind your head.'],
    steps: [
        'Inhale, gently rotate your torso to the left.',
        'Exhale and return to center.',
        'Repeat on the right.',
        'Add a twist by reaching one elbow toward the opposite knee.',
        'Do 3–5 reps each side slowly.'
    ],
    modifications: ['Hands can be crossed on chest if overhead is uncomfortable.', 'Use a towel behind back for support.'],
    completionCue: 'Feel your back more mobile? You\'re done.'
  },
  {
    id: 'strength_wall_pushups',
    name: 'Wall Push-ups',
    description: 'Build shoulder integrity and upper body strength.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Dumbbell,
    category: 'Strength',
    tags: ['neck', 'quick'],
    intention: 'Gentle strength work for upper body.',
    setup: ['Stand 2–3 feet away from a wall.', 'Place palms flat on wall at chest height.'],
    steps: [
        'Inhale as you bend elbows and lean toward the wall.',
        'Exhale as you push back to start.',
        'Keep body in a straight line.',
        'Do 8–12 slow reps.'
    ],
    modifications: ['Do fewer reps or take breaks between.', 'Use a countertop instead of wall for more challenge.'],
    completionCue: 'Muscles warmed up? Great work.'
  },
  {
    id: 'strength_balance',
    name: 'Single-Leg Balance',
    description: 'Enhance stability, focus, and knee health.',
    duration: 60,
    estimatedMinutes: 1,
    icon: Mountain,
    category: 'Strength',
    tags: ['morning', 'quick', 'low-energy', 'balance'],
    intention: 'Improve focus, joint stability.',
    setup: ['Stand near a chair or wall for balance.', 'Shift weight to one foot.'],
    steps: [
        'Lift other foot a few inches off floor.',
        'Hold for 10–20 seconds.',
        'Switch sides.',
        'Try closing your eyes or moving your arms for challenge.'
    ],
    modifications: ['Tap toe to floor if needed.', 'Use a timer to track balance.'],
    completionCue: 'Once you feel focused and steady on both sides, you\'re done.'
  },
  {
    id: 'strength_core',
    name: 'Core Awakening',
    description: 'Engage deep core muscles with plank variations.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Dumbbell,
    category: 'Strength',
    tags: ['morning', 'low-back', 'quick'],
    intention: 'Engage deep core muscles for posture and energy.',
    setup: ['Find a clear space to lie down or use a mat.', 'Get into a plank position (on forearms or hands).'],
    steps: [
        'Hold plank for 10–30 seconds.',
        'Breathe slow and steady.',
        'Rest, then repeat up to 3 times.',
        'Add knee taps or shoulder touches for variation.'
    ],
    modifications: ['Drop to knees for support.', 'Use couch edge for elevated plank.'],
    completionCue: 'When your core is awake but not strained, you\'ve done enough.'
  },
  {
    id: 'energizer_high_knees',
    name: '1-Min High Knees',
    description: 'Quickly elevate your heart rate and energy.',
    duration: 60,
    estimatedMinutes: 1,
    icon: Zap,
    category: 'Energizer',
    tags: ['morning', 'quick', 'anxiety'],
    intention: 'Quick cardio boost to reset energy.',
    setup: ['Stand tall, arms at your side.', 'Set a 1-minute timer.'],
    steps: [
        'Jog in place, lifting knees toward chest.',
        'Pump arms for momentum.',
        'Keep breathing!',
        'Stop when timer ends.'
    ],
    modifications: ['March in place if jogging is too intense.', 'Do 30 seconds and build up.'],
    completionCue: 'Heart pumping? You nailed it!'
  },
  {
    id: 'energizer_shadow_boxing',
    name: 'Shadow Boxing',
    description: 'A dynamic cardio workout to shake off sluggishness.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Zap,
    category: 'Energizer',
    tags: ['anxiety', 'quick', 'martial-arts'],
    intention: 'Release agitation or sluggishness.',
    setup: ['Stand in a fighter stance.', 'Loosen shoulders.'],
    steps: [
        'Jab, cross, and hook punches in the air.',
        'Move feet lightly to simulate dodging.',
        'Do 30 sec intervals x 2–3 rounds.'
    ],
    modifications: ['Slow down movements.', 'Sit and do punches from a chair.'],
    completionCue: 'Feeling lighter or less stuck? Done.'
  },
  {
    id: 'energizer_breath_squats',
    name: 'Breath & Squat Pulses',
    description: 'Sync breath with movement to energize the body.',
    duration: 90,
    estimatedMinutes: 1.5,
    icon: Zap,
    category: 'Energizer',
    tags: ['morning', 'quick', 'desk'],
    intention: 'Synchronize breath and body for energy.',
    setup: ['Stand with feet shoulder-width apart.', 'Inhale deeply.'],
    steps: [
        'Inhale: stand tall.',
        'Exhale: squat halfway down and pulse.',
        'Repeat for 5–8 breaths.',
        'End by standing tall and shaking limbs loose.'
    ],
    modifications: ['Hold onto a chair for balance.', 'Do less squat depth.'],
    completionCue: 'Feeling reconnected? That’s the goal.'
  },
  {
    id: 'wakeup_flow',
    name: 'Morning Mobility Flow',
    description: 'Wake up your spine, ankles, and shoulders.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Sunrise,
    category: 'Wakeup & Wind-Down',
    tags: ['morning', 'low-energy'],
    intention: 'Gently activate your body for the day.',
    setup: ['Stand or sit comfortably.', 'Roll out wrists, shoulders, ankles.'],
    steps: [
        'Do neck rolls → shoulder circles → spine twists.',
        'Stretch arms overhead and side to side.',
        'Do ankle circles and toe touches.',
        'Breathe slowly the whole time.'
    ],
    modifications: ['Do seated if still groggy.', 'Use gentle music.'],
    completionCue: 'Body feels awake? You’re ready.'
  },
  {
    id: 'wind_down_stretch',
    name: 'Pre-Bedtime Stretch',
    description: 'Release the day\'s tension from hamstrings and neck.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Moon,
    category: 'Wakeup & Wind-Down',
    tags: ['sleep', 'low-back', 'neck'],
    intention: 'Relax body tension before sleep.',
    setup: ['Dim lights.', 'Lay down on floor or bed.'],
    steps: [
        'Hug knees to chest, gently rock.',
        'Stretch hamstrings one leg at a time.',
        'Neck rolls + shoulder shrugs.',
        'End with slow breathing.'
    ],
    modifications: ['Do only the lower body if short on time.', 'Play relaxing sound in background.'],
    completionCue: 'Feeling less tense? Time for sleep.'
  },
];


// --- STILLNESS MODULES ---

export const mindfulnessPractices: MindfulnessPractice[] = [
  { 
    id: 'breath_box', 
    name: 'Box Breathing', 
    description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. For calm and focus.', 
    duration: 180, 
    estimatedMinutes: 3,
    icon: Wind, 
    category: 'Breathwork',
    tags: ['anxiety', 'desk', 'quick'],
    intention: "Regain calm and sharpen focus with structured breath.",
    setup: ["Sit or lie down with back supported.", "Optional: Set a 2-minute timer."],
    steps: [
      "Inhale for 4 seconds.",
      "Hold your breath for 4 seconds.",
      "Exhale slowly for 4 seconds.",
      "Hold again for 4 seconds.",
      "Repeat the cycle 4–6 times."
    ],
    modifications: ["Use 3-second boxes if 4 feels too long.", "Trace a square in the air to visualize each phase."],
    completionCue: "If your shoulders feel softer, you’ve done enough."
  },
  { 
    id: 'breath_478', 
    name: '4-7-8 Breath', 
    description: 'A powerful technique to reduce anxiety and promote rest.', 
    duration: 120, 
    estimatedMinutes: 2,
    icon: Wind, 
    category: 'Breathwork',
    tags: ['sleep', 'anxiety', 'quick'],
    intention: "Calm anxiety and prepare the body for rest.",
    setup: ["Sit or lie down with eyes closed.", "Optional: Hand on chest or belly."],
    steps: [
      "Inhale through your nose for 4 seconds.",
      "Hold your breath for 7 seconds.",
      "Exhale fully through your mouth for 8 seconds (slowly).",
      "Do 3–4 rounds total."
    ],
    modifications: ["Shorten to 3-5-6 for gentler breathwork.", "Whisper “relax” while exhaling for more effect."],
    completionCue: "When you feel slightly slower and quieter inside, you're done."
  },
  { 
    id: 'breath_resonant', 
    name: 'Resonant Breathing', 
    description: 'Breathe at a rate of 5-6 breaths per minute to balance the nervous system.', 
    duration: 300, 
    estimatedMinutes: 5,
    icon: Wind, 
    category: 'Breathwork',
    tags: ['low-energy', 'sleep'],
    intention: "Harmonize the nervous system by syncing your breath rhythm.",
    setup: ["Sit or recline.", "Optional: Play calming music at 60 bpm."],
    steps: [
      "Inhale slowly for 5–6 seconds.",
      "Exhale for 5–6 seconds.",
      "Repeat for 1–3 minutes.",
      "Focus on the even rhythm, like ocean waves."
    ],
    modifications: ["Use a breathing app as visual guidance.", "Place a hand on your heart or stomach."],
    completionCue: "Once you feel like you’re riding a rhythm, pause or continue as needed."
  },
  { 
    id: 'focus_wins', 
    name: 'Name 3 Wins', 
    description: 'A self-coaching exercise to build momentum and clarity.', 
    duration: 120, 
    estimatedMinutes: 2,
    icon: Brain, 
    category: 'Clarity & Focus',
    tags: ['morning', 'low-energy', 'quick'],
    intention: "Boost confidence and sense of progress.",
    setup: ["Open journal or note app.", "Optional: Set a 2-minute timer."],
    steps: [
      "Think of three things you did well today.",
      "Write each one down or say aloud.",
      "Focus on effort, not just outcome.",
      "Smile or breathe deeply with each one."
    ],
    modifications: ["Use tiny wins (e.g. “I drank water” counts!).", "Voice record instead of writing."],
    completionCue: "When you feel even slightly more capable, stop there."
  },
  { 
    id: 'focus_visualization', 
    name: 'Focus Visualization', 
    description: 'Mentally rehearse a task to improve performance and reduce anxiety.', 
    duration: 180, 
    estimatedMinutes: 3,
    icon: Eye, 
    category: 'Clarity & Focus',
    tags: ['morning', 'anxiety'],
    intention: "Mentally rehearse a task to reduce anxiety and boost readiness.",
    setup: ["Sit with eyes closed or gaze lowered.", "Choose 1 task you want to do soon."],
    steps: [
      "Imagine starting the task calmly.",
      "Visualize each step, slowly and clearly.",
      "Imagine staying focused and steady.",
      "Picture finishing it and feeling relief.",
      "Smile or nod to “lock it in.”"
    ],
    modifications: ["Use a 2-minute timer.", "Sketch the task afterward to reinforce it."],
    completionCue: "When your body feels more ready to begin, you’re done."
  },
  { 
    id: 'focus_reset', 
    name: 'Two-Minute Reset', 
    description: 'A brief mindfulness pause to break from overwhelm and regain focus.', 
    duration: 120, 
    estimatedMinutes: 2,
    icon: Brain, 
    category: 'Clarity & Focus',
    tags: ['desk', 'anxiety', 'quick'],
    intention: "Stop the spin of distraction and restart mental focus.",
    setup: ["Sit or lie down with no goal but stillness.", "Optional: Timer for 2 minutes."],
    steps: [
      "Close eyes or soften your gaze.",
      "Breathe normally.",
      "Let thoughts pass like clouds.",
      "Do nothing. Just observe.",
      "Gently stretch or blink at the end."
    ],
    modifications: ["Use background sound (fan, rain).", "Try with a weighted object or pillow."],
    completionCue: "If your mind feels a little quieter, that’s a win."
  },
  { 
    id: 'grounding_54321', 
    name: '5-4-3-2-1 Senses', 
    description: 'Engage all five senses to anchor yourself in the present moment.', 
    duration: 180, 
    estimatedMinutes: 3,
    icon: Shield, 
    category: 'Grounding & Safety',
    tags: ['anxiety', 'grounding'],
    intention: "Ground yourself in the present during overwhelm or panic.",
    setup: ["Sit wherever you are.", "Look around gently."],
    steps: [
      "Name 5 things you see.",
      "Name 4 things you can touch.",
      "Name 3 things you hear.",
      "Name 2 things you can smell.",
      "Name 1 thing you can taste (or like the taste of)."
    ],
    modifications: ["Tap fingers for each number.", "Use imaginary senses if surroundings are too dull."],
    completionCue: "Feel even a little more here? That’s enough."
  },
  { 
    id: 'grounding_tactile', 
    name: 'Tactile Object Focus', 
    description: 'Hold an object and focus on its texture, temperature, and weight.', 
    duration: 120, 
    estimatedMinutes: 2,
    icon: Shield, 
    category: 'Grounding & Safety',
    tags: ['anxiety', 'grounding', 'quick'],
    intention: "Anchor your attention by engaging one sense deeply.",
    setup: ["Pick up a small object (rock, leaf, keychain, etc.).", "Sit comfortably."],
    steps: [
      "Focus only on the object in your hand.",
      "Describe its texture out loud or silently.",
      "Notice its weight, shape, temperature.",
      "Trace its edges or surface slowly.",
      "Hold it for 30 seconds, breathing gently."
    ],
    modifications: ["Close eyes for deeper focus.", "Switch to different object halfway."],
    completionCue: "When your thoughts are quieter and attention narrowed, you’re done."
  },
  { 
    id: 'grounding_nature', 
    name: 'Nature Visualization', 
    description: 'Imagine a safe, natural place and sync your breath with its rhythm.', 
    duration: 300, 
    estimatedMinutes: 5,
    icon: TreeDeciduous, 
    category: 'Grounding & Safety',
    tags: ['low-energy', 'sleep'],
    intention: "Create a safe, calm mental space.",
    setup: ["Sit or lie down in a quiet place.", "Close your eyes or gaze downward."],
    steps: [
      "Imagine a place in nature you love or make one up.",
      "Picture the sights—trees, water, sky.",
      "Hear the sounds—wind, birds, silence.",
      "Sync your breath with the imagined scene.",
      "Stay for 1–2 minutes, then slowly return."
    ],
    modifications: ["Use background nature sounds.", "Draw or journal about the place afterward."],
    completionCue: "When your breath feels calmer and body softer, pause or return gently."
  },
  { 
    id: 'compassion_metta', 
    name: 'Loving-Kindness Meditation', 
    description: 'Extend wishes of well-being to yourself and others.', 
    duration: 300, 
    estimatedMinutes: 5,
    icon: HeartHandshake, 
    category: 'Self-Compassion',
    tags: ['low-energy', 'anxiety'],
    intention: "Increase emotional warmth for self and others.",
    setup: ["Sit or lie in a cozy position.", "Take one slow breath."],
    steps: [
      "Silently repeat: “May I be safe. May I be well. May I be at peace.”",
      "After 3 rounds, shift to someone you care about.",
      "Repeat the same words for them.",
      "Optionally repeat for a neutral person or all beings."
    ],
    modifications: ["Change wording to what resonates with you.", "Visualize the person’s smile or energy."],
    completionCue: "When you feel a tinge of warmth, you can stop there."
  },
  { 
    id: 'compassion_journal', 
    name: '"What do I need?"', 
    description: 'A journaling prompt to check in with your inner needs.', 
    duration: 180, 
    estimatedMinutes: 3,
    icon: HeartHandshake, 
    category: 'Self-Compassion',
    tags: ['low-energy', 'anxiety'],
    intention: "Increase emotional clarity and meet your current need.",
    setup: ["Open journal or notes app.", "Write or say aloud."],
    steps: [
      "Ask: “What do I need right now?”",
      "Let answers flow: sleep? rest? joy? silence?",
      "Write or name 1–3 real needs.",
      "Choose one small action to meet one of them."
    ],
    modifications: ["Use emojis or voice memos instead of full sentences.", "Skip action step if awareness alone helps."],
    completionCue: "Awareness = enough. Action is optional."
  },
  { 
    id: 'compassion_mantra', 
    name: 'Gentle Inner Voice', 
    description: 'Practice a supportive mantra to counter self-criticism.', 
    duration: 120, 
    estimatedMinutes: 2,
    icon: HeartHandshake, 
    category: 'Self-Compassion',
    tags: ['anxiety', 'low-energy', 'quick'],
    intention: "Reframe self-criticism with softness.",
    setup: ["Sit still and breathe for 15 seconds.", "Recall a recent moment of struggle."],
    steps: [
      "Notice any harsh inner voice.",
      "Ask: “What would I say to a friend in this situation?”",
      "Replace the harsh phrase with a gentle one.",
      "Repeat your new phrase slowly: “I’m doing my best.” “It’s okay to rest.” etc."
    ],
    modifications: ["Write it on a sticky note.", "Turn it into a lock screen or mantra."],
    completionCue: "When your voice feels a touch kinder, stop there."
  },
  {
    id: 'breath_nadi_shodhana',
    name: 'Nadi Shodhana (Alternate Nostril Breathing)',
    description: 'Balance brain hemispheres and calm the mind.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Wind,
    category: 'Breathwork',
    tags: ['balancing', 'calming', 'focus'],
    intention: 'Balance the left and right hemispheres of the brain and calm the nervous system.',
    setup: ['Sit upright with spine straight.', 'Use right hand in Vishnu Mudra.'],
    steps: [
      'Close right nostril with thumb, inhale left for 4 seconds.',
      'Close both, hold 4 seconds.',
      'Release right, exhale 4 seconds.',
      'Inhale right 4 seconds.',
      'Close both, hold 4 seconds.',
      'Release left, exhale 4 seconds.',
      'That is one round. Repeat 5–10 rounds.'
    ],
    modifications: ['Drop the hold phase if it feels uncomfortable.', 'Shorten to 3-second phases for beginners.'],
    completionCue: 'Feeling more balanced? Take a final deep breath.'
  },
  {
    id: 'breath_bhramari',
    name: 'Bhramari (Humming Bee Breath)',
    description: 'Release tension through internal vibration.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Wind,
    category: 'Breathwork',
    tags: ['stress-relief', 'vibration', 'calming'],
    intention: 'Quickly discharge mental tension and activate the parasympathetic response through vibration.',
    setup: ['Sit comfortably.', 'Optionally close ears gently with thumbs.'],
    steps: [
      'Inhale deeply through the nose for 4 seconds.',
      'Exhale slowly while making a steady humming sound with lips closed for 6–8 seconds.',
      'Feel the vibration in the skull and chest.',
      'Repeat 5–7 rounds.'
    ],
    modifications: ['If humming feels awkward, start with a quiet hum.', 'Extend exhale duration as comfort grows.'],
    completionCue: 'Nervous system quieted. Take a slow, natural breath.'
  },
  {
    id: 'breath_kapalabhati',
    name: 'Kapalabhati (Skull Shining Breath)',
    description: 'Clear mental fog and energize the body.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Zap,
    category: 'Breathwork',
    tags: ['energizing', 'morning', 'clearing'],
    intention: 'Energize the body, clear mental fog, and activate the sympathetic nervous system in a controlled way.',
    setup: ['Empty stomach recommended.', 'Sit tall. Take a passive inhale.'],
    steps: [
      'Sit tall. Take a passive inhale.',
      'Exhale sharply and forcefully through the nose by contracting the abdomen.',
      'Let the inhale happen naturally.',
      'Repeat at a pace of roughly 1 exhale per second for 20–30 reps.',
      'Rest and breathe normally for 30 seconds.',
      'Do 2–3 rounds.'
    ],
    modifications: ['Slow the pace to 1 exhale every 2 seconds if dizzy.', 'Reduce to 10–15 reps for beginners.', 'Avoid if pregnant or with high blood pressure.'],
    completionCue: 'Mind clear and body alert? Done.'
  },
  {
    id: 'breath_sitali',
    name: 'Sitali (Cooling Breath)',
    description: 'Lower body temperature and reduce agitation.',
    duration: 240,
    estimatedMinutes: 4,
    icon: Wind,
    category: 'Breathwork',
    tags: ['cooling', 'calming', 'anger-relief'],
    intention: 'Lower body temperature, reduce agitation, and soothe the nervous system.',
    setup: ['Works best in a warm environment.', 'Sit upright.'],
    steps: [
      'Curl the tongue into a tube and extend it slightly past the lips.',
      'Inhale slowly through the curled tongue for 4–6 seconds.',
      'Close mouth.',
      'Exhale through the nose for 6–8 seconds.',
      'Repeat 8–12 rounds.'
    ],
    modifications: ['If you cannot curl your tongue, inhale through gently clenched teeth (Sitkari).', 'Shorten rounds if lightheaded.'],
    completionCue: 'Feeling cooler and calmer? You have finished.'
  },
  {
    id: 'breath_bhastrika',
    name: 'Bhastrika (Bellows Breath)',
    description: 'Rapidly increase alertness and oxygen intake.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Zap,
    category: 'Breathwork',
    tags: ['energizing', 'alertness', 'oxygenation'],
    intention: 'Rapidly increase energy, oxygen intake, and alertness through vigorous rhythmic breathing.',
    setup: ['Empty stomach.', 'Upright seated position.', 'Not recommended before sleep.'],
    steps: [
      'Sit tall.',
      'Inhale forcefully through the nose while expanding the belly.',
      'Exhale forcefully through the nose while contracting the belly.',
      'Both inhale and exhale are active and equal in force.',
      'Do 15–20 cycles at a pace of roughly 1 full breath per second.',
      'Rest for 30 seconds.',
      'Repeat 2–3 rounds.'
    ],
    modifications: ['Slow to 1 breath every 2 seconds if new.', 'Reduce to 10 cycles per round.', 'Avoid with high blood pressure or heart conditions.'],
    completionCue: 'System fully oxygenated and alert. Done.'
  },
  {
    id: 'breath_2_4',
    name: '2-4 Breathing (Extended Exhale)',
    description: 'Double your exhale to shift into rest mode.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Wind,
    category: 'Breathwork',
    tags: ['sleep', 'vagus-nerve', 'calming'],
    intention: 'Activate the vagus nerve and shift the body into rest mode by doubling exhale length relative to inhale.',
    setup: ['Lie down or recline.', 'Place a hand on the belly.'],
    steps: [
      'Inhale gently through the nose for 3 seconds.',
      'Exhale slowly through the nose or mouth for 6 seconds.',
      'Repeat for 2–5 minutes without forcing.',
      'Focus on the feeling of release during the long exhale.'
    ],
    modifications: ['Start with 2-second inhale and 4-second exhale if needed.', 'Gradually increase to 4-8 as capacity builds.'],
    completionCue: 'Body entering a restful state. You are done.'
  },
  {
    id: 'focus_counting',
    name: 'Breath Counting Meditation',
    description: 'Build concentration using breath as an anchor.',
    duration: 300,
    estimatedMinutes: 5,
    icon: Brain,
    category: 'Clarity & Focus',
    tags: ['focus', 'meditation', 'attention'],
    intention: 'Build concentration and present-moment awareness using breath as an anchor.',
    setup: ['Sit in a quiet space.', 'Close eyes.'],
    steps: [
      'Breathe naturally.',
      'On each exhale, count silently — 1, 2, 3, up to 10.',
      'After reaching 10, restart at 1.',
      'If you lose count, gently return to 1 without judgment.',
      'Continue for the duration of the timer.'
    ],
    modifications: ['Count to 5 instead of 10 if attention drifts frequently.', 'Add inhale counting once exhale counting is stable.'],
    completionCue: 'Awareness anchored. Take a moment to notice your focus.'
  },
  {
    id: 'grounding_sigh',
    name: 'Physiological Sigh',
    description: 'The fastest method to reduce acute stress.',
    duration: 60,
    estimatedMinutes: 1,
    icon: Shield,
    category: 'Grounding & Safety',
    tags: ['quick', 'stress-relief', 'grounding'],
    intention: 'The fastest known single-breath method to reduce acute stress in real time.',
    setup: ['Can be done anywhere — standing, sitting, walking.', 'No preparation needed.'],
    steps: [
      'Take a normal inhale through the nose.',
      'Immediately take a second short inhale on top of it to fully expand the lungs.',
      'Exhale slowly and fully through the mouth.',
      'That is one cycle.',
      'Repeat 1–3 times.'
    ],
    modifications: ['None needed. This is a minimal, high-impact technique.'],
    completionCue: 'Acute stress response dampened. Done.'
  },
  {
    id: 'gratitude_triple',
    name: 'Triple Appreciation Anchor',
    description: 'A structured scan of three levels of gratitude.',
    duration: 180,
    estimatedMinutes: 3,
    icon: Sparkles,
    category: 'Appreciation & Gratitude',
    tags: ['gratitude', 'perspective', 'quick'],
    intention: "Shift your brain's bias toward noticing what is working and valuable.",
    setup: ["Sit or stand comfortably.", "Take two slow, deep breaths."],
    steps: [
      "Identify one physical object near you that you appreciate (e.g., your chair, a pen, a plant). Mentally thank it for its function.",
      "Think of one person you are grateful for. Briefly recall a specific kind act or trait they possess.",
      "Identify one trait or choice of yours from the last 24 hours that you appreciate.",
      "Pause and let the feeling of 'enoughness' settle in for 30 seconds."
    ],
    modifications: ["If you're in a dark place, find something as small as 'breath' or 'gravity' to appreciate.", "Say the appreciations out loud to increase their impact."],
    completionCue: "Heart and mind primed for positivity. Done."
  },
  {
    id: 'savoring_senses',
    name: 'Savoring the Senses',
    description: 'Deeply appreciate a single sensory experience to build present-moment joy.',
    duration: 120,
    estimatedMinutes: 2,
    icon: Smile,
    category: 'Appreciation & Gratitude',
    tags: ['savoring', 'mindfulness', 'quick'],
    intention: "Combat 'hedonic adaptation' by intentionally noticing the details of a pleasant experience.",
    setup: ["Choose a pleasant sensation: a sip of water, the sun on your skin, a sound.", "Focus your attention fully on it."],
    steps: [
      "Notice the initial contact of the sensation.",
      "Identify 3 distinct details (e.g., temperature, texture, rhythm).",
      "Imagine the sensation expanding to fill your awareness.",
      "Acknowledge the pleasure it provides without trying to hold onto it.",
      "End with a gentle internal smile."
    ],
    modifications: ["Try this with your next meal or drink.", "Use this during a walk to notice small natural details."],
    completionCue: "Experience savored. Done."
  }
];
