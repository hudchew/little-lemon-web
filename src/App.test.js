import { initializeTimes, updateTimes } from './reducers/bookingTimesReducer';

describe('bookingTimesReducer with fetchAPI', () => {
  const mockFetchAPI = jest.fn();

  beforeEach(() => {
    mockFetchAPI.mockClear();
    window.fetchAPI = mockFetchAPI;
  });

  afterEach(() => {
    delete window.fetchAPI;
  });

  test('initializeTimes returns the value from fetchAPI', () => {
    const availableTimes = ['17:00', '18:30', '19:00', '21:00'];
    mockFetchAPI.mockReturnValue(availableTimes);

    const result = initializeTimes();

    expect(mockFetchAPI).toHaveBeenCalledWith(expect.any(Date));
    expect(result).toEqual(availableTimes);
    expect(result.length).toBeGreaterThan(0);
  });

  test('updateTimes returns fetchAPI result for the selected date', () => {
    const state = ['17:00', '18:00', '19:00'];
    const selectedDate = '2025-02-15';
    const availableTimesForDate = ['17:30', '19:00', '20:30'];
    mockFetchAPI.mockReturnValue(availableTimesForDate);

    const result = updateTimes(state, selectedDate);

    expect(mockFetchAPI).toHaveBeenCalledWith(new Date(selectedDate));
    expect(result).toEqual(availableTimesForDate);
    expect(result).not.toBe(state);
  });
});
