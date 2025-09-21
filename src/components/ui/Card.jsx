import React from 'react';

const Card = ({ 
  children, 
  className = '',
  padding = 'normal',
  shadow = 'normal',
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl transition-all duration-300';
  
  const paddings = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };
  
  const shadows = {
    none: '',
    small: 'shadow-sm',
    normal: 'shadow-lg',
    large: 'shadow-xl'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105' : '';
  
  return (
    <div
      className={`${baseClasses} ${paddings[padding]} ${shadows[shadow]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
