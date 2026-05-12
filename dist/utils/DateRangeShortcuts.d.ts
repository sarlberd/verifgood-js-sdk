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
export declare class DateRangeShortcuts {
    private dateShortcutSelected;
    /**
     * Set the selected date shortcut
     */
    setDateShortcutSelected(shortcut: string): void;
    /**
     * Get the selected date shortcut
     */
    getDateShortcutSelected(): string;
    /**
     * Apply date range based on selected shortcut
     * @param input - Input object to set the value on
     */
    useRangeDate(input: {
        value: [Date, Date] | null;
    }): void;
    /**
     * Get start of week (Sunday = 0)
     */
    private getStartOfWeek;
    /**
     * Returns a logic comparator for date range filtering
     * @deprecated This method has incomplete logic and should be reviewed
     */
    getLogicComparatorDateRange(): {
        filter: string;
        filterParams: {
            comparator: (filterLocalDateAtMidnight: string, cellValue: string) => number;
        };
    };
    /**
     * Check if a date is within a range
     * @param startDate - Start date of the range
     * @param currentDate - Date to check
     * @param endDate - End date of the range
     * @returns True if currentDate is within the range
     */
    isInRange(startDate: string | Date, currentDate: string | Date, endDate: string | Date): boolean;
    /**
     * Add date comparison logic to a grid column definition
     * @param columnDef - Column definition object to modify
     */
    addLogicComparatorOnGridDefinitionColumn(columnDef: GridColumnDefinition): void;
    /**
     * Format date to YYYY-MM-DD string
     */
    private formatDateToYYYYMMDD;
    /**
     * Static method to get available date range shortcuts
     */
    static getAvailableShortcuts(): string[];
}
export declare const dateRangeShortcuts: DateRangeShortcuts;
