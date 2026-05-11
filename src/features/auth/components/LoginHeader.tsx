import React from 'react';
import { useNavigate } from 'ejsc-ma-router';
import { ChevronLeft } from 'lucide-react';
import { Text, Lang } from 'ejsc-ma-component';

const LoginHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center px-6 pt-0 pb-2 h-[220px] relative bg-slate-50 transform-gpu will-change-transform">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 z-20 flex items-center justify-center rounded-full bg-white shadow-md select-none active:scale-95 transition-transform w-12 h-12"
          style={{ top: 'calc(1.5rem + env(safe-area-inset-top, 0px))' }}
        >
          <ChevronLeft size={24} className="text-ejsc-text-main" />
        </button>

        <img
          src={new URL('../../../assets/icons/login-icon.png', import.meta.url).href}
          alt="Login illustration"
          className="h-50 object-contain relative z-10"
          style={{ marginTop: '2rem' }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
      </div>

      <div className="px-8 pt-6">
        <Text variant="h2" weight="bold" block className="text-ejsc-text-main">
          <Lang id="hb-wv-login-t" />
        </Text>
        <Text variant="base" block className="mt-1.5 text-ejsc-text-sub">
          <Lang id="hb-wv-login-d" />
        </Text>
      </div>
    </>
  );
};

export default LoginHeader;
