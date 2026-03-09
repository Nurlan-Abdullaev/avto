// Mock Authentication System with localStorage
export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

const STORAGE_KEYS = {
  USER: 'elite_motors_user',
  USERS: 'elite_motors_users',
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(STORAGE_KEYS.USER);
  return userJson ? JSON.parse(userJson) : null;
};

export const signInWithGoogle = async (): Promise<User> => {
  // Mock Google OAuth
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substring(7),
        email: 'user@elitemotors.com',
        name: 'Luxury Buyer',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=luxury',
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      
      // Store in users list
      const users = getAllUsers();
      if (!users.find(u => u.id === mockUser.id)) {
        users.push(mockUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      }
      
      resolve(mockUser);
    }, 1000);
  });
};

export const signOut = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getAllUsers = (): User[] => {
  const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const makeAdmin = (userId: string) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].role = 'admin';
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    const currentUser = getCurrentUser();
    if (currentUser?.id === userId) {
      currentUser.role = 'admin';
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    }
  }
};
