const getUserInfo = async () => {
  try {
    const res = await fetch('/api/auth/info', {
      method: 'GET',
    });

    const data = await res.json();
    console.log('User Info:', data);
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

export default getUserInfo;
