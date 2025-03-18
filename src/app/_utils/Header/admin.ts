export const issuanceAdminToken = async () => {
  try {
    const res = await fetch('/api/auth/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (res.ok) {
      return true;
    }
    throw new Error();
  } catch {
    return false;
  }
};

export const delAdminToken = async () => {
  try {
    const res = await fetch('/api/auth/admin', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      return true;
    }
    throw new Error();
  } catch {
    return false;
  }
};

export const checkAdminToken = async () => {
  try {
    const res = await fetch('/api/auth/admin', {
      method: 'GET',
      credentials: 'include',
    });

    if (res.ok) {
      return true;
    }
    throw new Error();
  } catch {
    return false;
  }
};
