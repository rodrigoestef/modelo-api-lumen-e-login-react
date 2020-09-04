import styled,{createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
    #App{
        background-color:#ecf1f8;
    }

    html,body,#App{
        height: 100vh;
    }
`

export const Loading = styled.div`
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    
`