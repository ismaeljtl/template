import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  const setBySystemTheme = () => {
    if (typeof window !== undefined) {
      if (matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDark(true);
      }
    }
  };

  useEffect(() => {
    setBySystemTheme();
    themeChange(false);
  }, []);

  return (
    <nav className=" container mx-auto navbar bg-base-100 ">
      <div className="flex-1">
        <p className="normal-case text-xl">Project name 🍕</p>
      </div>
      <div className="flex-none">
        <button
          data-set-theme={`${isDark ? "light" : "dark"}`}
          data-act-class="ACTIVECLASS"
          onClick={() => {
            const val = isDark;
            setIsDark(!val);
          }}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Header;
