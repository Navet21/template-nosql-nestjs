
interface SeedUser {
  email: string;
  fullName: string;
  password: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'admin@login.com',
      fullName: 'Admin Administrador',
      password: '1234Wasd!',
      roles: ['admin'],
    },
    {
      email: 'test1@login.com',
      fullName: 'Tester Primero',
      password: '1234Wasd!',
      roles: ['user'],
    },
    {
      email: 'tes2@login.com',
      fullName: 'Tester Segundo',
      password: '1234Wasd!',
      roles: ['user'],
    },
    {
      email: 'superUser@login.com',
      fullName: 'Super Usuario',
      password: '1234Wasd!',
      roles: ['super-user'],
    },
  ],
};
