import React from 'react';
import {Dimensions, ImageBackground, ScrollView, StatusBar, View} from 'react-native';
import RoadMap from '../components/RoadMap';
import Vault from '../assets/vault.svg';
import EndPoint from '../assets/finalPoint.svg';
import Forest from '../assets/forest.svg';
import Unlock from '../assets/startText.svg'



function Home() {
  const { width } = Dimensions.get('window');

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 80, zIndex: 3}}>
            <ImageBackground
              resizeMode="stretch"
              source={require('../assets/background.png')}>
              <View style={{marginTop: StatusBar.currentHeight + 50}}>
                <View style={{marginBottom: -45, marginLeft: 30}}>
                  <EndPoint width="100%" />
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Vault
                    position="absolute"
                    top={-15}
                    left={width / 2 - 35}
                    zIndex={2}
                    />
                  <RoadMap month={12} progress={100} />
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{zIndex: 1}}>
            <Unlock width="100%" position='absolute' top={-70}/>
            <Forest width="100%" />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Home;
