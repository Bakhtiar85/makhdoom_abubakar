// JavaScript code can be added here if needed

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle form submission here
        alert('Form submitted!');
    });
});
