import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Lead, TimelineEvent } from '../constants/dataTypes';
import { useAuth } from '../context/AuthContext';
import { ICONS } from '../constants/icons';
import { suggestReply } from '../api/mockApi';

const LeadListItem: React.FC<{ lead: Lead, onSelect: () => void, isSelected: boolean }> = ({ lead, onSelect, isSelected }) => (
    <button onClick={onSelect} className={`w-full text-left p-3 rounded-lg transition-colors ${isSelected ? 'bg-accent/20' : 'hover:bg-tertiary/50'}`}>
        <p className="font-bold text-primary">{lead.customerName}</p>
        <p className="text-xs text-secondary truncate">Interested in: {lead.vehicleOfInterest}</p>
        <p className={`text-xs font-semibold mt-1 ${lead.status === 'Follow-up' ? 'text-yellow-400' : 'text-secondary'}`}>{lead.status}</p>
    </button>
);

const TimelineItem: React.FC<{ event: TimelineEvent }> = ({ event }) => {
    const isAi = event.author === 'AI Assistant';
    return (
        <div className={`flex items-start gap-3 ${isAi ? '' : 'ml-auto flex-row-reverse'}`} style={{ maxWidth: '80%' }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-primary font-bold text-sm flex-shrink-0 ${isAi ? 'bg-accent' : 'bg-tertiary'}`}>
                {event.author.charAt(0)}
            </div>
            <div className={`p-2 rounded-lg ${isAi ? 'bg-accent/20' : 'bg-tertiary'}`}>
                <p className="text-xs text-primary">{event.content}</p>
                <p className="text-[10px] text-secondary mt-1 text-right">{new Date(event.timestamp).toLocaleTimeString()}</p>
            </div>
        </div>
    );
}

export const SalesAssistantView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    const { user } = useAuth();
    const { leads, timeline, setTimeline } = useData();
    const [selectedLeadId, setSelectedLeadId] = useState<number | null>(leads[0]?.id || null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const selectedLead = useMemo(() => leads.find(l => l.id === selectedLeadId), [selectedLeadId, leads]);
    const leadTimeline = useMemo(() => timeline.filter(t => t.leadId === selectedLeadId), [selectedLeadId, timeline]);

    const handleGenerateReply = async () => {
        if (!selectedLead) return;
        setIsLoading(true);
        try {
            const data = await suggestReply(`Customer ${selectedLead.customerName} is interested in ${selectedLead.vehicleOfInterest}`);
            
            const newEvent: TimelineEvent = {
                id: Date.now(),
                leadId: selectedLead.id,
                timestamp: new Date().toISOString(),
                type: 'AI_SUGGESTION',
                content: data.reply,
                author: 'AI Assistant'
            };
            setTimeline(prev => [...prev, newEvent]);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        if (!message || !selectedLeadId) return;
        const newEvent: TimelineEvent = {
            id: Date.now(),
            leadId: selectedLeadId,
            timestamp: new Date().toISOString(),
            type: 'USER_MESSAGE',
            content: message,
            author: user?.name || 'User'
        };
        setTimeline(prev => [...prev, newEvent]);
        setMessage('');
    };

    return (
        <div className="bg-secondary p-4 rounded-lg border border-primary shadow-lg h-full flex gap-4">
            {/* Lead List */}
            <div className="w-1/4 bg-primary rounded-lg p-2 flex flex-col">
                <h3 className="text-lg font-bold text-primary p-2">Leads</h3>
                <div className="flex-grow overflow-y-auto space-y-1">
                    {leads.map(lead => (
                        <LeadListItem 
                            key={lead.id} 
                            lead={lead} 
                            isSelected={selectedLeadId === lead.id}
                            onSelect={() => setSelectedLeadId(lead.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Chat/Timeline View */}
            <div className="w-3/4 bg-primary rounded-lg p-2 flex flex-col">
                {selectedLead ? (
                    <>
                        <div className="p-3 border-b border-secondary">
                            <h3 className="font-bold text-primary">{selectedLead.customerName}</h3>
                            <p className="text-xs text-secondary">Topic: {selectedLead.vehicleOfInterest}</p>
                        </div>
                        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                            {leadTimeline.map(event => <TimelineItem key={event.id} event={event} />)}
                        </div>
                        <div className="p-3 border-t border-secondary mt-auto">
                            <div className="flex gap-2">
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    rows={2}
                                    className="flex-grow w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                                <button onClick={handleSend} className="btn-primary self-stretch">Send</button>
                            </div>
                            <button onClick={handleGenerateReply} disabled={isLoading} className="flex items-center gap-2 text-xs text-accent hover:underline mt-2">
                                <div className="w-4 h-4">{ICONS.findAi}</div>
                                {isLoading ? 'Generating...' : 'Suggest Reply with AI'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-secondary">Select a lead to view the conversation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
