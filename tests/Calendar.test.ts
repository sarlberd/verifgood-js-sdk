import { Calendar } from '../src/apiRequests/Calendar';
import { Auth } from '../src/core/Auth';
import { Metadatas } from '../src/core/Metadatas';
import { CalendaCreateRequest, CalendaUpdateRequest, CalendarEvent } from '../src/types/Calendar';

describe('Calendar API Service', () => {
  const mockAuth = new Auth({ apiBaseUrl: 'https://api.example.com', apiKey: 'test-api-key' });
  const calendar = new Calendar(mockAuth, 'https://api.example.com');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize endpoints correctly', () => {
      expect(calendar.endpoint).toBe('/api/calendars');
      expect(calendar.endpointSingleton).toBe('/api/calendars');
    });

    it('should inherit from ApiRequest with correct auth and apiBaseUrl', () => {
      expect(calendar.auth).toBe(mockAuth);
      expect(calendar.apiBaseUrl).toBe('https://api.example.com');
    });
  });

  describe('getEvents', () => {
    it('should get calendar events with filters', async () => {
      const mockResponse = {
        interventions: [
          { type: 'intervention', start: '2025-01-01', end: '2025-01-02', data: { id: 1 } }
        ],
        maintenances: [
          { type: 'maintenance', start: '2025-01-03', end: '2025-01-04', data: { id: 2 } }
        ]
      };

      jest.spyOn(calendar, 'get').mockResolvedValue(mockResponse);

      const result = await calendar.getEvents('2025-01-01', '2025-01-31', 'site1', 'tier1', ['user1']);

      expect(calendar.get).toHaveBeenCalledWith('/api/calendars/events', expect.any(Metadatas), {});
      expect(result.events).toHaveLength(2);
      expect(result.events[0]).toEqual({
        calendarId: 'intervention',
        category: 'time',
        start: '2025-01-01',
        end: '2025-01-02',
        id: 1,
        isAllDay: false,
        raw: { id: 1 }
      });
    });
  });

  describe('formatEvents', () => {
    it('should format events correctly', () => {
      const rawEvents = {
        interventions: [
          { type: 'intervention', start: '2025-01-01', end: '2025-01-02', data: { id: 1, title: 'Test' } }
        ],
        maintenances: [
          { type: 'maintenance', start: '2025-01-03', end: '2025-01-04', data: { id: 2, title: 'Maintenance' } }
        ]
      };

      const formatted = calendar.formatEvents(rawEvents);

      expect(formatted).toHaveLength(2);
      expect(formatted[0]).toEqual({
        calendarId: 'intervention',
        category: 'time',
        start: '2025-01-01',
        end: '2025-01-02',
        id: 1,
        isAllDay: false,
        raw: { id: 1, title: 'Test' }
      });
      expect(formatted[1]).toEqual({
        calendarId: 'maintenance',
        category: 'time',
        start: '2025-01-03',
        end: '2025-01-04',
        id: 2,
        isAllDay: false,
        raw: { id: 2, title: 'Maintenance' }
      });
    });

    it('should handle empty events object', () => {
      const formatted = calendar.formatEvents({});
      expect(formatted).toEqual([]);
    });
  });

});
