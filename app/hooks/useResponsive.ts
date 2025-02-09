import { useMediaQuery } from "react-responsive";

/**
 *
 * Created a hook which is exactly following tailwind specific media queries
 */
function useResponsive() {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" }); // sm
  const isMediumScreen = useMediaQuery({ query: "(max-width: 768px)" }); // md
  const isLargeScreen = useMediaQuery({ query: "(max-width: 1024px)" }); // lg
  const isExtraLargeScreen = useMediaQuery({ query: "(max-width: 1280px)" }); // xl
  const is2XLargeScreen = useMediaQuery({ query: "(max-width: 1536px)" }); // 2xl

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
    is2XLargeScreen,
  };
}

export default useResponsive;
