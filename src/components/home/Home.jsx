import HeroSlider from '../hero/HeroSlider'
import WeeklyOffers from '../weekly-offers/WeeklyOffers'
import ProductsSwiper from '../ProductsInHomeSliders/ProductsSwiper'
import HomeBanner from '../banner/HomeBanner'
import HomeCategories from '../categories/HomeCategories'
import StartedCard from '../StartedCard'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'

const Home = () => {
    const { products, getAllCategories, categories } = useContext(AppContext);
    const userLogged = localStorage.getItem("userLogged");
    const sellerLogged = localStorage.getItem("sellerLogged");

    useEffect(() => {
        getAllCategories();
        console.log(categories);
    }, [])
    return (
        <>
            <HeroSlider />
            <WeeklyOffers isMarginTop={true} />
            <ProductsSwiper products={products} />
            <WeeklyOffers imageCard={true} />
            <ProductsSwiper products={products} />
            <HomeBanner />
            <ProductsSwiper products={products} />

            <HomeCategories categories={categories} />

            {
                (!userLogged && !sellerLogged) && <StartedCard />
            }
            {/* <PaymentMethods /> */}
        </>
    )
}

export default Home
