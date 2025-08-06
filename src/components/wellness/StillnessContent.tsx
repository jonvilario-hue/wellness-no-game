
"use client"

import { mindfulnessPractices, type MindfulnessCategory } from "@/data/exercises"
import { PracticeInstructionCard } from "./PracticeInstructionCard"
import CategoryOverview from "./CategoryOverview"
import { stillnessCategoryDetails } from "@/data/wellness-categories"
import { ChevronDown } from "lucide-react"

const categories: MindfulnessCategory[] = ['Breathwork', 'Clarity & Focus', 'Grounding & Safety', 'Self-Compassion'];

export default function StillnessContent() {
    return (
     <div className="space-y-8">
        {categories.map(category => {
            const practices = mindfulnessPractices.filter(p => p.category === category);
            const details = stillnessCategoryDetails[category];
            if(practices.length === 0 || !details) return null;

            const CategoryIcon = details.icon;

            return (
                <details key={category} open className="group">
                    <summary className="list-none cursor-pointer flex justify-between items-start">
                        <div className="flex-grow">
                             <CategoryOverview
                                title={details.title}
                                icon={<CategoryIcon className="w-6 h-6 text-primary" />}
                                purpose={details.purpose}
                                useWhen={details.useWhen}
                                includes={details.includes}
                                tagline={details.tagline}
                            />
                        </div>
                        <ChevronDown className="w-5 h-5 m-6 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {practices.map((practice) => (
                             <div key={practice.id} id={`practice-${practice.id}`} className="scroll-mt-20">
                                <PracticeInstructionCard exercise={practice} />
                            </div>
                        ))}
                    </div>
                </details>
            )
        })}
    </div>
  )
}
