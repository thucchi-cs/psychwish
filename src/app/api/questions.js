async function getQuestions() {
    const response = await fetch("/api/getQuestions");
    const result = await response.json();
    console.log(result.data);
    return result.data;
}

async function getAnswers(questionId) {
    const response = await fetch(`/api/getAnswerChoices?id=${questionId}`);
    const result = await response.json();
    console.log(result.data);
    return result.data;
}

async function createAnswerChoices(questions) {
    for (const q of questions) {
        if (q.type === 'mcq') {
            const answers = await getAnswers(q.id);
            q.answers = answers;
        }
    }
}


let loaded = false
export let allQuestions = await getQuestions();
await createAnswerChoices(allQuestions);
