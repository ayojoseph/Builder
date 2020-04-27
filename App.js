import React, {Component} from 'react';

import SelectionPane2 from './components/selectionpane';
import axios from 'axios';
import {
    SafeAreaView
} from 'react-native';
import AvatarPreview from './components/avatarpreview';

const baseUrl = 'https://api.stadiumliveapp.com/avatars/preview?q=skin%20tone:male_SKIN_LIGHT1,eyes:1,eyebrows:brow1,nose:1,mouth:1';

class App extends Component {

    constructor() {
        super();
        this.state = {
            groups: [],
            renderUrl:'https://api.stadiumliveapp.com/avatars/preview?q=skin%20tone:male_SKIN_LIGHT1,eyes:1,eyebrows:brow1,nose:1,mouth:1'
        }
    }

    async UNSAFE_componentWillMount(): void {
        var res = await axios.get('https://paulxuca.api.stdlib.com/avatar-items@dev/');
        let data = res.data.data;
        var items = [];

        data.forEach(item=>{
            item.items.forEach(obj=>{
               obj.selected = false;
            });
           items.push({
               name:item.name,
               items: item.items
           });
        });
        this.setState({
            groups: items
        });
        console.log(groups[0].items[0].name);
    }

    updatePicture = (avatar) => {
        let attributes = '';
        let properties = Object.keys(avatar);

        properties.forEach(prop =>{
           attributes+=','+prop+':'+avatar[prop];
        });
         let url = baseUrl + attributes;
         this.setState({
            renderUrl:url
         });
        console.log('Attachment: '+url);

        // console.log('Props:'+properties);
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <AvatarPreview url={this.state.renderUrl}/>
                <SelectionPane2 groups={this.state.groups} updateFunc={this.updatePicture}/>
            </SafeAreaView>
        );
    }
}

export default App;
