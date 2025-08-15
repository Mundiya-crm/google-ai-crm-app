
import React from 'react';

interface GlassButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ icon, label, onClick, disabled }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-start p-3 space-x-4 rounded-lg border border-content-border-primary bg-content-secondary/50 shadow-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-content-tertiary/60 hover:border-accent/50 active:shadow-inner active:scale-[0.98] active:bg-content-secondary/30 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:border-content-border-primary">
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">{icon}</div>
      <span className="font-bold text-content-primary text-base">{label}</span>
    </button>
  );
};
