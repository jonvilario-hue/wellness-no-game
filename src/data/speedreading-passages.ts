
import { ReadingPassage } from '@/types/speedreading';

export const readingPassages: ReadingPassage[] = [
  {
    id: 'casual-neuroplasticity',
    title: 'Your Elastic Brain',
    tier: 'Casual',
    wordCount: 245,
    content: `For decades, scientists believed that the human brain was a fixed organ. Once you reached adulthood, the circuitry was essentially "hard-wired." We now know this is completely false. Neuroplasticity is the brain's ability to reorganize itself by forming new neural connections throughout life. This happens in response to learning, experience, or even following an injury. When you practice a new skill, like speedreading or playing an instrument, your brain physically changes. The neurons that fire together eventually wire together, making the task easier and more efficient over time. This is why consistency is more important than intensity. A short daily practice session is far more effective at triggering long-term structural changes than a massive, one-time effort. By challenging your brain with novel tasks, you are essentially "upgrading" your mental hardware.`,
    quiz: [
      {
        question: "What was the old scientific belief about the adult brain?",
        options: ["It could always grow", "It was hard-wired and fixed", "It only shrank over time", "It was powered by electricity"],
        answerIndex: 1
      },
      {
        question: "What is neuroplasticity?",
        options: ["The brain's ability to shrink", "The brain's ability to reorganize itself", "A type of brain surgery", "A rare genetic condition"],
        answerIndex: 1
      },
      {
        question: "Why is daily practice recommended over one-time intensity?",
        options: ["It saves time", "It's more effective for structural change", "It prevents headaches", "It's easier to track"],
        answerIndex: 1
      }
    ]
  },
  {
    id: 'tech-quantum-basics',
    title: 'Quantum Computing Foundations',
    tier: 'Technical',
    wordCount: 312,
    content: `Classical computers process information in bits, which are either a 0 or a 1. Quantum computers, however, use qubits. Due to a phenomenon called superposition, a qubit can exist in a state of 0, 1, or both simultaneously. This allows quantum systems to perform complex calculations at speeds that would take classical supercomputers thousands of years. Another key concept is entanglement. When qubits become entangled, the state of one qubit becomes instantaneously connected to the state of another, regardless of the distance between them. Einstein famously called this "spooky action at a distance." While quantum computing is still in its nascent stages, its potential applications are vast. It could revolutionize cryptography, drug discovery, and materials science by simulating molecular interactions at an atomic level. However, qubits are extremely delicate and prone to "decoherence," where they lose their quantum state due to external interference like heat or electromagnetic waves. Maintaining a stable environment at near-absolute zero temperatures is one of the primary engineering challenges in the field today.`,
    quiz: [
      {
        question: "What is the primary difference between a bit and a qubit?",
        options: ["Bits are faster", "Qubits can be 0 and 1 simultaneously", "Bits are larger", "Qubits only work in the dark"],
        answerIndex: 1
      },
      {
        question: "What did Einstein call entanglement?",
        options: ["Quantum Leap", "Spooky action at a distance", "The Holy Grail of Physics", "The Invisible String"],
        answerIndex: 1
      },
      {
        question: "What is 'decoherence' in quantum computing?",
        options: ["A programming error", "Loss of quantum state due to interference", "The process of cooling qubits", "A hardware upgrade"],
        answerIndex: 1
      }
    ]
  },
  {
    id: 'dense-market-report',
    title: 'Q4 Global Semiconductor Audit',
    tier: 'Dense Data',
    wordCount: 280,
    content: `The global semiconductor market experienced a 14.2% year-over-year contraction in Q4, primarily driven by a 22% decline in memory chip demand. While logic-based processors maintained a steady 4.5% growth rate, the overall industry valuation dipped to $520 billion. Geographically, the Asia-Pacific region remains the dominant force, accounting for 58% of total revenue, despite a 9% localized slump in mainland China. Automotive semiconductors emerged as the sole high-performance vertical, surging by 18.4% as electric vehicle adoption rates hit a record 15% of global sales. Lead times for trailing-edge nodes have normalized to 14 weeks, down from a peak of 52 weeks in 2022. Inventory levels at major distributors remain elevated at 4.2 months of supply, which is 30% above historical norms. Analysts project a recovery in late 2024, contingent on the stabilization of consumer electronics demand, which currently represents a 35% stake in the total silicon ecosystem. Capital expenditure across top-tier foundries has been slashed by $12 billion to preserve cash flow during the cyclical downturn.`,
    quiz: [
      {
        question: "What was the main driver of the Q4 market contraction?",
        options: ["Automotive slump", "Logic processor failure", "Decline in memory chip demand", "Lead time increases"],
        answerIndex: 2
      },
      {
        question: "Which vertical showed strong growth despite the downturn?",
        options: ["Consumer electronics", "Memory chips", "Automotive semiconductors", "Desktop PC processors"],
        answerIndex: 2
      },
      {
        question: "How long are current lead times compared to their peak?",
        options: ["14 weeks vs 52 weeks", "52 weeks vs 14 weeks", "4 months vs 1 year", "No change"],
        answerIndex: 0
      }
    ]
  }
];
