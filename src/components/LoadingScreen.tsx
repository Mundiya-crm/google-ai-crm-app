import React from 'react';

export const LoadingScreen: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-primary">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent mx-auto"></div>
                <h2 className="text-2xl font-semibold text-primary mt-4">Loading Your Dashboard...</h2>
                <p className="text-secondary mt-2">Preparing your data, please wait a moment.</p>
            </div>
        </div>
    );
};