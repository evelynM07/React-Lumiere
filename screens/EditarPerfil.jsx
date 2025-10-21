import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import config from "../config";

export default function EditarPerfil({ navigation }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const keys = ["userData", "user", "usuario"];
                let userData = null;
                let foundKey = null;

                for (const key of keys) {
                    const value = await AsyncStorage.getItem(key);
                    if (value) {
                        userData = value;
                        foundKey = key;
                        break;
                    }
                }

                if (!userData) {
                    Alert.alert("Aviso", "Nenhum dado de usuário encontrado.");
                    console.log("Nenhum dado encontrado em:", keys);
                    return;
                }

                const parsed = JSON.parse(userData);
                console.log("Dados carregados da chave:", foundKey, parsed);

                const id =
                    parsed.id_cadastro || parsed.id || parsed.userId || null;
                const nomeValue =
                    parsed.nome || parsed.nome_usuario || parsed.user_name || "";
                const emailValue =
                    parsed.email || parsed.user_email || parsed.login || "";
                const telefoneValue =
                    parsed.telefone || parsed.celular || parsed.phone || "";

                setUserId(id);
                setNome(nomeValue);
                setEmail(emailValue);
                setTelefone(telefoneValue);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                Alert.alert("Erro", "Falha ao carregar dados do usuário.");
            }
        };

        loadUser();
    }, []);

    const handleSave = async () => {
        if (!userId) {
            Alert.alert("Erro", "Usuário não identificado.");
            return;
        }

        try {
            const bodyData = {
                nome,
                email,
                telefone,
                categoria: "comum",
                tipo: "cliente",
                ativo: 1,
            };

            if (senha && senha.trim() !== "") {
                bodyData.senha = senha;
            }

            const response = await fetch(`${config.IP_LOCAL}/cadastro/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem("userData", JSON.stringify(data.usuarios));
                Alert.alert("Sucesso", "Usuário atualizado com sucesso.");
            } else {
                Alert.alert("Erro", data.message || "Falha ao atualizar usuário.");
            }
        } catch (error) {
            Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
            console.error("Erro:", error);
        }
    };

    const handleLogout = async () => {
        Alert.alert("Sair da conta", "Deseja realmente sair?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.removeItem("userToken");
                    navigation.replace("Login");
                },
            },
        ]);
    };

    const handleDelete = () => {
        Alert.alert("Conta excluída!");
    };

    return (
        <ImageBackground
            source={require("../assets/fundo.login.png")}
            style={styles.background}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Meu perfil</Text>
                <Text style={styles.subtitle}>
                    Altere as informações do cadastro, se desejar
                </Text>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>NOME</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Digite seu nome"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>E-MAIL</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>TELEFONE</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="phone-pad"
                        value={telefone}
                        onChangeText={setTelefone}
                        placeholder="Digite seu telefone"
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>SENHA</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            secureTextEntry={!showPassword}
                            value={senha}
                            onChangeText={setSenha}
                            placeholder="Digite uma nova senha (opcional)"
                            placeholderTextColor="#aaa"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={20}
                                color="#4A4A4A"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>SALVAR</Text>
                </TouchableOpacity>

                <View style={styles.bottomButtons}>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={18} color="#fff" />
                        <Text style={styles.secondaryButtonText}>DESLOGAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={handleDelete}
                    >
                        <Ionicons name="trash-outline" size={18} color="#fff" />
                        <Text style={styles.secondaryButtonText}>EXCLUIR CONTA</Text>
                    </TouchableOpacity>
                </View>
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
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
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




