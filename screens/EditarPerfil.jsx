import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function EditarPerfil({ navigation }) {
    const [nome, setNome] = useState("Nome aleatório");
    const [email, setEmail] = useState("email@gmail.com");
    const [telefone, setTelefone] = useState("(18)00000-0000");
    const [senha, setSenha] = useState("Senha@123");
    const [showPassword, setShowPassword] = useState(false);

    const handleSave = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId"); // ID do usuário logado
            if (!userId) {
                Alert.alert("Erro", "ID do usuário não encontrado.");
                return;
            }

            const response = await fetch(`http://10.92.3.193:5000/cadastro/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    senha,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Sucesso", data.message || "Usuário atualizado com sucesso!");
            } else {
                Alert.alert("Erro", data.error || "Falha ao atualizar perfil!");
            }
        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        }
    };

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

    const handleDelete = () => {
        alert("Conta excluída!");
    };

    return (
        <ImageBackground
            source={require("../assets/fundo.login.png")}
            style={styles.background}
        >

            <View style={styles.container}>
                {/* SETA VOLTAR */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                {/* LOGO */}
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Meu perfil</Text>
                <Text style={styles.subtitle}>
                    Altere as informações do cadastro, se desejar
                </Text>

                {/* CAMPOS */}
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
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>TELEFONE</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="phone-pad"
                        value={telefone}
                        onChangeText={setTelefone}
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
                            placeholder="Digite sua senha"
                            placeholderTextColor="#999"
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

                <Text style={styles.passwordNote}>
                    *A sua senha precisa ter pelo menos 8 caracteres, uma letra maiúscula,
                    uma letra minúscula, um número e um caractere especial.
                </Text>

                {/* BOTÃO SALVAR */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>SALVAR</Text>
                </TouchableOpacity>

                {/* BOTÕES INFERIORES */}
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

            {/* menu inferior */}
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



