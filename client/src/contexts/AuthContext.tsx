import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string, name: string, email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuários padrão do sistema (em produção, isso viria de um banco de dados)
const DEFAULT_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrador',
    email: 'admin@iabrunocrm.com',
    role: 'admin'
  },
  {
    id: '2',
    username: 'bruno',
    password: 'bruno123',
    name: 'Bruno',
    email: 'bruno@trueimportados.com.br',
    role: 'admin'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Carregar sessão do localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('ia_bruno_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao carregar sessão:', error);
        localStorage.removeItem('ia_bruno_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Buscar usuários salvos no localStorage
    const savedUsersStr = localStorage.getItem('ia_bruno_users');
    let allUsers = [...DEFAULT_USERS];
    
    if (savedUsersStr) {
      try {
        const savedUsers = JSON.parse(savedUsersStr);
        allUsers = [...DEFAULT_USERS, ...savedUsers];
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }

    // Verificar credenciais
    const foundUser = allUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('ia_bruno_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ia_bruno_user');
  };

  const register = async (
    username: string,
    password: string,
    name: string,
    email: string
  ): Promise<boolean> => {
    // Verificar se usuário já existe
    const savedUsersStr = localStorage.getItem('ia_bruno_users');
    let allUsers = [...DEFAULT_USERS];
    
    if (savedUsersStr) {
      try {
        const savedUsers = JSON.parse(savedUsersStr);
        allUsers = [...DEFAULT_USERS, ...savedUsers];
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    }

    const userExists = allUsers.find(u => u.username === username || u.email === email);
    if (userExists) {
      return false; // Usuário já existe
    }

    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      name,
      email,
      role: 'user'
    };

    // Salvar no localStorage
    const savedUsers = savedUsersStr ? JSON.parse(savedUsersStr) : [];
    savedUsers.push(newUser);
    localStorage.setItem('ia_bruno_users', JSON.stringify(savedUsers));

    // Fazer login automático
    const userData: User = {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('ia_bruno_user', JSON.stringify(userData));

    return true;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
