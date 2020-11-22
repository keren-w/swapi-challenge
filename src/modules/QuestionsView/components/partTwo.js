import React from 'react';
import styled from "styled-components";
import {Question} from "./partOne";

export default ({data}) => {
    return <QuesionWrapper>
        <Question>Home Planets by Population</Question>
        <ContentWrapper>
                {data.map((planet, index) => <LegendWrapper key={index}>
                    <Legend population={planet.population} name={planet.name}/>
                </LegendWrapper>)}
        </ContentWrapper>
    </QuesionWrapper>
};

const QuesionWrapper = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContentWrapper = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    @media (max-width: 499px) {
        flex-direction: column;
        margin-top: 1rem;
    }
`;

const LegendWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 0.2rem;
    >div {
        background-color: lightgray;
    }
    :nth-child(2n+1)>div {
        background-color: peru;
    }
    @media (max-width: 499px) {
        flex: unset;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 0.2rem 0;
    }
`;

const Legend = styled.div`
    height: ${props => props.population*2/100000000}%;
    width: 100%;
    position: relative;

    @media (max-width: 499px) {
        min-height: 50px;
        width: ${props => props.population*2/100000000}%;
    }

    ::before {
        content: '${props => props.name}';
        position: absolute;
        bottom: -1.5rem;
        width: 100%;
        text-align: center;
        @media (max-width: 499px) {
            bottom: .2rem;
            width: unset;
            left: .5rem;
        }
    }

    ::after {
        content: '${props => props.population}';
        position: absolute;
        top: -1.5rem;
        width: 100%;
        text-align: center;
        @media (max-width: 499px) {
            top: .2rem;
            width: unset;
            left: .5rem;
        }
    }
`;