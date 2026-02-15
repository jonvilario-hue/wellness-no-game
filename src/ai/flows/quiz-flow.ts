
'use server';
/**
 * @fileOverview A flow to generate a multiple-choice quiz from a block of text.
 *
 * - generateQuiz - A function that takes notes and creates a quiz.
 * - QuizInput - The input type for the generateQuiz function.
 * - QuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const QuizInputSchema = z.object({
  notes: z.string().describe('The study notes or text to generate a quiz from.'),
});
export type QuizInput = z.infer<typeof QuizInputSchema>;

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of exactly four multiple-choice options.'),
  answer: z.string().describe('The correct option.'),
});

const QuizOutputSchema = z.object({
  title: z.string().describe('A concise title for the quiz based on the notes.'),
  questions: z.array(QuizQuestionSchema).min(3).max(5).describe('An array of 3 to 5 quiz questions.'),
});
export type QuizOutput = z.infer<typeof QuizOutputSchema>;

const quizGenerationPrompt = ai.definePrompt({
    name: 'quizGenerationPrompt',
    input: { schema: QuizInputSchema },
    output: { schema: QuizOutputSchema },
    prompt: `You are an expert educator. Your task is to create a multiple-choice quiz from the following notes. The quiz should test the key concepts in the text.

Generate a quiz with a clear title and between 3 and 5 questions. Each question must have exactly four options, and one of those options must be the correct answer.

Ensure the questions are clear, the options are plausible, and the correct answer is accurately identified from the notes provided.

Notes:
{{{notes}}}
`,
});

export async function generateQuiz(input: QuizInput): Promise<QuizOutput> {
  const { output } = await quizGenerationPrompt(input);
  if (!output) {
    throw new Error('Failed to generate quiz.');
  }
  return output;
}
