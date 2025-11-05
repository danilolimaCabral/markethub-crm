/**
 * Sistema de Autenticação Local
 * Gerencia cadastro e login de usuários locais
 */

export interface LocalUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export interface LocalSession {
  userId: string;
  email: string;
  name: string;
  loginAt: string;
}

const USERS_KEY = 'crm_users';
const SESSION_KEY = 'crm_session';

/**
 * Hash simples de senha (em produção, usar bcrypt no backend)
 */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Obter todos os usuários cadastrados
 */
function getUsers(): LocalUser[] {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

/**
 * Salvar usuários
 */
function saveUsers(users: LocalUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Cadastrar novo usuário
 */
export async function signUp(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Validações
    if (!email || !password || !name) {
      return { success: false, error: 'Todos os campos são obrigatórios' };
    }

    if (password.length < 6) {
      return { success: false, error: 'A senha deve ter pelo menos 6 caracteres' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Email inválido' };
    }

    // Verificar se email já existe
    const users = getUsers();
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Este email já está cadastrado' };
    }

    // Criar novo usuário
    const passwordHash = await hashPassword(password);
    const newUser: LocalUser = {
      id: crypto.randomUUID(),
      email,
      name,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Fazer login automaticamente
    const session: LocalSession = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return { success: true };
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return { success: false, error: 'Erro ao criar conta. Tente novamente.' };
  }
}

/**
 * Fazer login
 */
export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!email || !password) {
      return { success: false, error: 'Email e senha são obrigatórios' };
    }

    const users = getUsers();
    const passwordHash = await hashPassword(password);
    
    const user = users.find(u => u.email === email && u.passwordHash === passwordHash);
    
    if (!user) {
      return { success: false, error: 'Email ou senha incorretos' };
    }

    // Criar sessão
    const session: LocalSession = {
      userId: user.id,
      email: user.email,
      name: user.name,
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    return { success: true };
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { success: false, error: 'Erro ao fazer login. Tente novamente.' };
  }
}

/**
 * Fazer logout
 */
export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Verificar se usuário está logado
 */
export function isLoggedIn(): boolean {
  const sessionJson = localStorage.getItem(SESSION_KEY);
  return !!sessionJson;
}

/**
 * Obter sessão atual
 */
export function getCurrentSession(): LocalSession | null {
  const sessionJson = localStorage.getItem(SESSION_KEY);
  return sessionJson ? JSON.parse(sessionJson) : null;
}

/**
 * Obter usuário atual
 */
export function getCurrentUser(): LocalUser | null {
  const session = getCurrentSession();
  if (!session) return null;

  const users = getUsers();
  return users.find(u => u.id === session.userId) || null;
}
