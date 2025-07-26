// src/components/Header.tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../images/logo/logo_clearname.png";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "ホーム", href: "/" },
    { label: "メンバー紹介", href: "/members" },
    { label: "ニュース情報", href: "/news" },
    { label: "K-League", href: "#league" },
  ];
  return (
    <header
      className="fixed top-0 w-full shadow-lg"
      style={{ backgroundColor: "#213a37" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}

          <div className="h-16 w-56">
            <img src={logo} alt="ロゴ"></img>
          </div>

          {/* デスクトップメニュー */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-100 hover:text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white border-opacity-20">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-100 hover:text-white hover:bg-white hover:bg-opacity-10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
