/**
 * Hook to get colors based on current theme
 */
import { useTheme } from '../context/ThemeContext';
import { getColors } from '../theme/colors';

export const useColors = () => {
  const { isDarkMode } = useTheme();
  return getColors(isDarkMode);
};

export default useColors;

