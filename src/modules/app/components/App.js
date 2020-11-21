import React, { useState } from 'react';
import styled from "styled-components";
import Loader from './Loader';
import {getAppData} from '../data/appData';
import Header from "./Header";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appData, setAppData] = useState(null);

  if (isLoading) {
    getAppData().then(data => {
        setIsLoading(false);
        setAppData(data);
      });
  }

    return (
        <AppWrapper>
            <Header/>
            { isLoading ? <Loader/> :  ''}
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
`;