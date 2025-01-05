import changeEmail from './user/user-changeEmail.js';
import changePassword from './user/user-changePassword.js';
import logout from './user/user-logout.js';

document.getElementById('changeEmail').addEventListener('click', async (e) => {
    e.preventDefault(); // Mencegah navigasi default
    await changeEmail();
  });

  document.getElementById('changePassword').addEventListener('click', async (e) => {
    e.preventDefault(); // Mencegah navigasi default
    await changePassword();
  });

  document.getElementById('logout').addEventListener('click', async (e) => {
    e.preventDefault(); // Mencegah navigasi default
    await logout();
  });
  