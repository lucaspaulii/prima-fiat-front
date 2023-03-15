import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

export default function Clock({ time, setTime }) {
  useEffect(() => {
    setInterval(() => {
      const date = new Date().toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(date);
    }, 1000);
  }, []);
  return <ClockContainer>{time}</ClockContainer>;
}

const ClockContainer = styled.div`
  width: 18vw;
  height: 7vw;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.7vw;
  font-weight: 200;
  color: #fff;
  margin-right: 2vw;
  font-weight: 400;
  font-family: "Oxygen Mono", monospace;
`;
