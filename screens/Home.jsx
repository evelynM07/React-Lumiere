import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; //garante que o conteúdo não fique atrás da barra de status do celular
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    ImageBackground,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

//exporta o componente Home
export default function Home() {
    const [selectedHorario, setSelectedHorario] = useState(null);  //cria uma variável para armazenar qual horário foi selecionado


    //lista com os horários disponíveis (sem o banco implementsdo)
    const horarios = [
        { id: 1, data: "02/09/2025", hora: "18h" },
        { id: 2, data: "08/09/2025", hora: "16h" },
        { id: 3, data: "22/09/2025", hora: "16h" },
        { id: 4, data: "28/09/2025", hora: "16h" },
    ];

    //estrutura visual da tela
    return (
        <ImageBackground
            source={require("../assets/fundo.brilho.png")}
            style={styles.background}
        >
            {/* impede que o conteúdo fique sobre a barra superior do celular */}
            <SafeAreaView style={styles.container}>

                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
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

                <ScrollView  //rolação de tela
                    style={{ width: "100%", marginBottom: 15 }}
                    showsVerticalScrollIndicator={false} //esconde a barrinha de rolagem
                >
                    {/*faz um loop (map) para mostrar todos os horários da lista */}
                    {horarios.map((item) => {
                        //verifica se o horário atual foi selecionado
                        const isSelected = selectedHorario === item.id;

                        return (
                            // Cada horário é um botão
                            <TouchableOpacity
                                key={item.id} //identificador único que o React usa pra saber qual item
                                              // da lista é qual — e evitar erros ao atualizar a tela.
                                style={[
                                    styles.horarioItem,
                                    isSelected && styles.horarioSelecionado, //aplica o estilo de selecionado
                                ]}
                                onPress={() => setSelectedHorario(item.id)} //marca como selecionado ao clicar
                            >
                                {/*icone de bolinha (ligado/desligado) */}
                                <Ionicons
                                    name={isSelected ? "radio-button-on" : "radio-button-off"} //muda o ícone se estiver selecionado
                                    size={20}
                                    color={isSelected ? "#5b1818" : "#fff"} //muda a cor da bolinha
                                    style={{ marginRight: 8 }}
                                />
                                <Text
                                    style={[
                                        styles.horarioText,                 //estilo normal
                                        isSelected && styles.horarioTextSelecionado, //estilo se estiver selecionado
                                    ]}
                                >
                                    {item.data} - às {item.hora}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>AGENDAR</Text>
                </TouchableOpacity>

                <View style={styles.footerMenu}>
                    {/* Ícone de perfil */}
                    <TouchableOpacity>
                        <Ionicons name="person-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    {/* Ícone de página inicial */}
                    <TouchableOpacity>
                        <Ionicons name="home-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    {/*icone de notificações com um “badge” (bolinha vermelha de aviso no sininho) */}
                    <TouchableOpacity style={{ position: "relative" }}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text> {/*mostra o número de notificações */}
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
