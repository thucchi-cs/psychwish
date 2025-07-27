import React, { useState } from "react";

//maps answer choices to personality type 
// R = Realistic (Doer / Builder)

// I = Investigative (Thinker)

// A = Artistic (Dreamer / Seeker)

// S = Social (Helper)

// E = Enterprising (Builder / Doer)

// C = Conventional (Planner)

const indexToTypeMap: string[][] = [
    ["R", "I", "A", "S", "E", "C"],
    ["I", "S", "R", "E", "C", "A"],
    ["S", "E", "C", "I", "R", "A"],
    ["A", "R", "S", "C", "E", "I"],
    ["E", "A", "I", "S", "R", "C"],
    ["R", "I", "E", "C", "A", "S"],
    ["E", "C", "I", "R", "S", "A"],
];
// prints questions 
const questions = [
    {
        text: "Which weekend activity sounds most appealing to you?",
        options: [
            { text: "Going hiking or fixing something around the house" },
            { text: "Solving puzzles or doing a science experiment" },
            { text: "Painting or making music" },
            { text: "Volunteering at a community center" },
            { text: "Hosting or organizing an event" },
            { text: "Organizing your home or updating your budget" },
        ],
    },
    {
        text: "If you had to take on a group project, what role would you prefer?",
        options: [
            { text: "Researching the topic in depth" },
            { text: "Mediating team disagreements" },
            { text: "Building or assembling things" },
            { text: "Delegating tasks and motivating the group" },
            { text: "Keeping track of deadlines and documentation" },
            { text: "Designing the presentation" },
        ],
    },
    {
        text: "What kind of book or article would you pick up first?",
        options: [
            { text: "A self-help or psychology book" },
            { text: "A business or leadership article" },
            { text: "A productivity or time-management book" },
            { text: "A scientific journal or true crime story" },
            { text: "A DIY home improvement guide" },
            { text: "A collection of poetry or a novel" },
        ],
    },
    {
        text: "How do you usually approach a new task?",
        options: [
            { text: "I brainstorm different creative options" },
            { text: "Hands-on — I like jumping in and figuring it out" },
            { text: "I ask for feedback and try to collaborate" },
            { text: "I create a checklist and follow procedures" },
            { text: "I look for the most efficient way to get results" },
            { text: "I research thoroughly before starting" },
        ],
    },
    {
        text: "What drives you the most?",
        options: [
            { text: "Accomplishing goals" },
            { text: "Imagination and possibilities" },
            { text: "Personal growth" },
            { text: "Making a difference" },
            { text: "Solving real-world problems" },
            { text: "Maintaining stability and consistency" },
        ],
    },
    {
        text: "When you're feeling stuck or unmotivated, what helps?",
        options: [
            { text: "Doing something physical to clear my head" },
            { text: "Reading a book that sparks curiosity" },
            { text: "Setting a new challenge" },
            { text: "Cleaning up or planning in detail" },
            { text: "Creating something meaningful" },
            { text: "Talking to someone for support" },
        ],
    },
    {
        text: "What makes you feel most fulfilled at the end of the day?",
        options: [
            { text: "Achieving a personal goal" },
            { text: "Checking off tasks" },
            { text: "Understanding a complex topic" },
            { text: "Fixing or building something" },
            { text: "Helping someone emotionally" },
            { text: "Expressing emotions creatively" },
        ],
    },
];

const reflectionQuestions = [
    "Do you have specific hobbies that bring you joy? If not, why?",
    "What prevents you from transforming dreams into reality?",
    "Do you have one goal in mind or multiple goals?",
];

const personalityDescriptions: Record<string, string> = {
    R: "Realistic - You are practical and a hands-on builder.",
    I: "Investigative - You are analytical and a deep thinker.",
    A: "Artistic - You are creative and an imaginative dreamer.",
    S: "Social - You are caring and an esteemed helper.",
    E: "Enterprising - You are persuasive and a natural leader.",
    C: "Conventional - You are the most organized and efficient planner.",
};

export default function QuizPage() {
    const [ask, setAsk] = useState(0); // current question index
    const [answers, setAnswers] = useState<string[]>([]); // stores selected answer
    const [result, setResult] = useState<string | null>(null); //stores personality result after calculation
    const [stage, setStage] = useState<"quiz" | "reflection" | "result">("quiz"); // checks which part of quiz user is on
    const [reflectionAnswers, setReflectionAnswers] = useState<string[]>(
        Array(reflectionQuestions.length).fill("")
    ); //stores typed responses

    //when user selects multiple choice answer, maps index to personality, stores in answer array then goes to next question/ reflection
    function handleAnswer(optionIndex: number) {
        const type = indexToTypeMap[ask][optionIndex];
        const newAnswers = [...answers, type];
        setAnswers(newAnswers);

        if (ask + 1 < questions.length) {
            setAsk(ask + 1);
        } else {
            setStage("reflection");
        }
    }

    function handleReflectionSubmit(e: React.FormEvent) {
        e.preventDefault();// prevents page reloading
        const typeCount: Record<string, number> = {};
        answers.forEach((t) => {
            typeCount[t] = (typeCount[t] || 0) + 1;
        });// counts frequency of each personality type
        const sorted = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);// sorts types to fnd most common
        setResult(sorted.length > 0 ? sorted[0][0] : "No result");
        setStage("result");
    }
    // resets quiz when user clicks button
    function resetQuiz() {
        setStage("quiz");
        setAsk(0);
        setAnswers([]);
        setResult(null);
        setReflectionAnswers(Array(reflectionQuestions.length).fill(""));
    }

    return (
        //show current question and answers
        //show text input area 
        //show final result with description
        <div className="p-4 max-w-md mx-auto">
            {stage === "quiz" && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Let's get to know each other!</h1>
                    <p className="text-lg font-medium mb-4">{questions[ask].text}</p>
                    <div className="space-y-2">
                        {questions[ask].options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className="w-full px-4 py-2 bg-white rounded shadow hover:bg-indigo-100"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {stage === "reflection" && (
                <form onSubmit={handleReflectionSubmit}>
                    <h2 className="text-xl font-semibold mb-4">Tell us more about you</h2>
                    {reflectionQuestions.map((q, idx) => (
                        <div key={idx} className="mb-4">
                            <label className="block mb-1 font-medium">{q}</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={3}
                                value={reflectionAnswers[idx]}
                                onChange={(e) => {
                                    const updated = [...reflectionAnswers];
                                    updated[idx] = e.target.value;
                                    setReflectionAnswers(updated);
                                }}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                    >
                        See My Result
                    </button>
                </form>
            )}

            {stage === "result" && result && (
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Your Personality Type:</h2>
                    <p className="text-2xl font-bold">{result}</p>
                    <p className="italic mt-2">{personalityDescriptions[result]}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
                        onClick={resetQuiz}
                    >
                        Retake Quiz
                    </button>
                </div>
            )}
        </div>
    );
}
