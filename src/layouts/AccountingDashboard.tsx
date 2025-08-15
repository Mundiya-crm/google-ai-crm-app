
import React from 'react';
import { GlassButton } from '../components/GlassButton';
import { ICONS } from '../constants/icons';

interface AccountingDashboardProps {
  setView: (view: string) => void;
}

export const AccountingDashboard: React.FC<AccountingDashboardProps> = ({ setView }) => {
  const handleComingSoon = () => {
    alert('This feature is coming soon!');
  };

  return (
    <div className="bg-content-secondary p-6 rounded-md border border-content-primary shadow-inner h-full">
      <h2 className="text-2xl font-bold text-content-primary mb-6 border-b border-content-primary pb-4">
        Accounting Hub
      </h2>
      <p className="text-sm text-content-secondary mb-8">
        Manage all your financial activities from here. Start with the Chart of Accounts to set up your business's financial structure.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <GlassButton
          icon={ICONS.chartOfAccounts}
          label="Chart of Accounts"
          onClick={() => setView('chart_of_accounts')}
        />
        <GlassButton
          icon={ICONS.newJournalEntry}
          label="General Journal"
          onClick={() => setView('general_journal')}
        />
        <GlassButton
          icon={ICONS.ledger}
          label="Ledgers"
          onClick={handleComingSoon}
          disabled
        />
         <GlassButton
          icon={ICONS.reports}
          label="Trial Balance"
          onClick={handleComingSoon}
          disabled
        />
        <GlassButton
          icon={ICONS.reports}
          label="Income Statement"
          onClick={handleComingSoon}
          disabled
        />
        <GlassButton
          icon={ICONS.reports}
          label="Balance Sheet"
          onClick={handleComingSoon}
          disabled
        />
      </div>
    </div>
  );
};
