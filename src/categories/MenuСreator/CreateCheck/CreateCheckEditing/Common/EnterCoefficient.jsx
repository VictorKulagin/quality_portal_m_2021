import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView, Platform, Picker, Alert, Button } from "react-native";
import {StyleSheet} from "react-native";

debugger;
const EnterCoefficient = (props) => {
    debugger;

    //const item_id = JSON.parse(action.results.config.data);

    if(props.results.length !== 0 || props.results !== undefined || props.results.length === undefined ){
        const [selectedValue, setSelectedValue] = useState((props.results[props.route.params.itemId].coefficient) ? props.results[props.route.params.itemId].coefficient.value : []);

        //console.log(props.results[props.route.params.itemId].coefficient.value + " EnterCoefficient")


        const pickerActivity = (selectedValue) => {
            setSelectedValue(selectedValue)
            alert(selectedValue);
            props.navigation.navigate('Редактировать проверку', {
                selectedValue: selectedValue,
                itemId: props.route.params.itemId,
                checkId: props.route.params.checkId
            })
        }

        return (
            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => pickerActivity(itemValue)}
                >
                    <Picker.Item label="0.5" value="0.5" />
                    <Picker.Item label="0.55" value="0.55" />
                    <Picker.Item label="0.6" value="0.6" />
                    <Picker.Item label="0.65" value="0.65" />
                    <Picker.Item label="0.7" value="0.7" />
                    <Picker.Item label="0.75" value="0.75" />
                    <Picker.Item label="0.8" value="0.8" />
                    <Picker.Item label="0.85" value="0.85" />
                    <Picker.Item label="0.9" value="0.9" />
                    <Picker.Item label="0.95" value="0.95" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="1.1" value="1.1" />
                    <Picker.Item label="1.2" value="1.2" />
                    <Picker.Item label="1.3" value="1.3" />
                    <Picker.Item label="1.4" value="1.4" />
                    <Picker.Item label="1.5" value="1.5" />
                    <Picker.Item label="1.6" value="1.6" />
                    <Picker.Item label="1.7" value="1.7" />
                    <Picker.Item label="1.8" value="1.8" />
                    <Picker.Item label="1.9" value="1.9" />
                    <Picker.Item label="2" value="2" />
                </Picker>
            </View>
        );

        return null;



    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: 800
    },

})

export default EnterCoefficient;