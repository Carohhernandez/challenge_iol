import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'

// Containers
import CharactersList from "./containers/CharactersLitst";
import CharacterDetails from "./containers/CharacterDetails";

// Components 
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  body {
    height:100%;
    margin: 0px;
    font-family: "Raleway", sans-serif;
    font-size: 18px;
    font-weight: 400;
    background-color: #202329;
    color: #fff;
  }
`;

const App = () => (
  <>
      <GlobalStyle />
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<CharactersList/>} exact />
            <Route path="/characters/:id" element={<CharacterDetails/>} exact/>
          </Routes>
      </BrowserRouter>
  </>
);

export default App;
