interface ChildProps {
  categories: { id: number; name: string }[];
  selectedCategory: number;
  handleCategoryChange: (id: number) => void;
}

export function CategorySelect({
  categories,
  selectedCategory,
  handleCategoryChange,
}: ChildProps) {
  return (
    <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center">
          <div className="flex rounded-lg bg-white shadow-sm border overflow-hidden">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 font-medium text-sm transition-all duration-200 relative ${
                  selectedCategory === category.id
                    ? "bg-[#213a37] text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                } ${
                  index !== categories.length - 1
                    ? "border-r border-gray-200"
                    : ""
                }`}
              >
                {category.name}
                {selectedCategory === category.id && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${
                      category.id === 2
                        ? "bg-purple-400"
                        : category.id === 1
                        ? "bg-blue-400"
                        : category.id === 3
                        ? "bg-green-400"
                        : category.id === 4
                        ? "bg-gray-400"
                        : "bg-red-400"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
