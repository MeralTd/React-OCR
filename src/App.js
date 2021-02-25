import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./components/Theme";
import Switch from "@material-ui/core/Switch";
import Ocr from "./components/Ocr";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import github from "./github.png";
import linkedin from "./linkedin.png";

const Text = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
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
            <Switch onClick={themeToggler} color="primary" />
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Ocr></Ocr>
    </ThemeProvider>
  );
}

export default App;
