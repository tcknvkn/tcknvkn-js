/**
 * Tüm doğrulama fonksiyonlarının döndürdüğü standart sonuç modeli.
 */
export interface ValidationResult {
  /** Doğrulama başarılıysa `true`, başarısızsa `false`. */
  valid: boolean;

  /** Rakam dışı karakterler temizlendikten sonraki normalize edilmiş değer. */
  value: string;

  /** Hata mesajları listesi; geçerliyse boş dizi döner. */
  errors: string[];
}