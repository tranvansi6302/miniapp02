import React from 'react';
import { StandardPage } from 'ejsc-ma-component';
import { useHome } from '~/features/home/hooks/useHome';

// Feature Components
import { HomeHeader } from '~/features/home/components/HomeHeader';
import { HomeWelcome } from '~/features/home/components/HomeWelcome';
import { HomeQuickStats } from '~/features/home/components/HomeQuickStats';
import { HomeQuickAction } from '~/features/home/components/HomeQuickAction';
import { HomeServiceGrid } from '~/features/home/components/HomeServiceGrid';
import { HomeOfferSection } from '~/features/home/components/HomeOfferSection';

const HomeScreen: React.FC = () => {
  const { user, navigate, handleRefresh } = useHome();

  return (
    <StandardPage
      onRefresh={handleRefresh}
      hideAppBar
      contentClassName="p-0"
    >
      <div className="relative bg-ejsc-bg-page min-h-screen">
        <HomeHeader onNavigate={navigate} />
        
        <HomeWelcome 
          userName={user ? (user.fullName || user.FirstName || 'bạn') : 'bạn'} 
        />

        {/* Main Curved Content Container */}
        <div className="relative z-20 bg-gradient-to-b from-ejsc-bg-page via-white via-[10%] to-white px-4 pt-5 pb-8 flex flex-col gap-2.5 min-h-screen -mt-2 shadow-2xl rounded-t-(--ejsc-sys-radius)">
          <HomeQuickStats />
          <HomeQuickAction />
          <HomeServiceGrid />
          <HomeOfferSection />
        </div>
      </div>
    </StandardPage>
  );
};

export default HomeScreen;
