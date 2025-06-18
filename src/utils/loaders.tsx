export async function loadEquipment() {
  const res = await fetch('http://192.168.1.100:3000/visitor/get_equipment');
  if (!res.ok) {
    throw new Error('Failed to load equipment');
  }
  return res.json();
  }