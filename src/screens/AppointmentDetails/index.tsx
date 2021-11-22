import React, { useState, useEffect } from "react";
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from "react-native";
import * as Linking from 'expo-linking';
import { Background } from "../../components/Background";
import { BorderlessButton } from "react-native-gesture-handler";
import { Fontisto } from '@expo/vector-icons';

import { Header } from "../../components/Header";
import { Member, MemberProps } from "../../components/Member";
import { ListHeader  } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";

import { theme } from "../../global/styles/theme";
import { styles } from './styles';

import BannerPng from '../../assets/banner.png';
import { useRoute } from "@react-navigation/native";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Load } from "../../components/Load";

type Params = {
    guildSelected: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number; // pode ser excluido
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const route = useRoute();
    const { guildSelected } = route.params as Params;
    const [loading, setLoading] = useState(true);

    async function fetchGuildWidget() {
        try {
            //
            const res = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            // console.log(res);
            setWidget(res.data);
        } catch (error) {
            Alert.alert("Verifique se o Widget está habilitado");
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation(){
        const url_invitation = widget.instant_invite === null ? "https://discord.gg/8K5apgMP" : widget.instant_invite;
        const message = Platform.OS === 'ios'
        ? `Junte-se a ${guildSelected.guild.name}`
        : url_invitation;

        console.log(url_invitation);

        // _fix_: widget instant_invite is always null, make tratment for this behavior
        Share.share({
            message, 
            url: url_invitation
        });
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite || "https://discord.gg/8K5apgMP");
    }

    useEffect(()=> {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header 
            title="Detalhes"
            action={
                guildSelected.guild.owner && // se eu sou o dono aparece a opcao de compartilhamento
                <BorderlessButton onPress={handleShareInvitation}>
                    <Fontisto
                        name="share"
                        size={24}
                        color={theme.colors.primary}
                    />
                </BorderlessButton>
            }
            />

            <ImageBackground
            source={BannerPng}
            style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        { guildSelected.guild.name }
                    </Text>

                    <Text style={styles.subtitle}>
                        { guildSelected.description }
                    </Text>
                </View>
            </ImageBackground>

            {
                loading ? <Load/> :
                <>
                <ListHeader
                    title="Jogadores"
                    subtitle={`Total ${widget.members.length}`}
                />

                <FlatList
                data={widget.members}
                keyExtractor={item => item.id + item.username}
                renderItem={({item}) => (
                    <Member data={item}/>
                )}
                ItemSeparatorComponent={()=> <ListDivider isCentered/>}
                style={styles.members}
                />
                </>
            }

            {
                guildSelected.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild}/>
                </View>
            }
            
        </Background>
    );
}