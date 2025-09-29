// src/screens/Login.js
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
    Alert,
} from "react-native";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Erro", data.error || "Falha no login.");
                return;
            }

            Alert.alert("Sucesso", data.message);
            navigation.navigate("Home", { user: data.usuarios });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require("../assets/fundo.login.png")}
            style={styles.background}
        >
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Seja bem-vindo(a)!</Text>

            <Text style={styles.label}>E-MAIL</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Text style={styles.label}>SENHA</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputSenha}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#aaa"
                    secureTextEntry={secureText}
                    value={senha}
                    onChangeText={setSenha}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <Ionicons
                        name={secureText ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Entrando..." : "ENTRAR"}
                </Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Não possui uma conta?
                <Text
                    style={styles.cadastro}
                    onPress={() => navigation.navigate("Register")}
                >
                    {" "}
                    Cadastre-se
                </Text>
            </Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    logo: {
        width: 180,
        height: 80,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 30,
        fontStyle: "italic",
    },
    label: {
        alignSelf: "flex-start",
        color: "#fff",
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
        color: "#fff",
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    inputSenha: {
        flex: 1,
        height: 45,
        color: "#fff",
    },
    button: {
        width: "100%",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        maxWidth: 150,
        padding: 9,
        alignItems: "center",
        marginBottom: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerText: {
        color: "#fff",
        fontSize: 14,
    },
    cadastro: {
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});

