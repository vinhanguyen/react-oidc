import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { handleAuthResp } from "./oidc";
import { useSetToken } from "./TokenProvider";

export default function Callback() {
  const {id_token}: any = useLoaderData();
  const setToken = useSetToken();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(id_token);
    navigate(localStorage.getItem('location') || '/');
  }, [id_token]);

  return null;
}

export function loader() {
  const id_token = handleAuthResp();
  return {id_token};
}
