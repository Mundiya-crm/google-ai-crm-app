
import React, { useState } from 'react';
import { ICONS } from '../constants/icons';
import { useTheme } from '../context/ThemeContext';

type Tab = 'About' | 'My Options' | 'My Links';

const TabButton: React.FC<{ tab: { name: Tab, icon: React.ReactNode }, isActive: boolean, onClick: () => void }> = ({ tab, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md text-xs font-semibold transition-colors duration-200 border-t border-l border-r border-transparent ${
            isActive
                ? 'bg-secondary border-primary text-primary'
                : 'bg-tertiary/50 text-secondary hover:bg-tertiary/80'
        }`}
    >
        <div className="w-4 h-4">{tab.icon}</div>
        {tab.name}
    </button>
);

const OptionsPanel: React.FC = () => {
    const { theme, setTheme, buttonStyle, setButtonStyle } = useTheme();

    return (
        <div className="bg-secondary p-4 border border-primary rounded-b-md rounded-tr-md">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
                <div>
                    <label htmlFor="style-select" className="block text-xs font-medium text-secondary mb-1">Theme / Style:</label>
                    <select 
                        id="style-select" 
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as any)}
                        className="w-full sm:w-48 text-sm px-2 py-1 border border-secondary rounded-btn focus:outline-none focus:ring-1 focus:ring-accent bg-primary text-primary">
                        <optgroup label="Aero Themes">
                            <option value="windows-aero">Aero (Light)</option>
                            <option value="aero-noir">Aero Noir (Dark)</option>
                        </optgroup>
                         <optgroup label="Dark Themes">
                            <option value="sleek-carbon">Sleek Carbon</option>
                            <option value="oceanic-blue">Oceanic Blue</option>
                            <option value="matrix-green">Matrix Green</option>
                            <option value="sunset-glow">Sunset Glow</option>
                        </optgroup>
                        <optgroup label="Light Themes">
                            <option value="classic-light">Classic Light</option>
                            <option value="minty-fresh">Minty Fresh</option>
                            <option value="sakura-pink">Sakura Pink</option>
                        </optgroup>
                    </select>
                </div>
                 <div>
                    <label htmlFor="button-style-select" className="block text-xs font-medium text-secondary mb-1">Button Style:</label>
                    <select 
                        id="button-style-select" 
                        value={buttonStyle}
                        onChange={(e) => setButtonStyle(e.target.value as any)}
                        className="w-full sm:w-48 text-sm px-2 py-1 border border-secondary rounded-btn focus:outline-none focus:ring-1 focus:ring-accent bg-primary text-primary">
                        <option value="sharp">Sharp</option>
                        <option value="rounded">Rounded</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export const Footer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('My Options');
    const [isExpanded, setIsExpanded] = useState(true);

    const tabs: { name: Tab, icon: React.ReactNode }[] = [
        { name: 'My Options', icon: ICONS.myOptions },
        { name: 'My Links', icon: ICONS.myLinks },
        { name: 'About', icon: ICONS.about },
    ];
    
    const ChevronIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
    );

    const handleTabClick = (tabName: Tab) => {
        setActiveTab(tabName);
        if (!isExpanded) {
            setIsExpanded(true);
        }
    };
    
    const PanelPlaceholder: React.FC<{text: string}> = ({text}) => (
         <div className="bg-secondary p-4 border border-primary rounded-b-md rounded-tr-md">
            <p className="text-secondary">{text}</p>
        </div>
    );

    const panels: Partial<Record<Tab, React.ReactNode>> = {
        'My Options': <OptionsPanel />,
        'My Links': <PanelPlaceholder text="My Links panel coming soon."/>,
        'About': <PanelPlaceholder text="About panel coming soon."/>
    };

    return (
        <footer>
            <div className="flex justify-between items-end">
                <div className="flex">
                    {tabs.map(tab => (
                        <TabButton 
                            key={tab.name}
                            tab={tab}
                            isActive={activeTab === tab.name}
                            onClick={() => handleTabClick(tab.name)}
                        />
                    ))}
                </div>
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="p-1 rounded-t-md text-secondary hover:text-primary hover:bg-tertiary/60"
                    aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
                >
                    <ChevronIcon />
                </button>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                {panels[activeTab]}
            </div>
        </footer>
    );
};
