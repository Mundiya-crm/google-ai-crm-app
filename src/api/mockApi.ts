import { Alert } from '../constants/dataTypes';
import { ExtractedData } from '../components/OcrReviewPanel';

const mockAlerts: Alert[] = [
    {
        id: 'trend_1',
        type: 'TREND',
        title: 'Trending Model: Toyota Vitz',
        description: 'Sales and inquiries for Toyota Vitz have increased by 25% in the last 30 days. Consider stocking more.',
        priority: 'High',
    },
    {
        id: 'lead_1',
        type: 'LEAD',
        title: 'High-Intent Lead: John Appleseed',
        description: 'This lead has contacted you 3 times in the last 48 hours. A quick follow-up is recommended.',
        priority: 'High',
        relatedEntityId: 1,
    },
    {
        id: 'followup_1',
        type: 'FOLLOW_UP',
        title: 'Follow-up Reminder: Jane Doe',
        description: 'It has been over 3 days since the last contact with this lead for a Nissan Note.',
        priority: 'Medium',
        relatedEntityId: 2,
    },
];

export const computeAlerts = (): Promise<Alert[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Simulating predictive alert computation...");
            resolve(mockAlerts);
        }, 1000);
    });
};

const mockExtractedData: ExtractedData = {
    chassisNumber: { value: 'NZE161-7118321', confidence: 0.98 },
    make: { value: 'Toyota', confidence: 0.99 },
    model: { value: 'Corolla Axio', confidence: 0.95 },
    year: { value: '2017', confidence: 0.92 },
    mileage: { value: '91,849km', confidence: 0.88 },
    color: { value: 'Pearl', confidence: 0.96 },
    grade: { value: 'G WXB', confidence: 0.85 },
    engineCC: { value: '1500cc', confidence: 0.91 },
};

export const extractFromImage = (base64Image: string): Promise<ExtractedData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Simulating Gemini API call for OCR...");
            resolve(mockExtractedData);
        }, 1500);
    });
};

export const suggestReply = (context: string): Promise<{ reply: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const vehicle = context.split('interested in ')[1] || 'the vehicle';
            const mockReply = `Thank you for your interest in ${vehicle}! It's a fantastic choice with great features. Would you be available for a test drive this week? We have slots open on Wednesday and Friday afternoon.`;
            
            console.log("Simulating Gemini API call for sales reply suggestion...");
            resolve({ reply: mockReply });
        }, 800);
    });
};
