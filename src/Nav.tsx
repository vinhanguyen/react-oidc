import { NavLink } from "react-router-dom";
import { sendAuthReq } from "./auth/oidc";
import { useSetToken, useToken } from "./auth/TokenProvider";
import styles from './Nav.module.css';

export default function Nav() {
  const token = useToken();
  const setToken = useSetToken();

  function login() {
    sendAuthReq();
  }

  function logout() {
    setToken(null);
  }

  return (
    <ul className={styles.nav}>
      <li>
        <NavLink 
          to={'/'} 
          className={({isActive}) => isActive ? styles.active : ''}
        >
          App
        </NavLink>
      </li>
      <li>
        <NavLink 
          to={'/token/claims'} 
          className={({isActive}) => isActive ? styles.active : ''}
        >
          Claims
        </NavLink>
      </li>
      <li>
        <NavLink 
          to={'/fetch'} 
          className={({isActive}) => isActive ? styles.active : ''}
        >
          Fetch
        </NavLink>
      </li>
      <li>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </li>
    </ul>
  );
}
