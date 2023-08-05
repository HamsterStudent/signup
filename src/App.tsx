import styled from "styled-components";
import Form from "./components/Form";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsWrap = styled.div`
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 350px;
  height: 650px;
  h2 {
    width: 100%;
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }
  p {
    height: 15px;
    font-size: 12px;
  }
  .active {
    border-color: red;
  }
`;
const FormWrap = styled.div`
  display: inline-block;
  margin: 0 auto;
`;

function App() {
  return (
    <div className="App">
      <Background>
        <ContentsWrap>
          <h2>SIGN UP</h2>
          <FormWrap>
            <Form />
          </FormWrap>
        </ContentsWrap>
      </Background>
    </div>
  );
}

export default App;
