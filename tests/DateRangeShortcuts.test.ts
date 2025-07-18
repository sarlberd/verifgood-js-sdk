import { DateRangeShortcuts, dateRangeShortcuts } from '../src/utils/DateRangeShortcuts';

describe('DateRangeShortcuts', () => {
  let service: DateRangeShortcuts;

  beforeEach(() => {
    service = new DateRangeShortcuts();
  });

  describe('setDateShortcutSelected and getDateShortcutSelected', () => {
    it('should set and get date shortcut selected', () => {
      const shortcut = 'Aujourd\'hui';
      service.setDateShortcutSelected(shortcut);
      expect(service.getDateShortcutSelected()).toBe(shortcut);
    });
  });

  describe('useRangeDate', () => {
    let input: { value: [Date, Date] | null };

    beforeEach(() => {
      input = { value: null };
    });

    it('should set range for "Aujourd\'hui" shortcut', () => {
      service.setDateShortcutSelected('Aujourd\'hui');
      service.useRangeDate(input);
      
      expect(input.value).not.toBeNull();
      expect(input.value).toHaveLength(2);
      
      const [start, end] = input.value!;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      expect(start.toDateString()).toBe(yesterday.toDateString());
      expect(end.toDateString()).toBe(tomorrow.toDateString());
    });

    it('should set range for "Hier" shortcut', () => {
      service.setDateShortcutSelected('Hier');
      service.useRangeDate(input);
      
      expect(input.value).not.toBeNull();
      expect(input.value).toHaveLength(2);
      
      const [start, end] = input.value!;
      const today = new Date();
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      
      expect(start.toDateString()).toBe(twoDaysAgo.toDateString());
      expect(end.toDateString()).toBe(yesterday.toDateString());
    });

    it('should set range for "Cette semaine" shortcut', () => {
      service.setDateShortcutSelected('Cette semaine');
      service.useRangeDate(input);
      
      expect(input.value).not.toBeNull();
      expect(input.value).toHaveLength(2);
      
      const [start, end] = input.value!;
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      expect(start.toDateString()).toBe(startOfWeek.toDateString());
      expect(end.toDateString()).toBe(tomorrow.toDateString());
    });

    it('should set range for "La semaine derniere" shortcut', () => {
      service.setDateShortcutSelected('La semaine derniere');
      service.useRangeDate(input);
      
      expect(input.value).not.toBeNull();
      expect(input.value).toHaveLength(2);
      
      const [start, end] = input.value!;
      expect(start).toBeInstanceOf(Date);
      expect(end).toBeInstanceOf(Date);
      expect(start.getTime()).toBeLessThan(end.getTime());
    });

    it('should set range for "Le mois dernier" shortcut', () => {
      service.setDateShortcutSelected('Le mois dernier');
      service.useRangeDate(input);
      
      expect(input.value).not.toBeNull();
      expect(input.value).toHaveLength(2);
      
      const [start, end] = input.value!;
      const today = new Date();
      const expectedStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const expectedEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      
      expect(start.toDateString()).toBe(expectedStart.toDateString());
      expect(end.toDateString()).toBe(expectedEnd.toDateString());
    });

    it('should set range for "les 7 derniers jours" shortcut', () => {
      service.setDateShortcutSelected('les 7 derniers jours');
      service.useRangeDate(input);
      
      expect(input.value).not.toBeNull();
      expect(input.value).toHaveLength(2);
      
      const [start, end] = input.value!;
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      expect(start.toDateString()).toBe(sevenDaysAgo.toDateString());
      expect(end.toDateString()).toBe(tomorrow.toDateString());
    });

    it('should set range for "les 30 derniers jours" shortcut', () => {
      service.setDateShortcutSelected('les 30 derniers jours');
      service.useRangeDate(input);
      
      expect(input.value).not.toBeNull();
      expect(input.value).toHaveLength(2);
      
      const [start, end] = input.value!;
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      expect(start.toDateString()).toBe(thirtyDaysAgo.toDateString());
      expect(end.toDateString()).toBe(tomorrow.toDateString());
    });

    it('should set value to null for "Choisir une plage de date" shortcut', () => {
      service.setDateShortcutSelected('Choisir une plage de date');
      service.useRangeDate(input);
      
      expect(input.value).toBeNull();
    });

    it('should set value to null for unknown shortcut', () => {
      service.setDateShortcutSelected('Unknown shortcut');
      service.useRangeDate(input);
      
      expect(input.value).toBeNull();
    });

    it('should set value to null for empty shortcut', () => {
      service.setDateShortcutSelected('');
      service.useRangeDate(input);
      
      expect(input.value).toBeNull();
    });
  });

  describe('getLogicComparatorDateRange', () => {
    it('should return a date comparator configuration', () => {
      const comparator = service.getLogicComparatorDateRange();
      
      expect(comparator).toHaveProperty('filter', 'date');
      expect(comparator).toHaveProperty('filterParams');
      expect(comparator.filterParams).toHaveProperty('comparator');
      expect(typeof comparator.filterParams.comparator).toBe('function');
    });

    it('should return 0 for comparator function (incomplete logic)', () => {
      const comparator = service.getLogicComparatorDateRange();
      const result = comparator.filterParams.comparator('2023-01-01', '2023-01-01');
      
      expect(result).toBe(0);
    });
  });

  describe('isInRange', () => {
    it('should return true when date is within range', () => {
      const startDate = new Date('2023-01-01');
      const currentDate = new Date('2023-01-15');
      const endDate = new Date('2023-01-31');
      
      const result = service.isInRange(startDate, currentDate, endDate);
      
      expect(result).toBe(true);
    });

    it('should return false when date is before range', () => {
      const startDate = new Date('2023-01-01');
      const currentDate = new Date('2022-12-31');
      const endDate = new Date('2023-01-31');
      
      const result = service.isInRange(startDate, currentDate, endDate);
      
      expect(result).toBe(false);
    });

    it('should return false when date is after range', () => {
      const startDate = new Date('2023-01-01');
      const currentDate = new Date('2023-02-01');
      const endDate = new Date('2023-01-31');
      
      const result = service.isInRange(startDate, currentDate, endDate);
      
      expect(result).toBe(false);
    });

    it('should return false when currentDate is null', () => {
      const startDate = new Date('2023-01-01');
      const currentDate = null;
      const endDate = new Date('2023-01-31');
      
      const result = service.isInRange(startDate, currentDate as any, endDate);
      
      expect(result).toBe(false);
    });

    it('should work with string dates', () => {
      const result = service.isInRange('2023-01-01', '2023-01-15', '2023-01-31');
      
      expect(result).toBe(true);
    });
  });

  describe('addLogicComparatorOnGridDefinitionColumn', () => {
    it('should add date comparison logic to column definition', () => {
      const columnDef: any = {};
      
      service.addLogicComparatorOnGridDefinitionColumn(columnDef);
      
      expect(columnDef).toHaveProperty('filter', 'date');
      expect(columnDef).toHaveProperty('filterParams');
      expect(columnDef.filterParams).toHaveProperty('comparator');
      expect(typeof columnDef.filterParams.comparator).toBe('function');
    });

    it('should return 0 for empty cell value', () => {
      const columnDef: any = {};
      service.addLogicComparatorOnGridDefinitionColumn(columnDef);
      
      const result1 = columnDef.filterParams.comparator(new Date('2023-01-01'), '');
      const result2 = columnDef.filterParams.comparator(new Date('2023-01-01'), null);
      
      expect(result1).toBe(0);
      expect(result2).toBe(0);
    });

    it('should return -1 when cell value is less than filter', () => {
      const columnDef: any = {};
      service.addLogicComparatorOnGridDefinitionColumn(columnDef);
      
      const filterDate = new Date('2023-01-15');
      const cellValue = '2023-01-10';
      
      const result = columnDef.filterParams.comparator(filterDate, cellValue);
      
      expect(result).toBe(-1);
    });

    it('should return 1 when cell value is greater than filter', () => {
      const columnDef: any = {};
      service.addLogicComparatorOnGridDefinitionColumn(columnDef);
      
      const filterDate = new Date('2023-01-15');
      const cellValue = '2023-01-20';
      
      const result = columnDef.filterParams.comparator(filterDate, cellValue);
      
      expect(result).toBe(1);
    });

    it('should return 0 when cell value equals filter', () => {
      const columnDef: any = {};
      service.addLogicComparatorOnGridDefinitionColumn(columnDef);
      
      const filterDate = new Date('2023-01-15');
      const cellValue = '2023-01-15';
      
      const result = columnDef.filterParams.comparator(filterDate, cellValue);
      
      expect(result).toBe(0);
    });
  });

  describe('static methods', () => {
    it('should return available shortcuts', () => {
      const shortcuts = DateRangeShortcuts.getAvailableShortcuts();
      
      expect(shortcuts).toEqual([
        'Aujourd\'hui',
        'Hier',
        'Cette semaine',
        'La semaine derniere',
        'Le mois dernier',
        'les 7 derniers jours',
        'les 30 derniers jours',
        'Choisir une plage de date'
      ]);
    });
  });

  describe('singleton instance', () => {
    it('should provide a singleton instance', () => {
      expect(dateRangeShortcuts).toBeInstanceOf(DateRangeShortcuts);
    });

    it('should use the same instance', () => {
      const instance1 = dateRangeShortcuts;
      const instance2 = dateRangeShortcuts;
      
      expect(instance1).toBe(instance2);
    });
  });
});
