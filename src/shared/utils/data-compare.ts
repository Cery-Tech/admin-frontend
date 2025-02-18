/**
 * Performs a deep equality check between two values.
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns True if the values are deeply equal, otherwise false.
 */
export const isDeepEqual = <T>(a: T, b: T): boolean => {
  // Check for reference equality (if both values point to the same object or are strictly equal)
  if (a === b) return true;

  // If either value is null or not an object, compare them using Object.is (handles NaN correctly)
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return Object.is(a, b);
  }

  // Determine if the values are arrays
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);

  // If one is an array and the other is not, they are not equal
  if (aIsArray !== bIsArray) return false;

  if (aIsArray && bIsArray) {
    // Both values are arrays: first compare their lengths
    if (a.length !== b.length) return false;

    // Compare each element in the arrays recursively
    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i])) return false;
    }

    return true;
  } else {
    // Both values are plain objects

    // Get the keys of both objects
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    // If the objects have a different number of keys, they are not equal
    if (aKeys.length !== bKeys.length) return false;

    // Iterate over all keys in the first object
    for (const key of aKeys) {
      // Check if the key exists in the second object
      if (!b[key as keyof T]) return false;

      // Recursively check the equality of the corresponding values
      if (!isDeepEqual(a[key as keyof T], b[key as keyof T])) return false;
    }

    return true;
  }
};
