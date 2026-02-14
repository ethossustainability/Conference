/**
 * Security utilities for message filtering and rate limiting.
 */

const NAUGHTY_WORDS = [
    'naughty', 'word1', 'word2', // Add real common filters here
    'spam', 'abuse'
];

/**
 * Basic word filter for censorship
 */
export const filterMessage = (text) => {
    if (!text) return '';
    let filteredText = text;
    NAUGHTY_WORDS.forEach(word => {
        const regex = new RegExp(word, 'gi');
        filteredText = filteredText.replace(regex, '***');
    });
    return filteredText;
};

/**
 * Simple rate limiting utility using localStorage
 * @param {string} userId
 * @param {string} actionType - e.g., 'chat_message'
 * @param {number} limit - max actions
 * @param {number} windowMs - time window in ms
 * @returns {boolean} - true if allowed, false if limited
 */
export const checkRateLimit = (userId, actionType, limit = 5, windowMs = 60000) => {
    const key = `ratelimit_${userId}_${actionType}`;
    const now = Date.now();
    const history = JSON.parse(localStorage.getItem(key) || '[]');

    // Filter history to current window
    const validHistory = history.filter(ts => now - ts < windowMs);

    if (validHistory.length >= limit) {
        return false;
    }

    validHistory.push(now);
    localStorage.setItem(key, JSON.stringify(validHistory));
    return true;
};

/**
 * Simple hashing for semi-secure identifiers
 */
export const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
};
