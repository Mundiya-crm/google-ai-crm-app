import React from 'react';

export const AutomatedTestingView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">Automated Testing & Rollback</h2>
                <button onClick={() => setView('project_roadmap')} className="btn-secondary text-xs">&larr; Back to Roadmap</button>
            </div>
            <div className="text-sm text-secondary space-y-4">
                <p>
                    This is a placeholder to describe the automated testing and rollback strategy for ensuring application stability.
                </p>
                 <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><span className="font-semibold">Unit Tests:</span> Each small part of the code is tested in isolation.</li>
                    <li><span className="font-semibold">Integration Tests:</span> Multiple parts are tested together to ensure they work correctly.</li>
                    <li><span className="font-semibold">CI/CD Pipeline:</span> When new code is pushed, all tests run automatically.</li>
                    <li><span className="font-semibold">Staging Deployment:</span> If tests pass, the code is deployed to a staging (test) server.</li>
                    <li><span className="font-semibold">Production Deployment:</span> After manual approval, the code is deployed to the live server.</li>
                    <li><span className="font-semibold">Monitoring & Rollback:</span> The live server is monitored. If errors increase, the system can be automatically rolled back to the previous stable version.</li>
                </ul>
            </div>
        </div>
    );
};
