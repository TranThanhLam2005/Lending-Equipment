// utils/auth.js
import { redirect } from 'react-router-dom';
export async function verifyTokenWithServer(token) {
    // Simulate a server-side token verification
    // Replace this with actual API call to your backend
    
}
export async function requireAuth(request) {
    const token = request.headers.get('Cookie') // or use cookies/session
    if (!token) {
      throw redirect('/login');
    }
  
    // Optional: validate token with backend
    const isValid = await verifyTokenWithServer(token);
    if (!isValid) {
      throw redirect('/login');
    }
  
    return true;
  }
  