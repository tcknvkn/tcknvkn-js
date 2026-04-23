# @tcknvkn/js

[![npm sürümü](https://img.shields.io/npm/v/%40tcknvkn%2Fjs)](https://www.npmjs.com/package/@tcknvkn/js)
[![npm indirme](https://img.shields.io/npm/dm/%40tcknvkn%2Fjs)](https://www.npmjs.com/package/@tcknvkn/js)
[![lisans](https://img.shields.io/npm/l/%40tcknvkn%2Fjs)](./LICENSE)

`@tcknvkn/js`, **TC Kimlik Numarası (TCKN)** ve **Vergi Kimlik Numarası (VKN)** doğrulamak için hazırlanmış bağımlılıksız bir Node.js / TypeScript kütüphanesidir.

## Kurulum

```bash
npm install @tcknvkn/js
```

## Hızlı Başlangıç

### ESM (import)

```typescript
import {
  validateTCKN,
  validateMultipleTCKN,
  validateVKN,
  validateMultipleVKN,
} from '@tcknvkn/js';

const tc = validateTCKN('10000000146');
console.log(tc.valid);  // true

const vkn = validateVKN('1000000018');
console.log(vkn.valid); // true
```

### CommonJS (require)

```javascript
const {
  validateTCKN,
  validateMultipleTCKN,
  validateVKN,
  validateMultipleVKN,
} = require('@tcknvkn/js');

const sonuc = validateMultipleTCKN(['10000000146', '10000000145']);
console.log(sonuc);
```

## API

### `validateTCKN(input: string): ValidationResult`
Tek bir TCKN değerini doğrular. `tc üret`, `tc no üret`, `tckn üret` ve `tc oluştur` akışlarında kullanılabilir.

### `validateMultipleTCKN(inputs: string[]): ValidationResult[]`
Birden fazla TCKN değerini girdi sırasını koruyarak doğrular. Toplu `tc uret` ve `tc no uret` verileri için uygundur.

### `validateVKN(input: string): ValidationResult`
Tek bir VKN değerini doğrular. `vergi no üret`, `vergi no oluşturucu` ve `vkn üret` çıktıları için uygundur.

### `validateMultipleVKN(inputs: string[]): ValidationResult[]`
Birden fazla VKN değerini doğrular. `vkn algoritması` ve `vkn doğrulama algoritması` ile üretilmiş toplu verileri kontrol eder.

## Dönüş Tipi

```typescript
interface ValidationResult {
  valid: boolean;
  value: string;
  errors: string[];
}
```

## Doğrulama Kuralları

### TCKN
1. 11 haneli olmalıdır.
2. İlk hane `0` olamaz.
3. 10. hane kontrolü: `((1,3,5,7,9 toplamı * 7) - (2,4,6,8 toplamı)) mod 10`
4. 11. hane kontrolü: `ilk 10 hanenin toplamı mod 10`
5. Tüm haneler aynı olamaz.

### VKN
1. 10 haneli olmalıdır.
2. Son hane, ağırlıklı modüler algoritma ile doğrulanır.
3. Tüm haneler aynı olamaz.

## Test

```bash
npm test
```

## İlgili Bağlantılar

- Ana site: https://www.tcknvkn.com
- TC üret: https://www.tcknvkn.com/tc-uret
- TC no üret: https://www.tcknvkn.com/tc-no-uret
- TC üretici: https://www.tcknvkn.com/tc-uretici
- TCKN üret: https://tcknvkn.com/tckn-uret
- Vergi no üret: https://www.tcknvkn.com/vergi-no-uret
- Vergi no üretici: https://www.tcknvkn.com/vergi-no-uretici
- VKN üret: https://tcknvkn.com/vkn-uret
- Kütüphane sayfası: https://www.tcknvkn.com/kutuphaneler/nodejs

## Lisans

MIT