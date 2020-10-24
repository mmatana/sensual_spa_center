export const tokenConfig = getState => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const token = getState().auth.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
