import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const res = await fetch('http://192.168.1.8:3000/auth/verify-session', {
    method: 'GET',
    credentials: "include",
  });

  if (!res.ok) {
    throw redirect('/login');
  }

  return await res.json(); // Return user info if needed
}
