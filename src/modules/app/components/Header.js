import React from 'react';
import styled from 'styled-components';

const Header = (props) => {
    return (
        <HeaderWrapper>
            The Swappi Challenge
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 32px;
`;