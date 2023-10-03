import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import HomeCategory from '../components/categories/HomeCategory';

const AllCategories = () => {
    const { categories } = useContext(AppContext);
    return (
        <div>
            <div className="container py-10 flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                    <HomeCategory key={category.id} category={category} />
                ))}
            </div>
        </div>
    )
}

export default AllCategories
