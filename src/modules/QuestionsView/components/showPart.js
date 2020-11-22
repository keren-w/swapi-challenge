import React, {useState, useCallback} from 'react';
import styled from "styled-components";
import PartOne from "./partOne";
import PartTwo from "./partTwo";

 const ShowPart = ({questionsdata}) => {
    const [partDisplayed, setDisplayedPart] = useState(1);

    const getDisplayedPart = useCallback((partDisplayed) => {
        switch(partDisplayed) {
            case 1: 
                return <PartOne data={questionsdata.highestPopulationVehicle}/>;
            case 2: 
                return <PartTwo data={questionsdata.planetsPopulation}/>;
            default:
                return '';
        }
    });
    return (
        <Wrapper>
            <PartsNav>
                <PartLink isSelected={partDisplayed === 1} onClick={() => setDisplayedPart(1)}>Part 1</PartLink>
                <PartLink isSelected={partDisplayed === 2} onClick={() => setDisplayedPart(2)}>Part 2</PartLink>
            </PartsNav>
           <PartWrapper>
                {getDisplayedPart(partDisplayed)}
           </PartWrapper>
        </Wrapper>
    )
}

export default ShowPart;

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    min-width: 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const PartsNav = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem 0;

    @media (max-width: 499px) {
        flex-direction: column;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        >span {
            text-align: center;
        }
    }
`;

const PartLink = styled.span`
    min-width: 20%;
    cursor: pointer;
    background-color: ${props => props.isSelected && `peru`};
    color: ${props => props.isSelected && `white`};
    padding: 0.2rem 0;
    text-align: center;
    font-weight: bold;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    @media (max-width: 499px) {
        min-width: unset;
        border-top: 0;
        border-bottom: 0;
    }
`;

const PartWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;