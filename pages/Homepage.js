import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Homepage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to my App!</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.usersButton]}
                    onPress={() => navigation.navigate('UserListPage')}
                >
                    <Text style={styles.buttonText}>View All Users</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f4f6",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#0c0f0dff",
        marginBottom: 40,
        textAlign: "center",
    },
    buttonGroup: {
        width: "100%",
        alignItems: "center",
        gap: 16,
    },
    button: {
        width: 220,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    registerButton: {
        backgroundColor: "#2fb846",
    },
    usersButton: {
        backgroundColor: "#60a5fa",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
});