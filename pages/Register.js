import { View, Text, Button, TextInput} from 'react-native';
import styles from '../style';
import { useState } from 'react';

export default function Register({ navigation }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
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
                value={formData.first_name}
                onChangeText={(text) => setFormData({ ...formData, first_name: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={formData.last_name}
                onChangeText={(text) => setFormData({ ...formData, last_name: text })}
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
