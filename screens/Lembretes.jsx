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
import { useNavigation } from "@react-navigation/native";

export default function Lembretes() {
    const navigation = useNavigation();
    const [reservas, setReservas] = useState([
        { id: 1, data: "02/09/2025", hora: "18h" },
        { id: 2, data: "08/09/2025", hora: "16h" },
        { id: 3, data: "22/09/2025", hora: "16h" },
        { id: 4, data: "28/09/2025", hora: "16h" },
    ]);

    const handleDelete = (id) => {
        Alert.alert("Excluir reserva", "Deseja realmente excluir esta reserva?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                    setReservas((prev) => prev.filter((r) => r.id !== id));
                },
            },
        ]);
    };

    return (
        <ImageBackground
            source={require("../assets/fundo.brilho.png")}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Image source={require("../assets/logo.png")} style={styles.logo} />

                <Text style={styles.title}>Seus lembretes</Text>
                <Text style={styles.subtitle}>
                    Acompanhe por aqui os horários reservados e as datas correspondentes!
                </Text>

                <Text style={styles.sectionTitle}>RESERVAS</Text>

                <ScrollView
                    style={{ width: "100%", marginBottom: 15 }}
                    showsVerticalScrollIndicator={false}
                >
                    {reservas.map((item) => (
                        <View key={item.id} style={styles.reservaItem}>
                            <Ionicons
                                name="checkmark-circle"
                                size={22}
                                color="green"
                                style={{ marginRight: 8 }}
                            />
                            <Text style={styles.reservaText}>
                                {item.data} - às {item.hora}
                            </Text>
                            <TouchableOpacity
                                style={{ marginLeft: "auto" }}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Ionicons name="trash-outline" size={22} color="#5b1818" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.footerMenu}>
                    <TouchableOpacity onPress={() => navigation.navigate("EditarPerfil")}>
                        <Ionicons name="person-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Ionicons name="home-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ position: "relative" }}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
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
    background: { flex: 1 },
    container: {
        flex: 1,
        backgroundColor: "rgba(87,42,42,0.44)",
        alignItems: "center",
        padding: 20,
    },
    backButton: { alignSelf: "flex-start", marginBottom: 10 },
    logo: { width: 120, height: 50, resizeMode: "contain", marginBottom: 20 },
    title: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 25,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    reservaItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },
    reservaText: { color: "#5b1818", fontWeight: "500", fontSize: 15 },
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
    badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
});
