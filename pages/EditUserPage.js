import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.30.112:8000';

export default function EditUserPage({ route, navigation }) {
    const user = route?.params?.user || {};

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.id) {
            Alert.alert("Error", "No user ID provided.", [{ text: 'OK', onPress: () => navigation.goBack() }]);
            return;
        }

        setLoading(true);
        axios
            .get(`${API_BASE_URL}/registration/api/users/${user.id}/`)
            .then((res) => {
                setFormData({
                    first_name: res.data.first_name || '',
                    last_name: res.data.last_name || '',
                    email: res.data.email || '',
                    gender: res.data.gender || '',
                });
            })
            .catch((error) => {
                console.error("Failed to fetch user details:", error);
                Alert.alert("Error", "Failed to load user details. Please try again.");
                navigation.goBack();
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.id, navigation]);

    const handleInputChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        if (!formData.first_name || !formData.last_name || !formData.email) {
            Alert.alert('Validation', 'First name, last name, and email are required');
            return;
        }

        setLoading(true);
        try {
            const url = `${API_BASE_URL}/registration/api/users/${user.id}/`;
            
            const payload = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                gender: formData.gender,
                password: user.password || 'default_password',
            };
            
            await axios.put(url, payload);

            Alert.alert('Success', 'User updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);

        } catch (error) {
            console.error("Full Axios error:", error);
            let errorMsg = 'Failed to update user.';
            if (error.response) {
                console.error("Server Response Data:", error.response.data);
                errorMsg = `Error ${error.response.status}: ${JSON.stringify(error.response.data)}`;
            } else if (error.request) {
                console.error("No response received:", error.request);
                errorMsg = 'No response from server. Check your network and IP address.';
            } else {
                console.error("Error:", error.message);
                errorMsg = error.message;
            }
            Alert.alert('Error', errorMsg);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !formData.first_name) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2fb846" />
                <Text style={styles.loadingText}>Loading User...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.subtitle}>Update details for {user.first_name || 'user'}</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter first name"
                        placeholderTextColor="#9CA3AF"
                        value={formData.first_name}
                        onChangeText={(text) => handleInputChange('first_name', text)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter last name"
                        placeholderTextColor="#9CA3AF"
                        value={formData.last_name}
                        onChangeText={(text) => handleInputChange('last_name', text)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="user@example.com"
                        placeholderTextColor="#9CA3AF"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        {['Male', 'Female', 'Other'].map((gender) => (
                            <TouchableOpacity
                                key={gender}
                                style={[
                                    styles.genderButton,
                                    formData.gender === gender && styles.genderButtonActive
                                ]}
                                onPress={() => handleInputChange('gender', gender)}
                            >
                                <Text style={[
                                    styles.genderText,
                                    formData.gender === gender && styles.genderTextActive
                                ]}>
                                    {gender}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                >
                    <Text style={styles.backButtonText}>Cancel</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 32,
        textAlign: 'center',
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#111827',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    genderButton: {
        flex: 1,
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        marginHorizontal: 4,
        backgroundColor: '#FFFFFF',
    },
    genderButtonActive: {
        backgroundColor: '#2fb846',
        borderColor: '#2fb846',
    },
    genderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4B5563',
    },
    genderTextActive: {
        color: '#FFFFFF',
    },
    saveButton: {
        width: '100%',
        backgroundColor: '#2fb846',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#2fb846',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        width: '100%',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
    },
    backButtonText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '600',
    },
});