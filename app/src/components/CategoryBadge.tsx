interface CategoryBadgeProps {
  category: string;
}

const colorMap: Record<string, string> = {
  '主食': 'bg-meal-green',
  '主菜': 'bg-meal-orange',
  '副菜': 'bg-meal-purple',
  '湯品': 'bg-meal-soup',
  '水果': 'bg-meal-fruit',
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const bgClass = colorMap[category] || 'bg-gray-400';
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-semibold text-white leading-tight ${bgClass}`}
    >
      {category}
    </span>
  );
}
