/**
 * Node.js / TypeScript dışa aktarımları.
 *
 * Kütüphane sayfası: https://www.tcknvkn.com/kutuphaneler/nodejs
 * Ek kaynaklar: https://www.tcknvkn.com/tc-uret ve https://www.tcknvkn.com/vergi-no-uret
 */
export type { ValidationResult } from './types.js';

export {
  validateTCKN,
  validateMultipleTCKN,
} from './tckn.js';

export {
  validateVKN,
  validateMultipleVKN,
} from './vkn.js';