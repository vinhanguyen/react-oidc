import { decodeJwt } from "jose";
import { nanoid } from "nanoid";
import { config } from "./oidc.config";

export function sendAuthReq() {
  localStorage.removeItem('token');

  const {pathname} = new URL(window.location.href);
  localStorage.setItem('location', pathname);

  const nonce = nanoid();
  localStorage.setItem('nonce', nonce);

  const {authorization_endpoint, client_id, response_type, scope, redirect_uri} = config;
  const params = new URLSearchParams({client_id, response_type, scope, redirect_uri, nonce}).toString();
  const {href} = new URL(`${authorization_endpoint}?${params}`);
  
  window.location.href = href;
}

export function handleAuthResp() {
  const {hash} = new URL(window.location.href);
  if (!hash) {
    throw new Error('No fragment');
  }
  const fragment = new URLSearchParams(hash.substring(1));

  const id_token = fragment.get('id_token');
  if (!id_token) {
    throw new Error('No id_token');
  }
  
  const {nonce: received} = decodeJwt(id_token);
  const sent = localStorage.getItem('nonce');
  if (sent !== received) {
    throw new Error('Nonce mismatch');
  }

  return id_token;
}
