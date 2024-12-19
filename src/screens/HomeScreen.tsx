import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import CoffeeCard from '../components/CoffeeCard';
import axios from 'axios';
import {
  saveToken,
  getToken
} from "../services";

const localHost = '172.20.10.2:8000'

const HomeScreen = ({navigation}: any) => {
  const ListRef: any = useRef<FlatList>();

 
  const [sortedCoffee, setSortedCoffee] = useState([]);
  const getAPIAllProduct = () => {
    return axios
      .get(`http://${localHost}/v1/product/`)
      .then((response) => {
        setSortedCoffee(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(()=>{
    getAPIAllProduct();
    console.log("Home")
  },[]);

  const addToCart = async (data: Object) => {
    console.log(data)
    axios
        .post(`http://${localHost}/v1/cart/add`, data)
        .then(res => {
          if (res.status == 200) {
            Alert.alert('Add to cart successfully!!!');
          } else {
            Alert.alert('Error add to cart!!!');
          }
        })
        .catch(err => console.log(err));
  }
  
  const CoffeCardAddToCart = async ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    const userId = await getToken()
    await addToCart({
      user: userId,
      product: id,
      prices: {price: prices[0].price, size: prices[0].size, quantity: 1}
    });
  
    // calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View style={styles.ScreenContainer}>
      {/* <StatusBar backgroundColor={COLORS.primaryWhiteHex} /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <View style={styles.HeaderContainer}>
          <Entypo name="menu" size={30} color={COLORS.primaryBlackHex} />
          <Feather name="search" size={26} color={COLORS.primaryBlackHex} />
        </View>

        {/* Title */}
        <Text style={styles.ScreenTitle}>Grab your drinks 🍸</Text>

      {/*  Category Scroller */}
         {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], CoffeeList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index == index
                      ? {color: COLORS.primarySpringGreenHex}
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView> */}

        {/* Coffee Flatlist */}
        <FlatList
          ref={ListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          // keyExtractor={item => item.id}
          renderItem={({item}:any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item._id,
                    type: item.type_product,
                  });
                }}>
                <CoffeeCard
                  id={item._id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  prices={item.prices[0]}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        />

        {/* Beans Flatlist */}
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
        /> */}
      </ScrollView>
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
    padding: SPACING.space_10,
  },
  HeaderContainer: {
    padding: SPACING.space_10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryDarkGreyHex,
    padding: SPACING.space_10,
    marginVertical: SPACING.space_15 * 2,
  },
  CategoryScrollViewStyle: {
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_20,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
  },
  ActiveCategory: {
    height: 3,
    width: 20,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primarySpringGreenHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryLightGreyHex,
  },
});

export default HomeScreen;