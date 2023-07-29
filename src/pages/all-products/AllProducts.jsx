import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContext';
import SingleProductCard from '../../components/products/SingleProductCard';
import { BsFilterLeft, BsFilterRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./style.css";
import { useParams } from 'react-router-dom';

const AllProducts = ({}) => {
    const categoryId = useParams().id;

    const { products, categories } = useContext(AppContext);
    const minProductPrice = Math.min(...products.map((product) => product.price)) === Infinity ? 0 : Math.min(...products.map((product) => product.price));
    const maxProductPrice = Math.max(...products.map((product) => product.price)) === -Infinity ? 10000 : Math.max(...products.map((product) => product.price));
    const [priceRange, setPriceRange] = useState([minProductPrice, maxProductPrice]);
    const { i18n } = useTranslation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [filteredProducts, setFilteredProducts] = useState([]);
    console.log(products);
    useEffect(() => {
        setCurrentPage(1); // Reset the current page to the first page when filters change
    }, [searchQuery, priceRange, selectedCategories]);

    useEffect(() => {
        // Update the filtered products when filters change
        const filteredProducts = products.filter((product) => {
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
    }, [products, searchQuery, priceRange, selectedCategories]);

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCategorySelect = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className="flex flex-col container py-5 min-h-screen relative">
            <div className="flex flex-col sm:flex-row">
                {/* Sidebar */}
                <div
                    className={`md:w-1/4 bg-white rounded-lg p-4 md:sticky md:top-44 h-fit overflow-y-auto shadow-lg flex flex-col gap-5 ${!sidebarOpen && ""}`}
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
                <div className={`md:w-3/4 p-4 ${sidebarOpen ? "" : ""}`}>
                    {/* Product grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
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
                                    image={product.images[0].path}
                                    category={product.category}
                                />
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredProducts.length > productsPerPage && (
                        <nav className="mt-4 flex justify-center">
                            <ul className="pagination flex items-center gap-3">
                                {currentPage > 1 && (
                                    <li className="page-item text-blue-500">
                                        <button className="page-link w-full h-full py-2 px-2 text-2xl" onClick={() => paginate(currentPage - 1)}>
                                            {i18n.language === 'en' ? <BsChevronLeft /> : <BsChevronRight />}
                                        </button>
                                    </li>
                                )}
                                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                                    <li key={index} className={`page-item bg-gray-600 hover:bg-gray-800 text-white rounded-md  ${currentPage === index + 1 ? 'active bg-secondColor' : ''}`}>
                                        <button className="page-link w-full h-full py-2 px-4" onClick={() => paginate(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                {currentPage < Math.ceil(filteredProducts.length / productsPerPage) && (
                                    <li className="page-item text-blue-500">
                                        <button className="page-link w-full h-full py-2 px-2 text-2xl" onClick={() => paginate(currentPage + 1)}>
                                            {i18n.language === 'en' ? <BsChevronRight /> : <BsChevronLeft />}
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
