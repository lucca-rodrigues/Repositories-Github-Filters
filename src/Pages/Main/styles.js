import styled, {keyframes, css} from 'styled-components';


export const Container = styled.div`
  color: #282C34;
  max-width: 750px;
  background: #fff;
  margin: 0 auto;
  padding:50px;
  border-radius: 10px;
  width:50%;

  h1{
    font-size: 25px;
  }

  h1:hover{
    color: #000;
  }  
`;

export const Title = styled.div`
  svg{
    margin-right:10px;
  }
`;

export const Form = styled.form`

  div{
    display: flex;
    flex-direction: row;
    
    input{
      border: 1px solid ${props => (props.error ? '#ff0000' : '#eee')};
      padding:10px;
      border-radius: 5px;
      min-height: 25px;
      flex: 1;
    }
  }

`

// Animação
const animated = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props=>({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #282C34;
  color: #fff;
  border: none;
  height: 50px;
  width: 50px;
  padding:10px;
  border-radius: 5px;
  margin-left:10px;
  transition: background 0.3s;

  &:hover{
    background: #282c34c7;

  }

  &[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading &&
  css`
    svg{
      animation: ${animated} 2s linear infinite;
    }
  
  `}
`


export const List = styled.ul`
  padding: 0;

  li{
    list-style-type:none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    & + li{
      border-top: 1px solid #eee;
      margin-top: 15px;
      padding-top: 15px;
    }
  }


  a{
    color:#0D2636;
  }

  svg{
    margin-left:15px;
  }
`

export const DeleteButton = styled.button.attrs({
  type: 'button'
})`
  background: transparent;
  border: none;

  svg{
    margin: 0;
  }
`;