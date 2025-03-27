'use client';

import useAuthStore from '@/_store/auth/useAuth';

const AdminTitle = () => {
  const role = useAuthStore((store) => store.state.role);
  return <>{role === 'admin' && <span className="text-base font-medium">Admin</span>}</>;
};

export default AdminTitle;
