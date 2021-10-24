import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList } from 'react-native';


import { styles } from "./styles";

import { CategorySelect } from "../../components/CategorySelect";
import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";

export function Home () {
    const [category, setCategory] = useState('');
    const navigation = useNavigation();

    const appointments = [
        {
            id: "1",
            guild: {
                id: "1",
                name: "Lendários",
                icon: null,
                owner: false
            },
            category: "1",
            date: "22/06 às 20h40",
            description: "É hoje que vamos chegar ao challenger sem perder uma partida!"
        },
        {
            id: "2",
            guild: {
                id: "1",
                name: "Lendários",
                icon: null,
                owner: false
            },
            category: "1",
            date: "22/06 às 20h40",
            description: "É hoje que vamos chegar ao challenger sem perder uma partida!"
        },
        {
            id: "3",
            guild: {
                id: "1",
                name: "Lendários",
                icon: null,
                owner: false
            },
            category: "1",
            date: "22/06 às 20h40",
            description: "É hoje que vamos chegar ao challenger sem perder uma partida!"
        },
        {
            id: "4",
            guild: {
                id: "1",
                name: "Lendários",
                icon: null,
                owner: false
            },
            category: "1",
            date: "22/06 às 20h40",
            description: "É hoje que vamos chegar ao challenger sem perder uma partida!"
        },
        {
            id: "5",
            guild: {
                id: "1",
                name: "Lendários",
                icon: null,
                owner: false
            },
            category: "1",
            date: "22/06 às 20h40",
            description: "É hoje que vamos chegar ao challenger sem perder uma partida!"
        },
        {
            id: "6",
            guild: {
                id: "1",
                name: "Lendários",
                icon: null,
                owner: false
            },
            category: "1",
            date: "22/06 às 20h40",
            description: "É hoje que vamos chegar ao challenger sem perder uma partida!"
        }
    ];

    function handleCategory (categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails () {
        navigation.navigate('AppointmentDetails');
    }

    function handleAppointmentCreate () {
        navigation.navigate('AppointmentCreate');
    }

    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>

            <CategorySelect categorySelected={category} />

            <ListHeader 
            title="Partidas agendadas"
            subtitle="Total 6"
            />

            <FlatList 
                data={appointments}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Appointment
                    onPress={handleAppointmentDetails}
                    data={item} 
                    />
                )}
                contentContainerStyle={{paddingBottom: 69}}
                ItemSeparatorComponent={()=> <ListDivider/>}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
            />
        </Background>
    );
}