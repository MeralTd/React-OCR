import { useContext, createContext, useState } from "react";

import styled, { ThemeProvider } from "styled-components";
import { backgroundColor, textColor } from "./Theme";

const Wrapper = styled.div`
  background-color: ${backgroundColor};
  color: ${textColor};
`;

const ThemeToggleContext = createContext();

export const useTheme = () => useContext(ThemeToggleContext);

export const MyThemeProvider = ({ children }) => {
  const localMode = localStorage.getItem("mode");
  const [themeState, setThemeState] = useState({
    mode: localMode ? localMode : "dark",
  });

  const toggle = () => {
    const mode = themeState.mode === "light" ? `dark` : `light`;
    localStorage.setItem("mode", mode);
    setThemeState({ mode: mode });
  };

  return (
    <ThemeToggleContext.Provider value={{ toggle: toggle }}>
      <ThemeProvider
        theme={{
          mode: themeState.mode,
        }}
      >
        <Wrapper>{children}</Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;