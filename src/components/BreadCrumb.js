import {React, useEffect} from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom';

const Wrapper = styled.section`
    align-items: center;
    display: flex;
    width: 100%;
    height: 60px;
    opacity: 0.7;
    a {
        color: ${(props)=>props.theme.text};
        text-decoration: none;
    }
`;



const BreadCrumb = () => {
    const locations = useLocation().pathname.split("/");
    locations.shift();

    return (
        <Wrapper className="section-center">
            <Link to="/">Home</Link>
            {locations.map((location, index)=>{
                return <Link key={index} to={`/${location}`}>&nbsp;/ {location}</Link>
            })}
        </Wrapper>
    )
}

export default BreadCrumb;