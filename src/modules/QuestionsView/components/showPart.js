import React, {useState, useCallback} from 'react';
import styled from "styled-components";
import PartOne from "./partOne";
import PartTwo from "./partTwo";

 const ShowPart = ({questionsdata}) => {
    const [partDisplayed, setDisplayedPart] = useState(1);

    const getDisplayedPart = useCallback((partDisplayed) => {
        switch(partDisplayed) {
            case 1: 
            return <PartOne />;
            case 2: 
            return <PartTwo/>;
            case 0:
            default:
            return;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const PartsNav = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem 0;

    @media (max-width: 300px) {
        flex-direction: column;
        >span {
            text-align: center;
        }
    }
`;

const PartLink = styled.span`
    cursor: pointer;
        background-color: ${props => props.isSelected ? `peru` : `lightGray`};
        color: ${props => props.isSelected && `white`};
        padding: 0.2rem 1.5rem;
        :nth-child(2n) {
            border-left: 1px solid black;
        }

        @media (max-width: 300px) {
            text-align: center;
            :nth-child(2n) {
                border-top: 1px solid black;
                border-left: 0;
            }
        }
`;

const PartWrapper = styled.div`
    flex: 1;
`;