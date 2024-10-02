document.addEventListener('DOMContentLoaded', function() {
    const homePage = document.getElementById('home-page');
    const calculatePage = document.getElementById('calculate-page');
    const resultsPage = document.getElementById('results-page');
    const calculateBtn = document.getElementById('calculate-btn');
    const backBtn = document.getElementById('back-btn');
    const calculateForm = document.getElementById('calculate-form');
    const tryAgainBtn = document.getElementById('try-again-btn');
    const logAnotherBtn = document.getElementById('log-another-btn');
    const shareBtn = document.getElementById('share-btn');
    const percentageElement = document.getElementById('percentage');
    const feedbackElement = document.getElementById('feedback');

    function showPage(page) {
        homePage.style.display = 'none';
        calculatePage.style.display = 'none';
        resultsPage.style.display = 'none';
        page.style.display = 'flex';
    }

    calculateBtn.addEventListener('click', () => showPage(calculatePage));
    backBtn.addEventListener('click', () => showPage(homePage));
    tryAgainBtn.addEventListener('click', () => showPage(calculatePage));
    logAnotherBtn.addEventListener('click', () => showPage(calculatePage));
    shareBtn.addEventListener('click', () => alert('Sharing functionality not implemented'));

    calculateForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const goal = document.getElementById('goal').value;
        const workDescription = document.getElementById('work-description').value;
        const expectedTime = document.getElementById('expected-time').value;
        const actualTime = document.getElementById('actual-time').value;

        try {
            const result = await calculateOutput({ goal, workDescription, expectedTime, actualTime });
            percentageElement.textContent = `${result.percentage}%`;
            
            if (result.percentage > 50) {
                feedbackElement.textContent = "Great job! You're making excellent progress.";
                feedbackElement.style.color = "#15803d"; // Green color for positive feedback
            } else {
                feedbackElement.textContent = "There's room for improvement. Keep pushing!";
                feedbackElement.style.color = "#9a3412"; // Orange color for improvement feedback
            }

            showPage(resultsPage);
        } catch (error) {
            console.error('Error calculating output:', error);
            alert('An error occurred while calculating your output. Please try again.');
        }
    });

    async function calculateOutput(data) {
        const API_KEY = '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';
        const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [
                    {role: "system", content: "You are an AI assistant that calculates productivity based on user input. Respond with a single number representing the percentage of productivity achieved."},
                    {role: "user", content: `Goal: ${data.goal}\nWork done: ${data.workDescription}\nExpected time: ${data.expectedTime} minutes\nActual time: ${data.actualTime} minutes\n\nBased on this information, calculate the percentage of productivity achieved. Consider the relationship between expected and actual time in your calculation. Respond with only a number between 0 and 100.`}
                ],
                temperature: 0.7,
                max_tokens: 5
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const result = await response.json();
        const percentage = parseInt(result.choices[0].message.content);
        return { percentage: isNaN(percentage) ? 0 : percentage };
    }
});
