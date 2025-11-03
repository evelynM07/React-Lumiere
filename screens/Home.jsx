import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import config from "../config";

export default function Home() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        carregarAgendamentos();
    }, []);

    const carregarAgendamentos = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                navigation.replace("Login");
                return;
            }

            const response = await axios.get(`${config.API_URL}/agenda/profissional`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setAgendamentos(response.data.agendamentos || []);
        } catch (error) {
            console.error("Erro ao carregar agendamentos:", error);

            if (error.response?.status === 401) {
                Alert.alert("Sessão expirada", "Faça login novamente");
                await AsyncStorage.removeItem("userToken");
                navigation.replace("Login");
            } else if (error.response?.status === 403) {
                Alert.alert("Acesso Negado", "Apenas profissionais podem acessar esta página");
            } else {
                Alert.alert("Erro", "Não foi possível carregar os agendamentos");
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        carregarAgendamentos();
    };

    const formatarDataHora = (dataHora) => {
        const data = new Date(dataHora);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const minuto = String(data.getMinutes()).padStart(2, '0');

        return { data: `${dia}/${mes}/${ano}`, hora: `${hora}:${minuto}` };
    };

    const confirmarCancelamento = (item) => {
        const { data, hora } = formatarDataHora(item.data_hora);
        Alert.alert(
            "Cancelar Agendamento",
            `Deseja realmente cancelar o agendamento?
            ${item.servico}
            ${data} às ${hora}`,
            [
                { text: "Não", style: "cancel" },
                { text: "Sim, cancelar", style: "destructive", onPress: () => cancelarAgendamento(item.id_agenda) }
            ]
        );
    };

    const cancelarAgendamento = async (id_agenda) => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            await axios.delete(`${config.API_URL}/agenda/${id_agenda}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert("Sucesso", "Agendamento cancelado com sucesso!");
            carregarAgendamentos();
        } catch (error) {
            console.error("Erro ao cancelar:", error);
            if (error.response?.status === 403) {
                Alert.alert("Acesso Negado", "Você não tem permissão para cancelar este agendamento");
            } else {
                Alert.alert("Erro", error.response?.data?.error || "Não foi possível cancelar o agendamento");
            }
        }
    };

    const renderAgendamento = ({ item }) => {
        const { data, hora } = formatarDataHora(item.data_hora);
        return (
            <View style={styles.agendamentoCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="calendar-outline" size={24} color="#5b1818" />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.servicoText}>{item.servico}</Text>
                        <Text style={styles.profissionalText}>{item.profissional}</Text>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>{data} às {hora}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="hourglass-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>Duração: {item.duracao}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="cash-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>Valor: R$ {item.valor.toFixed(2)}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => confirmarCancelamento(item)}
                >
                    <Ionicons name="close-circle-outline" size={20} color="#fff" />
                    <Text style={styles.cancelButtonText}>Cancelar Agendamento</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum agendamento encontrado</Text>
            <Text style={styles.emptySubText}>Seus próximos agendamentos aparecerão aqui</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#5b1818" />
                    <Text style={styles.loadingText}>Carregando agendamentos...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#5b1818" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meus Agendamentos</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={agendamentos}
                renderItem={renderAgendamento}
                keyExtractor={(item) => item.id_agenda.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmpty}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#5b1818"]} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#5b1818",
    },
    listContent: {
        padding: 15,
        flexGrow: 1,
    },
    agendamentoCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#fff5f5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
        justifyContent: "center",
    },
    servicoText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    profissionalText: {
        fontSize: 14,
        color: "#666",
    },
    cardBody: {
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 8,
    },
    cancelButton: {
        flexDirection: "row",
        backgroundColor: "#d32f2f",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#999",
        marginTop: 20,
    },
    emptySubText: {
        fontSize: 14,
        color: "#bbb",
        marginTop: 8,
        textAlign: "center",
    },
});
