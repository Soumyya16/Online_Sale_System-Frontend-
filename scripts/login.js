document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const toggleSignup = document.getElementById('toggle-signup');

    let isLogin = true;

    // Toggle between login and signup
    toggleSignup.addEventListener('click', () => {
        isLogin = !isLogin;
        form.querySelector('.btn-auth').textContent = isLogin ? 'Login' : 'Sign up';
        toggleSignup.textContent = isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Login';
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim().toLowerCase(); // Normalize email
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please fill out all fields.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (isLogin) {
            // Login logic
            const user = users.find(user => user.email === email);

            if (user && user.password === password) {
                alert('Login successful!');
                localStorage.setItem('loggedIn', email); // Save login state
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password.');
            }
        } else {
            // Signup logic
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert('User already exists with this email. Please login.');
            } else {
                users.push({ email, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Signup successful! You can now login.');
                isLogin = true;
                form.querySelector('.btn-auth').textContent = 'Login';
                toggleSignup.textContent = "Don't have an account? Sign up";
            }
        }
    });
});
