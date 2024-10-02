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

    calculateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const goal = document.getElementById('goal').value;
        const workDescription = document.getElementById('work-description').value;
        const timeframe = document.getElementById('timeframe').value;

        // Mock calculation (replace with actual API call in a real implementation)
        const result = Math.floor(Math.random() * 41) + 60; // Random percentage between 60-100
        percentageElement.textContent = `${result}%`;

        showPage(resultsPage);
    });
});