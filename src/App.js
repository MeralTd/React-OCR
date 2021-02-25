import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./components/Theme";
import Ocr from "./components/Ocr";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import github from "./github.png";
import linkedin from "./linkedin.png";
import Switch from "react-switch";
import { IoMdSunny, IoMdMoon } from "react-icons/all";

const Text = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const getStyles = (mode) => ({
  switch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 35,
    paddingLeft: mode === "dark" ? 30 : 10
  },
  switch1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 55,
    paddingLeft: mode === "dark" ? 30 : 10
  }
});

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  const styles = getStyles(theme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
        <Navbar.Brand href="#home">
          <Text>React-OCR</Text>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="https://github.com/MeralTd">
              <Text>
                <img alt="" src={github} width="25" height="25" /> GitHub
              </Text>
            </Nav.Link>{" "}
            <Nav.Link href="https://www.linkedin.com/in/meraltd/">
              <Text>
                <img alt="" src={linkedin} width="25" height="25" /> LinkedIn
              </Text>
            </Nav.Link>
            <Switch
            checked={theme === "light" ? true : false}
      height={40}
      width={110}
      offColor="#0721b1"
      onColor="#FDB813"
      checkedIcon={
        <IoMdSunny style={styles.switch} color="white" className="light" />
      }
      uncheckedIcon={
        <IoMdMoon style={styles.switch1} color="white" className="dark" />
      }
      onChange={themeToggler}
    />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Ocr></Ocr>
    </ThemeProvider>
  );
}

export default App;
