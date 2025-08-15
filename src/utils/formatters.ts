
import { CurrencyValue } from "../constants/vehicleData";

export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        // Check if date is valid
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    } catch (error) {
        return 'Invalid Date';
    }
};

export const formatCurrency = (value: number | undefined, currency: string = 'KES'): string => {
    if (value === undefined || isNaN(value)) return '0';
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

export const formatCurrencyValue = (cv: CurrencyValue | undefined): string => {
    if (!cv) return 'N/A';
    return formatCurrency(cv.kesAmount);
}
