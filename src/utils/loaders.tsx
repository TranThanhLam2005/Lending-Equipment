
import { requireAuth } from './auth';

export async function loadEquipment({ request }: { request: Request }) {
  await requireAuth(request);
  const res = await fetch('http://192.168.1.100:3000/visitor/get_equipment');
  if (!res.ok) {
    throw new Error('Failed to load equipment');
  }
  return res.json();
  }