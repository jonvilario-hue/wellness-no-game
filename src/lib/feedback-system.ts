
'use client';

import { useToast } from "@/hooks/use-toast";
import type { CHCDomain } from "@/types";

const successFeedback: Record<CHCDomain, string[]> = {
    Gf: [
        "Pattern cracked – your reasoning skills are kicking in.",
        "That's some sharp logical thinking.",
        "You connected the dots perfectly.",
        "Correct. That type of logic is key for real-world problem solving."
    ],
    Gc: [
        "Excellent vocabulary use!",
        "You deduced that from context beautifully.",
        "Your knowledge base is clearly strong.",
        "Great inference! You're making sharp connections."
    ],
    Gwm: [
        "Nice! You held a lot in working memory there.",
        "That's impressive mental juggling.",
        "Your focus held strong on that sequence.",
        "Great job manipulating that information in your head."
    ],
    Gs: [
        "Sharp eyes! That was a fast perceptual scan.",
        "Quick and accurate. Your processing speed is on point.",
        "You're cutting through the noise with speed.",
        "Excellent pace! Keep that momentum."
    ],
    Gv: [
        "Great mental rotation! You saw that clearly.",
        "Your visual imagination is getting stronger.",
        "You spotted the spatial relationship perfectly.",
        "Nice work manipulating that visual information."
    ],
    Ga: [
        "You heard that subtle difference perfectly.",
        "Excellent auditory memory.",
        "You're tuning into the details. Great work.",
        "That's sharp listening. You're filtering out the noise."
    ],
    Glr: [
        "Great recall! You pulled that from your memory banks.",
        "Your fluency in that category is impressive.",
        "You're accessing stored knowledge efficiently.",
        "That's a strong connection to your long-term memory."
    ],
    EF: [
        "Great focus! You successfully inhibited the impulse.",
        "You switched tasks smoothly and accurately.",
        "Your attention control was rock-solid on that one.",
        "Excellent self-regulation. That's a key executive skill."
    ],
};

const failureFeedback: Record<string, string[]> = {
    default: [
        "Not quite – what if you try a different strategy?",
        "Close! Every attempt is a step closer to the pattern.",
        "This is a tough one. It's designed to stretch your skills.",
        "This is where the real learning happens. What did you notice?",
        "Cognitive stretch point! This is your brain building new pathways."
    ],
    Gwm: [
        "Almost! That's a lot to hold in memory. Let's try it again.",
        "The sequence got scrambled. It happens! Deep breath and refocus.",
    ],
    EF: [
        "That was a tricky switch! Inhibition is a tough skill to build.",
        "Oops, the old rule stuck around. Let's reset and try the new one."
    ],
};

const { toast } = useToast();

const showFeedback = (messages: string[], variant: 'default' | 'destructive' = 'default') => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    toast({
        description: message,
        variant: variant,
    });
};

export const showSuccessFeedback = (domain: CHCDomain) => {
    const messages = successFeedback[domain] || successFeedback.Gf; // Fallback to Gf
    showFeedback(messages);
};

export const showFailureFeedback = (domain: CHCDomain) => {
    const messages = failureFeedback[domain] || failureFeedback.default;
    showFeedback(messages, 'destructive');
};
