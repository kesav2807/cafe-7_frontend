import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoScreen from './Components/Logo Home Screen/LogoScreen'; // Adjust the path as needed
import AdminScreen from './Components/Admin/AdminScreen'; // Create these screens
import SignUpScreen from './Components/Users/SignUpScreen'; // Create these screens
import SignInScreen from './Components/Users/SignInScreen';
import HomeScreen from './Components/Users/HomeScreen';
import ADMINHOMESCREEN from './Components/Admin/Adminhomescreen';
//import DetailsScreen from './Components/Users/DetailsScreen';
import BestsellerScreen from './Components/Users/Bestseller';
import CartScreen from'./Components/Users/CartScreen';
import AddPayment from './Components/Admin/AddPayment';
import data from './Components/Users/data';
import OrdersScreen from './Components/Admin/GetallorderDate';
import OrderList from './Components/Admin/Getparticularorder';
import { CartProvider } from './Components/Users/cartContext';
import OrderMethodScreen from './Components/Logo Home Screen/Home';
// import Map from './Components/Users/map';
import OrderConfirmation from './Components/Users/OrderConfirmation';
import Profile from './Components/Users/Profile';
import BranchLocationMap from './Components/Users/map';
import EditProfile from './Components/Users/EditProfile';
import ForgotPasswordScreen from './Components/Users/ForgotPasswordScreen';
import AddProductForm from './Components/Admin/AddProductForm';
import HomePage from './Components/Users/Adminaddtoproduct';
import Adminlogo from './Components/Admin/adminlogo';
import ImgScreen from './Components/Admin/adminaddtoimg';
import ProductDetail from './Components/Admin/ProductDetail';
import ProductList from './Components/Admin/ProductList';
import UpdateProductForm from './Components/Admin/UpdateProductForm';
import OrderDetailsScreen from './Components/Admin/admin';
const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogoScreen">
        <Stack.Screen name="LogoScreen" component={LogoScreen} options={{ title: ' WELCOME TO CAFE-7' }} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ title: 'ADMIN SCREEN' }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'SIGNUP SCREEN' }} />
        <Stack.Screen name='SignInScreen' component={SignInScreen} options={{title:'SIGNIN SCREEN'}} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{title:'HOME SCREEN'}} />
        <Stack.Screen name='ADMINHOMESCREEN' component={ADMINHOMESCREEN} options={{title:'ADMIN HOME SCREEN'}} />
        <Stack.Screen name='HomePage' component={HomePage} options={{title:'Product Screen'}} />
        <Stack.Screen name='Bestseller' component={BestsellerScreen} options={{title:'BestsellerScreen'}}/>
        <Stack.Screen name='CartScreen' component={CartScreen} options={{title:'CartScreen'}}/>
        <Stack.Screen name='AddPayment' component={AddPayment} options={{title:'Add Payment'}}/>
        <Stack.Screen name='date' component={data} options={{title:'Date Screen'}}/>
        <Stack.Screen name='GetallorderDate' component={OrdersScreen} options={{title:'Get All Order Date'}}/>
        <Stack.Screen name='OrderList' component={OrderList} options={{title:'Get Particular Order'}}/>
        <Stack.Screen name='Home' component={OrderMethodScreen} options={{title:'HomeScreen'}}/>
        <Stack.Screen name='OrderConfirmation' component={OrderConfirmation} options={{title:'OrderConfirmation'}}/>
        <Stack.Screen name='profile' component={Profile} options={{title:'Profile'}}/>
        <Stack.Screen name='map' component={BranchLocationMap} options={{title:'Map Sceen'}}/>
        <Stack.Screen name='EditProfile' component={EditProfile} options={{title:'EditProfile Screen'}}/>
        <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} options={{title:'ForgotPassword Screen'}}/>
        <Stack.Screen name='AddproductForm' component={AddProductForm} options={{title:'AddproductForm'}}/>
        <Stack.Screen name='Adminlogo' component={Adminlogo} options={{title:'Admin Screen'}}/>
        <Stack.Screen name='ImgScreen' component={ImgScreen} options={{title:'Admin Image Screen'}}/>
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={{title:'ProductDetail Screen'}}/>
        <Stack.Screen name='ProductList' component={ProductList} options={{title:'ProductList Screen'}}/>
        <Stack.Screen name='UpdateProductForm' component={UpdateProductForm} options={{title:'UpdateProductForm Screen'}}/>
        <Stack.Screen name='admin' component={OrderDetailsScreen} options={{title:'Order List Screen'}}/>

        
        

      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
};

export default App;