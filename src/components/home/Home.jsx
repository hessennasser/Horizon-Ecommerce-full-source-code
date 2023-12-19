import HeroSlider from '../hero/HeroSlider'
import WeeklyOffers from '../weekly-offers/WeeklyOffers'
import ProductsSwiper from '../ProductsInHomeSliders/ProductsSwiper'
import HomeBanner from '../banner/HomeBanner'
import HomeCategories from '../categories/HomeCategories'
import StartedCard from '../StartedCard'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import axios from 'axios'
import apiUrl from '../../apiUrl'

const Home = () => {
    const { products, getAllCategories, categories } = useContext(AppContext);
    const userLogged = localStorage.getItem("userLogged");
    const sellerLogged = localStorage.getItem("sellerLogged");
    // Section One
    const [productsOnSectionOne, setProductsOnSectionOne] = useState([]);
    const [productsOnSectionOneLoading, setProductsOnSectionOneLoading] = useState(false);
    const [productsOnSectionOneError, setProductsOnSectionOneError] = useState(false);
    const getProductsOnSectionOne = async () => {
        setProductsOnSectionOneLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/section/firstCategory`);
            const { data } = response;
            setProductsOnSectionOne(data.data);
            setProductsOnSectionOneLoading(false);
        } catch (error) {
            setProductsOnSectionOneError(error);
            setProductsOnSectionOneLoading(false);
        }
    };
    // Section Two
    const [productsOnSectionTwo, setProductsOnSectionTwo] = useState([]);
    const [productsOnSectionTwoLoading, setProductsOnSectionTwoLoading] = useState(false);
    const [productsOnSectionTwoError, setProductsOnSectionTwoError] = useState(false);
    const getProductsOnSectionTwo = async () => {
        setProductsOnSectionTwoLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/section/lastCategory`);
            const { data } = response;
            setProductsOnSectionTwo(data.data);
            setProductsOnSectionTwoLoading(false);
        } catch (error) {
            setProductsOnSectionTwoError(error);
            setProductsOnSectionTwoLoading(false);
        }
    };
    // Section Three
    const [productsOnSectionThree, setProductsOnSectionThree] = useState([]);
    const [productsOnSectionThreeLoading, setProductsOnSectionThreeLoading] = useState(false);
    const [productsOnSectionThreeError, setProductsOnSectionThreeError] = useState(false);
    const getProductsOnSectionThree = async () => {
        setProductsOnSectionThreeLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/section/firstProduct`);
            const { data } = response;
            setProductsOnSectionThree(data.data);
            setProductsOnSectionThreeLoading(false);
        } catch (error) {
            setProductsOnSectionThreeError(error);
            setProductsOnSectionThreeLoading(false);
        }
    };

    useEffect(() => {
        getAllCategories();
        getProductsOnSectionOne();
        getProductsOnSectionTwo();
        getProductsOnSectionThree();
    }, []);

    return (
        <>
            <HeroSlider />
            <WeeklyOffers isMarginTop={false} />
            {productsOnSectionOne.length > 1 && <ProductsSwiper products={productsOnSectionOne} loading={productsOnSectionOneLoading} error={productsOnSectionOneError} />}
            <WeeklyOffers imageCard={true} />
            {productsOnSectionTwo.length > 1 && <ProductsSwiper products={productsOnSectionTwo} loading={productsOnSectionTwoLoading} error={productsOnSectionTwoError} />}
            <HomeBanner />
            {productsOnSectionThree.length > 1 && <ProductsSwiper products={productsOnSectionThree} loading={productsOnSectionThreeLoading} error={productsOnSectionThreeError} />}

            <HomeCategories categories={categories} />
            {
                (!userLogged && !sellerLogged) && <StartedCard />
            }
            {/* <PaymentMethods /> */}
        </>
    )
}

export default Home
