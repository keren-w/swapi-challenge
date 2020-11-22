import React, { useState } from 'react';
import styled, {createGlobalStyle} from "styled-components";
import Loader from './Loader';
import {getAppData} from '../data/appData';
import Header from "./Header";
import ShowPart from "../../QuestionsView/components/showPart";
import StarJediOutline from '../../../assets/fonts/Starjout.ttf';

const App = () => {
  const [appData, setAppData] = useState(null);

  if (!appData) {
    getAppData().then(data => {
        setAppData(data);
      });
  }

    return (
        <AppWrapper>
            <GlobalStyle/>
            <Header/>
            { !appData ? <Loader/> :  <ShowPart questionsdata={appData}/>}
        </AppWrapper>
    );
}

export default App;

const AppWrapper = styled.div`
    min-height: calc(100vh - 100px);
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @font-face {
        font-family: StarJediOutline;
        src: url('../../../assets/fonts/Starout.ttf') format('truetype');
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'StarJediOutline';
    src: url(${StarJediOutline}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;