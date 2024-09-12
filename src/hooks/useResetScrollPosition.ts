import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useResetScrollPosition = () => {
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);
};
