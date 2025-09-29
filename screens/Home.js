import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
    const [selectedHorario, setSelectedHorario] = useState(null);

    const horarios = [
        { id: 1, data: "02/09/2025", hora: "18h" },
        { id: 2, data: "08/09/2025", hora: "16h" },
        { id: 3, data: "22/09/2025", hora: "16h" },
        { id: 4, data: "28/09/2025", hora: "16h" },
    ];

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <TouchableOpacity style={styles.backButton}>
                <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>

            <Image source={require("../assets/logo.png")} style={styles.logo} />

            <Text style={styles.title}>Bem-vindo(a) {"\n"} <Text style={{ fontStyle: "italic" }}>Nome!</Text></Text>

            {/* SELECTS */}
            <Text style={styles.label}>Selecione o serviço que deseja obter</Text>
            <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectText}>Selecione o serviço ></Text>
            </TouchableOpacity>

            <Text style={styles.label}>Selecione o profissional que deseja</Text>
            <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectText}>Selecione o profissional ></Text>
            </TouchableOpacity>

            {/* LISTA DE HORÁRIOS */}
            <Text style={styles.sectionTitle}>HORÁRIOS DISPONÍVEIS</Text>

            <ScrollView style={{ width: "100%" }}>
                {horarios.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.horarioItem,
                            selectedHorario === item.id && styles.horarioSelecionado,
                        ]}
                        onPress={() => setSelectedHorario(item.id)}
                    >
                        <Ionicons
                            name={
                                selectedHorario === item.id
                                    ? "radio-button-on"
                                    : "radio-button-off"
                            }
                            size={20}
                            color={selectedHorario === item.id ? "#5b1818" : "#333"}
                            style={{ marginRight: 8 }}
                        />
                        <Text style={styles.horarioText}>
                            {item.data} - às {item.hora}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* BOTÃO AGENDAR */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>AGENDAR</Text>
            </TouchableOpacity>

            {/* MENU INFERIOR */}
            <View style={styles.footerMenu}>
                <TouchableOpacity>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: "relative" }}>
                    <Ionicons name="notifications-outline" size={24} color="#fff" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4b1f1f",
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
