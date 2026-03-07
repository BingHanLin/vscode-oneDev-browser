import * as assert from 'assert';
import { isValidSha, isValidGitRef, assertValidSha, assertValidGitRef } from '../utils/validation';

suite('Validation Tests', () => {
    suite('isValidSha', () => {
        test('accepts valid 40-char SHA', () => {
            assert.strictEqual(isValidSha('a'.repeat(40)), true);
        });
        test('accepts valid short SHA (7 chars)', () => {
            assert.strictEqual(isValidSha('abc1234'), true);
        });
        test('accepts minimum 4-char SHA', () => {
            assert.strictEqual(isValidSha('abcd'), true);
        });
        test('accepts mixed case hex', () => {
            assert.strictEqual(isValidSha('AbCdEf1234'), true);
        });
        test('rejects empty string', () => {
            assert.strictEqual(isValidSha(''), false);
        });
        test('rejects 3-char string (too short)', () => {
            assert.strictEqual(isValidSha('abc'), false);
        });
        test('rejects 41-char string (too long)', () => {
            assert.strictEqual(isValidSha('a'.repeat(41)), false);
        });
        test('rejects non-hex characters', () => {
            assert.strictEqual(isValidSha('ghijklmn'), false);
        });
        test('rejects shell metacharacters', () => {
            assert.strictEqual(isValidSha('abc; rm -rf /'), false);
        });
    });

    suite('isValidGitRef', () => {
        test('accepts simple branch name', () => {
            assert.strictEqual(isValidGitRef('main'), true);
        });
        test('accepts branch with slashes', () => {
            assert.strictEqual(isValidGitRef('feature/my-branch'), true);
        });
        test('accepts branch with dots and dashes', () => {
            assert.strictEqual(isValidGitRef('release-1.0.0'), true);
        });
        test('rejects empty string', () => {
            assert.strictEqual(isValidGitRef(''), false);
        });
        test('rejects semicolon', () => {
            assert.strictEqual(isValidGitRef('branch;rm -rf'), false);
        });
        test('rejects ampersand', () => {
            assert.strictEqual(isValidGitRef('branch&evil'), false);
        });
        test('rejects backtick', () => {
            assert.strictEqual(isValidGitRef('branch`cmd`'), false);
        });
        test('rejects dollar sign', () => {
            assert.strictEqual(isValidGitRef('branch$HOME'), false);
        });
        test('rejects parentheses', () => {
            assert.strictEqual(isValidGitRef('branch(cmd)'), false);
        });
        test('rejects pipe', () => {
            assert.strictEqual(isValidGitRef('branch|evil'), false);
        });
        test('rejects newline', () => {
            assert.strictEqual(isValidGitRef('branch\ncmd'), false);
        });
    });

    suite('assertValidSha', () => {
        test('does not throw for valid SHA', () => {
            assert.doesNotThrow(() => assertValidSha('abcdef1234567890', 'test'));
        });
        test('throws for invalid SHA', () => {
            assert.throws(() => assertValidSha('not-a-sha', 'test'), /Invalid SHA for test/);
        });
    });

    suite('assertValidGitRef', () => {
        test('does not throw for valid ref', () => {
            assert.doesNotThrow(() => assertValidGitRef('my-branch', 'test'));
        });
        test('throws for ref with metacharacters', () => {
            assert.throws(() => assertValidGitRef('branch;evil', 'test'), /Invalid git ref for test/);
        });
    });
});
