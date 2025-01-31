// JavaScript to dynamically load pets into the Adopt a Pet section
// Fetch pet data from the backend
fetch('/api/pets')  // Call the backend API
    .then(response => response.json())  // Convert the response to JSON
    .then(pets => {  // Use the pet data received from the backend
        const petContainer = document.getElementById('pets');  // Find the pets section
        petContainer.innerHTML = '';  // Clear existing content

        pets.forEach(pet => {  // Loop through each pet received from backend
            const petCard = document.createElement('div');
            petCard.classList.add('pet-card');  // Add CSS class for styling
            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <p>${pet.description}</p>
            `;
            petContainer.appendChild(petCard);  // Add pet to the webpage
        });
    })
    .catch(error => console.error('Error fetching pets:', error));  // Handle errors


function loadPets() {
    const loading = document.querySelector('.loading');
    const petGrid = document.querySelector('.pet-grid');

    loading.style.display = 'block';
    petGrid.innerHTML = '';

    fetch('/api/pets')
    .then(response => response.json())
    .then(pets => {
        pets.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.classList.add('pet-card');

            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <p>${pet.description}</p>
            `;

            petGrid.appendChild(petCard);
        });
    })
    .catch(error => console.error('Error fetching pets:', error))
    .finally(() => loading.style.display = 'none');
}

function addPet(name, image, description) {
    const newPet = { name, image, description };

    fetch('/api/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPet),
    })
    .then(response => response.json())
    .then(() => {
        loadPets(); // Reload pets after adding a new one
    })
    .catch(error => console.error('Error adding pet:', error));
}

function scrollToSection(sectionId) {
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
}

const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginSignupSection = document.getElementById('login-signup');
const mainContent = document.getElementById('main-content');

// Switch to Login Form
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});

// Switch to Signup Form
signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
});

// Handle Login
function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        // Alert the user for login confirmation
        alert(`Logged in as ${email}`);

        // Hide the login/signup section
        loginSignupSection.style.display = 'none';

        // Show the main content of the website
        mainContent.style.display = 'block';

        // Optionally display user name in the main content
        document.getElementById('welcome-message').textContent = `Welcome, ${user.name}!`;
    } else {
        alert('Please fill in all fields.');
    }
}

// Handle Signup
function handleSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (name && email && password) {
        // Store sign-up info in local storage
        localStorage.setItem('user', JSON.stringify({ name, email, password }));

        alert(`Account created for ${name}`);
    } else {
        alert('Please fill in all fields.');
    }
}


// Load pets on page load
window.addEventListener('DOMContentLoaded', loadPets);

document.getElementById('add-pet-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('pet-name').value;
    const image = document.getElementById('pet-image').value;
    const description = document.getElementById('pet-description').value;

    addPet(name, image, description);

    // Clear the form after submission
    event.target.reset();
});
