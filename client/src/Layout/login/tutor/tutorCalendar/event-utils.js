export let eventGuid = 0
export let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    color: '#FF4141'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    color: '#FF4141'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T24:00:00',
    color: '#FF4141'
  }
]

export function createEventId() {
  return String(eventGuid++)
}
