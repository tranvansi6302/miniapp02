import React from 'react';
import { Coins } from 'lucide-react';
import { Text } from 'ejsc-ma-component';

interface HomeWelcomeProps {
  userName: string;
}

export const HomeWelcome: React.FC<HomeWelcomeProps> = ({ userName }) => {
  return (
    <div className="relative z-10 px-4 flex flex-col pt-1 pb-[25px] select-none" style={{ marginTop: '55px' }}>
      <div className="flex items-center justify-between mb-1">
        <Text variant="sub" weight="bold" className="text-white drop-shadow-md">
          Chào {userName}
        </Text>
        <div className="flex items-center gap-1.5 bg-transparent px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
          <Text variant="sub" weight="bold" className="text-white">1.200.000đ</Text>
          <Coins size={14} className="text-white shrink-0" />
        </div>
      </div>
    </div>
  );
};
