import { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({sumbitButtonLabel, onCancel, onSubmit, defaultValues}) {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : '',
    });

    function inputChangedHandler(inputIdentifier ,enteredValue) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue
            };
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.data),
            description: inputValues.description
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0 ;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date' ;
        const desciptionIsValid = expenseData.description.trim().length > 0 ;

        if (!amountIsValid || !dateIsValid ||!desciptionIsValid) {
            Alert.alert('Invalid input' , 'Pleasae check your input values');
            return;
        }

        onSubmit(expenseData);
    }

    return <View style={styles.form}>
        <Text style={styles.title} >Your Expense</Text>
         <View style={styles.inputsRow}>
        <Input style={styles.rowInput} label="Amount" textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount,
        }} />
        <Input style={styles.rowInput} label="Date" textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date,
        }} />
    </View>
        
        <Input label="Description" textInputConfig={{
            multiline: true,
            // autoCapitalize: 'none'
            // autoCorrect: false, //default is true
            onChangeText: inputChangedHandler.bind(this, 'desciption'),
            value: inputValues.description,
        }} />
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{sumbitButtonLabel}</Button>
        </View>
    </View>
}

export default ExpenseForm;

const styles= StyleSheet.create({
    form: {
        marginTop: 40
    },
    inputsRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});