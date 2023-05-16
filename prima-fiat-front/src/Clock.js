import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

export default function Clock({ time, setTime }) {
  useEffect(() => {
    setInterval(() => {
      const date = new Date().toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(date);
    }, 1000);
  }, []);
  return <ClockContainer>{time?.slice(0, -3)}</ClockContainer>;
}

const ClockContainer = styled.div`
  width: 24vw;
  height: 10vw;
  margin-left: 20px;
  background-color: black;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 210px;
  color: #39ff14;
  margin-right: 2vw;
  font-weight: 400;
  /* font-family: "Roboto", sans-serif; */
  font-family: "Share Tech", sans-serif;
  border-radius: 10px;
  border: 8px solid #777;
`;
