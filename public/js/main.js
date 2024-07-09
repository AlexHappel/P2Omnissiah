// Login form handler
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();
  const errorMessageElement = document.querySelector('#login-error-message');

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
      errorMessageElement.textContent = result.message || 'Failed to log in.';
      errorMessageElement.style.display = 'block';
    }
  }
};

document.querySelector('#login-form')?.addEventListener('submit', loginFormHandler);

// Signup form handler
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();
  const errorMessageElement = document.querySelector('#signup-error-message');

  if (username && password) {
    if (password.length < 8) {
      errorMessageElement.textContent = 'Password must be at least 8 characters long.';
      errorMessageElement.style.display = 'block';
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
      errorMessageElement.textContent = result.message || 'Failed to sign up.';
      errorMessageElement.style.display = 'block';
    }
  }
};

document.querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);

// Logout handler
const logoutHandler = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#logout')?.addEventListener('click', logoutHandler);

// New post form handler
const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const content = document.querySelector('textarea[name="content"]').value.trim();

  if (title && content) {
    const response = await fetch('/api/blogposts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post.');
    }
  }
};

document.querySelector('#new-post-form')?.addEventListener('submit', newPostHandler);

// Delete post handler
const deletePostHandler = async (event) => {
  if (event.target.matches('.delete-btn')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post.');
    }
  }
};

document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', deletePostHandler);
});

// Edit post handler
const editPostHandler = async (event) => {
  if (event.target.matches('.edit-btn')) {
    const id = event.target.getAttribute('data-id');
    document.location.replace(`/edit/${id}`);
  }
};

document.querySelectorAll('.edit-btn').forEach(button => {
  button.addEventListener('click', editPostHandler);

// Edit post form handler
const editPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const content = document.querySelector('textarea[name="content"]').value.trim();
  const id = window.location.toString().split('/').pop();

  if (title && content) {
    const response = await fetch(`/api/blogposts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update post.');
    }
  }
};

document.querySelector('#edit-post-form')?.addEventListener('submit', editPostFormHandler);
});

// New comment form handler
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();
  const blogpost_id = window.location.toString().split('/').pop();

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text, blogpost_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment.');
    }
  }
};

document.querySelector('#new-comment-form')?.addEventListener('submit', newCommentHandler);
