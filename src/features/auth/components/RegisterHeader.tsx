import React from 'react';
import { useNavigate } from 'ejsc-ma-router';
import { ChevronLeft } from 'lucide-react';
import { Text, Lang } from 'ejsc-ma-component';

const RegisterHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between px-6 pb-2 relative transform-gpu will-change-transform  via-white to-white"
        style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center rounded-full bg-slate-50 select-none active:scale-95 transition-transform w-10 h-10"
        >
          <ChevronLeft size={24} className="text-ejsc-text-main" />
        </button>
      </div>

      <div className="px-8 pt-4 pb-2">
        <Text variant="h2" weight="bold" block className="text-ejsc-text-main">
          <Lang id="hb-wv-reg-t" />
        </Text>
        <Text variant="base" block className="mt-1 text-ejsc-text-sub">
          <Lang id="hb-wv-reg-d" />
        </Text>
      </div>
    </>
  );
};

export default RegisterHeader;
