import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import PaymentFooter from '../components/PaymentFooter';
import EmptyListAnimation from '../components/EmptyListAnimation';
import CartItem from '../components/CartItem';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {
  getToken
} from "../services";

const localHost = '172.20.10.2:8000'

const CartScreen = ({ navigation, route }: any) => {

  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = async () => {
    const id = await getToken()
    const basicCart = await getAPIBasicCart()
    payCart({
      customer: id,
      cartList: basicCart,
      totalAmount: TotalPay.price
    }
    )
  };

  const getAPIBasicCart = async () => {
    const id = await getToken();
    try {
      const response = await axios.get(`http://${localHost}/v1/cart/basic/${id}`, {
        headers: {
          'Cache-Control': 'no-cache', 
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      throw err; 
    }
  };

  const payCart = async (order: Object) => {
    const id = await getToken()
    axios
      .put(`http://${localHost}/v1/order/pay/${id}`, order)
      .then(res => {
        setTotalPay({})
        setCartList([])
        if (res.status == 200) {
          Alert.alert('Pay successfully!!!');
        } else {
          Alert.alert('Error pay!!!');
        }
      })
      .catch(err => console.log(err));
  }

  const [Loading, setLoading] = useState(false);

  const incrementCartItemQuantityHandler = (id: string, price: number, size: string, quantity: number, pricesId: string) => {
    const getAPIUpdate = async () => {
      const data = {
        action: "plus",
        prices: {
          pricesId: pricesId,
          price: price,
          size: size,
          quantity: quantity
        }
      }
      return axios
        .put(`http://${localHost}/v1/cart/update/` + id, data)
        .then((response) => {
          console.log("updated cart ", response.data);
        })
        .catch((err) => console.log(err));
    };
    getAPIUpdate()

  };

  const decrementCartItemQuantityHandler = (id: string, price: number, size: string, quantity: number, pricesId: string) => {
    const getAPIUpdate = async () => {
      const data = {
        action: "minus",
        prices: {
          pricesId: pricesId,
          price: price,
          size: size,
          quantity: quantity
        }
      }
      return axios
        .put(`http://${localHost}/v1/cart/update/` + id, data)
        .then((response) => {
          console.log("updated cart ", response.data);

        })
        .catch((err) => console.log(err));
    };
    getAPIUpdate()
    
  };

  const [CartList, setCartList] = useState<any>([]);
  const getAPIAllCart = async () => {
    const userId = await getToken()
    return axios
      .get(`http://${localHost}/v1/cart/` + userId)
      .then((response) => {
        setCartList(response.data);
      })
      .catch((err) => console.log(err));
  };
  useFocusEffect(
    React.useCallback(() => {
      getAPIAllCart();
      getAPITotalPay();
    }, [])
  );
  const [TotalPay, setTotalPay] = useState<any>({});
  const getAPITotalPay = async () => {
    return axios
      .get(`http://${localHost}/v1/cart/`)
      .then((response) => {
        setTotalPay(response.data);
      })
      .catch((err) => console.log(err));
  };

  const test = () => {
    { CartList ? console.log("Cart", TotalPay) : console.log("loading") }
  }
  test()
  return (

    <View style={styles.ScreenContainer}>
      {/* <StatusBar backgroundColor={COLORS.primaryBlackHex} /> */}
      {CartList ?
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}>
          <View
            style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
            <View style={styles.ItemContainer}>
              {/* HeaderBar */}
              <View style={styles.HeaderContainer}>
                <Entypo name="menu" size={30} color={COLORS.primaryBlackHex} />
                <Feather name="search" size={26} color={COLORS.primaryBlackHex} />
              </View>

              {CartList.length == 0 ? (
                <EmptyListAnimation title={'Cart is Empty'} />
              ) : (
                <View style={styles.ListItemContainer}>
                  {CartList.map((data: any) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push('Details', {
                          index: data.index,
                          id: data.product._id,
                          type: data.type_product,
                        });
                      }}
                      key={data._id}>
                      <CartItem
                        id={data._id}
                        name={data.product.name}
                        imagelink_square={data.product.imagelink_square}
                        special_ingredient={data.product.special_ingredient}
                        prices={data.prices}
                        type={data.product.type_product}
                        incrementCartItemQuantityHandler={
                          incrementCartItemQuantityHandler
                        }
                        decrementCartItemQuantityHandler={
                          decrementCartItemQuantityHandler
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {(typeof TotalPay === 'object' && Object.keys(TotalPay).length === 0) ? (
              <></>
            ) : (
              <PaymentFooter
                buttonPressHandler={buttonPressHandler}
                buttonTitle="Pay"
                prices={TotalPay}
              />
            )}

          </View>
        </ScrollView> :
        <View>
          <Text>Loading</Text></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    padding: SPACING.space_8,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_4,
    gap: SPACING.space_20,
  },
});

export default CartScreen;
