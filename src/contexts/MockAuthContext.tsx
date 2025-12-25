import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock User type (similar to Supabase User)
interface MockUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

interface MockAuthContextType {
  user: MockUser | null;
  session: { user: MockUser } | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ap_mock_auth';
const USERS_KEY = 'ap_mock_users';

interface StoredUser {
  email: string;
  password: string;
  fullName?: string;
}

export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load saved session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Get stored users
  const getStoredUsers = (): StoredUser[] => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  // Save user to storage
  const saveUser = (userData: StoredUser) => {
    const users = getStoredUsers();
    const existing = users.findIndex(u => u.email === userData.email);
    if (existing >= 0) {
      users[existing] = userData;
    } else {
      users.push(userData);
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const signUp = async (email: string, password: string, fullName?: string): Promise<{ error: Error | null }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getStoredUsers();
    const exists = users.find(u => u.email === email);

    if (exists) {
      return { error: new Error('User already registered') };
    }

    // Save user
    saveUser({ email, password, fullName });

    // Create session
    const mockUser: MockUser = {
      id: crypto.randomUUID(),
      email,
      user_metadata: { full_name: fullName }
    };

    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));

    return { error: null };
  };

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return { error: new Error('Invalid login credentials') };
    }

    const mockUser: MockUser = {
      id: crypto.randomUUID(),
      email: foundUser.email,
      user_metadata: { full_name: foundUser.fullName }
    };

    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));

    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const session = user ? { user } : null;

  return (
    <MockAuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </MockAuthContext.Provider>
  );
};

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};

// Re-export as useAuth for compatibility
export const useAuth = useMockAuth;
