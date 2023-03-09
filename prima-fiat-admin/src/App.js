import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import GlobalStyle from "./GlobalStyle";
import Main from "./pages/Main";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/edit" element={<Edit/>} />
      </Routes>    
    </BrowserRouter>
  );
}

export default App;
