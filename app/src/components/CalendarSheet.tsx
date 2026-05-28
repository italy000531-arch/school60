import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronUp, ChevronDown } from 'lucide-react';
import { menuData } from '@/data/menuData';

interface CalendarSheetProps {
  selectedDate: number;
  onSelectDate: (date: number) => void;
}

export default function CalendarSheet({ selectedDate, onSelectDate }: CalendarSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const firstDayOfWeek = 0;

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateClick = (date: number) => {
    onSelectDate(date);
    setIsOpen(false);
  };

  return (
    <div className="flex-shrink-0">
      {/* Collapsed bar */}
      <div
        className="bg-white rounded-t-2xl shadow-[0_-2px 12px_rgba(0,0,0,0.08)] cursor-pointer"
        onClick={toggleCalendar}
      >
        <div className="flex flex-col items-center pt-3 pb-3 px-4">
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-2" />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-base font-semibold text-gray-700">全月日曆預覽</span>
            </div>
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded calendar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="bg-white overflow-hidden"
          >
            <div className="px-4 pb-6">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekdays.map((day) => (
                  <div key={day} className="text-center text-sm text-gray-400 py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {menuData.map((item) => {
                  const isSelected = item.date === selectedDate;
                  const hasMenu = !item.isHoliday;
                  return (
                    <button
                      key={item.date}
                      onClick={() => handleDateClick(item.date)}
                      className={`
                        aspect-square flex flex-col items-center justify-center rounded-xl text-lg font-semibold
                        transition-all duration-150 active:scale-90
                        ${isSelected
                          ? 'bg-[#007AFF] text-white shadow-md'
                          : item.isHoliday
                            ? 'text-[#FF3B30]'
                            : hasMenu
                              ? 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                              : 'text-gray-400'
                        }
                      `}
                    >
                      <span>{item.date}</span>
                      {hasMenu && !isSelected && (
                        <span className="w-1.5 h-1.5 bg-[#007AFF] rounded-full mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
