import { View, Text, StyleSheet, Button } from 'react-native';
import style from '../style';
import axios from 'axios';

export default function ReviewPage({ route, navigation }) {
    const { formData } = route.params;
    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://127.0.0.1:8000/registration/api/register/', formData);
            if (response.status === 200) {
                console.log('Form submitted successfully');
            }
            console.log(response.data);
        }catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (

        <View style={style.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Review Your Information</Text>
            <Text>First Name: {formData.firstname}</Text>
            <Text>Last Name: {formData.lastname}</Text>
            <Text>Email: {formData.email}</Text>
            <Text>Gender: {formData.gender}</Text>


            <View style={style.buttonContainer}>
                <Button
                    title="Go Back to Edit"
                    onPress={() => navigation.navigate('Register', { formData })}
                />
            </View>


            <View style={style.buttonContainer}>
                <Button
                    title="Submit"
                    onPress={handleSubmit}
                />
            </View>

        </View>
    )
}


