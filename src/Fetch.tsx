import { useState } from "react";
import { useToken } from "./auth/TokenProvider";

export default function Fetch() {
  const token = useToken();
  const [url, setUrl] = useState('');
  const [value, setValue] = useState('');

  async function handleClick() {
    if (token) {
      const json = await get(url, token);
      setValue(JSON.stringify(json));
    }
  }

  return (
    <>
      <div>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
        <button onClick={handleClick} disabled={!token || !url}>Get</button>
      </div>
      <div>
        <textarea value={value} readOnly rows={10} cols={50}></textarea>
      </div>
    </>
  );
}

async function get(url: string, token: string) {
  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return resp.json();
}
