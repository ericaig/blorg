/**
 * all props in object non-nullable
 */
export type RequiredNotNull<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};