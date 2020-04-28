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
    tabView: {
        flex: 1,
        padding: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.01)',
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
        borderWidth: 5,
        borderColor: '#5eff31',
        borderRadius: 25,
        aspectRatio: 1,
        margin: 5,
        padding: 1,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3
    },
});

export default class SelectionPane2 extends React.Component{
    constructor(props) {
        super(props);

    }


    render(){
        const groups = this.props.groups;

        const tabNames = ['Glasses', 'Facial Hair', 'Hair', 'Hat', 'Top', 'Outer', 'Bottom', 'Socks', 'Shoes', 'Hands', 'Accessories', 'Special', 'Props'];

        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar/>}
                // ref={(tabView)=> {this.tabView=tabView;}}
            >
                {tabNames.map((tab, index) => {
                    return (
                        <TouchableOpacity style={styles.tabView} tabLabel={tab} onPress={() => this.tabView.goToPage(index)}>
                            <SelectedPage2 group={groups[index]} name={tab} num={index} updateFunc={this.props.updateFunc}/>
                        </TouchableOpacity>
                    );
                })}
            </ScrollableTabView>
        );
    }


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
    const block = 'https://cdn3.iconfinder.com/data/icons/block/32/block-512.png';
    let imgUrl = imglink + item.groupId;
    let uu = item.groupId === 'empty' ? block : imglink + item.groupId;
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
                    source={{url: uu}}
                    resizeMode="stretch"
                />
            </View>
        </TouchableOpacity>
    );
};

// export default SelectionPane2;




