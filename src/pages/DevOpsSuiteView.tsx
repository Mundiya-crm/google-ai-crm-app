import React from 'react';

export const DevOpsSuiteView: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg border border-primary shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-primary">
                <h2 className="text-2xl font-bold text-primary">DevOps & AI Developer Suite</h2>
                <button onClick={() => setView('project_roadmap')} className="btn-secondary text-xs">&larr; Back to Roadmap</button>
            </div>
            <div className="text-sm text-secondary space-y-4">
                <p>
                    This suite represents the final, most advanced phase of the project, providing an integrated, AI-powered development environment directly within the application.
                </p>
                 <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><span className="font-semibold">AI Code Editor:</span> A built-in version of VS Code Lite for making quick changes.</li>
                    <li><span className="font-semibold">AI Code Generator:</span> Automatically generate boilerplate code, components, and functions from a text prompt.</li>
                    <li><span className="font-semibold">One-Click Deployments:</span> Push changes to staging and production environments with a single button.</li>
                     <li><span className="font-semibold">Automation Builder:</span> A no-code interface for creating custom workflows and webhooks.</li>
                </ul>
                <p className="font-bold text-primary">This feature set is planned for a future release after the initial handover.</p>
            </div>
        </div>
    );
};
