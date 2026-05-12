import { Metadatas } from '../src/core/Metadatas';

describe('Metadatas Class', () => {
  describe('Constructor', () => {
    it('should initialize with default values when no arguments are provided', () => {
      const metadata = new Metadatas();
      expect(metadata.name).toBeNull();
      expect(metadata.filters).toEqual({});
      expect(metadata.directives).toEqual([]);
      expect(metadata.counters).toEqual({ All: 0 });
      expect(metadata.columns).toEqual({});
    });

    it('should initialize with a name when provided', () => {
      const metadata = new Metadatas('TestName');
      expect(metadata.name).toBe('TestName');
    });
  });

  describe('Filters', () => {
    it('should add a filter using setFilter', () => {
      const metadata = new Metadatas();
      metadata.setFilter('filter1', 'value1');
      expect(metadata.filters['filter1']).toEqual({
        attr: 'filter1',
        colId: 'filter1',
        value: 'value1',
        action: 'equals',
      });
    });

    it('should check if a filter exists using filterExist', () => {
      const metadata = new Metadatas();
      metadata.setFilter('filter1', 'value1');
      expect(metadata.filterExist('filter1')).toBe(true);
      expect(metadata.filterExist('filter2')).toBe(false);
    });

    it('should delete a filter using deleteFilter', () => {
      const metadata = new Metadatas();
      metadata.setFilter('filter1', 'value1');
      metadata.deleteFilter('filter1');
      expect(metadata.filters['filter1']).toBeUndefined();
    });

    it('should clear all filters using clearAllFilters', () => {
      const metadata = new Metadatas();
      metadata.setFilter('filter1', 'value1');
      metadata.setFilter('filter2', 'value2');
      metadata.clearAllFilters();
      expect(metadata.filters).toEqual({});
    });
  });

  describe('setFilter', () => {
    it('should overwrite an existing filter with the same name', () => {
      const metadata = new Metadatas();
      metadata.setFilter('filter1', 'value1');
      metadata.setFilter('filter1', 'newValue');
      expect(metadata.filters['filter1'].value).toBe('newValue');
    });
  });

  describe('getFilterValue and getFilterAction', () => {
    it('should return the correct value and action for a filter', () => {
      const metadata = new Metadatas();
      metadata.setFilter('filter1', 'value1', 'equals');
      expect(metadata.getFilterValue('filter1')).toBe('value1');
      expect(metadata.getFilterAction('filter1')).toBe('equals');
    });

    it('should throw an error if the filter does not exist', () => {
      const metadata = new Metadatas();
      expect(() => metadata.getFilterValue('nonExistentFilter')).toThrow();
      expect(() => metadata.getFilterAction('nonExistentFilter')).toThrow();
    });
  });

  describe('Directives', () => {
    it('should set a limit directive using setLimit', () => {
      const metadata = new Metadatas();
      metadata.setLimit(10, 20);
      expect(metadata.directives).toEqual([
        { name: 'LIMIT', offset: 10, limit: 20 },
      ]);
    });

    it('should check if a limit directive is set using isLimitSet', () => {
      const metadata = new Metadatas();
      expect(metadata.isLimitSet()).toBe(false);
      metadata.setLimit(10, 20);
      expect(metadata.isLimitSet()).toBe(true);
    });
  });

  describe('setDirectives', () => {
    it('should overwrite existing directives with the same name', () => {
      const metadata = new Metadatas();
      metadata.setDirectives([{ name: 'LIMIT', offset: 0, limit: 10 }]);
      metadata.setDirectives([{ name: 'LIMIT', offset: 5, limit: 15 }]);
      expect(metadata.directives).toEqual([{ name: 'LIMIT', offset: 5, limit: 15 }]);
    });

    it('should handle an empty array of directives', () => {
      const metadata = new Metadatas();
      metadata.setDirectives([]);
      expect(metadata.directives).toEqual([]);
    });
  });

  describe('Counters', () => {
    it('should get a counter value using getCounter', () => {
      const metadata = new Metadatas();
      expect(metadata.getCounter('All')).toBe(0);
    });

    it('should set counters using setCounters', () => {
      const metadata = new Metadatas();
      metadata.setCounters({ All: 5, New: 10 });
      expect(metadata.counters).toEqual({ All: 5, New: 10 });
    });
  });

  describe('Name', () => {
    it('should set and get the name using setName and getName', () => {
      const metadata = new Metadatas();
      metadata.setName('NewName');
      expect(metadata.getName()).toBe('NewName');
    });

    it('should check if the metadata is storable using isStorable', () => {
      const metadata = new Metadatas();
      expect(metadata.isStorable()).toBe(false);
      metadata.setName('StorableName');
      expect(metadata.isStorable()).toBe(true);
    });
  });

  describe('setFiltersFromArray', () => {
    it('should clear all filters when an empty array is provided', () => {
      const metadata = new Metadatas();
      metadata.setFilter('filter1', 'value1');
      metadata.setFiltersFromArray([]);
      expect(metadata.filters).toEqual({});
    });

    it('should set filters correctly from an array', () => {
      const metadata = new Metadatas();
      const filtersArray = [
        { attr: 'filter1', colId: 'filter1', value: 'value1', action: 'equals' },
        { attr: 'filter2', colId: 'filter2', value: 'value2', action: 'not_equals' },
      ];
      metadata.setFiltersFromArray(filtersArray);
      expect(metadata.filters).toEqual({
        filter1: filtersArray[0],
        filter2: filtersArray[1],
      });
    });
  });

  describe('get', () => {
    it('should remove filters with empty values and return the formatted object', () => {
      const metadata = new Metadatas();
      metadata.setFilter('filter1', 'value1');
      metadata.setFilter('filter2', '');
      const result = metadata.get();
      expect(result.filters).toEqual([
        { attr: 'filter1', colId: 'filter1', value: 'value1', action: 'equals' },
      ]);
      expect(result.directives).toEqual([]);
      expect(result.columns).toEqual({});
    });
  });

  describe('hasStoredFilterEqualsTo', () => {
    it('should return true if the stored filters match the given filters', () => {
      const metadata = new Metadatas();
      const filters = {
        filter1: { attr: 'filter1', colId: 'filter1', value: 'value1', action: 'equals' },
      };
      metadata.setFilters(filters);
      expect(metadata.hasStoredFilterEqualsTo(filters)).toBe(true);
    });

    it('should return false if the stored filters do not match the given filters', () => {
      const metadata = new Metadatas();
      const filters = {
        filter1: { attr: 'filter1', colId: 'filter1', value: 'value1', action: 'equals' },
      };
      metadata.setFilters(filters);
      const differentFilters = {
        filter2: { attr: 'filter2', colId: 'filter2', value: 'value2', action: 'not_equals' },
      };
      expect(metadata.hasStoredFilterEqualsTo(differentFilters)).toBe(false);
    });

    it('should handle cases where filters are deeply nested or have different orders', () => {
      const metadata = new Metadatas();
      const filters1 = {
        filter1: { attr: 'filter1', colId: 'filter1', value: 'value1', action: 'equals' },
      };
      const filters2 = {
        filter1: { attr: 'filter1', colId: 'filter1', value: 'value1', action: 'equals' },
      };
      metadata.setFilters(filters1);
      expect(metadata.hasStoredFilterEqualsTo(filters2)).toBe(true);
    });
  });

  describe('setFilters', () => {
    it('should format filters with "between" actions correctly', () => {
      const metadata = new Metadatas();
      const filters = {
        filter1: {
          attr: 'filter1',
          colId: 'filter1',
          value: { start: 10, end: 20 },
          action: 'between',
        },
      };
      metadata.setFilters(filters);
      expect(metadata.filters.filter1.value).toEqual([10, 20]);
    });

    it('should merge filters correctly', () => {
      const metadata = new Metadatas();
      const initialFilters = {
        filter1: { attr: 'filter1', colId: 'filter1', value: 'value1', action: 'equals' },
      };
      metadata.setFilters(initialFilters);
      const newFilters = {
        filter2: { attr: 'filter2', colId: 'filter2', value: 'value2', action: 'not_equals' },
      };
      metadata.setFilters(newFilters);
      expect(metadata.filters).toEqual({
        ...initialFilters,
        ...newFilters,
      });
    });

    it('should handle empty filters gracefully', () => {
      const metadata = new Metadatas();
      metadata.setFilters({});
      expect(metadata.filters).toEqual({});
    });
  });
});