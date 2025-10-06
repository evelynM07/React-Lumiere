import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; //evita que o conteúdo da tela fique atrás da barra superior do celular
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ImageBackground,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; //importa os ícones da biblioteca
import AsyncStorage from "@react-native-async-storage/async-storage"; //é usado para salvar e apagar dados locais no cell
import { useNavigation } from "@react-navigation/native";

//função home
export default function Home() {
    const [selectedHorario, setSelectedHorario] = useState(null);//estado para armazenar qual horário foi selecionado
    const navigation = useNavigation();
    const horarios = [
        { id: 1, data: "02/09/2025", hora: "18h" },
        { id: 2, data: "08/09/2025", hora: "16h" },
        { id: 3, data: "22/09/2025", hora: "16h" },
        { id: 4, data: "28/09/2025", hora: "16h" },
    ];

    //função logout
    const handleLogout = async () => {
        Alert.alert(
            "Sair da conta",
            "Deseja realmente sair?",
            [
                { text: "Cancelar", style: "cancel" },

                //botão "Sair" apaga o token e volta para a tela de login
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        //remove o token salvo no armazenamento local
                        await AsyncStorage.removeItem("userToken");
                        //redireciona o usuário para a tela de Login
                        navigation.replace("Login");
                    },
                },
            ],
            { cancelable: true } //fechs o alerta tocando fora da caixa
        );
    };


    return (
        <ImageBackground
            source={require("../assets/fundo.brilho.png")}
            style={styles.background}
        >
            {/*garante que o conteúdo não fique escondido pela barra superior do celular */}
            <SafeAreaView style={styles.container}>

                {/*botão logout */}
                <TouchableOpacity style={styles.backButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                </TouchableOpacity>

                <Image source={require("../assets/logo.png")} style={styles.logo} />

                <Text style={styles.title}>
                    Bem-vindo(a) {"\n"}
                    <Text style={{ fontStyle: "italic" }}>Nome!</Text>
                </Text>

                <Text style={styles.label}>Selecione o serviço que deseja obter</Text>
                <TouchableOpacity style={styles.selectButton}>
                    <Text style={styles.selectText}>Selecione o serviço ></Text>
                </TouchableOpacity>

                <Text style={styles.label}>Selecione o profissional que deseja</Text>
                <TouchableOpacity style={styles.selectButton}>
                    <Text style={styles.selectText}>Selecione o profissional ></Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>HORÁRIOS DISPONÍVEIS</Text>

                <ScrollView
                    style={{ width: "100%", marginBottom: 15 }}
                    showsVerticalScrollIndicator={false} //esconde a barrinha de rolagem
                >
                    {/*ta percorremdo o array de horários e exibe um botão para cada um */}
                    {horarios.map((item) => { {/*o "item" representa cada horário da lista*/}
                        const isSelected = selectedHorario === item.id;//verifica se o horário atual é o que foi selecionado

                        //retorna um botão com o horário
                        return (
                            <TouchableOpacity
                                key={item.id} // identificador único (necessário no React)
                                style={[
                                    styles.horarioItem,
                                    isSelected && styles.horarioSelecionado, //aplica estilo diferente quando selecionado
                                ]}
                                onPress={() => setSelectedHorario(item.id)} //marca o horário quando clicado
                            >
                                {/*icone do tipo "radio button" (bolinha) */}
                                <Ionicons
                                    name={isSelected ? "radio-button-on" : "radio-button-off"} //icone muda conforme a seleção
                                    size={20}
                                    color={isSelected ? "#5b1818" : "#fff"} //cor muda se selecionado
                                    style={{ marginRight: 8 }}
                                />

                                {/*texto com data e hora do item */}
                                <Text
                                    style={[
                                        styles.horarioText,
                                        isSelected && styles.horarioTextSelecionado, //muda a cor se estiver selecionado
                                    ]}
                                >
                                    {item.data} - às {item.hora}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* botão que confirma o agendamento */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>AGENDAR</Text>
                </TouchableOpacity>

                {/* menu com ícones de navegação */}
                <View style={styles.footerMenu}>
                    {/* icone perfil */}
                    <TouchableOpacity>
                        <Ionicons name="person-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    {/*icone home */}
                    <TouchableOpacity>
                        <Ionicons name="home-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    {/*icone de notificações com bolinha de contagem */}
                    <TouchableOpacity style={{ position: "relative" }}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />

                        {/*bolinha vermelha de notificações */}
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "rgba(87,42,42,0.44)",
        alignItems: "center",
        padding: 20,
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    logo: {
        width: 120,
        height: 50,
        resizeMode: "contain",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 6,
        alignSelf: "flex-start",
    },
    selectButton: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
        marginBottom: 15,
        alignItems: "center",
    },
    selectText: {
        color: "#fff",
        fontSize: 14,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginVertical: 15,
    },
    horarioItem: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        backgroundColor: "transparent",
    },
    horarioSelecionado: {
        backgroundColor: "#fff",
    },
    horarioText: {
        color: "#fff",
    },
    horarioTextSelecionado: {
        color: "#5b1818",
        fontWeight: "600",
    },
    button: {
        marginTop: 10,
        backgroundColor: "#7a3c3c",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    footerMenu: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: "#fff",
        marginTop: "auto",
    },
    badge: {
        position: "absolute",
        right: -6,
        top: -6,
        backgroundColor: "red",
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 1,
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
});
