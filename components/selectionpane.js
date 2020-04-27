import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import {
    ScrollableTabView, ScrollableTabBar,
} from '@valdio/react-native-scrollable-tabview';

let avatar = {};

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    container: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F59CFF',
    },
    tabView: {
        flex: 1,
        padding: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    img: {
        width: '33%',
        height: 120,
        resizeMode: 'stretch',
        aspectRatio: 1,
        margin: 5,
        padding: 1,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

    selected: {
        width: '33%',
        height: 120,
        resizeMode: 'stretch',
        backgroundColor: '#5eff31',
        aspectRatio: 1,
        margin: 5,
        padding: 1,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
});

const SelectionPane2 = (props) => {
    const groups = props.groups;

    const tabNames = ['Glasses', 'Facial Hair', 'Hair', 'Hat', 'Top', 'Outer', 'Bottom', 'Socks', 'Shoes', 'Hands', 'Accessories', 'Special', 'Props'];

    return (
        <ScrollableTabView
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar/>}
        >
            {tabNames.map((tab, index) => {
                return (
                    <View style={styles.tabView} tabLabel={tab}>
                        <SelectedPage2 group={groups[index]} name={tab} num={index} updateFunc={props.updateFunc}/>
                    </View>
                );

            })}
        </ScrollableTabView>
    );

};

const SelectedPage2 = (props) => {
    let imgBaseUrl = 'https://api.stadiumliveapp.com/avatars/preview?q=' + props.name.toLowerCase() + ':';
    let items = props.group ? props.group.items : [];
    let [selected, setSelection] = React.useState(0);
    return (
        items[0] ?
            <FlatList
                data={items}
                renderItem={({item, index}) => {
                    return <ListItem group={props.name} item={item} imglink={imgBaseUrl} index={index}
                                     highlighted={selected} selectedFunc={setSelection} updateFunc={props.updateFunc}/>;
                }
                }
                numColumns={3}
                keyExtractor={item => item.id}
            />
            : null
    );
};


const ListItem = (props) => {
    let {
        item, imglink, group, highlighted, index, selectedFunc, updateFunc,
    } = props;
    let imgUrl = imglink + item.groupId;

    const updateAvatar = (group, id) => {
        if (group === 'Facial Hair') {
            group = 'facial%20hair';
        }
        avatar[group.toLowerCase()] = id;
    };
    return (
        <TouchableOpacity
            onPress={() => {
                    selectedFunc(index);
                    updateAvatar(group, item.groupId);
                    updateFunc(avatar);
                }
            }
        >
            <View>
                <Image
                    style={highlighted == index ? styles.selected : styles.img}
                    source={{url: imgUrl}}
                />
            </View>
        </TouchableOpacity>
    );
};

export default SelectionPane2;




