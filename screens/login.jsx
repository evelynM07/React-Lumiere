import React, { useState } from "react";
import config from "../config";
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

//exporta o componente Login
export default function Login({ navigation }) {
    const [email, setEmail] = useState("");        //e-mail
    const [senha, setSenha] = useState("");        //senha
    const [secureText, setSecureText] = useState(true); //controla se a senha está visível ou escondida
    const [loading, setLoading] = useState(false); //indica se o app está processando o login

    //função quando o botão "Entrar" é pressionado
    const handleLogin = async () => {
        //verifica se os campos estão preenchidos
        if (!email || !senha) {
            Alert.alert("Erro", "Preencha todos os campos."); //mostra alerta se faltar algo
            return;
        }

        try {
            setLoading(true); //modo "carregando" (mostra texto "entrando")

            // Envia uma requisição POST ao backend para fazer login
            const response = await fetch(`${config.IP_LOCAL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", //formato JSON
                },
                body: JSON.stringify({ email, senha }), //converte os dados digitados em JSON
            });

            //converte a resposta do servidor para JSON
            const data = await response.json();

            //se o login não for sucedido (erro do servidor ou dados inválidos)
            if (!response.ok) {
                Alert.alert("Erro", data.error || "Falha no login."); //mensagem de erro
                return;
            }

            //mensagem de sucesso
            Alert.alert("Sucesso", data.message);
            //navega para a tela "Home" e envia os dados do usuário logado
            navigation.navigate("Home", { user: data.usuarios });
        } catch (error) {
            //caso ocorra algum erro de conexão com o servidor
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            console.error(error); //erro no console
        } finally {
            setLoading(false); //desativa o modo de carregamento
        }
    };

    //retorna a interface da tela de Login
    return (
        //imagem de fundo
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
                onChangeText={setEmail}                  // Atualiza o estado "email" conforme o usuário digita
                autoCapitalize="none"                    // Impede letras maiúsculas automáticas
                keyboardType="email-address"             // Mostra teclado e-mail
            />


            <Text style={styles.label}>SENHA</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputSenha}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#aaa"
                    secureTextEntry={secureText}          //esconde(false) ou mostra(true) a senha dependendo do estado (olhinho; •••••••)
                    value={senha}
                    onChangeText={setSenha}               //atualiza o estado "senha"
                />
                {/* Botão com ícone de olho para mostrar/esconder senha */}
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                    <Ionicons
                        name={secureText ? "eye-off-outline" : "eye-outline"} //muda o olho conforme o estado
                        size={22}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>


            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}        //função handleLogin ao clicar (função do botão cadast. pressionado)
                disabled={loading}           //desativa o botão enquanto carrega
            >
                <Text style={styles.buttonText}>
                    {loading ? "Entrando..." : "ENTRAR"} // Mostra "Entrando..." durante o login
                </Text>
            </TouchableOpacity>


            <Text style={styles.footerText}>
                Não possui uma conta?
                <Text
                    style={styles.cadastro}
                    onPress={() => navigation.navigate("Register")}
                >
                    {" "}Cadastre-se
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

