import React, {useContext} from 'react';

import {useNavigation} from '@react-navigation/core';
import {Button, Text, View} from 'react-native';

import {AppConfig, AppContext} from './app';
import Phones from '../phones/phones';

console.disableYellowBox = true;

export const DetailsScreen = () => {
    const {item} = useContext(AppContext);
    const navigation = useNavigation();

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Name - {item.data.item.name}</Text>
            <Text>Phone - {item.data.item.phone}</Text>
            <Text>Index - {item.data.item.index}</Text>
            <Button
                title="Back"
                onPress={() => navigation.navigate('Phones')}
            />
        </View>
    );
};

export const SettingsScreen = ({navigation}) => {
    const {state, dispatch} = useContext(AppConfig);
    const {counter} = state;

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text onPress={() => dispatch({type: 'DECREASE_COUNTER'})}>Settings screen - {counter}</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
};
