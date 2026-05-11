import React, { useRef, useState, useEffect, memo, useCallback } from 'react';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SingleDigitInput = memo(({ 
  index, 
  digit, 
  onInputChange, 
  onInputKeyDown, 
  onInputPaste,
  inputRef 
}: {
  index: number;
  digit: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onInputPaste: (e: React.ClipboardEvent<HTMLInputElement>, index: number) => void;
  inputRef: (el: HTMLInputElement | null) => void;
}) => {
  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={digit}
      onChange={(e) => onInputChange(e, index)}
      onKeyDown={(e) => onInputKeyDown(e, index)}
      onPaste={(e) => onInputPaste(e, index)}
      className="flex-1 aspect-square min-w-0 text-center text-[2.4rem] font-bold border border-ejsc-border rounded-ejsc-main focus:border-ejsc-brand focus:ring-1 focus:ring-ejsc-brand/10 focus:outline-none bg-ejsc-bg-card text-ejsc-text-main caret-transparent"
      style={{ transform: 'translateZ(0)' }}
    />
  );
});

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState<string[]>(new Array(6).fill(''));

  useEffect(() => {
    const newDigits = value.split('').slice(0, 6);
    while (newDigits.length < 6) newDigits.push('');
    setDigits(newDigits);
  }, [value]);

  const updateDigits = useCallback((newDigits: string[]) => {
    setDigits(newDigits);
    onChange(newDigits.join(''));
  }, [onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;

    const newDigits = [...digits];
    const lastChar = val.slice(-1);
    const isEmpty = digits.every(d => !d);

    if (isEmpty) {
      // QUY TẮC: Nếu trống, gõ vào bất cứ đâu cũng đẩy về ô 1 và nhảy sang ô 2
      newDigits[0] = lastChar;
      updateDigits(newDigits);
      inputRefs.current[1]?.focus();
    } else {
      newDigits[index] = lastChar;
      updateDigits(newDigits);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newDigits = [...digits];
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        newDigits[index - 1] = '';
        updateDigits(newDigits);
      } else {
        newDigits[index] = '';
        updateDigits(newDigits);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    let newDigits = [...digits];
    const isEmpty = digits.every(d => !d);
    const pastedChars = pastedData.split('');
    
    if (isEmpty) {
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedChars[i] || '';
      }
      updateDigits(newDigits);
      const lastIdx = Math.min(5, pastedData.length - 1);
      inputRefs.current[lastIdx]?.focus();
    } else {
      for (let i = 0; i < pastedChars.length && (index + i) < 6; i++) {
        newDigits[index + i] = pastedChars[i];
      }
      updateDigits(newDigits);
      const lastIdx = Math.min(5, index + pastedData.length - 1);
      inputRefs.current[lastIdx]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-2.5">
      {digits.map((digit, index) => (
        <SingleDigitInput
          key={index}
          index={index}
          digit={digit}
          onInputChange={handleChange}
          onInputKeyDown={handleKeyDown}
          onInputPaste={handlePaste}
          inputRef={(el) => { inputRefs.current[index] = el; }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
