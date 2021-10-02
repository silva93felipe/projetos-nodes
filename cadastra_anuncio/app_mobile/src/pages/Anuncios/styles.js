import style from 'styled-components';

export const Container = style.View`
    margin: 20px 0 20px 20px
`;

export const Header = style.Text`
    font-size: 23px;
    margin-bottom: 15px;
    font-weight: bold;
    color: #333;
`;

export const ListAnuncios = style.FlatList`
    width: 95%;
`

export const Item = style.TouchableOpacity`
    display: flex;
    flex-direction: row;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-top: 5px;
    margin-right: 15px;
`

export const ItemImagem = style.Image`
    width: 80px;
    height: 80px;
    border-radius: 3px;
`

export const ItemInfo = style.View`
    margin-left: 15px;
    width: 72%;
`

export const ItemTitle = style.Text`
    font-weight: bold;
    color: #333;
`


export const ItemDescription = style.View`
    display: flex;
    flex-direction: row;
    margin-top: 3px;
    align-items: center;
`

export const Description = style.Text`
    font-size: 14px;
    color: #999;
`



