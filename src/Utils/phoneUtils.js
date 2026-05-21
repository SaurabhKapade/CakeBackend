/** @returns {string | null} digits only, no + */
export function normalizePhoneE164(input) {
    const digits = String(input || "").replace(/\D/g, "");
    if (!digits) return null;
    if (digits.length === 10 && /^[6-9]/.test(digits)) return `91${digits}`;
    if (digits.length < 10 || digits.length > 15) return null;
    return digits;
}

export function isValidEmail(email) {
    if (!email || typeof email !== "string") return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
