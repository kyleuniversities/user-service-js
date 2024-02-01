/**
 * Constant for debugging
 */
export const IS_DEBUGGING = true;

/**
 * Alerts if debugging
 */
export const debugAlert = (message) => {
  if (IS_DEBUGGING) {
    alert(message);
  }
};
