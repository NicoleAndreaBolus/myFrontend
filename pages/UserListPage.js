import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function UserListPage({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = () => {
        setLoading(true);
        axios
            .get('http://192.168.30.112:8000/registration/api/users/')
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUsers(); // Fetch user list whenever the screen is focused
        });
        fetchUsers(); // Initial fetch

        return unsubscribe;
    }, [navigation]);

    const handleDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this user?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    style: "destructive",
                    onPress: () => {
                        axios
                            .delete(`http://192.168.30.112:8000/registration/api/users/${id}/`)
                            .then(() => {
                                setUsers(users.filter((user) => user.id !== id));
                                Alert.alert("User deleted successfully");
                            })
                            .catch((error) => {
                                console.error(error);
                                Alert.alert("Failed to delete user");
                            });
                    }
                }
            ]
        );
    };

    const handleEdit = (user) => {
        navigation.navigate("EditUserPage", { user });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2fb846" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>View All Users</Text>
            <FlatList
                style={styles.list}
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userCard}>
                        <View style={styles.userInfo}>
                            <Text style={styles.name}>{item.last_name} {item.first_name}</Text>
                            <Text style={styles.email}>{item.email}</Text>
                            <Text style={styles.gender}>{item.gender}</Text>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.editButton}
                                onPress={() => handleEdit(item)}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000ff',
        alignSelf: 'center',
    },
    list: {
        flex: 1,
    },
    userCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    userInfo: {
        flex: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    email: {
        fontSize: 15,
        color: '#555',
        marginTop: 2,
    },
    gender: {
        fontSize: 15,
        color: '#a1a1a1',
        marginTop: 2,
    },
    buttonGroup: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    editButton: {
        backgroundColor: '#2fb846',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: '#ff3b3b',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
});