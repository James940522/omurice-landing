import assert from 'node:assert/strict';
import test from 'node:test';

const validation = await import('../src/shared/lib/utils.ts');

test('sanitizePhoneInput keeps only phone digits and formatting separators', () => {
  assert.equal(validation.sanitizePhoneInput('010abc-1234-오5678'), '010-1234-5678');
  assert.equal(validation.sanitizePhoneInput('fdsa'), '');
});

test('validateInquiryLead rejects non-phone contact values', () => {
  const result = validation.validateInquiryLead({
    name: '홍길동',
    phone: 'fdsa',
    region: '서울 강남구',
    privacyAgree: true,
  });

  assert.equal(result.valid, false);
  assert.equal(result.field, 'phone');
});

test('validateInquiryLead rejects loose placeholder text in required fields', () => {
  assert.equal(
    validation.validateInquiryLead({
      name: 'fdsa',
      phone: '010-1234-5678',
      region: '서울 강남구',
      privacyAgree: true,
    }).field,
    'name'
  );

  assert.equal(
    validation.validateInquiryLead({
      name: '홍길동',
      phone: '010-1234-5678',
      region: 'fdsa',
      privacyAgree: true,
    }).field,
    'region'
  );
});

test('validateInquiryLead requires privacy agreement before submit is allowed', () => {
  const result = validation.validateInquiryLead({
    name: '홍길동',
    phone: '010-1234-5678',
    region: '서울 강남구',
    privacyAgree: false,
  });

  assert.equal(result.valid, false);
  assert.equal(result.field, 'privacyAgree');
});

test('validateInquiryLead accepts a complete franchise inquiry', () => {
  assert.deepEqual(validation.validateInquiryLead({
    name: '홍길동',
    phone: '010-1234-5678',
    region: '서울 강남구',
    privacyAgree: true,
  }), { valid: true });
});
