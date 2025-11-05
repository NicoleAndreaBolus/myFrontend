import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.30.112:8000';

export default function ReviewPage({ route, navigation }) {
    const { formData } = route.params;
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/registration/api/register/`,
                formData
            );

            if (response.status === 200 || response.status === 201) {
                console.log('Form submitted successfully', response.data);
                Alert.alert(
                    'Success!',
                    'User registered successfully.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('UserListPage')
                        }
                    ]
                );
            }
        } catch (error) {
            console.error("Full Axios error:", error);
            let errorMsg = 'Failed to register user.';
            if (error.response) {
                console.error("Server Response Data:", error.response.data);
                const errors = Object.values(error.response.data).join('\n');
                errorMsg = `Error: ${errors || 'Please try again.'}`;
            } else if (error.request) {
                console.error("No response received:", error.request);
                errorMsg = 'No response from server. Check your network.';
            } else {
                console.error("Error:", error.message);
                errorMsg = error.message;
            }
            Alert.alert('Registration Failed', errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const InfoRow = ({ label, value }) => (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );

    return (
        <ScrollView
            style={styles.pageContainer}
            contentContainerStyle={styles.container}
        >
            <Text style={styles.title}>Review Your Info</Text>
            <Text style={styles.subtitle}>
                Please confirm the details below are correct.
            </Text>

            <View style={styles.card}>
                <InfoRow label="First Name" value={formData.first_name} />
                <InfoRow label="Last Name" value={formData.last_name} />
                <InfoRow label="Email" value={formData.email} />
                <InfoRow label="Gender" value={formData.gender} />
            </View>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text style={styles.submitButtonText}>Confirm & Submit</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
            >
                <Text style={styles.editButtonText}>Go Back & Edit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
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
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    infoLabel: {
        fontSize: 16,
        color: '#4B5563',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '600',
        textAlign: 'right',
        flexShrink: 1,
    },
    submitButton: {
        width: '100%',
        backgroundColor: '#2fb846',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#2fb846',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    editButton: {
        width: '100%',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 12,
    },
    editButtonText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '600',
    },
});