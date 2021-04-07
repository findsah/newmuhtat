import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {StatusBar} from 'react-native';
import Back from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'react-native-js-bottom-sheet';
export default class SuggestionBuses extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      station: '',
      isLoading: true,
      status1: '',
      busesDetails: [],
      search: '',
      data: [],
      value: '',
      textValue: '',
      searchCon: false,
      isLatitude: 29.378586,
      isLongitude: 47.990341,
    };
    this.arrayNew = [
      {
        title: 'Salim Al-Ali Banquet Hall, Kuwait',
        latitude: 29.313889,
        longitude: 47.98527,
      },

      {title: 'Block 4, Kuwait', latitude: 29.330278, longitude: 47.984722},

      {
        title: 'Kuwait City, Kuwait',
        latitude: 29.336944,
        longitude: 47.960833,
      },

      {
        title:
          'College Of Essential Education, Abdullah AlMijrin AlRoumi St, Kuwait',
        latitude: 29.347222,
        longitude: 47.970278,
      },

      {title: 'Car Park, Kuwait', latitude: 29.359722, longitude: 47.997222},

      {
        title: 'Dasma Co-op., Kuwait',
        latitude: 29.365556,
        longitude: 48.001111,
      },

      {title: 'Block 3, Kuwait', latitude: 29.309444, longitude: 47.969167},

      {title: 'Kuwait', latitude: 29.294722, longitude: 47.954722},

      {
        title: '2415 Al Muthanna St, Hawally, Kuwait',
        latitude: 29.340833,
        longitude: 48.025556,
      },

      {
        title: 'Block 11, Salmiya, Kuwait',
        latitude: 29.341944,
        longitude: 48.043333,
      },
    ];
    this.saveStation();
  }

  saveStation = () => {
    this.setState({
      station: this.props.route.params.Stations,
    });

    var myHeaders = new Headers();

    var requestOptions = {
      method: 'POST',
    };

    fetch(
      'https://muhtat-app.herokuapp.com/buses/busdetails/' +
        this.props.route.params?.Stations?.id +
        '/',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            busesDetails: result.station,
          });
        }
      })

      .catch(error => console.log('error', error));
  };
  bookTicket = async () => {
    try {
      let userID = await AsyncStorage.getItem('stsUser_id');
      // return userID;
      console.log('UserId===================>', userID);
    } catch (error) {
      console.log(error);
    }
    var requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
    };

    await fetch(
      'https://muhtat-app.herokuapp.com/buses/booking/15/' +
        this.props.route.params?.Stations?.id +
        '/1/',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        this.setState({
          status1: result,
        });
        this.createTwoButtonAlert();
        // console.log('status==>', this.state.status1);
      })

      .catch(error => console.log('error', error));
    // this.createTwoButtonAlert();
  };
  componentDidMount() {
    StatusBar.setHidden(true);
    this._isMounted = true;
    this.saveStation();
  }
  componentDidUpdate = () => {
    if (this.props.route.params != this.props.route.params) {
      console.log('in update');
      this.saveStation();
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  bottomSheet;
  _onPressButton = () => {
    this.bottomSheet.open();
  };

  updateSearch = search => {
    this.setState({search});
  };

  createTwoButtonAlert = () => {
    Alert.alert('Booking', this.state.status1.status, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'View QR code',
        onPress: () => this.props.navigation.navigate('QRCodeScreen'),
      },
    ]);

    return;
    Alert.alert(this.state.status1.status);
  };
  searchData(text) {
    if (text.length <= 0) {
      this.setState({
        searchCon: false,
      });
    } else {
      this.setState({
        searchCon: true,
      });
    }

    return;
    const newData = arrayNew.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData, 'response');
    // this.setState({
    //   dataSource: newData,
    //   text: text,
    // });
  }
  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //       <ActivityIndicator size="large" color="#0000ff" />
    //     </View>
    //   );
    // }
    const {station, busesDetails} = this.state;
    console.log('station in render', busesDetails);

    return (
      <View style={{height: '100%'}}>
        <MapView
          loadingEnabled={true}
          showsMyLocationButton={true}
          zoomControlEnabled
          showsCompass={true}
          style={{height: '50%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: this.state.isLatitude,
            longitude: this.state.isLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.isLatitude,
              longitude: this.state.isLongitude,
            }}
            title={this.state.textValue}
          />
          {/* <Marker
            coordinate={{
              latitude: station?.coordinates?.latitude,
              longitude: station?.coordinates?.longitude,
            }}
            title={station?.name}
          /> */}
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
            // position: 'absolute',
            // top: 12,
            // width: '100%',
            // height: '60%',
            // borderRadius: 10,
            // marginHorizontal: '10%',
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
            placeholder="Search Region"
            placeholderTextColor="#B6B7B7"
            onChangeText={text => {
              this.searchData(text);
            }}
            value={this.state.textValue}
          />
          {this.state.searchCon ? (
            <View
              style={{
                height: '50%',
                borderRadius: 10,
                backgroundColor: 'white',
              }}>
              <FlatList
                showsVerticalScrollIndicator={true}
                padding={5}
                contentContainerStyle={{paddingBottom: 70}}
                style={{paddingBottom: 20}}
                data={this.arrayNew}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  return (
                    <Text
                      onPress={() => {
                        this.setState({
                          textValue: item?.title,
                          searchCon: false,
                          isLatitude: item?.latitude,
                          isLongitude: item?.longitude,
                        });
                      }}
                      style={{
                        color: '#000',
                        fontSize: 14,
                        marginTop: '1%',
                        padding: 5,
                      }}>
                      {item?.title}
                    </Text>
                  );
                }}
              />
            </View>
          ) : null}
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            height: '50%',
            width: '100%',
          }}>
          <ScrollView showsVerticalScrollIndicator={true}>
            {this.state.busesDetails.map((data, index) => {
              return (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#3FA62F',
                      paddingHorizontal: 10,
                      paddingVertical: 7,
                      color: '#fff',
                      fontSize: 20,
                      marginLeft: '2%',
                      borderRadius: 35,
                      height: 35,
                      width: '20%',
                      marginTop: '5%',
                    }}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 16,
                        alignSelf: 'center',
                      }}>
                      {data?.tprice}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '3%',
                      justifyContent: 'space-between',
                      paddingHorizontal: 23,
                    }}>
                    <Text style={{fontSize: 15, color: '#6A6A6A'}}>
                      {data?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '200',
                        marginTop: '-13%',
                      }}>
                      {data?.start_time} - {data?.end_time}
                    </Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FEB409',
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        color: '#fff',
                        fontSize: 20,
                        marginRight: '15%',
                        borderRadius: 20,
                        height: 40,
                        width: '25%',
                        marginTop: '-8%',
                        // marginTop: -30,
                      }}
                      onPress={this._onPressButton}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: 13,
                        }}>
                        Buy Ticket
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        backgroundColor: '#95a5a6',
                        marginTop: '3%',
                      }}
                    />
                  </View>
                </View>

                /*  <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#3FA62F',
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      color: '#fff',
                      marginLeft: 25,
                      borderRadius: 20,
                      height: '40%',
                      width: 87,
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: 16,
                        alignSelf: 'center',
                      }}>
                      {data?.tprice}
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      justifyContent: 'space-between',
                      paddingHorizontal: 33,
                    }}>
                    <Text style={{fontSize: 15, color: '#6A6A6A'}}>
                      {data?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '200',
                        marginTop: -50,
                        paddingHorizontal: 5,
                        marginLeft: '55%',
                      }}>
                      {data?.start_time}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '200',
                        marginTop: -50,
                        paddingHorizontal: 5,
                      }}>
                      {data?.end_time}
                    </Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FEB409',
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        color: '#fff',
                        marginRight: 10,
                        borderRadius: 20,
                        height: 40,
                        width: '35%',
                        marginTop: -33,
                      }}
                      onPress={this._onPressButton}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: 13,
                        }}>
                        Buy Ticket
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View> */
              );
            })}
            <BottomSheet
              ref={ref => {
                this.bottomSheet = ref;
              }}
              height={'70%'}
              openDuration={250}
              closeOnDragDown={true}
              itemDivider={3}
              backButtonEnabled={true}
              coverScreen={true}
              isOpen={false}>
              <View>
                <Image
                  source={require('../assets/wallet.png')}
                  style={{
                    height: 150,
                    width: '35%',
                    marginTop: '2%',
                    alignSelf: 'center',
                  }}
                />

                <Text
                  style={{
                    fontSize: 22,
                    marginTop: '4%',
                    alignSelf: 'center',
                    color: '#FEB409',
                  }}>
                  Account Balance
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: '1%',
                    alignSelf: 'center',
                    color: '#000',
                  }}>
                  3.35 KWD
                </Text>

                <TouchableOpacity
                  style={{
                    height: '12%',
                    width: '80%',
                    borderRadius: 35,
                    backgroundColor: '#FEB409',
                    alignSelf: 'center',
                    marginTop: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => this.bookTicket()}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                    }}>
                    Buy Ticket
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: '12%',
                    width: '80%',
                    borderRadius: 35,
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: '#FEB409',
                    alignSelf: 'center',
                    marginTop: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  // onPress={() => this.props.navigation.navigate("TopUpScreen")}
                  onPress={() => this.props.navigation.navigate('TopUpScreen')}>
                  <Text
                    style={{
                      color: '#FEB409',
                      fontSize: 18,
                    }}>
                    Top-Up
                  </Text>
                </TouchableOpacity>
              </View>
            </BottomSheet>
          </ScrollView>
        </View>
      </View>
    );
  }
}
