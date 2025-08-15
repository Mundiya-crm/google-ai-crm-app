import React from 'react';
import { ICONS } from '../constants/icons';

export const TrainingView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Training & Handover</h2>
                <button onClick={() => setView('project_roadmap')} className="btn-secondary text-xs">&larr; Back to Roadmap</button>
            </div>
            <p className="text-sm text-secondary mb-4">
                This portal contains all necessary resources for training and project handover.
            </p>
             <div className="space-y-3">
                 <a href="#" className="flex items-center gap-4 p-4 bg-primary rounded-md border border-secondary hover:border-accent">
                     <div className="w-8 h-8 flex-shrink-0">{ICONS.training}</div>
                     <div>
                        <h4 className="font-semibold text-primary">User Training Videos</h4>
                        <p className="text-xs text-secondary">A playlist of video guides covering all major CRM features.</p>
                     </div>
                 </a>
                 <a href="#" className="flex items-center gap-4 p-4 bg-primary rounded-md border border-secondary hover:border-accent">
                     <div className="w-8 h-8 flex-shrink-0">{ICONS.reports}</div>
                     <div>
                        <h4 className="font-semibold text-primary">User Documentation</h4>
                        <p className="text-xs text-secondary">A searchable written guide for all user-facing functionality.</p>
                     </div>
                 </a>
                 <a href="#" className="flex items-center gap-4 p-4 bg-primary rounded-md border border-secondary hover:border-accent">
                     <div className="w-8 h-8 flex-shrink-0">{ICONS.devops}</div>
                     <div>
                        <h4 className="font-semibold text-primary">Source Code & Technical Docs</h4>
                        <p className="text-xs text-secondary">Link to the Git repository containing the full source code and technical architecture documents.</p>
                     </div>
                 </a>
             </div>
        </div>
    );
};
