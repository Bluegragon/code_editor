import { useEffect, useState } from "react";

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = () =>
      document.documentElement.classList.contains("dark");

    setIsDark(isDarkMode());

    const observer = new MutationObserver(() => {
      setIsDark(isDarkMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export default useIsDarkMode;