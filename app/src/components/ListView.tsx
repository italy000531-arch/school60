import { motion } from 'framer-motion';
import { menuData } from '@/data/menuData';
import { Sun, UtensilsCrossed, Cookie } from 'lucide-react';

interface ListViewProps {
  onSelectDate: (date: number) => void;
}

export default function ListView({ onSelectDate }: ListViewProps) {
  return (
    <div className="space-y-3 pb-8">
      {menuData.map((item, index) => (
        <motion.button
          key={item.date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          onClick={() => onSelectDate(item.date)}
          className="w-full bg-white rounded-2xl p-4 shadow-sm text-left active:scale-[0.98] transition-transform"
        >
          {item.isHoliday ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-300">
                  {String(item.date).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm text-gray-400">6月{item.date}日</p>
                  <p className="text-sm text-gray-400">星期{item.weekday}</p>
                </div>
              </div>
              <span className="text-[#FF3B30] font-semibold text-lg">周休二日</span>
            </div>
          ) : (
            <>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-bold text-gray-900">
                  {String(item.date).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    6月{item.date}日 星期{item.weekday}
                  </p>
                </div>
                {item.specialNote && (
                  <span className="ml-auto text-xs bg-[#FF9500] text-white px-2 py-0.5 rounded-full">
                    {item.specialNote}
                  </span>
                )}
              </div>

              {/* Meals summary */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Sun className="w-3.5 h-3.5 text-[#FF9500] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{item.breakfast}</p>
                </div>
                <div className="flex items-start gap-2">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#34C759] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    {item.lunch.staple} / {item.lunch.main} / {item.lunch.side1}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Cookie className="w-3.5 h-3.5 text-[#5856D6] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{item.afternoon}</p>
                </div>
              </div>
            </>
          )}
        </motion.button>
      ))}
    </div>
  );
}
