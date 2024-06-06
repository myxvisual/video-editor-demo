import { CSSManager } from "koss";
import { theme } from "~/components/ThemeContext";

// Create a cssManager instance.
export const cssManager = new CSSManager(theme);
export const addStyles = cssManager.addStyles.bind(cssManager);
