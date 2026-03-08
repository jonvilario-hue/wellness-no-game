
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
    id: 'casual-syntopic',
    title: 'The Syntopic Reader',
    tier: 'Casual',
    wordCount: 260,
    content: `Syntopic reading represents the highest level of reading mastery. Unlike elementary or analytical reading, which focuses on a single text, syntopic reading involves analyzing multiple books on the same subject to identify common themes, contradictions, and gaps in current knowledge. A syntopic reader does not simply accept one author's perspective as the truth. Instead, they construct their own understanding by comparing arguments from various sources. This approach is essential for becoming a true polymath, as it allows for the synthesis of disparate ideas across different domains. For example, by reading both biology and economics through a syntopic lens, one might discover shared patterns in how systems manage scarce resources. This level of reading requires a clear purpose and the ability to scan texts quickly to find relevant passages before diving into deep analysis.`,
    quiz: [
      {
        question: "What is the primary focus of syntopic reading?",
        options: ["Memorizing a single book", "Analyzing multiple books on one subject", "Reading as fast as possible", "Correcting grammar"],
        answerIndex: 1
      },
      {
        question: "How does syntopic reading benefit a polymath?",
        options: ["It makes them faster readers", "It helps synthesize ideas across domains", "It improves spelling", "It guarantees high grades"],
        answerIndex: 1
      },
      {
        question: "What is the first step in syntopic reading mentioned?",
        options: ["Writing a book", "Scanning to find relevant passages", "Memorizing definitions", "Interviewing authors"],
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
    id: 'tech-chc-theory',
    title: 'The CHC Theory of Intelligence',
    tier: 'Technical',
    wordCount: 330,
    content: `The Cattell-Horn-Carroll (CHC) theory is the most comprehensive and empirically supported model of human cognitive abilities. It is a hierarchical framework that organizes intelligence into three strata: narrow, broad, and general. At the narrowest level, there are over 70 specific abilities. At the broad level, there are 8 to 10 cognitive domains, including Fluid Reasoning (Gf), Crystallized Intelligence (Gc), and Working Memory (Gwm). General intelligence (g) sits at the top of the hierarchy. Fluid Reasoning refers to the ability to solve novel problems without relying on prior knowledge, while Crystallized Intelligence is the accumulation of learned facts and skills. Understanding this structure is vital for cognitive training because it allows individuals to target specific 'broad' domains for improvement. For instance, an engineer might focus on Gv (Visual Processing) to better visualize complex designs, while a linguist might prioritize Gc. Modern research suggests that while 'g' is relatively stable, broad and narrow abilities exhibit significant neuroplasticity through targeted exercise and environmental enrichment.`,
    quiz: [
      {
        question: "How many 'strata' are in the CHC model?",
        options: ["Two", "Three", "Five", "Ten"],
        answerIndex: 1
      },
      {
        question: "Which ability involves solving novel problems?",
        options: ["Crystallized Intelligence (Gc)", "Fluid Reasoning (Gf)", "Working Memory (Gwm)", "Processing Speed (Gs)"],
        answerIndex: 1
      },
      {
        question: "According to the text, which level of intelligence is most stable?",
        options: ["Broad abilities", "Narrow abilities", "General intelligence (g)", "Targeted domains"],
        answerIndex: 2
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
  },
  {
    id: 'dense-memory-audit',
    title: 'Neural Transmission Capacity Audit',
    tier: 'Dense Data',
    wordCount: 295,
    content: `A recent meta-analysis of neural information processing estimated that the human retina transmits data at approximately 10 million bits per second (Mbps). However, the bottleneck of conscious perception is significantly tighter, with the prefrontal cortex capable of processing only 40 to 60 bits per second during directed focus. This representing a 99.99% data reduction from sensory input to conscious awareness. In terms of long-term storage, the human brain contains roughly 86 billion neurons, each with an average of 7,000 synaptic connections. Theoretical models suggest a total storage capacity of 2.5 petabytes, though effective retrieval efficiency (ERE) fluctuates based on sleep quality and stress markers. In a study of 500 adults, those with a cortisol spike of 15% above baseline showed a 30% decrease in word-list recall accuracy. Conversely, high-alpha brainwave states correlate with a 12% increase in pattern recognition speed. These metrics highlight the importance of cognitive 'offloading' through journaling and tools, as the discrepancy between sensory input and processing capacity creates a constant state of 'attentional competition' within the neural architecture.`,
    quiz: [
      {
        question: "What is the estimated bits per second processed by conscious awareness?",
        options: ["10 million", "40 to 60", "2.5 petabytes", "86 billion"],
        answerIndex: 1
      },
      {
        question: "How many neurons are roughly in the human brain?",
        options: ["10 million", "2.5 petabytes", "86 billion", "7,000"],
        answerIndex: 2
      },
      {
        question: "What was the effect of a 15% cortisol spike on recall?",
        options: ["12% increase", "30% decrease", "99% reduction", "No change"],
        answerIndex: 1
      }
    ]
  }
];
