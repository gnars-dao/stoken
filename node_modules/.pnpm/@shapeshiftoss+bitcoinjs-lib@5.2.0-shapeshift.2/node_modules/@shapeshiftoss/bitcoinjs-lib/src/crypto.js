'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const createHash = require('create-hash');
const AlgorithmLength = {
  ripemd160: 20,
  sha1: 20,
  sha256: 32,
  hash160: 20,
  hash256: 32,
};
function asDigest(buffer, preimage, algorithm) {
  const out = Object.assign(buffer, {
    preimage,
    algorithm,
  });
  const expectedLength = AlgorithmLength[algorithm];
  if (out.length !== expectedLength) throw new Error('bad digest length');
  return out;
}
function ripemd160(buffer) {
  let out;
  try {
    out = createHash('rmd160')
      .update(buffer)
      .digest();
  } catch (err) {
    out = createHash('ripemd160')
      .update(buffer)
      .digest();
  }
  return asDigest(out, buffer, 'ripemd160');
}
exports.ripemd160 = ripemd160;
function sha1(buffer) {
  const out = createHash('sha1')
    .update(buffer)
    .digest();
  return asDigest(out, buffer, 'sha1');
}
exports.sha1 = sha1;
function sha256(buffer) {
  const out = createHash('sha256')
    .update(buffer)
    .digest();
  return asDigest(out, buffer, 'sha256');
}
exports.sha256 = sha256;
function hash160(buffer) {
  const out = ripemd160(sha256(buffer));
  return asDigest(out, buffer, 'hash160');
}
exports.hash160 = hash160;
function hash256(buffer) {
  const out = sha256(sha256(buffer));
  return asDigest(out, buffer, 'hash256');
}
exports.hash256 = hash256;
