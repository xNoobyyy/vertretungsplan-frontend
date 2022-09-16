// returns whether the array contains the element or not using tripple equal operation
export function contains<T>(array: Array<T>, value: T): boolean {
    return (array.filter(v => v === value).length > 0)
}
