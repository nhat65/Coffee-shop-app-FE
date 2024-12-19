import React, { useState, useEffect } from 'react';
import RNRestart from 'react-native-restart';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert
} from 'react-native';
import { useStore } from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';
import axios from 'axios';
import {
  getToken
} from "../services/";

const localHost = '172.20.10.2:8000'


const DetailsScreen = ({ navigation, route }: any) => {

  const [ItemOfIndex, setItemOfIndex] = useState<any>({});
  const getAPIProduct = () => {
    const id = route.params.id
    return axios
      .get(`http://${localHost}/v1/product/` + id)
      .then((response) => {
        setItemOfIndex(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAPIProduct();
  }, []);


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


  const [fullDesc, setFullDesc] = useState(false);

  const [Price, setPrice] = useState<any>({})



  const test = () => {
    { ItemOfIndex ? console.log(ItemOfIndex) : console.log("loading"), console.log(route.params.id)}

  }
  test()


  const BackHandler = () => {
    navigation.pop();
  };

  const addToCartHandler = async () => {
    const userId = await getToken()
    addToCart({
      user: userId,
      product: ItemOfIndex._id,
      prices: { price: Price.price, size: Price.size, quantity: 1 }
    });
    navigation.navigate('Cart');
  };


  return (


    <View style={styles.ScreenContainer}>
      {/* <StatusBar backgroundColor={COLORS.primaryWhiteHex} /> */}
      {ItemOfIndex ?
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}>
          <ImageBackgroundInfo
            EnableBackHandler={true}
            imagelink_portrait={ItemOfIndex.imagelink_portrait}
            type={ItemOfIndex?.type_product}
            id={ItemOfIndex?._id}
            // favourite={ItemOfIndex.favourite}
            name={ItemOfIndex?.name}
            special_ingredient={ItemOfIndex?.special_ingredient}
            ingredients={ItemOfIndex?.ingredients}
            average_rating={ItemOfIndex?.average_rating}
            ratings_count={ItemOfIndex?.ratings_count}
            BackHandler={BackHandler}
          // ToggleFavourite={ToggleFavourite}
          />

          <View style={styles.FooterInfoArea}>
            <Text style={styles.InfoTitle}>Description</Text>
            {fullDesc ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  setFullDesc(prev => !prev);
                }}>
                <Text style={styles.DescriptionText}>
                  {ItemOfIndex.description}
                </Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  setFullDesc(prev => !prev);
                }}>
                <Text numberOfLines={3} style={styles.DescriptionText}>
                  {ItemOfIndex?.description}
                </Text>
              </TouchableWithoutFeedback>
            )}
            <Text style={styles.InfoTitle}>Size</Text>
            {ItemOfIndex.prices ? 
              <View style={styles.SizeOuterContainer}>
                {ItemOfIndex.prices.map((data: any) => (
                  <TouchableOpacity
                    key={data.size}
                    onPress={() => {
                      setPrice(data);
                    }}
                    style={styles.SizeBox}>
                    <Text
                      style={[
                        styles.SizeText,
                        {
                          color:
                            data.size == Price.size
                              ? COLORS.primaryWhiteHex
                              : COLORS.secondaryLightGreyHex,
                        },
                      ]}>
                      {data.size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View> : <View><Text>Pls choose the size</Text></View> }
          </View>
          {Price ? 
          <PaymentFooter
          prices={Price}
          buttonTitle="Add to cart"
          buttonPressHandler={addToCartHandler}
        />
        : <View><Text>Loading...</Text></View>}
        </ScrollView>
        : <View>
          <Text>Loading...</Text>
        </View>}
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
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryDarkGreyHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primarySpringGreenHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
});

export default DetailsScreen;