import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export default function Header(params) {
    return (
        <HeaderContainer>
            <Link to={"/"} style={{textDecoration: 'none'}}>Início</Link>
            <Link to={"/edit"} style={{textDecoration: 'none'}}>Editar</Link>
        </HeaderContainer>
    )
};


const HeaderContainer = styled.div`
position: fixed;
top: 0;
left: 0;
height: 80px;
width: 100vw;
background-color: rgb(229, 67, 46);
display: flex;
justify-content: center;
align-items: center;
* {
    color: #ffffff;
    margin: 0 40px;
    font-weight: 700;
    font-size: 20px;
}
`