export function formatISODateToLocalDate(date: Date) {
  const [actualDate, time] = date.toString().split('T');
  const [year, month, day] = actualDate.split('-');
  const [hours, minutes] = time.split(':');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
