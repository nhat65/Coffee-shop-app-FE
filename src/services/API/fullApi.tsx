import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const localHost = '192.168.1.3:8000'

// const getProductDetail = async (id) => {
//   return (
//     await axios.get(`http://${localHost}/v1/product/` + id)

//   ).data;
// };
const saveToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};

const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};


interface Price {
  _id: string;
  price: number;
  currency: string;
}

export interface Product {
  _id: string;
  average_rating: number;
  created_at: string;
  description: string;
  imagelink_portrait: string;
  imagelink_square: string;
  ingredients: string;
  name: string;
  prices: Price[];
  ratings_count: number;
  special_ingredient: string;
  type_product: string;
  updated_at: string;
  roasted: string
}

const getAPIProduct = (id: string):Product => {
  const [ItemOfIndex, setItemOfIndex] = useState<Product>();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://${localHost}/v1/product/${id}`);
        console.log("DATA", response.data);
        setItemOfIndex(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch()
  }, []);
  return ItemOfIndex || {} as Product
}


export {


  saveToken,
  getToken,
  getAPIProduct

};