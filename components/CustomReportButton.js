import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

const CustomReportButton = () => {
    const toggleReport = () => {
        Alert.alert("WARNING", "REPORTED CLICKED");
    };

    return (
        <TouchableOpacity onPress={toggleReport}>
            <View style={styles.container}>
                <MaterialIcons name="report" size={24} color={colors.report} />
                <Text style={styles.label}>Report</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default CustomReportButton;
