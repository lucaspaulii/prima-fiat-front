import styled from "styled-components";
import Clock from "./Clock";
import logo from "./primafiat.png";

export default function Header({ time, setTime }) {
  return (
    <Container>
      <SubContainer>
        <img src={logo} alt="fiat logo" />
        <h1>ENTREGAS</h1>
        <Clock time={time} setTime={setTime} />
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 30%;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 100px;
    color: #fff;
    font-family: "Passion One", cursive;
  }
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  img {
    width: 20vw;
    height: 4vw;
    margin-left: 2vw;
  }
`;
