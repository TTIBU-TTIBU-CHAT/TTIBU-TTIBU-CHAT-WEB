const MAX_FILE_SIZE = 200 * 1024; // 200KB
const DANGEROUS_KEYS = ['__proto__', 'constructor', 'prototype'];
const PII_PATTERNS = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phone: /\d{3}-\d{3,4}-\d{4}|\d{10,11}/g,
  ssn: /\d{6}-\d{7}/g
};

export const UPLOAD_STATES = {
  GUEST_IDLE: 'GUEST_IDLE',
  AUTH_IDLE: 'AUTH_IDLE',
  VALIDATING: 'VALIDATING',
  UPLOADING: 'UPLOADING',
  PUBLISHED: 'PUBLISHED',
  ERROR: 'ERROR'
};

export function validateJSON(file, content) {
  const errors = [];
  const warnings = [];

  // 1. 파일 크기 검사
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`파일 크기가 제한(200KB)을 초과합니다. (현재: ${Math.round(file.size / 1024)}KB)`);
    return { valid: false, errors, warnings };
  }

  let jsonData;
  try {
    jsonData = JSON.parse(content);
  } catch (e) {
    errors.push('유효하지 않은 JSON 형식입니다.');
    return { valid: false, errors, warnings };
  }

  // 2. 위험한 키 검사 (프로토타입 오염 방지)
  const hasDangerousKeys = checkDangerousKeys(jsonData);
  if (hasDangerousKeys.length > 0) {
    errors.push(`금지된 키워드가 포함되어 있습니다: ${hasDangerousKeys.join(', ')}`);
  }

  // 3. 민감정보 검사
  const piiFound = detectPII(JSON.stringify(jsonData));
  if (piiFound.length > 0) {
    warnings.push(`민감정보가 포함되어 있을 수 있습니다: ${piiFound.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    data: jsonData
  };
}

function checkDangerousKeys(obj, path = '') {
  const found = [];

  if (typeof obj !== 'object' || obj === null) {
    return found;
  }

  for (const key in obj) {
    if (DANGEROUS_KEYS.includes(key)) {
      found.push(path ? `${path}.${key}` : key);
    }

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      found.push(...checkDangerousKeys(obj[key], path ? `${path}.${key}` : key));
    }
  }

  return found;
}

function detectPII(text) {
  const found = [];

  if (PII_PATTERNS.email.test(text)) {
    found.push('이메일 주소');
  }
  if (PII_PATTERNS.phone.test(text)) {
    found.push('전화번호');
  }
  if (PII_PATTERNS.ssn.test(text)) {
    found.push('주민등록번호');
  }

  return found;
}

export function getValidationChecklistStatus(result) {
  if (!result) {
    return {
      size: 'pending',
      syntax: 'pending',
      dangerous: 'pending',
      pii: 'pending'
    };
  }

  return {
    size: result.errors.some(e => e.includes('크기')) ? 'error' : 'success',
    syntax: result.errors.some(e => e.includes('JSON 형식')) ? 'error' : 'success',
    dangerous: result.errors.some(e => e.includes('금지된 키워드')) ? 'error' : 'success',
    pii: result.warnings.some(w => w.includes('민감정보')) ? 'warning' : 'success'
  };
}
