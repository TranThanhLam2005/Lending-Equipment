
import { requireAuth } from './auth';
const API_URL = "192.168.1.12"


export async function loadEquipment() {
  const res = await fetch(`http://${API_URL}:3000/visitor/get_equipment`);
  if (!res.ok) {
    throw new Error('Failed to load equipment');
  }
  return res.json();
}


export async function studentDashboardLoader({ request }) {
  await requireAuth(request);
  return null;
}
export async function myStudentCourseLoader({ request }) {
  await requireAuth(request);
  const res = await fetch(`http://${API_URL}:3000/user/get_participant_courses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to load courses');
  }
  return res.json();
}

export async function myStudentCourseDetailLoader({request, params}) {
  const { id } = params; // Extract the id from the route parameters
  await requireAuth(request);
  const res = await fetch(`http://${API_URL}:3000/user/get_participant_course_detail/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to load course details');
  }
  return res.json();
}

export async function myStudentEquipmentParticipant({ request }) {
  await requireAuth(request);
  const res = await fetch(`http://${API_URL}:3000/user/get_participant_equipment`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to load equipment');
  }
  return res.json();
}