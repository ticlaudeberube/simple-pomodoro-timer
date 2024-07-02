import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'danger' | 'default';
  testid?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  testid = 'default',
  variant = 'default',
  disabled = false,
  children,
}) => {
  const buttonStyles = {
    primary: {
      backgroundColor: 'bg-blue-500',
      textColor: 'text-white',
    },
    danger: {
      backgroundColor: 'bg-red-500',
      textColor: 'text-white',
    },
    default: {
      backgroundColor: 'bg-gray-300',
      textColor: 'text-gray-800',
    }
  }
  const { backgroundColor, textColor } = buttonStyles[variant];
  // const id = testid ? testid : '';
  return (
    <button
      className={`px-4 py-2 rounded focus:outline-none focus:ring transition ${backgroundColor} ${textColor} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testid}
    >
      {children}
    </button>
  );
};

export default Button;