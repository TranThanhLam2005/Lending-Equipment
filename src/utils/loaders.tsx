
import { requireAuth } from './auth';

const API_URL = "http://192.168.1.8:3000/"


export async function loadEquipment() {
  const res = await fetch(`${API_URL}visitor/get_equipment`);
  if (!res.ok) {
    throw new Error('Failed to load equipment');
  }
  return res.json();
}

export async function studentDashboardLoader({ request }) {
  await requireAuth(request);
  return null;
}

export async function studentCourseLoader({ request }) {
  await requireAuth(request);
  return null;
}
