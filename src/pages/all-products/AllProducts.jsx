import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContext';
import SingleProductCard from '../../components/products/SingleProductCard';
import { useTranslation } from 'react-i18next';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./style.css";
import axios from 'axios';
import apiUrl from '../../apiUrl';
import Loading from '../../components/Loading';

const AllProducts = ({ }) => {
    const { products, categories } = useContext(AppContext);
    const [adminProducts, setAdminProducts] = useState([]);
    const [combinedProducts, setCombinedProducts] = useState([]);

    const [minProductPrice, setMinProductPrice] = useState(0);
    const [maxProductPrice, setMaxProductPrice] = useState(10000);

    const [priceRange, setPriceRange] = useState([minProductPrice, maxProductPrice]);
    const [searchQuery, setSearchQuery] = useState("")
    const { i18n } = useTranslation();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCategorySelect = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const getAllProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/allProduct`);
            const { data } = response;
            setAdminProducts(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        setLoading(false);
    };


    useEffect(() => {
        getAllProducts();
    }, []);

    // Merge adminProducts and products into combinedProducts array
    useEffect(() => {
        if (adminProducts.length > 0 && products.length > 0) {
            const combined = [...adminProducts, ...products];
            setCombinedProducts(combined);
            setMinProductPrice(Math.min(...combined.map((product) => product.price)));
            setMaxProductPrice(Math.max(...combined.map((product) => product.price)) + 200);
        }
    }, [adminProducts, products]);
    // Define a function to remove duplicates by ID
    const removeDuplicatesById = (products) => {
        const uniqueProducts = [];
        const seenIds = new Set();

        for (const product of products) {
            if (!seenIds.has(product.id)) {
                uniqueProducts.push(product);
                seenIds.add(product.id);
            }
        }

        return uniqueProducts;
    };

    // Update your useEffect to remove duplicates
    useEffect(() => {
        // Update the filtered products when filters change
        const uniqueCombinedProducts = removeDuplicatesById(combinedProducts);
        const filteredProducts = uniqueCombinedProducts.filter((product) => {
            const titleEn = product.title.en.toLowerCase();
            const titleAr = product.title.ar.toLowerCase();
            const searchQueryLower = searchQuery.toLowerCase();
            const productPrice = product.price;
            const productCategory = product.category_id; // Access the ID of the category

            const isTitleMatch =
                titleEn.includes(searchQueryLower) ||
                titleAr.includes(searchQueryLower);

            const isPriceMatch =
                productPrice >= priceRange[0] && productPrice <= priceRange[1];

            const isCategoryMatch =
                selectedCategories.length === 0 ||
                selectedCategories.includes(productCategory);

            return isTitleMatch && isPriceMatch && isCategoryMatch;
        });

        setFilteredProducts(filteredProducts);
    }, [combinedProducts, adminProducts, searchQuery, priceRange, selectedCategories]);

    const excludedProducts = combinedProducts.filter((product) => {
        return !adminProducts.some(adminProduct => adminProduct.id === product.id);
    });

    console.log(loading);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col container py-5 min-h-screen relative">
            <div className="flex flex-col sm:flex-row">
                {/* Sidebar */}
                <div
                    className={`md:w-1/4 bg-white rounded-lg p-4 md:sticky md:top-44 h-fit overflow-y-auto shadow-lg flex flex-col gap-5`}
                >
                    <h3 className='font-bold text-lg border-b border-gray-400 pb-4'>{i18n.language === "en" ? "filter" : "تصفية"}</h3>
                    <div className='w-full border-b border-gray-400 pb-4'>
                        <input
                            className='w-full border border-gray-200 border-solid h-8'
                            type="text"
                            name='searchInAllProducts'
                            id='searchInAllProducts'
                            value={searchQuery}
                            placeholder={i18n.language === "en" ? "search" : "ابحث"}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className='w-full border-b border-gray-400 pb-4'>
                        <label className='text-secondColor font-bold' htmlFor="priceRange">{i18n.language === "en" ? "Price Range" : "سعر المنتج "}: {priceRange[0]} - {priceRange[1]}</label>
                        <Slider range
                            id='priceRange'
                            className='mt-4'
                            min={minProductPrice}
                            max={maxProductPrice}
                            step={10}
                            value={priceRange}
                            onChange={(value) => setPriceRange(value)}
                        />
                    </div>
                    <div className='w-full'>
                        <h4 className='mb-2 text-secondColor font-bold'>{i18n.language === "en" ? "Categories" : "التصنيفات "}:</h4>
                        <ul>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <label htmlFor={category.id} className='flex items-center gap-4'>
                                        <input
                                            type="checkbox"
                                            id={category.id}
                                            className='border-solid border-mainColor'
                                            checked={selectedCategories.includes(category.id)}
                                            onChange={() => handleCategorySelect(category.id)}
                                        />
                                        {i18n.language === "en" ? category.title.en : category.title.ar}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main content */}
                <div className={`md:w-3/4 p-4`}>


                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {/* Filtered Products */}
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <SingleProductCard
                                    key={product.id}
                                    allProducts={true}
                                    background={'white'}
                                    productDetails={product}
                                    id={product.id}
                                    title={product.title}
                                    total_price={product.total_price}
                                    price={product.price}
                                    quantity={product.quantity}
                                    //todo product.images[0].path
                                    image={product?.images ? product.images[0].path : null}
                                    category={product.category}
                                />
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
