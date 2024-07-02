/*
 * NextJS TS Alert Component
 * 
 * This component displays an alert message at the top of the screen.
 * 
 * Structure:
 * - Left: InformationCircleIcon
 * - Center: Alert text
 * - Right: Close button with XMarkIcon
 * 
 * Styles:
 * - Position: Fixed at the top of the screen
 * - Width: Full-width
 * - Padding: Applied to the entire component
 * - Background color: Light blue
 * - Top border: Dark blue
 * - Text color: Dark blue
 */

import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface AlertProps {
    readonly message: string;
    readonly onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="w-full p-4 mb-5 bg-blue-100 border-t-2 border-blue-500 text-blue-900">
      <InformationCircleIcon className="h-6 w-6 inline-block" />
      <span className="ml-2">{message}</span>
      <button onClick={onClose} className="float-right">
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Alert;