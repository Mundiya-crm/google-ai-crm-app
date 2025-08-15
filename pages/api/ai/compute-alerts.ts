
// This is a mock API route to simulate computing predictive alerts.
// In a real application, this would be a scheduled batch job (e.g., a cron job)
// that analyzes sales, leads, and vehicle data to generate insights.

import { Alert } from '../../../src/constants/dataTypes';

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

export default function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Simulate API processing time
    setTimeout(() => {
        console.log("Simulating predictive alert computation...");
        res.status(200).json(mockAlerts);
    }, 1000);
}
