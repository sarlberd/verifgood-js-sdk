/**
 * Metadatas.
 *
 * @author TxTony
 * @version 1.0
 * @license MIT
 * @class
 */
export declare class Metadatas {
    name: string | null;
    filters: {
        [key: string]: {
            attr: string;
            colId: string;
            value: any;
            action: string;
        };
    };
    directives: {
        name: string;
        offset: number;
        limit: number;
    }[];
    counters: {
        [key: string]: number;
    };
    columns: {
        [key: string]: string | null;
    };
    constructor(name?: string);
    /**
     * @param name - The name of the filter.
     * @param value - The value of the filter.
     * @param action - The action of the filter, default is "equals".
     */
    setFilter(name: string, value: string | number, action?: string): this;
    /**
     * @param filters - An array of filters.
     * @return The filters object.
     */
    setFiltersFromArray(filters: {
        attr: string;
        colId: string;
        value: any;
        action: string;
    }[]): {
        [key: string]: {
            attr: string;
            colId: string;
            value: any;
            action: string;
        };
    };
    /**
     * @param offset - The offset for the limit directive.
     * @param limit - The limit for the limit directive.
     */
    setLimit(offset: number, limit: number): void;
    /**
     * Return true if directive limit exists.
     * @return boolean
     */
    isLimitSet(): boolean;
    /**
     * Return true if a filter exists in filters object.
     * @param name - The name of the filter.
     * @return boolean
     */
    filterExist(name: string): boolean;
    /**
     * Get a counter by its name.
     * @param counter - The name of the counter.
     * @return The counter value.
     */
    getCounter(counter: string): number;
    /**
     * Delete filter.
     * @param name - The name of the filter.
     */
    deleteFilter(name: string): void;
    /**
     * Delete all current filters.
     * @return this
     */
    clearAllFilters(): this;
    /**
     * Get value from filter.
     * @param name - The name of the filter.
     * @return The filter value.
     */
    getFilterValue(name: string): any;
    /**
     * Get action from filter.
     * @param name - The name of the filter.
     * @return The filter action.
     */
    getFilterAction(name: string): string;
    /**
     * If this metadata has a name it can be stored.
     * @return boolean
     */
    isStorable(): boolean;
    /**
     * Format Metadatas according to server expectation.
     * @return Object
     */
    get(): {
        directives: {
            name: string;
            offset: number;
            limit: number;
        }[];
        filters: {
            attr: string;
            colId: string;
            value: any;
            action: string;
        }[];
        columns: {
            [key: string]: string | null;
        };
    };
    /**
     * Setter.
     * @param name - The name.
     * @return this
     */
    setName(name: string): this;
    /**
     * HasStoredFilterEqualsTo.
     * Compare given filters with this.filters.
     * @param filters - The filters to compare.
     * @return boolean - Send false if there are differences.
     */
    hasStoredFilterEqualsTo(filters: {
        [key: string]: {
            attr: string;
            colId: string;
            value: any;
            action: string;
        };
    }): boolean;
    /**
     * Getter.
     * @return The name.
     */
    getName(): string | null;
    /**
     * Setter.
     * Columns will be used to format data output of query.
     * @param columns - The columns.
     * @return this
     */
    setColumns(columns: {
        [key: string]: string | null;
    }): this;
    /**
     * Setter.
     * @param counters - The counters.
     * @return this
     */
    setCounters(counters: {
        [key: string]: number;
    }): this;
    /**
     * Getter.
     * @return The counters.
     */
    getCounters(): {
        [key: string]: number;
    };
    /**
     * Setter.
     * @param filters - The filters.
     * @return this
     */
    setFilters(filters: {
        [key: string]: {
            attr: string;
            colId: string;
            value: any;
            action: string;
        };
    }): this;
    /**
     * Getter.
     * @return The filters.
     */
    getFilters(): {
        [key: string]: {
            attr: string;
            colId: string;
            value: any;
            action: string;
        };
    };
    /**
     * Getter.
     * @param name - The name of the filter.
     * @return The filter.
     */
    getFilter(name: string): {
        attr: string;
        colId: string;
        value: any;
        action: string;
    };
    /**
     * Setter.
     * @param directives - The directives.
     * @return this
     */
    setDirectives(directives: {
        name: string;
        offset: number;
        limit: number;
    }[]): this;
}
