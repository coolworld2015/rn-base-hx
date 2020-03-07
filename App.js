/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useContext, useReducer, useEffect, useState} from 'react';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    FlatList, Image, Button, Dimensions
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions

} from 'react-native/Libraries/NewAppScreen';


const initialState = {
    method: () => null,
    counter: 0
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_METHOD':
            return {
                ...state,
                method: action.data
            };
        case 'INCREASE_COUNTER':
            return {
                ...state,
                counter: state.counter + 1
            };
        case 'DECREASE_COUNTER':
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
};

export const AppConfig = React.createContext();
export const AppContext = React.createContext();

const Item = (props) => {
    const {item, setContextItem} = useContext(AppContext);
    const navigation = useNavigation();

    return (
        <TouchableHighlight
            onPress={() => {
                setContextItem(props)
                navigation.navigate('Details')
            }
            }
            underlayColor='#ddd'>
            <View style={styles.row}>
                <Text style={styles.rowText}>
                    {props.name}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

const MyHeader = () => {
    const {state, dispatch} = useContext(AppConfig);
    const {counter} = state;
    const [items, setItems] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        fetch('http://ui-base.herokuapp.com/api/items/get')
            .then((response) => response.json())
            .then(items => {
                setItems(items)
            })
            .catch((error) => {
                console.log('error ', error);
            })
    };

    return (
        <>
            <Text style={styles.sectionTitle}>MyHeader - {counter}</Text>
            <FlatList
                data={items}
                /*ListFooterComponent={}*/
                renderItem={({item}) => (
                    <Item
                        id={item.id}
                        name={item.name}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </>
    )
};

const Phones = ({navigation}) => {
    const {state, dispatch} = useContext(AppConfig);
    const {counter} = state;
    const [items, setItems] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        fetch('http://ui-base.herokuapp.com/api/items/get')
            .then((response) => response.json())
            .then(items => {
                setItems(items)
            })
            .catch((error) => {
                console.log('error ', error);
            })
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <TouchableWithoutFeedback>
                        <View>
                            <Image
                                style={styles.menu}
                                source={require('./img/menu.png')}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <TouchableWithoutFeedback>
                        <View>
                            <Text style={styles.textLarge}>
                                Phones
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <TouchableHighlight
                        onPress={() => true}
                        underlayColor='darkblue'>
                        <View>
                            <Text style={styles.textSmall}>
                                New
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

            <FlatList
                data={items}
                renderItem={({item}) => (
                    <Item
                        id={item.id}
                        name={item.name}
                        data={{item}}
                        navigation={navigation}
                    />
                )}
                keyExtractor={item => item.id}
            />


            <View>
                <TouchableWithoutFeedback
                >
                    <View>
                        <Text style={styles.countFooter}>
                            Records: {0}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
};

const HomeScreen = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
        </View>
    );
}

function DetailsScreen() {
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
}

function SettingsScreen({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen}/>
            <SettingsStack.Screen name="Details" component={DetailsScreen}/>
        </SettingsStack.Navigator>
    );
}

const PhonesStack = createStackNavigator();

function PhonesStackScreen() {
    return (
        <PhonesStack.Navigator headerMode={'none'}>
            <PhonesStack.Screen name="Phones" component={Phones} options={{title: ''}}/>
            <PhonesStack.Screen name="Details" component={DetailsScreen} options={{title: '', headerLeft: null}}/>
        </PhonesStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
//const Tab = createMaterialTopTabNavigator();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleClick = () => {
        dispatch({type: 'INCREASE_COUNTER'});
    };

    const [item, setItem] = useState({});
    const setContextItem = ((item) => {
        return setItem(item);
    });

    const tabBarOptions = {
        style: {
            backgroundColor: 'white',
        },
        labelStyle: {
            color: 'darkblue',
            fontWeight: 'bold'
        },
        upperCaseLabel: false,
        indicatorStyle: {backgroundColor: 'darkblue'}
    };

    const name = 'Phones';
    const MyTheme = {
        dark: false,
        colors: {
            primary: 'rgb(255, 45, 85)',
            background: 'white',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(28, 28, 30)',
            border: 'rgb(199, 199, 204)',
        },
    };

    return (
        <AppConfig.Provider value={{state, dispatch}}>
            <AppContext.Provider value={{item, setContextItem}}>
                <NavigationContainer theme={MyTheme}>
                    <Tab.Navigator
                        style={{backgroundColor: 'white'}}
                        tabBarPosition={'top'}
                        tabBarOptions={tabBarOptions}
                        sceneContainerStyle={{marginTop: -49, backgroundColor: 'white'}}
                        screenOptions={({route}) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName;

                                if (route.name === 'Phones') {
                                    iconName = <Image
                                        source={require('./img/phones.png')}
                                        style={{
                                            height: 15,
                                            width: 15,
                                            margin: 0
                                        }}
                                    />
                                }
                                if (route.name === 'Settings') {
                                    iconName = <Image
                                        source={require('./img/users.png')}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            margin: 0
                                        }}
                                    />
                                }

                                return iconName;
                            }
                        })}
                    >
                        <Tab.Screen name={name} component={PhonesStackScreen}/>
                        <Tab.Screen name="Settings" component={SettingsStackScreen}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </AppContext.Provider>
        </AppConfig.Provider>
    );
}

/*const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}*/

/*const App: () => React$Node = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClick = () => {
        dispatch({type: 'INCREASE_COUNTER'});
    };

    return (
        <AppConfig.Provider value={{state, dispatch}}>
          <ScrollView>
            <View style={styles.body}>
                <View style={styles.sectionContainer}>
                    <TouchableWithoutFeedback onPress={handleClick}>
                        <View>
                            <MyHeader/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
          </ScrollView>
        </AppConfig.Provider>
    );
};*/

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'red'
    },
 /*   scrollView: {
       backgroundColor: Colors.lighter
    },
    engine: {
        position: 'absolute',
        right: 0
    },
    body: {
        backgroundColor: Colors.white
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark
    },
    highlight: {
        fontWeight: '700'
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right'
    },*/
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
    title: {
        fontSize: 32
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 50,
    },
    iconForm: {
        flexDirection: 'row',
        borderColor: 'darkblue',
        borderWidth: 3
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'darkblue',
        borderWidth: 0,
        borderColor: 'whitesmoke',
        marginTop: 0
    },
    searchLarge: {
        height: 45,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 0,
        width: Dimensions.get('window').width * .90
    },
    searchSmall: {
        height: 45,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
        marginLeft: -5,
        paddingLeft: 5,
        width: Dimensions.get('window').width * .10
    },
    textSmall: {
        fontSize: 16,
        textAlign: 'center',
        margin: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    textLarge: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 12,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    textInput: {
        height: 45,
        marginTop: 0,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'lightgray',
        borderRadius: 0
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    rowText: {
        backgroundColor: '#fff',
        color: 'black',
        fontWeight: 'bold'
    },
    countFooter: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        borderColor: '#D7D7D7',
        backgroundColor: 'darkblue',
        color: 'white',
        fontWeight: 'bold'
    },
    loader: {
        justifyContent: 'center',
        height: 100
    },
    error: {
        color: 'red',
        paddingTop: 10,
        textAlign: 'center'
    },
    menu: {
        alignItems: 'center',
        margin: 14,
        marginTop: 16
    }
});

export default App;
