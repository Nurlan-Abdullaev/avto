// Helper function to make a user admin
// Open browser console and run: makeUserAdmin()

declare global {
  interface Window {
    makeUserAdmin: () => void;
  }
}

export const initDevTools = () => {
  if (typeof window !== 'undefined') {
    window.makeUserAdmin = () => {
      const userJson = localStorage.getItem('elite_motors_user');
      if (!userJson) {
        console.log('Please sign in first');
        return;
      }
      
      const user = JSON.parse(userJson);
      user.role = 'admin';
      localStorage.setItem('elite_motors_user', JSON.stringify(user));
      
      const usersJson = localStorage.getItem('elite_motors_users');
      if (usersJson) {
        const users = JSON.parse(usersJson);
        const userIndex = users.findIndex((u: any) => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex].role = 'admin';
          localStorage.setItem('elite_motors_users', JSON.stringify(users));
        }
      }
      
      console.log('User is now admin! Refresh the page.');
      window.location.reload();
    };
    
    console.log('%c🚗 Elite Motors Dev Tools', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
    console.log('%cTo become admin, sign in first, then run: makeUserAdmin()', 'color: #D4AF37;');
  }
};
