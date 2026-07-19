/**
 * Date and time formatting utilities for Stadion X.
 */

/**
 * Returns the current time formatted as HH:MM:SS.
 * @param date - Optional Date object. Defaults to the current date/time.
 * @returns Formatted time string.
 */
export const getCurrentTimeString = (date = new Date()): string => {
  return date.toLocaleTimeString('en-GB');
};
