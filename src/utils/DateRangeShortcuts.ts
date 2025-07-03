export interface DateRangeShortcutOptions {
  shortcut: string;
  value: [Date, Date] | null;
}

export interface GridColumnDefinition {
  filter?: string;
  filterParams?: {
    comparator?: (filterDate: Date, cellValue: string) => number;
  };
}

/**
 * DateRangeShortcuts utility service
 * Provides date range shortcuts and filtering utilities
 */
export class DateRangeShortcuts {
  private dateShortcutSelected: string = '';

  /**
   * Set the selected date shortcut
   */
  setDateShortcutSelected(shortcut: string): void {
    this.dateShortcutSelected = shortcut;
  }

  /**
   * Get the selected date shortcut
   */
  getDateShortcutSelected(): string {
    return this.dateShortcutSelected;
  }

  /**
   * Apply date range based on selected shortcut
   * @param input - Input object to set the value on
   */
  useRangeDate(input: { value: [Date, Date] | null }): void {
    const shortcut = this.dateShortcutSelected;
    const now = new Date();
    
    if (shortcut === 'Aujourd\'hui') {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      input.value = [yesterday, tomorrow];
    } else if (shortcut === 'Hier') {
      const twoDaysAgo = new Date(now);
      twoDaysAgo.setDate(now.getDate() - 2);
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      input.value = [twoDaysAgo, yesterday];
    } else if (shortcut === 'Cette semaine') {
      const startOfWeek = this.getStartOfWeek(now);
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      input.value = [startOfWeek, tomorrow];
    } else if (shortcut === 'La semaine derniere') {
      const lastWeekStart = this.getStartOfWeek(now);
      lastWeekStart.setDate(lastWeekStart.getDate() - 7);
      const lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
      input.value = [lastWeekStart, lastWeekEnd];
    } else if (shortcut === 'Le mois dernier') {
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      input.value = [lastMonthStart, lastMonthEnd];
    } else if (shortcut === 'les 7 derniers jours') {
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      input.value = [sevenDaysAgo, tomorrow];
    } else if (shortcut === 'les 30 derniers jours') {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      input.value = [thirtyDaysAgo, tomorrow];
    } else if (shortcut === 'Choisir une plage de date') {
      // This would typically trigger a date picker - handled by the consuming component
      input.value = null;
    } else {
      input.value = null;
    }
  }

  /**
   * Get start of week (Sunday = 0)
   */
  private getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    return startOfWeek;
  }

  /**
   * Returns a logic comparator for date range filtering
   * @deprecated This method has incomplete logic and should be reviewed
   */
  getLogicComparatorDateRange(): {
    filter: string;
    filterParams: {
      comparator: (filterLocalDateAtMidnight: string, cellValue: string) => number;
    };
  } {
    return {
      filter: 'date',
      filterParams: {
        comparator: (filterLocalDateAtMidnight: string, cellValue: string): number => {
          // Note: Original implementation had incomplete logic (early return)
          // This should be reviewed and implemented properly
          return 0;
        }
      }
    };
  }

  /**
   * Check if a date is within a range
   * @param startDate - Start date of the range
   * @param currentDate - Date to check
   * @param endDate - End date of the range
   * @returns True if currentDate is within the range
   */
  isInRange(startDate: string | Date, currentDate: string | Date, endDate: string | Date): boolean {
    if (!currentDate) return false;
    
    const start = new Date(startDate);
    const current = new Date(currentDate);
    const end = new Date(endDate);
    
    return start.getTime() < current.getTime() && 
           current.getTime() < end.getTime();
  }

  /**
   * Add date comparison logic to a grid column definition
   * @param columnDef - Column definition object to modify
   */
  addLogicComparatorOnGridDefinitionColumn(columnDef: GridColumnDefinition): void {
    Object.assign(columnDef, {
      filter: 'date',
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string): number => {
          if (!cellValue || cellValue === '') return 0;
          
          const filter = this.formatDateToYYYYMMDD(filterLocalDateAtMidnight);
          const value = this.formatDateToYYYYMMDD(new Date(cellValue));
          
          if (value < filter) return -1;
          else if (value > filter) return 1;
          else return 0;
        }
      }
    });
  }

  /**
   * Format date to YYYY-MM-DD string
   */
  private formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Static method to get available date range shortcuts
   */
  static getAvailableShortcuts(): string[] {
    return [
      'Aujourd\'hui',
      'Hier',
      'Cette semaine',
      'La semaine derniere',
      'Le mois dernier',
      'les 7 derniers jours',
      'les 30 derniers jours',
      'Choisir une plage de date'
    ];
  }
}

// Export a singleton instance for convenience
export const dateRangeShortcuts = new DateRangeShortcuts();
