import React from 'react';

const Badge = ({
  variant = 'light',
  color = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    'inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium';

  const sizeStyles = {
    sm: 'text-theme-xs',
    md: 'text-sm',
  };

  const variants = {
    light: {
      primary: 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400',
      success: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500',
      error: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
      warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400',
      info: 'bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500',
      light: 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80',
      dark: 'bg-gray-500 text-white dark:bg-white/5 dark:text-white',
      pink: 'bg-pink-50 text-pink-500 dark:bg-pink-500/15 dark:text-pink-500',
      teal: 'bg-teal-50 text-teal-600 dark:bg-teal-500/15 dark:text-teal-500',
      purple: 'bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-500',
      indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-500',
      orange: 'bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-500',
      red: 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500',
      green: 'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500',
      blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-500',
    },
    solid: {
      primary: 'bg-brand-500 text-white dark:text-white',
      success: 'bg-success-500 text-white dark:text-white',
      error: 'bg-error-500 text-white dark:text-white',
      warning: 'bg-warning-500 text-white dark:text-white',
      info: 'bg-blue-light-500 text-white dark:text-white',
      light: 'bg-gray-400 dark:bg-white/5 text-white dark:text-white/80',
      dark: 'bg-gray-700 text-white dark:text-white',
      pink: 'bg-pink-500 text-white dark:text-white',
      teal: 'bg-teal-500 text-white dark:text-white',
      purple: 'bg-purple-500 text-white dark:text-white',
      indigo: 'bg-indigo-500 text-white dark:text-white',
      orange: 'bg-orange-500 text-white dark:text-white',
      red: 'bg-red-500 text-white dark:text-white',
      green: 'bg-green-500 text-white dark:text-white',
      blue: 'bg-blue-500 text-white dark:text-white',
    },
  };

  const sizeClass = sizeStyles[size];
  const colorStyles = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
