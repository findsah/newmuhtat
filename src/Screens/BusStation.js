import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Back from 'react-native-vector-icons/Ionicons';
import Search from 'react-native-vector-icons/AntDesign';
import Geolocation from 'react-native-geolocation-service';
export default class BusStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      isCurrent: false,
      setLocation: {},
      text: '',

      locations: [
        {
          title: 'Salim Al-Ali Banquet Hall, Kuwait',
          latitude: 29.313889,
          longitude: 47.985278,
          markerImage: 'https://i.ibb.co/2PwKJWc/UA-Studios-2.png',
          weight: 13,
        },

        {
          title: 'Block 4, Kuwait',
          latitude: 29.330278,
          longitude: 47.984722,
          markerImage: 'https://i.ibb.co/2PwKJWc/UA-Studios-2.png',
          weight: 13,
        },

        {
          title: 'Kuwait City, Kuwait',
          latitude: 29.336944,
          longitude: 47.960833,
          markerImage: 'https://i.ibb.co/2PwKJWc/UA-Studios-2.png',
          weight: 13,
        },

        {
          title:
            'College Of Essential Education, Abdullah AlMijrin AlRoumi St, Kuwait',
          latitude: 29.347222,
          longitude: 47.970278,
          markerImage: 'https://i.ibb.co/2PwKJWc/UA-Studios-2.png',
          weight: 13,
        },

        {
          title: 'Car Park, Kuwait',
          latitude: 29.359722,
          longitude: 47.997222,
          markerImage: 'https://i.ibb.co/2PwKJWc/UA-Studios-2.png',
          weight: 13,
        },

        {
          title: 'Dasma Co-op., Kuwait',
          latitude: 29.365556,
          longitude: 48.001111,
          markerImage: 'https://i.ibb.co/2PwKJWc/UA-Studios-2.png',
          weight: 13,
        },

        {
          title: 'Block 3, Kuwait',
          latitude: 29.309444,
          longitude: 47.969167,

          weight: 13,
        },

        {
          title: 'Kuwait',
          latitude: 29.294722,
          longitude: 47.954722,
          markerImage: 'https://i.ibb.co/2PwKJWc/UA-Studios-2.png',
          weight: 13,
        },

        {
          title: '2415 Al Muthanna St, Hawally, Kuwait',
          latitude: 29.340833,
          longitude: 48.025556,

          weight: 13,
        },

        {
          title: 'Block 11, Salmiya, Kuwait',
          latitude: 29.341944,
          longitude: 48.043333,

          weight: 13,
        },
      ],
    };
    this.arrayHolder = [];
  }
  componentDidMount() {
    // Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        console.log('Position', position);
        // let obj = {
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // };
        this.setState({
          isCurrent: true,
          setLocation: position.coords,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
    };

    fetch('https://muhtat-app.herokuapp.com/buses/stations/', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('res------>', result[0].name);
        this.setState(
          {
            isLoading: false,
            dataSource: result,
          },
          () => {
            this.arrayHolder = result;
          },
        );
      })
      .catch(error => console.log('error', error));
  }

  searchData(text) {
    const newData = this.arrayHolder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData),
      this.setState({
        dataSource: newData,
        text: text,
      });
  }
  render() {
    const {latitude, longitude} = this.state.setLocation;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={{height: '50%'}}>
          <MapView
            loadingEnabled={true}
            style={{height: '100%'}}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            provider={PROVIDER_GOOGLE}
            zoomControlEnabled
            initialRegion={{
              latitude: latitude ?? 29.309444,
              longitude: longitude ?? 47.969167,
              longitudeDelta: 0.0321,
              latitudeDelta: 0.0522,
            }}>
            {this.state.isCurrent ? (
              <Marker
                coordinate={{
                  latitude: latitude ?? 29.309444,
                  longitude: longitude ?? 47.969167,
                  longitudeDelta: 0.0321,
                  latitudeDelta: 0.0522,
                }}
                title={'Current Location'}>
                {/* <Image source={require('./../assets/aa.png')} /> */}
              </Marker>
            ) : null}
            {this.state.locations.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  longitude: marker.longitude,
                  latitude: marker.latitude,
                }}
                title={marker.title}
              />
            ))}
          </MapView>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              marginTop: '7%',
            }}>
            <Back
              onPress={() => this.props.navigation.goBack()}
              name="arrow-back"
              size={30}
              color="black"
              style={{marginLeft: '2%', color: 'grey'}}
            />
            {/* <Text style={{fontSize: 25, color: 'grey', marginLeft: '1%'}}>
              Back
            </Text> */}
          </View>
          <View
            style={{
              position: 'absolute',
              top: 12,
              width: '100%',
            }}>
            <SearchBar
              containerStyle={{
                backgroundColor: 'white',
                marginVertical: '1%',
                margin: '12%',
                borderRadius: 35,
                borderWidth: 1,
                borderWidthColor: 'white',
                padding: 2,
              }}
              inputContainerStyle={{
                backgroundColor: 'white',
                borderRadius: 25,
              }}
              placeholder="Search for Bus Stations"
              placeholderTextColor="#B6B7B7"
              onChangeText={text => this.searchData(text)}
              value={this.state.text}
            />
          </View>
        </View>

        <View style={{height: '50%', backgroundColor: 'white'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              // marginTop: "-3%",
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                marginTop: '1%',
              }}>
              Bus Stations
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 15,
                color: 'grey',
                marginTop: '1%',
              }}>
              Please Select the Station for Booking.
            </Text>
          </View>
          <View
            style={{
              alignItem: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',
              backgroundColor: 'white',
            }}>
            <FlatList
              showsVerticalScrollIndicator={true}
              padding={5}
              contentContainerStyle={{paddingBottom: 70}}
              style={{paddingBottom: 20}}
              data={this.state.dataSource}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ChooseSuggestion', {
                      Stations: item,
                      data: this.state.dataSource,
                    })
                  }>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '100',
                      fontSize: 25,
                      marginTop: '1%',
                      padding: 5,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    );
  }
}
