import { View, Text, Button, TextInput} from 'react-native';
import styles from '../style';
import { useState } from 'react';

export default function Register({ navigation }) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        gender: '',
        password: ''
    });


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registration Page</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={formData.firstname}
                onChangeText={(text) => setFormData({ ...formData, firstname: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={formData.lastname}
                onChangeText={(text) => setFormData({ ...formData, lastname: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Gender"
                value={formData.gender}
                onChangeText={(text) => setFormData({ ...formData, gender: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <Button
            title="Register"
            onPress={() => navigation.navigate('ReviewPage', { formData })}
            />
        </View>
    );
}
