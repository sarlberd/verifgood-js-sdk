"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadatas = void 0;
/**
 * Metadatas.
 *
 * @author TxTony
 * @version 1.0
 * @license MIT
 * @class
 */
class Metadatas {
    constructor(name) {
        this.name = name || null;
        this.filters = {};
        this.directives = [];
        this.counters = { "All": 0 };
        this.columns = {};
    }
    /**
     * @param name - The name of the filter.
     * @param value - The value of the filter.
     * @param action - The action of the filter, default is "equals".
     */
    setFilter(name, value, action = "equals") {
        this.filters[name] = { attr: name, colId: name, value: value, action: action };
        return this;
    }
    /**
     * @param filters - An array of filters.
     * @return The filters object.
     */
    setFiltersFromArray(filters) {
        if (!filters.length) {
            this.clearAllFilters();
        }
        let filtersNormalized = {};
        filters.forEach((filter) => {
            filtersNormalized[filter.colId ? filter.colId : filter.attr] = filter;
        });
        this.setFilters(filtersNormalized);
        return this.filters;
    }
    /**
     * @param offset - The offset for the limit directive.
     * @param limit - The limit for the limit directive.
     */
    setLimit(offset, limit) {
        let limitDirectiveIndex = this.directives.findIndex((directive) => directive.name === "LIMIT");
        if (limitDirectiveIndex !== -1) {
            this.directives[limitDirectiveIndex].offset = offset;
            this.directives[limitDirectiveIndex].limit = limit;
        }
        else {
            this.directives.push({ name: "LIMIT", offset: offset, limit: limit });
        }
    }
    /**
     * Return true if directive limit exists.
     * @return boolean
     */
    isLimitSet() {
        return this.directives.findIndex((directive) => directive.name === "LIMIT") !== -1;
    }
    /**
     * Return true if a filter exists in filters object.
     * @param name - The name of the filter.
     * @return boolean
     */
    filterExist(name) {
        return this.filters.hasOwnProperty(name);
    }
    /**
     * Get a counter by its name.
     * @param counter - The name of the counter.
     * @return The counter value.
     */
    getCounter(counter) {
        return this.counters[counter];
    }
    /**
     * Delete filter.
     * @param name - The name of the filter.
     */
    deleteFilter(name) {
        delete this.filters[name];
    }
    /**
     * Delete all current filters.
     * @return this
     */
    clearAllFilters() {
        this.filters = {};
        return this;
    }
    /**
     * Get value from filter.
     * @param name - The name of the filter.
     * @return The filter value.
     */
    getFilterValue(name) {
        return this.filters[name].value;
    }
    /**
     * Get action from filter.
     * @param name - The name of the filter.
     * @return The filter action.
     */
    getFilterAction(name) {
        return this.filters[name].action;
    }
    /**
     * If this metadata has a name it can be stored.
     * @return boolean
     */
    isStorable() {
        return this.name ? true : false;
    }
    /**
     * Format Metadatas according to server expectation.
     * @return Object
     */
    get() {
        let names = Object.keys(this.filters);
        names.forEach((name) => {
            if (!this.filters[name].value || this.filters[name].value.length === 0) {
                delete this.filters[name];
            }
        });
        return {
            directives: this.directives,
            filters: Object.values(this.filters),
            columns: this.columns
        };
    }
    /**
     * Setter.
     * @param name - The name.
     * @return this
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * HasStoredFilterEqualsTo.
     * Compare given filters with this.filters.
     * @param filters - The filters to compare.
     * @return boolean - Send false if there are differences.
     */
    hasStoredFilterEqualsTo(filters) {
        return JSON.stringify(this.filters) === JSON.stringify(filters);
    }
    /**
     * Getter.
     * @return The name.
     */
    getName() {
        return this.name;
    }
    /**
     * Setter.
     * Columns will be used to format data output of query.
     * @param columns - The columns.
     * @return this
     */
    setColumns(columns) {
        this.columns = columns;
        return this;
    }
    /**
     * Setter.
     * @param counters - The counters.
     * @return this
     */
    setCounters(counters) {
        this.counters = counters;
        return this;
    }
    /**
     * Getter.
     * @return The counters.
     */
    getCounters() {
        return this.counters;
    }
    /**
     * Setter.
     * @param filters - The filters.
     * @return this
     */
    setFilters(filters) {
        let arrayFilters = Object.values(filters);
        let betweenFilters = arrayFilters.filter((filter) => filter.action === "between");
        betweenFilters.forEach((filter) => {
            if (filter.value && filter.value.hasOwnProperty("start") && filter.value.hasOwnProperty("end")) {
                filters[filter.colId].value = [filter.value.start, filter.value.end];
            }
        });
        this.filters = Object.assign(this.filters, filters);
        return this;
    }
    /**
     * Getter.
     * @return The filters.
     */
    getFilters() {
        return this.filters;
    }
    /**
     * Getter.
     * @param name - The name of the filter.
     * @return The filter.
     */
    getFilter(name) {
        return this.filters[name];
    }
    /**
     * Setter.
     * @param directives - The directives.
     * @return this
     */
    setDirectives(directives) {
        this.directives = directives;
        return this;
    }
}
exports.Metadatas = Metadatas;
