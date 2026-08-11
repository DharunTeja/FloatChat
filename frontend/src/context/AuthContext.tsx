import React, { createContext, useContext, useState, useEffect } from 'react';
// NOTE: UserRole now has 4 values: 'Admin' | 'Government' | 'Researcher' | 'Student'
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, role?: UserRole) => void;
  adminLogin: (email: string, mfaCode: string) => boolean;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const defaultUser: User = {
  id: 'u-101',
  name: 'Dr. Sarah Jenkins',
  email: 'sarah.jenkins@argo-ocean.org',
  role: 'Admin' as const,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  status: 'Active',
  lastLogin: '2026-08-07 13:45',
  mfaEnabled: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('floatchat_user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('floatchat_token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRyLiBTYXJhaCBKZW5raW5zIiwiaWF0IjoxNTE2MjM5MDIyfQ';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('floatchat_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('floatchat_user');
    }
  }, [user]);

  const login = (email: string, role: UserRole = 'Researcher') => {
    const newUser: User = {
      id: `u-${Date.now().toString().slice(-4)}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role,
      status: 'Active',
      lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 16),
      mfaEnabled: role === 'Admin' || role === 'Government',
    };
    const mockJwt = `eyJhbGciOiJIUzI1NiJ9.${btoa(JSON.stringify(newUser))}.signature`;
    setUser(newUser);
    setToken(mockJwt);
    localStorage.setItem('floatchat_token', mockJwt);
  };

  const adminLogin = (email: string, mfaCode: string): boolean => {
    if (mfaCode === '123456' || mfaCode.length >= 6) {
      login(email, 'Admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('floatchat_token');
    localStorage.removeItem('floatchat_user');
  };

  const setRole = (role: UserRole) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, token, login, adminLogin, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
