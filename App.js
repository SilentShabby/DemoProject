import React from 'react';
import { Alert,StyleSheet, Text, View,TextInput,Image ,Button} from 'react-native';



import { IMAGENAME } from './img';
import { createStackNavigator } from 'react-navigation';


 


class DetailsScreen extends React.Component {
  render() {
	 
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}
class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
		super(props);
		this.state = {email: '', pwd:''};
		this._onPressButton = this._onPressButton.bind(this);
	};
	_onPressButton() {
	const { email }  = this.state ;
        const { pwd, email
            
        }  = this.state ;
	
	
	
	
	
	if(email==''||pwd==''){
		Alert.alert('not fill!')
	}else{
		fetch("http://gangpiaojia.cn/api/login_email.php", {
		  method: 'POST',
		  headers: new Headers({
					 'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
			}),
		  body: "email="+email+"&password="+pwd // <-- Post parameters
		})
		.then((response) => response.json())
		.then((responseJson) => {
		 console.log('success2', responseJson.resultCode);
		 if(responseJson.resultCode==0){
			 Alert.alert('success!');
			 this.props.navigation.navigate('Details')
		 }
		})
		.catch((error) => {
		  console.error(error);
		});
		
	}
    
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
		<Image
		style={styles.titleImg}
          source={IMAGENAME }
        />
        <Text style={styles.textTitle}>Username</Text>
		<TextInput
		onChangeText={email => this.setState({email})}
			style={{height:30,width:250, borderColor: 'gray', borderWidth: 0}}
		  />
        <Text style={styles.textTitle}>Password</Text>
		<TextInput
		onChangeText={(value) => this.setState({pwd: value})}
			style={{height:30,width:250, borderColor: 'gray', borderWidth: 0}}
		  />
        <Button	
		onPress={this._onPressButton}
			style={styles.buttonStyle}		
		  title="submit"
		  color="#841584"
		/>
      </View>
    );
  }
}
const RootStack = createStackNavigator(
  {
    Home: LoginScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
	

  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fde1e2',
    alignItems: 'center',
   // justifyContent: 'center',
  },
  titleImg: {
	  marginTop:100,
	marginBottom:100,
    width:216,
	height:114
  },
	textTitle:{
		width:250,
		justifyContent: 'flex-start',
	},
	buttonStyle:{
		marginTop:30
	}
});
