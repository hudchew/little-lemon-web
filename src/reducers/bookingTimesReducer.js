export const defaultTimes = [
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

function getFetchAPI() {
  return typeof window !== 'undefined' && window.fetchAPI ? window.fetchAPI : null;
}

export function initializeTimes() {
  const fetchAPI = getFetchAPI();
  if (fetchAPI) {
    return fetchAPI(new Date());
  }
  return defaultTimes;
}

export function updateTimes(state, action) {
  const fetchAPI = getFetchAPI();
  if (fetchAPI && action) {
    const date = typeof action === 'string' ? new Date(action) : action;
    return fetchAPI(date);
  }
  return state;
}
