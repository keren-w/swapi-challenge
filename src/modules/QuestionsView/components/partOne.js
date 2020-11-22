import React, {Fragment} from 'react';
import styled from "styled-components";

export default ({data}) => {
    return <Fragment>
        <Question>
        Which vehicle names have the highest sum of population for all its pilots’ home planets?
        </Question>
        <TablesWrapper>
            <ColWrapper>
                <ColTitle>Vehicle Name</ColTitle>
                <ColContent>{data.vehicle}</ColContent>
            </ColWrapper>
            <ColWrapper>
                <ColTitle>Related Home Planets / Population</ColTitle>
                <ColContent>{data.planets.map((planet, index) => <PlanetInfo key={index}>
                                <div>planet: {planet.name}</div>
                                <div>population: {planet.population} </div>
                            </PlanetInfo>)}
                </ColContent>
            </ColWrapper>
            <ColWrapper>
                <ColTitle>Pilot Names</ColTitle>
                <ColContent>{data.pilots.join()}</ColContent>
            </ColWrapper>
        </TablesWrapper>

    </Fragment>
};

export const Question = styled.div`
    text-align: center;
    font-weight: bold;
`;

const TablesWrapper = styled.div`
    flex: 1;
    margin-top: 1rem;
    justify-content: center;
    display: flex;
    min-width: 200px;
    @media (max-width: 499px) {
      flex-direction: column;
      justify-content: flex-start;
    }
}
`;

const ColWrapper = styled.div`
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: grey;
    margin-bottom: .5rem;
`;

const ColTitle = styled.div`
    font-weight: bold;
    border-bottom: 1px solid;
    background-color: gray;
    color: white;
    text-align: center;
    min-height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 .5rem;
    @media (max-width: 499px) {
        min-height: 2rem;
    }
`;

const ColContent = styled.div`
    display: flex;
    min-height: 3rem;
    align-items: center;
    justify-content: center;
    @media (max-width: 499px) {
        align-items: flex-start;
        min-height: unset;
    }
`;

const PlanetInfo = styled.span`
    :not(last-child) {
        border-botton: 1px solid;
    }
`;