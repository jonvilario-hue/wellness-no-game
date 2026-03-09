
import { ReadingPassage } from '@/types/speedreading';

export const readingPassages: ReadingPassage[] = [
  // --- CASUAL TIER (High-level cognitive concepts) ---
  {
    id: 'casual-neuroplasticity',
    title: 'Your Elastic Brain',
    tier: 'Casual',
    wordCount: 245,
    content: `For decades, scientists believed that the human brain was a fixed organ. Once you reached adulthood, the circuitry was essentially "hard-wired." We now know this is completely false. Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life. This happens in response to learning, experience, or even following an injury. When you practice a new skill, like speedreading or playing an instrument, your brain physically changes. The neurons that fire together eventually wire together, making the task easier and more efficient over time. This is why consistency is more important than intensity. A short daily practice session is far more effective at triggering long-term structural changes than a massive, one-time effort. By challenging your brain with novel tasks, you are essentially "upgrading" your mental hardware.`,
    quiz: [
      { question: "What was the old scientific belief about the adult brain?", options: ["It could always grow", "It was hard-wired and fixed", "It only shrank", "It was powered by electricity"], answerIndex: 1 },
      { question: "What is neuroplasticity?", options: ["Brain shrinkage", "Ability to reorganize", "Brain surgery", "Genetic condition"], answerIndex: 1 },
      { question: "Why is daily practice recommended?", options: ["Saves time", "Triggers structural change", "Prevents headaches", "Easier to track"], answerIndex: 1 }
    ]
  },
  {
    id: 'casual-game-theory',
    title: 'Game Theory and Everyday Decisions',
    tier: 'Casual',
    wordCount: 480,
    content: `Game theory is the study of mathematical models of strategic interaction among rational agents. While it sounds complex, its applications permeate our daily social and professional interactions. One of the most foundational concepts is the Nash equilibrium—a state in a game where no player can benefit by changing their strategy while the others keep theirs unchanged. Understanding this helps explain why people sometimes stay in suboptimal situations, as any individual move might lead to a worse personal outcome despite a better collective one. Furthermore, the distinction between zero-sum and non-zero-sum games is vital. In a zero-sum game, one person's gain is exactly equal to another's loss. However, many human interactions, like trade or successful relationships, are non-zero-sum, where both parties can emerge better off than they started. By viewing social conflicts through the lens of strategic games, we can identify opportunities for cooperation where others only see competition. This shift in perspective allows us to navigate negotiations with more clarity and less emotional reactive behavior.`,
    quiz: [
      { question: "What is a Nash equilibrium?", options: ["Winning at all costs", "A state where no player benefits from changing strategy alone", "A game with no winners", "The starting point of every negotiation"], answerIndex: 1 },
      { question: "What defines a non-zero-sum game?", options: ["Everyone loses", "One's gain is another's loss", "Both parties can potentially benefit", "There are no rules"], answerIndex: 2 },
      { question: "What is a benefit of studying game theory?", options: ["Learning to cheat", "Faster math skills", "Identifying cooperation opportunities", "Better card playing"], answerIndex: 2 }
    ]
  },
  {
    id: 'casual-habits',
    title: 'The Science of Habit Formation',
    tier: 'Casual',
    wordCount: 510,
    content: `Habits are not simply repetitive behaviors; they are neurological shortcuts designed to save the brain energy. The process begins with the "Habit Loop," a three-step cycle: the cue, the routine, and the reward. The cue is a trigger that tells your brain to go into automatic mode. The routine is the physical, mental, or emotional behavior itself. Finally, the reward helps your brain figure out if this particular loop is worth remembering for the future. Over time, this loop becomes more automatic as the basal ganglia—the brain's habit center—takes over from the prefrontal cortex, which is responsible for deliberate decision-making. This transition from discipline to automaticity is the goal of any behavioral change. Understanding this allows us to "hack" our behavior by identifying the cues that trigger bad habits and inserting new routines that deliver similar rewards. By focusing on the architecture of the loop rather than just raw willpower, we increase our chances of permanent change.`,
    quiz: [
      { question: "What are the three parts of the Habit Loop?", options: ["Start, Middle, End", "Cue, Routine, Reward", "Thought, Action, Result", "Focus, Effort, Win"], answerIndex: 1 },
      { question: "Which part of the brain manages habits?", options: ["Prefrontal Cortex", "Basal Ganglia", "Visual Cortex", "Brainstem"], answerIndex: 1 },
      { question: "What is the primary benefit of a habit?", options: ["It makes you look busy", "It saves the brain energy", "It increases willpower", "It creates new memories"], answerIndex: 1 }
    ]
  },

  // --- TECHNICAL TIER (Complex systems) ---
  {
    id: 'tech-crispr',
    title: 'CRISPR Gene Editing Mechanisms',
    tier: 'Technical',
    wordCount: 620,
    content: `CRISPR-Cas9 has revolutionized molecular biology by providing a precise, programmable tool for genome editing. The system is derived from a bacterial defense mechanism that identifies and cleaves viral DNA. The core components are the Cas9 protein, an endonuclease, and a guide RNA (gRNA). The gRNA is engineered to contain a 20-nucleotide sequence that matches the target genomic site. Once the Cas9-gRNA complex binds to the target DNA via base-pairing and proximity to a Protospacer Adjacent Motif (PAM), Cas9 introduces a double-strand break (DSB). The cell then attempts to repair this break using one of two primary pathways: Non-Homologous End Joining (NHEJ) or Homology-Directed Repair (HDR). NHEJ is an error-prone process that often introduces small insertions or deletions (indels), frequently resulting in gene knockout. Conversely, HDR uses a provided template to precisely rewrite the genetic sequence at the DSB site. This dual capability allows researchers to either disable problematic genes or insert corrective sequences with unprecedented accuracy.`,
    quiz: [
      { question: "What is the role of Cas9?", options: ["It carries the RNA", "It acts as a DNA-cutting enzyme", "It builds new cells", "It provides the template"], answerIndex: 1 },
      { question: "Which repair pathway is most likely to cause a gene knockout?", options: ["HDR", "NHEJ", "PAM", "RNA base-pairing"], answerIndex: 1 },
      { question: "How does the system find the correct location?", options: ["By random chance", "Via a matching 20-nucleotide gRNA sequence", "By tracking heat", "Through cellular magnetism"], answerIndex: 1 }
    ]
  },
  {
    id: 'tech-blockchain',
    title: 'Blockchain Consensus Protocols',
    tier: 'Technical',
    wordCount: 580,
    content: `Consensus protocols are the heartbeat of decentralized ledgers, ensuring that all nodes in a network agree on a single version of the truth without a central authority. The most famous, Proof of Work (PoW), requires participants to solve complex cryptographic puzzles to validate blocks, a process that is computationally expensive but easy to verify. This creates an economic deterrent against attacks. However, the emergence of Proof of Stake (PoS) offers a more energy-efficient alternative, where validators are chosen based on the number of tokens they "stake" or lock up as collateral. All consensus mechanisms must address the Byzantine Fault Tolerance (BFT) problem—the ability of a system to reach agreement even when some participants are malicious or failing. The "Blockchain Trilemma" posits that a network must balance decentralization, security, and scalability, as optimizing for two often compromises the third. For instance, high decentralization and security typically limit the transaction throughput (scalability) due to the overhead of multi-node verification.`,
    quiz: [
      { question: "What is the 'Blockchain Trilemma'?", options: ["Profit, Speed, Power", "Decentralization, Security, Scalability", "Math, Logic, Code", "Privacy, Cost, Access"], answerIndex: 1 },
      { question: "What is Proof of Stake?", options: ["Mining with computers", "Validators chosen by collateral", "Voting by mail", "Guessing passwords"], answerIndex: 1 },
      { question: "What does Byzantine Fault Tolerance mean?", options: ["Fast transactions", "Resistance to malicious participants", "Low energy use", "Unlimited storage"], answerIndex: 1 }
    ]
  },

  // --- DENSE DATA TIER (Statistics heavy) ---
  {
    id: 'dense-vc-report',
    title: 'Global Venture Capital Funding Report Q3',
    tier: 'Dense Data',
    wordCount: 450,
    content: `Global venture capital funding reached $78.4 billion in Q3, representing a 12% quarter-over-year decline and a 28% year-over-year contraction from the $108.9 billion peak. The Artificial Intelligence sector remained the outlier, capturing 34% of total capital, up from 18% in the previous year. Within AI, Generative models accounted for 65% of sub-sector investment. Geographically, the United States maintained its lead with $42.1 billion (54% of total), while the European market showed the most resilience with a mere 4% dip. Median Series A round sizes contracted by 15% to $10.2 million, whereas Seed rounds held steady at $2.4 million. Exit activity remained muted, with only 12 IPOs globally compared to 45 in Q3 of the prior cycle. Secondary market transactions surged by 42% as limited partners sought liquidity. Valuation multiples for SaaS companies compressed from 12x revenue to 6.5x, reflecting a broader shift toward profitability over raw growth metrics. Lead times from term sheet to close extended to an average of 74 days, up from 42 days in the high-velocity 2021 market.`,
    quiz: [
      { question: "What percentage of capital did AI capture?", options: ["12%", "18%", "34%", "54%"], answerIndex: 2 },
      { question: "How much did Series A round sizes contract?", options: ["4%", "15%", "28%", "42%"], answerIndex: 1 },
      { question: "What is the average lead time to close a deal?", options: ["42 days", "54 days", "74 days", "12 days"], answerIndex: 2 }
    ]
  },

  // --- NARRATIVE TIER (Sensory & Inference) ---
  {
    id: 'narrative-cartographer',
    title: "The Cartographer's Dilemma",
    tier: 'Narrative',
    wordCount: 550,
    content: `Elias worked by the flickering light of a single tallow candle, the scent of parched vellum and old ink heavy in the air. Outside, the storm lashed against the stone walls of the citadel, a rhythmic, booming sound that shook the very floorboards. His pen, a sharpened goose quill, scratched across the map, tracing the jagged coastlines of a continent that hadn't existed on any chart six months ago. The parchment felt rough beneath his calloused fingertips, and the salt-spray from the window tasted metallic on his tongue. He paused, his gaze fixed on the Great Void—a vast, unmapped expanse in the center of the scroll. Rumors spoke of floating isles and singing tides, but Elias knew only the cold geometry of the stars. His left shoulder ached with a dull, persistent throb, a reminder of the voyage that had nearly claimed his life. He dipped the quill, the ink pot clinking softly against the desk, and prepared to draw the line that would redefine the world. He was not just mapping land; he was mapping the end of an era.`,
    quiz: [
      { question: "What was the primary smell mentioned in the room?", options: ["Rain and stone", "Vellum and ink", "Tallow and smoke", "Sea salt"], answerIndex: 1 },
      { question: "Which physical ailment did Elias suffer from?", options: ["Blurred vision", "Aching shoulder", "Shaking hands", "Headache"], answerIndex: 1 },
      { question: "What was the weather like outside?", options: ["Quiet and foggy", "A heavy storm", "Light snow", "Heatwave"], answerIndex: 1 }
    ]
  }
];
