import changeEmail from './user/user-changeEmail.js';
import changePassword from './user/user-changePassword.js';
import logout from '../images/user-logout.js';

document.getElementById('changeEmail').addEventListener('click', async (e) => {
    e.preventDefault(); 
    await changeEmail();
  });

  document.getElementById('changePassword').addEventListener('click', async (e) => {
    e.preventDefault(); 
    await changePassword();
  });

  document.getElementById('logout').addEventListener('click', async (e) => {
    e.preventDefault(); 
    await logout();
  });
  