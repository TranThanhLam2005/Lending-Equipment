import { redirect } from "react-router-dom";

const URL_API = '192.168.1.127';


export async function requireAuth(request) {
  const res = await fetch(`http://${URL_API}:3000/auth/verify-session`, {
    method: 'GET',
    credentials: "include",
  });

  if (!res.ok) {
    throw redirect('/');
  }

  return await res.json(); // Return user info if needed
}
