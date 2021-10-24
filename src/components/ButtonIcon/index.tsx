import React from "react";
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import {
Text,
Image,
View,
} from 'react-native';

import DiscordImg from '../../assets/discord.png';
import { styles } from "./styles";

// digamos q eu queira usar as propriedade do botão TouchableOpacity
// na invocação do componente ButtonIcon, para que isso seja
// possivel, eu devo atribuir o import TouchableOpacityProps
// ao meu type Props
type Props = RectButtonProperties & {
    title?: string;
}

// ao final das variaveis definidas em Props, é possivel colocar
// ...rest, isto indica que todos os parametros restantes passados
// não precisam ser declarados de forma explicita no meu Props
export function ButtonIcon ({title, ...rest} : Props) {
    return (
        <RectButton 
        style={styles.container} 
        {...rest}
        >
            <View style={styles.iconWrapper}>
                <Image source={DiscordImg} style={styles.icon} />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>
        </RectButton>
    );
}