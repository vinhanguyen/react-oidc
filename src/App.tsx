import { sendAuthReq } from './auth/oidc';
import { useSetToken, useToken } from './auth/TokenProvider';

export default function App() {
  const token = useToken();
  const setToken = useSetToken();

  function login() {
    sendAuthReq();
  }

  function logout() {
    setToken(null);
  }

  return (
    <div>
      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
