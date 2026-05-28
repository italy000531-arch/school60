import { Sun, UtensilsCrossed, Cookie } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

interface MealCardProps {
  type: 'breakfast' | 'lunch' | 'afternoon';
  title: string;
  time: string;
  content: string;
  lunchDetail?: {
    staple: string;
    main: string;
    side1: string;
    side2: string;
    soup: string;
    fruit: string;
  };
}

const headerConfig = {
  breakfast: {
    gradient: 'from-[#FF9500] to-[#FFB84D]',
    icon: Sun,
  },
  lunch: {
    gradient: 'from-[#34C759] to-[#5BD47B]',
    icon: UtensilsCrossed,
  },
  afternoon: {
    gradient: 'from-[#5856D6] to-[#7A79E0]',
    icon: Cookie,
  },
};

export default function MealCard({ type, title, time, content, lunchDetail }: MealCardProps) {
  const config = headerConfig[type];
  const Icon = config.icon;

  return (
    <div className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.gradient} px-4 py-2 flex items-center gap-2`}>
        <Icon className="w-4 h-4 text-white" />
        <span className="text-white text-sm font-bold">
          {title} {time}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {type === 'lunch' && lunchDetail ? (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <CategoryBadge category="主食" />
              <span className="text-base font-medium text-gray-800">{lunchDetail.staple}</span>
            </div>
            <div className="flex items-center gap-2">
              <CategoryBadge category="主菜" />
              <span className="text-base font-medium text-gray-800">{lunchDetail.main}</span>
            </div>
            <div className="flex items-center gap-2">
              <CategoryBadge category="副菜" />
              <span className="text-base font-medium text-gray-800">{lunchDetail.side1}</span>
            </div>
            {lunchDetail.side2 && (
              <div className="flex items-center gap-2">
                <CategoryBadge category="副菜" />
                <span className="text-base font-medium text-gray-800">{lunchDetail.side2}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <CategoryBadge category="湯品" />
              <span className="text-base font-medium text-gray-800">{lunchDetail.soup}</span>
            </div>
            <div className="flex items-center gap-2">
              <CategoryBadge category="水果" />
              <span className="text-base font-medium text-gray-800">{lunchDetail.fruit}</span>
            </div>
          </div>
        ) : (
          <p className="text-base font-medium text-gray-800">{content}</p>
        )}
      </div>
    </div>
  );
}
