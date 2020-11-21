import React from 'react';
import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export default () => {
    return <LoaderWrapper>
        <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
        />
    </LoaderWrapper>
}

const LoaderWrapper = styled.div``;