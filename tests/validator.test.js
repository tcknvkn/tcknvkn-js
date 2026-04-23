const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validateTCKN,
  validateMultipleTCKN,
  validateVKN,
  validateMultipleVKN,
} = require('../dist/cjs/index.js');

test('validateTCKN geçerli numarayı doğrular', () => {
  const result = validateTCKN('10000000146');

  assert.equal(result.valid, true);
  assert.equal(result.value, '10000000146');
  assert.deepEqual(result.errors, []);
});

test('validateTCKN rakam dışı karakterleri temizler', () => {
  const result = validateTCKN('100.000.001-46');

  assert.equal(result.valid, true);
  assert.equal(result.value, '10000000146');
});

test('validateTCKN uzunluk ve ilk hane kurallarını yakalar', () => {
  const result = validateTCKN('0123');

  assert.equal(result.valid, false);
  assert.equal(result.value, '0123');
  assert.ok(result.errors.includes('11 haneli olmalıdır.'));
  assert.ok(result.errors.includes('İlk hane 0 olamaz.'));
});

test('validateTCKN kontrol haneleri hatasını yakalar', () => {
  const result = validateTCKN('10000000145');

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('11. hane kontrol hanesi hatalı.'));
});

test('validateTCKN tüm haneler aynı örüntüsünü reddeder', () => {
  const result = validateTCKN('11111111111');

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('Geçersiz örüntü: tüm haneler aynı.'));
});

test('validateMultipleTCKN sıra koruyarak sonuç döner', () => {
  const results = validateMultipleTCKN(['10000000146', '10000000145', 'abc']);

  assert.equal(results.length, 3);
  assert.equal(results[0].valid, true);
  assert.equal(results[1].valid, false);
  assert.equal(results[2].value, '');
  assert.ok(results[2].errors.includes('11 haneli olmalıdır.'));
});

test('validateVKN geçerli numarayı doğrular', () => {
  const result = validateVKN('1000000018');

  assert.equal(result.valid, true);
  assert.equal(result.value, '1000000018');
  assert.deepEqual(result.errors, []);
});

test('validateVKN rakam dışı karakterleri temizler', () => {
  const result = validateVKN('100-000-0018');

  assert.equal(result.valid, true);
  assert.equal(result.value, '1000000018');
});

test('validateVKN uzunluk ve kontrol hanesi hatalarını yakalar', () => {
  const lengthError = validateVKN('12345');
  const checksumError = validateVKN('1000000019');

  assert.equal(lengthError.valid, false);
  assert.ok(lengthError.errors.includes('10 haneli olmalıdır.'));

  assert.equal(checksumError.valid, false);
  assert.ok(checksumError.errors.includes('Son hane kontrol hanesi hatalı.'));
});

test('validateVKN tüm haneler aynı örüntüsünü reddeder', () => {
  const result = validateVKN('1111111111');

  assert.equal(result.valid, false);
  assert.ok(result.errors.includes('Geçersiz örüntü: tüm haneler aynı.'));
});

test('validateMultipleVKN sıra koruyarak sonuç döner', () => {
  const results = validateMultipleVKN(['1000000018', '1000000019', 'abc']);

  assert.equal(results.length, 3);
  assert.equal(results[0].valid, true);
  assert.equal(results[1].valid, false);
  assert.equal(results[2].value, '');
  assert.ok(results[2].errors.includes('10 haneli olmalıdır.'));
});