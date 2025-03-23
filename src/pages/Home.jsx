import React from "react";
import ProductsList from "../components/ProductsList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchCombinedProductsAsync,
  fetchGradesAsync,
  fetchMaterialssAsync,
  fetchProductsAsync,
} from "../features/product/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchCombinedProductsAsync());
    dispatch(fetchMaterialssAsync());
    dispatch(fetchGradesAsync());
  }, []);
  return (
    <div>
      <ProductsList />
    </div>
  );
};

export default Home;
