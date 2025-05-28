
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel: string;
  onAction?: () => void;
}

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="simpo-card max-w-md mx-auto text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      )}
      <button 
        onClick={onAction}
        className="simpo-button"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default EmptyState;
