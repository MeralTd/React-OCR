import { createGlobalStyle } from 'styled-components'


export const lightTheme = {
    body: "#e3e2e1",
    fontColor: '#000',
    backgroundColor: '#fff',
    inputColor: '#ededed'
}
export const darkTheme = {
    fontColor: "#fff",
    body: '#000',
    backgroundColor: '#383838',
    inputColor: '#949292'


}

export const  GlobalStyles = createGlobalStyle`
    body{
        background-color: ${(props)=> props.theme.body}
    }
`;