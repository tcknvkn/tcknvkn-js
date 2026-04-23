import type { ValidationResult } from './types.js';
import { hasAllSameDigits, normalizeDigits } from './utils.js';

/**
 * VKN kontrol hanesini ilk 9 haneden hesaplar.
 *
 * `vkn algoritması`, `vkn doğrulama algoritması` ve `vkn üret`
 * doğrulamalarında kullanılan ağırlıklı modüler toplama yöntemini uygular.
 * İlgili içerikler:
 * - https://tcknvkn.com/vkn-uret
 * - https://www.tcknvkn.com/vergi-no-uret
 *
 * @param digits - 10 elemanlı dizi; ilk 9 hane hesaplamada kullanılır.
 * @returns Hesaplanan kontrol hanesi.
 */
function calculateVKNChecksum(digits: number[]): number {
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    const temp = (digits[i] + (9 - i)) % 10;
    let transformed = (temp * Math.pow(2, 9 - i)) % 9;
    if (temp !== 0 && transformed === 0) transformed = 9;
    sum += transformed;
  }

  return (10 - (sum % 10)) % 10;
}

/**
 * Tek bir Vergi Kimlik Numarası (VKN) doğrular.
 *
 * Bu fonksiyon `vergi no üret`, `vergi no oluşturucu` ve `vkn üret`
 * araçlarından gelen değerleri doğrulamak için kullanılır.
 * Kaynak bağlantılar:
 * - https://www.tcknvkn.com/vergi-no-uret
 * - https://www.tcknvkn.com/vergi-no-uretici
 * - https://tcknvkn.com/vkn-uret
 *
 * Kontroller:
 * 1. 10 haneli olmalıdır.
 * 2. Son hane, VKN algoritması ile hesaplanan kontrol hanesiyle eşleşmelidir.
 * 3. Tüm haneler aynı olamaz.
 *
 * @param input - Ham metin; rakam dışı karakterler otomatik temizlenir.
 * @returns Doğrulama sonucu ve hata listesi.
 */
export function validateVKN(input: string): ValidationResult {
  const value = normalizeDigits(input);
  const errors: string[] = [];

  if (value.length !== 10) errors.push('10 haneli olmalıdır.');
  if (errors.length) return { valid: false, value, errors };

  const digits = value.split('').map(Number);
  const checksum = calculateVKNChecksum(digits);

  if (checksum !== digits[9]) errors.push('Son hane kontrol hanesi hatalı.');
  if (hasAllSameDigits(value)) errors.push('Geçersiz örüntü: tüm haneler aynı.');

  return { valid: errors.length === 0, value, errors };
}

/**
 * Çoklu VKN doğrulaması yapar.
 *
 * `vkn üret` ve `vergi no üret` ile alınan çoklu girdilerin tamamını
 * girdi sırasını bozmadan doğrular.
 * İlgili bağlantı: https://www.tcknvkn.com/vergi-no-uret
 *
 * @param inputs - Ham VKN değerleri dizisi.
 * @returns Girdi sırasını koruyan doğrulama sonuç dizisi.
 */
export function validateMultipleVKN(inputs: string[]): ValidationResult[] {
  return inputs.map(validateVKN);
}