import React, { useState } from "react";
import config from "../config";
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

//exporta o componente cadastro
export default function RegisterScreen({ navigation }) {
    //variáveis
    const [showPassword, setShowPassword] = useState(false); //senha está visível
    const [nome, setNome] = useState("");                     //nome digitado
    const [email, setEmail] = useState("");                   //e-mail digitado
    const [telefone, setTelefone] = useState("");             //telefone digitado
    const [password, setPassword] = useState("");             //senha

    //função para quando o usuário clicar no botão de cdastro
    const handleRegister = async () => {
        //verifica se todos os campos foram preenchidos
        if (!nome || !email || !telefone || !password) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        try {
            //envia os dados para o backend
            const response = await fetch(`${config.IP_LOCAL}/cadastro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", //formato JSON
                },
                body: JSON.stringify({ //converte os dados em JSON
                    nome,
                    email,
                    telefone,
                    senha: password, //espera o campo senha (não password)
                }),
            });


            const data = await response.json();

            //verifica se a resposta do servidorf deu erro (response.ok = false quando o servidor responde com erro)
            if (!response.ok) {
                Alert.alert("Erro", data.error || "Erro ao cadastrar."); //mostra a mensagem do servidor
                return;
            }

            //mostra mensagem de sucesso
            Alert.alert("Sucesso", data.message);
            //leva o usuário de volta para a tela de login
            navigation.navigate("Login");
        } catch (error) {
            //se não conseguir conectar com o servidor, mostra um erro
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
            console.error(error); //mostra o erro no console
        }
    };


    return (
        //imagem de fundo
        <ImageBackground
            source={require("../assets/fundo.login.png")}
            style={styles.background}
        >
            {/*container principal da tela*/}
            <View style={styles.container}>
                <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain" //faz a imagem se ajustar sem distorcer
                />

                <Text style={styles.title}>Seja bem-vindo(a)!</Text>


                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#ccc"
                    value={nome}
                    onChangeText={setNome} //atualiza o valor da variável nome
                />


                <Text style={styles.label}>E-MAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#ccc"
                    keyboardType="email-address" //mostra teclado de e-mail no celular
                    value={email}
                    onChangeText={setEmail}
                />


                <Text style={styles.label}>TELEFONE</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu telefone"
                    placeholderTextColor="#ccc"
                    keyboardType="phone-pad" //mostra teclado de numero
                    value={telefone}
                    onChangeText={setTelefone}
                />


                <Text style={styles.label}>SENHA</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Digite sua senha"
                        placeholderTextColor="#ccc"
                        secureTextEntry={!showPassword} //esconde(false) ou mostra(true) a senha dependendo do estado (olhinho; •••••••)
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)} // olhinho
                        style={styles.eyeButton}
                    >
                        <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"} //olhinho muda conforme o estado
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
        height: 90,
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