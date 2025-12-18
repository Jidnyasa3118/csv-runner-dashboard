export function calculateMetrics(data: any[]) {
  if (!data.length) return null;

  const miles = data.map(d => d.miles);

  return {
    average: (miles.reduce((a, b) => a + b, 0) / miles.length).toFixed(2),
    min: Math.min(...miles),
    max: Math.max(...miles),
  };
}

export function getLeaderboard(data: any[]) {
  const totals: Record<string, number> = {};

  data.forEach((row) => {
    totals[row.person] = (totals[row.person] || 0) + row.miles;
  });

  return Object.entries(totals).map(([person, total]) => ({
    person,
    total: Number(total.toFixed(2)),
  }));
}

