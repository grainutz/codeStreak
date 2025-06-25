export const getProgress = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/progress', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch progress');
  return res.json();
};

export const updateProgress = async (progressData: any) => {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/progress/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(progressData),
  });
  return res.json();
};
