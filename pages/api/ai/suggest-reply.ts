
// This is a mock API route to simulate AI-powered sales message generation.

export default function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ error: 'No context provided.' });
    }
    
    // Simulate API processing time and generate a simple contextual reply
    setTimeout(() => {
        const vehicle = context.split('interested in ')[1] || 'the vehicle';
        const mockReply = `Thank you for your interest in ${vehicle}! It's a fantastic choice with great features. Would you be available for a test drive this week? We have slots open on Wednesday and Friday afternoon.`;
        
        console.log("Simulating Gemini API call for sales reply suggestion...");
        res.status(200).json({ reply: mockReply });
    }, 800);
}
