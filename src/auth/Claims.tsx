import { decodeJwt } from "jose";
import { useToken } from "./TokenProvider";

export default function Claims() {
  const token = useToken();

  let claims: any = {};
  
  if (token) {
    claims = decodeJwt(token);
  }

  return (
    <>
      {token ? (
        <>
          <table border={1}>
            <thead>
              <tr>
                <th>Claim</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(claims).map(([name, value]: any) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{name === 'exp' ? `${value} (${(new Date(value*1000)).toLocaleTimeString()})` : value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No token</p>
      )}
    </>
  );
}
