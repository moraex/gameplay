import React, {useState} from "react";
import { 
    ImageBackground, 
    Text, 
    View, 
    FlatList,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Modal
} from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

import { CategorySelect } from "../../components/CategorySelect";
import { SmallInput } from "../../components/SmallInput";
import { GuildIcon } from "../../components/GuildIcon";
import { ModalView } from "../../components/ModalView";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Feather} from '@expo/vector-icons';
import { Guilds } from "../Guilds";

import { styles } from './styles';
import { theme } from "../../global/styles/theme";
import { GuildProps } from "../../components/Guild";
import { COLLECTION_APPOINTMENTS} from '../../configs/database';
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";


export function AppointmentCreate() {
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
    
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDesc] = useState('');

    const nav  = useNavigation();

    function handleOpenGuilds() {
        setOpenGuildModal(true);
    }

    function handleCloseGuilds() {
        setOpenGuildModal(false);
    }

    function handleGuildSelect(guildSelected: GuildProps) {
        setGuild(guildSelected);
        setOpenGuildModal(false);
    }

    function handleCategorySelect (categoryId: string) {
        setCategory(categoryId);
    }

    async function handleSave() {
        const newAppointment = {
            id: uuid.v4,
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };

        // primeiro pego os agendamentos feitos para nao sobrescrever
        // o que ja existe
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        nav.navigate('Home');

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Background>
                <ScrollView>
                    <Header 
                        title="Agendar partida"
                    />

                    <Text style={[
                        styles.label, 
                        { marginLeft: 24, marginTop: 36, marginBottom: 18 }
                        ]}>
                        Categoria
                    </Text>
                    
                    <CategorySelect 
                        hasCheckedBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>

                                {
                                    guild.icon 
                                    ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> 
                                    : <View style={styles.image}/>
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name || 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather 
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={24}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Dia e mês
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2}
                                        onChangeText={setDay}/>
                                    <Text style={styles.divider}>/</Text>
                                    <SmallInput maxLength={2}
                                    onChangeText={setMonth}/>
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, {marginBottom: 12}]}>
                                    Hora e minuto
                                </Text>

                                <View style={styles.column}>
                                    <SmallInput maxLength={2} onChangeText={setHour}/>
                                    <Text style={styles.divider}>:</Text>
                                    <SmallInput maxLength={2} onChangeText={setMinute}/>
                                </View>
                            </View>

                        </View>

                        <View style={styles.field}>
                            <Text style={[styles.label, {marginBottom: 12}]}>
                                Descrição
                            </Text>

                            <Text style={styles.charLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>

                        <TextArea 
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDesc}
                        />

                        <View style={styles.footer}>
                            <Button 
                            title="Agendar"
                            onPress={handleSave}
                            />
                        </View>
                    </View>

                </ScrollView>
            </Background>

            <ModalView 
            visible={openGuildsModal}
            closeModal={handleCloseGuilds}
            >
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>
        </KeyboardAvoidingView>
    );
}