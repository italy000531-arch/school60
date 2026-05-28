import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DateSelectorProps {
  date: number;
  weekday: string;
  onPrev: () => void;
  onNext: () => void;
}

export default function DateSelector({ date, weekday, onPrev, onNext }: DateSelectorProps) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center py-2">
      <button
        onClick={onPrev}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform"
      >
        <ChevronLeft className="w-5 h-5 text-gray-400" />
      </button>

      <motion.div
        key={date}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center mx-6"
      >
        <span className="text-5xl font-extrabold text-gray-900 leading-none">
          {String(date).padStart(2, '0')}
        </span>
        <span className="mt-1 px-3 py-0.5 bg-[#007AFF] text-white text-sm font-semibold rounded-full">
          星期{weekday}
        </span>
      </motion.div>

      <button
        onClick={onNext}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm active:scale-95 transition-transform"
      >
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
}
