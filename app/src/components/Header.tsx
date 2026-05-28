interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <div className="flex-shrink-0 px-4 pt-4 pb-2">
      {/* Logo and Title */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="/logo.png"
          alt="茱莉亞幼兒園 Logo"
          className="w-12 h-12 object-contain"
        />
        <div>
          <p className="text-sm text-gray-500">新北市私立茱莉亞幼兒園</p>
          <h1 className="text-xl font-bold text-gray-900">6月幼兒餐點表</h1>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-gray-200/70 rounded-xl p-1">
        <button
          onClick={() => onTabChange('daily')}
          className={`
            flex-1 py-2 text-base font-semibold rounded-lg transition-all duration-200
            ${activeTab === 'daily'
              ? 'bg-white text-[#007AFF] shadow-sm'
              : 'text-gray-500'
            }
          `}
        >
          每日
        </button>
        <button
          onClick={() => onTabChange('list')}
          className={`
            flex-1 py-2 text-base font-semibold rounded-lg transition-all duration-200
            ${activeTab === 'list'
              ? 'bg-white text-[#007AFF] shadow-sm'
              : 'text-gray-500'
            }
          `}
        >
          清單
        </button>
      </div>
    </div>
  );
}
