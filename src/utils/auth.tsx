import {authService} from "@/api/auth.service";

export async function requireAuth(_request: Request) {
  const res = await authService.verifySession();
  return res.data; // Return user info if needed
}

export function setAuthCookie(token: string) {
  document.cookie = `auth_token=${token}; path=/; max-age=86400`; // 24 hours
}
