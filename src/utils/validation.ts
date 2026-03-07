const SHA_REGEX = /^[0-9a-f]{4,40}$/i;
const SHELL_META_REGEX = /[;&|`$(){}!<>\n\r\\'"]/;

export function isValidSha(value: string): boolean {
    return SHA_REGEX.test(value);
}

export function isValidGitRef(value: string): boolean {
    if (!value || value.length === 0) {
        return false;
    }
    return !SHELL_META_REGEX.test(value);
}

export function assertValidSha(value: string, label: string): void {
    if (!isValidSha(value)) {
        throw new Error(`Invalid SHA for ${label}: "${value}"`);
    }
}

export function assertValidGitRef(value: string, label: string): void {
    if (!isValidGitRef(value)) {
        throw new Error(`Invalid git ref for ${label}: "${value}"`);
    }
}
