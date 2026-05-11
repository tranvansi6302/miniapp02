import React from 'react';
import { useNavigate } from 'ejsc-ma-router';
import { ChevronLeft } from 'lucide-react';

const OtpHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center px-6 pb-2"
      style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))' }}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center rounded-full bg-slate-50 select-none active:scale-95 transition-transform w-10 h-10"
      >
        <ChevronLeft size={24} className="text-ejsc-text-main" />
      </button>
    </div>
  );
};

export default OtpHeader;
