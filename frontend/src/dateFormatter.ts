// Corrected TypeScript issues by adding explicit types and ensuring type compatibility
export class DateFormatter {
    /**
     * Format a date string based on locale and options
     * 
     * @param {string} dateString - ISO 8601 or standard date string
     * @param {Object} [options] - Formatting options
     * @param {string} [options.locale='en-US'] - BCP 47 language tag
     * @param {string} [options.dateStyle='medium'] - 'full', 'long', 'medium', 'short'
     * @param {string} [options.timeStyle='medium'] - 'full', 'long', 'medium', 'short'
     * @param {boolean} [options.timeZoneDisplay=false] - Show time zone
     * @returns {string} Formatted date string
     */
    static formatDate(dateString: string, options: {
        locale?: string;
        dateStyle?: 'full' | 'long' | 'medium' | 'short';
        timeStyle?: 'full' | 'long' | 'medium' | 'short';
        timeZoneDisplay?: boolean;
        dateOnly?: boolean;
    } = {}): string {
        const {
            locale = 'en-US',
            dateStyle = 'medium',
            timeStyle = 'medium',
            timeZoneDisplay = false,
            dateOnly = false
        } = options;

        // Ensure the date is parsed correctly
        const date = new Date(dateString);

        // Create Intl.DateTimeFormat instance
        const formatter = new Intl.DateTimeFormat(locale, {
            dateStyle: dateStyle,
            ...(dateOnly ? {} : { timeStyle: timeStyle }),
            timeZone: 'UTC', // Default to UTC, can be overridden
            formatMatcher: 'best fit',
            ...(timeZoneDisplay && { timeZoneName: 'short' })
        });

        return formatter.format(date);
    }

    /**
     * Get relative time formatting
     * 
     * @param {string} dateString - ISO 8601 or standard date string
     * @param {Object} [options] - Formatting options
     * @param {string} [options.locale='en-US'] - BCP 47 language tag
     * @param {string} [options.numeric='auto'] - 'always' or 'auto'
     * @returns {string} Relative time string
     */
    static formatRelativeTime(dateString: string, options: {
        locale?: string;
        numeric?: 'always' | 'auto';
    } = {}): string {
        const {
            locale = 'en-US',
            numeric = 'auto'
        } = options;

        const date = new Date(dateString);
        const now = new Date();

        const rtf = new Intl.RelativeTimeFormat(locale, { numeric });
        const diffInSeconds = (date.getTime() - now.getTime()) / 1000;

        // Choose appropriate time unit
        const units = [
            { unit: 'year', seconds: 31536000 },
            { unit: 'month', seconds: 2592000 },
            { unit: 'week', seconds: 604800 },
            { unit: 'day', seconds: 86400 },
            { unit: 'hour', seconds: 3600 },
            { unit: 'minute', seconds: 60 },
            { unit: 'second', seconds: 1 }
        ];

        const matchedUnit = units.find(u => Math.abs(diffInSeconds) >= u.seconds);

        if (matchedUnit) {
            return rtf.format(
                Math.floor(diffInSeconds / matchedUnit.seconds),
                matchedUnit.unit as Intl.RelativeTimeFormatUnit
            );
        }

        return rtf.format(0, 'second');
    }

    /**
     * Parse and validate date string
     * 
     * @param {string} dateString - ISO 8601 or standard date string
     * @returns {Date|null} Parsed date or null if invalid
     */
    static parseDate(dateString: string): Date | null {
        try {
            const date = new Date(dateString);
            return isNaN(date.getTime()) ? null : date;
        } catch {
            return null;
        }
    }
}

// Example Usage
function demonstrateDateFormatting(): void {
    const dateExamples = [
        '2022-09-19',
        '2022-09-19T12:00:00.000Z'
    ];

    const locales = ['en-US', 'de-DE', 'fr-FR', 'ja-JP', 'ar-SA'];

    dateExamples.forEach(dateStr => {
        console.log(`\nFormatting: ${dateStr}`);

        locales.forEach(locale => {
            console.log(`\n${locale} Formats:`);

            // Different formatting styles
            console.log('- Full Date:',
                DateFormatter.formatDate(dateStr, {
                    locale,
                    dateStyle: 'full'
                })
            );

            console.log('- Long Date with Time:',
                DateFormatter.formatDate(dateStr, {
                    locale,
                    dateStyle: 'long',
                    timeStyle: 'long'
                })
            );

            // Relative time formatting
            console.log('- Relative Time:',
                DateFormatter.formatRelativeTime(dateStr, { locale })
            );
        });
    });
}

// Uncomment to run demonstration
// demonstrateDateFormatting();