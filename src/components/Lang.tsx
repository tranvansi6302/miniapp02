/**
 * @file components/Lang.tsx
 * @description Component hỗ trợ đa ngôn ngữ với tính năng tự động thêm attribute debug.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';

interface LangProps {
  id: string;
  fallback?: string;
}

const Lang: React.FC<LangProps> = ({ id, fallback }) => {
  const { t } = useTranslation();
  
  return (
    <span lang={id}>
      {t(id, fallback || '')}
    </span>
  );
};

export default Lang;
