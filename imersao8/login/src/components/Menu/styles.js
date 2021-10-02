import styled from 'styled-components';


export const NavList = styled.ul `
    display: flex;
    padding: 15px 5px;
    font-family: sans-serif;
    margin-bottom: 15px;
    background-color: blue;
    
    a{
        text-decoration: none;
        color: white;
    }

    a:hover{
        color: rgba(0, 0, 0, 0.5)
    }

    li{
        margin: 0 0.8rem;
        font-size: 1.0em;
        list-style: none;
    }
`;