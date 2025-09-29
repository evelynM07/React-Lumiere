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
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
    const [showPassword, setShowPassword] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [password, setPassword] = useState("");
    const [categoria, setCategoria] = useState(""); // caso tenha input
    const [tipo, setTipo] = useState(""); // caso tenha input

    const handleRegister = async () => {
        if (!nome || !email || !telefone || !password) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    senha: password,
                    categoria,
                    tipo,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Erro", data.error || "Erro ao cadastrar.");
                return;
            }

            Alert.alert("Sucesso", data.message);
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            console.error(error);
        }
    };

    return (
        <ImageBackground
            source={require("../assets/fundo.login.png")}
            style={styles.background}
        >
            <View style={styles.container}>
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Seja bem-vindo(a)!</Text>

                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#ccc"
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.label}>E-MAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>TELEFONE</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu telefone"
                    placeholderTextColor="#ccc"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={setTelefone}
                />

                <Text style={styles.label}>SENHA</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Digite sua senha"
                        placeholderTextColor="#ccc"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={22}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.passwordNote}>
                    *A sua senha precisa ter pelo menos 8 caracteres, uma letra maiúscula,
                    uma letra minúscula, um número e um caractere especial.
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                    Já possui uma conta?{" "}
                    <Text
                        style={styles.loginLink}
                        onPress={() => navigation.navigate("Login")}
                    >
                        Login
                    </Text>
                </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "85%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    logo: {
        width: 180,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        fontStyle: "italic",
    },
    label: {
        width: "100%",
        color: "#fff",
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        padding: 10,
        color: "#fff",
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        width: "100%",
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        padding: 10,
        color: "#fff",
    },
    eyeButton: {
        paddingHorizontal: 10,
    },
    passwordNote: {
        fontSize: 10,
        color: "#ccc",
        marginBottom: 15,
    },
    button: {
        width: "100%",
        padding: 9,
        borderRadius: 5,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fff",
        marginBottom: 12,
        maxWidth: 150,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    loginText: {
        color: "#fff",
    },
    loginLink: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});