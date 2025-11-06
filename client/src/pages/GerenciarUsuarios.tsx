import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, UserPlus, Edit, Trash2, Shield, User as UserIcon, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  role: string;
}

export default function GerenciarUsuarios() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  // Estado para adicionar/editar usuário
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'user'
  });
  const [formError, setFormError] = useState('');

  // Estado para confirmação de exclusão
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Carregar usuários do localStorage
  useEffect(() => {
    loadUsers();
  }, []);

  // Filtrar usuários quando search ou role filter mudar
  useEffect(() => {
    filterUsers();
  }, [searchTerm, roleFilter, users]);

  const loadUsers = () => {
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

    setUsers(allUsers);
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      password: '',
      name: '',
      email: '',
      role: 'user'
    });
    setFormError('');
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: user.password,
      name: user.name,
      email: user.email,
      role: user.role
    });
    setFormError('');
    setDialogOpen(true);
  };

  const handleSaveUser = () => {
    // Validação
    if (!formData.username || !formData.password || !formData.name || !formData.email) {
      setFormError('Preencha todos os campos');
      return;
    }

    // Verificar se username ou email já existem (exceto se estiver editando o mesmo usuário)
    const existingUser = users.find(u =>
      (u.username === formData.username || u.email === formData.email) &&
      u.id !== editingUser?.id
    );

    if (existingUser) {
      setFormError('Usuário ou e-mail já cadastrado');
      return;
    }

    if (editingUser) {
      // Editar usuário existente
      const updatedUsers = users.map(u =>
        u.id === editingUser.id
          ? { ...u, ...formData }
          : u
      );

      // Atualizar localStorage (apenas usuários não-default)
      const savedUsers = updatedUsers.filter(u => u.id !== '1' && u.id !== '2');
      localStorage.setItem('ia_bruno_users', JSON.stringify(savedUsers));

      setUsers(updatedUsers);
      toast.success('Usuário atualizado com sucesso!');
    } else {
      // Adicionar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        ...formData
      };

      const savedUsersStr = localStorage.getItem('ia_bruno_users');
      const savedUsers = savedUsersStr ? JSON.parse(savedUsersStr) : [];
      savedUsers.push(newUser);
      localStorage.setItem('ia_bruno_users', JSON.stringify(savedUsers));

      setUsers([...users, newUser]);
      toast.success('Usuário criado com sucesso!');
    }

    setDialogOpen(false);
  };

  const handleDeleteClick = (user: User) => {
    // Não permitir excluir usuários default
    if (user.id === '1' || user.id === '2') {
      toast.error('Não é possível excluir usuários padrão do sistema');
      return;
    }

    // Não permitir excluir a si mesmo
    if (user.id === currentUser?.id) {
      toast.error('Você não pode excluir sua própria conta');
      return;
    }

    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    // Remover do localStorage
    const savedUsersStr = localStorage.getItem('ia_bruno_users');
    if (savedUsersStr) {
      const savedUsers = JSON.parse(savedUsersStr);
      const updatedUsers = savedUsers.filter((u: User) => u.id !== userToDelete.id);
      localStorage.setItem('ia_bruno_users', JSON.stringify(updatedUsers));
    }

    // Atualizar estado
    setUsers(users.filter(u => u.id !== userToDelete.id));
    toast.success('Usuário removido com sucesso!');
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Verificar se usuário atual é admin
  if (currentUser?.role !== 'admin') {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você não tem permissão para acessar esta página. Apenas administradores podem gerenciar usuários.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Usuários</h1>
          <p className="text-muted-foreground mt-1">
            Adicione, edite ou remova contas de usuários do sistema
          </p>
        </div>
        <Button onClick={handleAddUser} className="gap-2">
          <UserPlus className="w-4 h-4" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold">{users.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Administradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-purple-500" />
              <span className="text-3xl font-bold">{users.filter(u => u.role === 'admin').length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usuários Comuns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <UserIcon className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold">{users.filter(u => u.role === 'user').length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome, usuário ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="role">Perfil</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="admin">Administradores</SelectItem>
                  <SelectItem value="user">Usuários</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados</CardTitle>
          <CardDescription>
            {filteredUsers.length} {filteredUsers.length === 1 ? 'usuário encontrado' : 'usuários encontrados'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Nome</th>
                  <th className="text-left p-3 font-medium">Usuário</th>
                  <th className="text-left p-3 font-medium">E-mail</th>
                  <th className="text-left p-3 font-medium">Perfil</th>
                  <th className="text-right p-3 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{user.username}</td>
                    <td className="p-3 text-muted-foreground">{user.email}</td>
                    <td className="p-3">
                      {user.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500">
                          <Shield className="w-3 h-3" />
                          Administrador
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                          <UserIcon className="w-3 h-3" />
                          Usuário
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(user)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Nenhum usuário encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog Adicionar/Editar Usuário */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? 'Modifique as informações do usuário abaixo'
                : 'Preencha os dados do novo usuário'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {formError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="form-name">Nome Completo</Label>
              <Input
                id="form-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="João Silva"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-username">Usuário</Label>
              <Input
                id="form-username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="joao.silva"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-email">E-mail</Label>
              <Input
                id="form-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="joao@empresa.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-password">Senha</Label>
              <Input
                id="form-password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-role">Perfil</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger id="form-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveUser}>
              <CheckCircle className="w-4 h-4 mr-2" />
              {editingUser ? 'Salvar Alterações' : 'Criar Usuário'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Confirmação de Exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover o usuário <strong>{userToDelete?.name}</strong>?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Confirmar Exclusão
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
