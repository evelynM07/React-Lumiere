import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,
    Alert,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

//exporta o componente EditarPerfil
export default function EditarPerfil({ navigation }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_URL = "http://10.0.2.2:5000"; // Emulador Android
    // const API_URL = "http://10.92.3.193:5000"; // Celular físico

    useEffect(() => {
        const fetchUserData = async () => {
            let userId = null;
            try {
                userId = await AsyncStorage.getItem("userId");
                console.log("ID do usuário logado:", userId);

                if (!userId) {
                    Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
                    navigation.replace("Login");
                    return;
                }

                const url = `${API_URL}/cadastro/${userId}`;
                console.log("Buscando dados do usuário em:", url);

                const response = await fetch(url);
                console.log("Status da resposta:", response.status);

                const text = await response.text(); // lê como texto primeiro
                console.log("Resposta raw:", text);

                let data;
                try {
                    data = JSON.parse(text); // tenta parsear JSON
                } catch (err) {
                    console.error("Erro ao parsear JSON:", err);
                    Alert.alert("Erro", "Resposta do servidor inválida.");
                    return;
                }

                console.log("Dados parseados:", data);

                if (response.ok) {
                    setNome(data.nome || "");
                    setEmail(data.email || "");
                    setTelefone(data.telefone || "");
                    setSenha("");
                } else {
                    Alert.alert("Erro", data.error || "Falha ao buscar dados do perfil.");
                    navigation.replace("Login");
                }
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            } finally {
                setLoading(false); // garante que loading sempre será desligado
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                Alert.alert("Erro", "ID do usuário não encontrado.");
                return;
            }

            const response = await fetch(`${API_URL}/cadastro/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, telefone, senha }),
            });

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (err) {
                console.error("Erro ao parsear JSON:", err);
                Alert.alert("Erro", "Resposta inválida do servidor.");
                return;
            }

            if (response.ok) {
                Alert.alert("Sucesso", data.message || "Perfil atualizado!");
            } else {
                Alert.alert("Erro", data.error || "Falha ao atualizar perfil!");
            }
        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            Alert.alert("Logout", "Você saiu da conta.");
            navigation.replace("Login");
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: "#fff", marginTop: 10 }}>Carregando perfil...</Text>
            </View>
        );
    }

    return (
        <ImageBackground source={require("../assets/fundo.login.png")} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />

                <Text style={styles.title}>Meu perfil</Text>
                <Text style={styles.subtitle}>Altere as informações do cadastro, se desejar</Text>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>NOME</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Digite seu nome"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>E-MAIL</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        keyboardType="email-address"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>TELEFONE</Text>
                    <TextInput
                        style={styles.input}
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                        placeholder="(00) 00000-0000"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>SENHA</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { flex: 1, marginBottom: 0 }]}
                            secureTextEntry={!showPassword}
                            value={senha}
                            onChangeText={setSenha}
                            placeholder="Digite sua nova senha"
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#4A4A4A" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>SALVAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={18} color="#fff" />
                    <Text style={styles.secondaryButtonText}>DESLOGAR</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "85%",
        paddingVertical: 30,
        alignItems: "center",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 10,
        zIndex: 1,
    },
    logo: {
        width: 180,
        height: 90,
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        color: "#fff",
        fontStyle: "italic",
        textAlign: "center",
        marginTop: 10,
    },
    subtitle: {
        color: "#fff",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 25,
        opacity: 0.9,
    },
    fieldContainer: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 5,
        fontWeight: "400",
        letterSpacing: 1,
    },
    input: {
        backgroundColor: "#fff",
        color: "#000",
        width: "100%",
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
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
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    eyeButton: {
        position: "absolute",
        right: 15,
    },
    passwordNote: {
        fontSize: 12,
        color: "#fff",
        textAlign: "left",
        marginTop: 5,
        marginBottom: 20,
        opacity: 0.8,
    },
    saveButton: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 40,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
    },
    secondaryButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        marginHorizontal: 5,
    },
    secondaryButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 8,
    },
});



