/**
 * Girdi metninden yalnızca rakamları bırakır.
 *
 * `tc üret`, `tc uret`, `tc no uret` ve `vergi no üret` akışlarında
 * kullanıcıların noktalama veya boşlukla girdiği değerleri normalize eder.
 * İlgili araçlar:
 * - https://www.tcknvkn.com/tc-no-uret
 * - https://www.tcknvkn.com/vergi-no-uret
 *
 * @param input - Ham metin değeri.
 * @returns Sadece rakamlardan oluşan normalize edilmiş metin.
 */
export function normalizeDigits(input: string): string {
  return String(input ?? '').replace(/\D+/g, '');
}

/**
 * Değerin tüm hanelerinin aynı olup olmadığını kontrol eder.
 *
 * Bu kontrol, `tc no üret` ve `vkn doğrulama algoritması` doğruluğunu
 * artırmak için kullanılır.
 * Referans:
 * - https://www.tcknvkn.com/tc-uret
 * - https://tcknvkn.com/vkn-uret
 *
 * @param digits - Yalnızca rakamlardan oluşan metin.
 * @returns Tüm haneler aynıysa `true`, değilse `false`.
 */
export function hasAllSameDigits(digits: string): boolean {
  return new Set(digits).size === 1;
}