import React, { forwardRef } from 'react';
import { Text } from 'ejsc-ma-component';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  leftSection?: React.ReactNode;
  activeColor?: string;
  variant?: 'vertical' | 'horizontal';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, leftSection, activeColor, variant = 'vertical', className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <Text variant="sub" weight="medium" className="text-slate-700">
            {label}
          </Text>
        )}
        <div className={`relative flex items-center border rounded-[var(--ejsc-radius-unit)] bg-white transition-all overflow-hidden ${error ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-400/10 shadow-sm'}`}>
          {leftSection && <div className="shrink-0">{leftSection}</div>}
          <div className="relative flex-1 flex items-center px-4">
            {icon && <div className="mr-3 text-slate-400 shrink-0">{icon}</div>}
            <input
              ref={ref}
              className={`w-full py-3.5 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-[1.1rem] ${className}`}
              {...props}
            />
          </div>
        </div>
        {error && (
          <Text variant="tiny" className="text-red-500 font-medium px-1">
            {error}
          </Text>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
