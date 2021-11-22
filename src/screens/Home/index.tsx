import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, FlatList } from 'react-native';


import { styles } from "./styles";

import { CategorySelect } from "../../components/CategorySelect";
import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

export function Home () {
    const [category, setCategory] = useState('');
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);

    function handleCategory (categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails (guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', {guildSelected});
    }

    function handleAppointmentCreate () {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointment() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
        if(category){
            setAppointments(storage.filter(
                item => item.category === category
            ));
        } else {
            setAppointments(storage);
        }
        setLoading(false);
    }

    // qnd voltar a para a tela, recarregue
    useFocusEffect(useCallback(()=>{
        loadAppointment()
    }, [category]));



    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>

            <CategorySelect 
            categorySelected={category}
            setCategory={handleCategory}
            />

            {
            loading ? <Load/> :
            <>
            <ListHeader 
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
            />

            <FlatList 
                data={appointments}
                keyExtractor={item => item.id + item.date}
                renderItem={({ item }) => (
                    <Appointment
                    onPress={() => handleAppointmentDetails(item)}
                    data={item} 
                    />
                )}
                contentContainerStyle={{paddingBottom: 69}}
                ItemSeparatorComponent={()=> <ListDivider/>}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
            />
            </>
            }
        </Background>
    );
}