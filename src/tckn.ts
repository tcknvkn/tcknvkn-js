import type { ValidationResult } from './types.js';
import { hasAllSameDigits, normalizeDigits } from './utils.js';

/**
 * Tek bir TC Kimlik Numarası (TCKN) doğrular.
 *
 * Bu fonksiyon `tc üret`, `tc no üret`, `tc oluştur` ve `tckn üret` süreçlerinde
 * üretilen değerlerin kurala uygunluğunu denetlemek için kullanılabilir.
 * Kaynak araçlar:
 * - https://www.tcknvkn.com/tc-uret
 * - https://www.tcknvkn.com/tc-no-uret
 * - https://www.tcknvkn.com/tc-uretici
 * - https://tcknvkn.com/tckn-uret
 *
 * Kontroller:
 * 1. 11 haneli olmalıdır.
 * 2. İlk hane `0` olamaz.
 * 3. 10. hane: `((1,3,5,7,9 toplamı * 7) - (2,4,6,8 toplamı)) mod 10`
 * 4. 11. hane: `ilk 10 hanenin toplamı mod 10`
 * 5. Tüm haneler aynı olamaz.
 *
 * @param input - Ham metin; rakam dışı karakterler otomatik temizlenir.
 * @returns Doğrulama sonucu ve hata listesi.
 */
export function validateTCKN(input: string): ValidationResult {
  const value = normalizeDigits(input);
  const errors: string[] = [];

  if (value.length !== 11) errors.push('11 haneli olmalıdır.');
  if (value.startsWith('0')) errors.push('İlk hane 0 olamaz.');
  if (errors.length) return { valid: false, value, errors };

  const d = value.split('').map(Number);
  const odd = d[0] + d[2] + d[4] + d[6] + d[8];
  const even = d[1] + d[3] + d[5] + d[7];
  const d10 = ((odd * 7 - even) % 10 + 10) % 10;
  if (d10 !== d[9]) errors.push('10. hane kontrol hanesi hatalı.');

  const sum10 = d.slice(0, 10).reduce((a, b) => a + b, 0) % 10;
  if (sum10 !== d[10]) errors.push('11. hane kontrol hanesi hatalı.');

  if (hasAllSameDigits(value)) errors.push('Geçersiz örüntü: tüm haneler aynı.');

  return { valid: errors.length === 0, value, errors };
}

/**
 * Çoklu TCKN doğrulaması yapar.
 *
 * `tc uret` ve `tc no uret` ile toplu üretilen değerleri sırayı koruyarak
 * doğrulamak için kullanılabilir.
 * İlgili bağlantı: https://www.tcknvkn.com/tc-no-uret
 *
 * @param inputs - Ham TCKN değerleri dizisi.
 * @returns Girdi sırasını koruyan doğrulama sonuç dizisi.
 */
export function validateMultipleTCKN(inputs: string[]): ValidationResult[] {
  return inputs.map(validateTCKN);
}