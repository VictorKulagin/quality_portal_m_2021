import {Alert} from "react-native";

const EndCheckTrue = (props) => {
    debugger;
    if (props.results.length !== 0) {
        for (let key in props.results) {

            if(props.results[key].coefficient !== undefined){
                if(props.results.hasOwnProperty(key)){
                    //console.log(`${key} : ${props.results[key].coefficient.value}`)
                }
            }

            if(props.results[key].text !== undefined){
                if(props.results.hasOwnProperty(key)){
                    // console.log(`${key} : ${props.results[key].text.text}`)
                }
            }

            function coefficientR() {
                if (props.results[key].coefficient.value < 1) {
                    // console.log(false)
                    return false;
                } else {
                    // console.log(true)
                    return true;
                }
            }

            function textR() {
                if (props.results[key].text === undefined) {
                    // console.log(false)
                    return false;
                } else {
                    // console.log(true)
                    return true;
                }
            }

            if (coefficientR() === false && textR() === false) {
                if (props.tree.children !== undefined) {
                    props.tree.children.map((value, index) => {
                        if (value.name !== undefined) {
                            value.children.map((value2, index2) => {
                                if (value2.id == key) {
                                    //Alert.alert(` Необходимо добавить текст замечания к пунктам проверок ${value2.name}`);
                                    Alert.alert(
                                        "Необходимо добавить текст замечания к пунктам проверок",
                                        `${value2.name}`,
                                        [
                                            { text: "OK", onPress: () => console.log("OK Pressed") }
                                        ]
                                    );
                                    //console.log(false);
                                    console.log(value2.name);
                                    return false;
                                }
                            })
                        }
                    })
                }
            }
            if (coefficientR() === false && textR() === false) {
                // console.log(false + 'EndCheckTrue')
                return false;
            }
        }
    }
    return true;
}

export default EndCheckTrue;




/*const AlertEndCheckTrue = (bool) => {
    if(bool !== 'success'){

        if (props.results.length !== 0) {
            for (let key in props.results) {

                function coefficientR() {
                    if (props.results[key].coefficient.value < 1) {
                        return false;
                    } else {
                        return true;
                    }
                }

                function textR() {
                    if (props.results[key].text === undefined) {
                        return false;
                    } else {
                        return true;
                    }
                }

                if (coefficientR() === false && textR() === false) {
                    if (props.tree.children !== undefined) {
                        props.tree.children.map((value, index) => {
                            if (value.name !== undefined) {
                                value.children.map((value2, index2) => {
                                    if (value2.id == key) {
                                    }
                                })
                            }
                        })
                    }
                }
            }
        }
    }
    return null;
}*/