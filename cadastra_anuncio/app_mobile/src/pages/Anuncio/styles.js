import style from 'styled-components';

export const Container = style.SafeAreaView`
    flex: 1;
    padding: 0 25px;
    justify-content: flex-start;
    background: #fff;
`;

export const ImagemAnuncio = style.Image`
    margin: 15px 0;
    width: 280px;
    height: 280px;
    border-radius: 3px;
`;

export const TituloAnuncio = style.Text`
    font-size: 25px;
    padding: 15px 0;
    font-weight: bold;
    color: #333;
    border-bottom-color: #00a1fc;
    border-bottom-width: 1px
`;

export const DescricaoAnuncio = style.Text`
    font-size: 18px; 
    padding: 15px 0;
    color: #111;
`;




