import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const [selectedHorario, setSelectedHorario] = useState(null);
    const navigation = useNavigation();

    const horarios = [
        { id: 1, data: "02/09/2025", hora: "1" +
                "8h" },
        { id: 2, data: "08/09/2025", hora: "16h" },
        { id: 3, data: "22/09/2025", hora: "16h" },
        { id: 4, data: "28/09/2025", hora: "16h" },
    ];

    const handleLogout = async () => {
        Alert.alert(
            "Sair da conta",
            "Deseja realmente sair?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem("userToken");
                        navigation.replace("Login");
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <ImageBackground
            source={require("../assets/fundo.brilho.png")}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
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
                    showsVerticalScrollIndicator={false}
                >
                    {horarios.map((item) => {
                        const isSelected = selectedHorario === item.id;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.horarioItem,
                                    isSelected && styles.horarioSelecionado,
                                ]}
                                onPress={() => setSelectedHorario(item.id)}
                            >
                                <Ionicons
                                    name={isSelected ? "radio-button-on" : "radio-button-off"}
                                    size={20}
                                    color={isSelected ? "#5b1818" : "#fff"}
                                    style={{ marginRight: 8 }}
                                />
                                <Text
                                    style={[
                                        styles.horarioText,
                                        isSelected && styles.horarioTextSelecionado,
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
                    <TouchableOpacity onPress={() => navigation.navigate("EditarPerfil")}>
                        <Ionicons name="person-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Ionicons name="home-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ position: "relative" }}
                        onPress={() => navigation.navigate("Lembretes")}
                    >
                        <Ionicons name="notifications-outline" size={24} color="#fff" />

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
