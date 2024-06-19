// Login form handler
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        const result = await response.json();
        alert(`Failed to log in: ${result.message}`);
      }
    }
  };
  
  document.querySelector('#login-form')?.addEventListener('submit', loginFormHandler);
  
  // Signup form handler
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
  
    if (username && password) {
      if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }
  
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        const result = await response.json();
        alert(`Failed to sign up: ${result.message}`);
      }
    }
  };
  
  document.querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);