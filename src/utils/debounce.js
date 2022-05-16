/**
 * Makes the func wait a certain amount of time before running again, simillar to loadash debounce.
 * Not using lodash debounce or rxjs, and not going to write tests for these.
 * @param {fn} func function to execute after the wait time
 * @param {number} wait time in milliseconds
 * @param {boolean} immediate optional to indicate if the function should be executed immediately
 * @returns {void}
 */
export default function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
