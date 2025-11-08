import { useState, useEffect } from 'react';
import CRMLayout from '@/components/CRMLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { UserPlus, Pencil, Trash2, Shield, User } from 'lucide-react';

// Definir módulos disponíveis no sistema
const AVAILABLE_MODULES = [
  { id: 'dashboard', name: 'Dashboard', description: 'Visão geral do sistema' },
  { id: 'leads', name: 'Leads', description: 'Gerenciamento de leads' },
  { id: 'sales', name: 'Vendas', description: 'Controle de vendas' },
  { id: 'mercadolivre', name: 'Mercado Livre', description: 'Integração ML' },
  { id: 'products', name: 'Produtos', description: 'Catálogo de produtos' },
  { id: 'customers', name: 'Clientes', description: 'Base de clientes' },
  { id: 'reports', name: 'Relatórios', description: 'Relatórios e análises' },
  { id: 'settings', name: 'Configurações', description: 'Configurações do sistema' },
  { id: 'users', name: 'Usuários', description: 'Gerenciar usuários' },
];

// Perfis pré-configurados
const PERMISSION_PROFILES = {
  admin: {
    name: 'Administrador',
    modules: ['dashboard', 'leads', 'sales', 'mercadolivre', 'products', 'customers', 'reports', 'settings', 'users']
  },
  vendedor: {
    name: 'Vendedor',
    modules: ['dashboard', 'leads', 'sales', 'mercadolivre', 'products', 'customers']
  },
  financeiro: {
    name: 'Financeiro',
    modules: ['dashboard', 'sales', 'reports']
  },
  suporte: {
    name: 'Suporte',
    modules: ['dashboard', 'customers', 'products']
  }
};

interface UserData {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  permissions: string[];
}

export default function Users() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'user',
    permissions: [] as string[]
  });

  // Carregar usuários do localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('ia_bruno_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Criar usuário admin padrão se não existir
      const defaultAdmin: UserData = {
        id: '1',
        username: 'admin',
        name: 'Administrador',
        email: 'admin@iabruno.com',
        role: 'admin',
        permissions: PERMISSION_PROFILES.admin.modules
      };
      setUsers([defaultAdmin]);
      localStorage.setItem('ia_bruno_users', JSON.stringify([defaultAdmin]));
    }
  }, []);

  const handleOpenDialog = (user?: UserData) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        permissions: user.permissions || []
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        name: '',
        email: '',
        password: '',
        role: 'user',
        permissions: []
      });
    }
    setIsDialogOpen(true);
  };

  const handleProfileChange = (profileKey: string) => {
    if (profileKey === 'custom') {
      setFormData({ ...formData, permissions: [] });
    } else {
      const profile = PERMISSION_PROFILES[profileKey as keyof typeof PERMISSION_PROFILES];
      if (profile) {
        setFormData({ ...formData, permissions: profile.modules });
      }
    }
  };

  const handlePermissionToggle = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(moduleId)
        ? prev.permissions.filter(p => p !== moduleId)
        : [...prev.permissions, moduleId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.username || !formData.name || !formData.email) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (!editingUser && !formData.password) {
      toast.error('Senha é obrigatória para novos usuários');
      return;
    }

    if (formData.permissions.length === 0) {
      toast.error('Selecione pelo menos um módulo');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email inválido');
      return;
    }

    if (editingUser) {
      // Editar usuário existente
      const updatedUsers = users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData, id: u.id }
          : u
      );
      setUsers(updatedUsers);
      localStorage.setItem('ia_bruno_users', JSON.stringify(updatedUsers));
      toast.success('Usuário atualizado com sucesso!');
    } else {
      // Criar novo usuário
      const newUser: UserData = {
        id: Date.now().toString(),
        ...formData
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('ia_bruno_users', JSON.stringify(updatedUsers));
      toast.success('Usuário criado com sucesso!');
    }

    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (userId: string) => {
    if (userId === '1') {
      toast.error('Não é possível excluir o administrador padrão');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('ia_bruno_users', JSON.stringify(updatedUsers));
      toast.success('Usuário excluído com sucesso!');
    }
  };

  const getProfileName = (permissions: string[]) => {
    for (const [key, profile] of Object.entries(PERMISSION_PROFILES)) {
      if (JSON.stringify(profile.modules.sort()) === JSON.stringify(permissions.sort())) {
        return profile.name;
      }
    }
    return 'Personalizado';
  };

  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Gerenciamento de Usuários
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Crie e gerencie usuários com permissões personalizadas
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <UserPlus className="w-4 h-4" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                </DialogTitle>
                <DialogDescription>
                  {editingUser 
                    ? 'Atualize as informações do usuário e suas permissões' 
                    : 'Preencha os dados do novo usuário e defina suas permissões'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados Básicos */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                    Dados Básicos
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="username">Usuário *</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="usuario123"
                        disabled={!!editingUser}
                      />
                    </div>

                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="João Silva"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="joao@empresa.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">
                      Senha {editingUser ? '(deixe em branco para manter)' : '*'}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Perfil de Permissões */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                    Perfil de Permissões
                  </h3>

                  <div>
                    <Label htmlFor="profile">Perfil Pré-configurado</Label>
                    <Select onValueChange={handleProfileChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">👑 Administrador (Acesso Total)</SelectItem>
                        <SelectItem value="vendedor">💼 Vendedor</SelectItem>
                        <SelectItem value="financeiro">💰 Financeiro</SelectItem>
                        <SelectItem value="suporte">🎧 Suporte</SelectItem>
                        <SelectItem value="custom">⚙️ Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3 bg-slate-50 dark:bg-slate-900">
                    <Label className="text-sm font-semibold">Módulos Permitidos *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {AVAILABLE_MODULES.map(module => (
                        <div key={module.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={module.id}
                            checked={formData.permissions.includes(module.id)}
                            onCheckedChange={() => handlePermissionToggle(module.id)}
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={module.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {module.name}
                            </label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {module.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    ✓ {formData.permissions.length} módulo(s) selecionado(s)
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabela de Usuários */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Módulos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    Nenhum usuário cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        {user.username}
                      </div>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.role === 'admin' && <Shield className="w-4 h-4 text-purple-500" />}
                        <span className="text-sm">
                          {getProfileName(user.permissions || [])}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {user.permissions?.length || 0} módulo(s)
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenDialog(user)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(user.id)}
                          disabled={user.id === '1'}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </CRMLayout>
  );
}
