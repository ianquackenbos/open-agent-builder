"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionUser, AuthPort } from '@/lib/auth/port';
import { noAuth } from '@/lib/auth/noauth';

interface AuthContextType {
  user: SessionUser | null;
  loading: boolean;
  authPort: AuthPort;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  // For now, always use NoAuth
  const authPort = noAuth;
  
  useEffect(() => {
    const loadUser = async () => {
      try {
        const sessionUser = await authPort.getSessionUser();
        setUser(sessionUser);
      } catch (error) {
        console.error('Failed to load user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, loading, authPort }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSessionUser(): SessionUser | null {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSessionUser must be used within an AuthProvider');
  }
  return context.user;
}

export function useAuthPort(): AuthPort {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthPort must be used within an AuthProvider');
  }
  return context.authPort;
}
