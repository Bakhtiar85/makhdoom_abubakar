// JavaScript code can be added here if needed

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const statusMessage = document.createElement('div');
    statusMessage.id = 'status-message';
    form.appendChild(statusMessage);

    function displayStatus(message, isError = false) {
        statusMessage.textContent = message;
        statusMessage.className = isError ? 'error' : 'success';
        statusMessage.style.display = 'block';
    }

    async function postData(url = '', data = {}) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

        const response = await fetch(url, {
            method: 'POST', // We're using GET to fetch the JSON file
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        statusMessage.style.display = 'none';
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Fetch the local JSON file
            const response = await postData('../form-submit-logic.json');
            console.log('Server response:', response);
            console.log('Form data:', data);

            displayStatus(response.message);
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            displayStatus('An error occurred while submitting the form', true);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    });
});