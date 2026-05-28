export function transitDuration(departure: string, arrival: string): string {
  const mins = (new Date(arrival).getTime() - new Date(departure).getTime()) / 60000;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function transitFormatTime(iso: string): string {
  return iso.substring(11, 16);
}

export function transitFormatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function transitSeatColorClass(seats: number): string {
  if (seats < 10) return 'text-danger';
  if (seats < 20) return 'text-warning';
  return 'text-muted';
}
