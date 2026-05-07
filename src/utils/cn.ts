/**
 * @file utils/cn.ts
 * @description Helper function to merge class names.
 */

export function cn(...inputs: any[]) {
  return inputs
    .flat()
    .filter((item) => typeof item === 'string' && item.length > 0)
    .join(' ');
}
