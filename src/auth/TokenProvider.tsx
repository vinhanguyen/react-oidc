import { decodeJwt } from "jose";
import { createContext, useContext, useEffect, useState } from "react";
import { sendAuthReq } from "./oidc";

export const TokenContext = createContext<null|string>(null);
export const SetTokenContext = createContext((token: null|string) => {});

export default function TokenProvider({children}: any) {
  const [token, setToken] = useState<null|string>(null);

  // restore token from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      const {exp} = decodeJwt(stored);
      if (exp && exp*1000 > Date.now()) {
        setToken(stored);
      }
    }
  }, []);

  // sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // schedule auth when token expires
  useEffect(() => {
    if (token) {
      const {exp} = decodeJwt(token);
      if (exp) {
        const expiresIn = exp*1000-Date.now();
        const id = setTimeout(sendAuthReq, expiresIn);
        return () => clearTimeout(id);
      }
    }
  }, [token]);

  return (
    <TokenContext.Provider value={token}>
      <SetTokenContext.Provider value={setToken}>
        {children}
      </SetTokenContext.Provider>
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}

export function useSetToken() {
  return useContext(SetTokenContext);
}
