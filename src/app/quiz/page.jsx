'use client';
import React, { useState } from "react";
import { allQuestions } from "../api/questions";


const personalityDescriptions = {
    R: "Realistic - You are practical and a hands-on builder.",
    I: "Investigative - You are analytical and a deep thinker.",
    A: "Artistic - You are creative and an imaginative dreamer.",
    S: "Social - You are caring and an esteemed helper.",
    E: "Enterprising - You are persuasive and a natural leader.",
    C: "Conventional - You are the most organized and efficient planner.",
};

let questions = [];
let reflectionQuestions = [];
for (const q of allQuestions) {
    if (q.type === 'mcq') {
        questions.push(q);
    } else {
        reflectionQuestions.push(q)
    }
}

export default function QuizPage() {    
    const [ask, setAsk] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);
    const [stage, setStage] = useState("quiz");
    const [reflectionAnswers, setReflectionAnswers] = useState(
        Array(reflectionQuestions.length).fill("")
    );

    function handleAnswer(optionIndex) {
        const type = questions[ask].answers[optionIndex].answer_type;
        console.log(type)
        const newAnswers = [...answers, type];
        setAnswers(newAnswers);

        if (ask + 1 < questions.length) {
            setAsk(ask + 1);
        } else {
            setStage("reflection");
        }
    }

    function handleReflectionSubmit(e) {
        e.preventDefault();

        const typeCount = {};
        answers.forEach((t) => {
            typeCount[t] = (typeCount[t] || 0) + 1;
        });

        const sorted = Object.entries(typeCount).sort((a, b) => b[1] - a[1]);
        setResult(sorted.length > 0 ? sorted[0][0] : "No result");
        setStage("result");
    }

    function resetQuiz() {
        setStage("quiz");
        setAsk(0);
        setAnswers([]);
        setResult(null);
        setReflectionAnswers(Array(reflectionQuestions.length).fill(""));
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            {stage === "quiz" && (
                <>
                    <h1 className="text-2xl font-bold mb-4">Let's get to know each other!</h1>
                    <p className="text-lg font-medium mb-4">{allQuestions[ask].question}</p>
                    <div className="space-y-2">
                        {allQuestions[ask].answers.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className="w-full px-4 py-2 bg-white rounded shadow hover:bg-indigo-100"
                            >
                                {option.answer}
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
                            <label className="block mb-1 font-medium">{q.question}</label>
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
