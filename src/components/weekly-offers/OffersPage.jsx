import React, { useContext } from 'react'
import Breadcrumbs from '../Breadcrumbs'
import SingleProductCard from '../products/SingleProductCard'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext'

const WeeklyPage = () => {
    const { offersProducts } = useContext(AppContext)
    const navigate = useNavigate();
    if (!offersProducts) {
        navigate("/home");
        return;
    }
    return (
        <div className='container py-10'>
            <Breadcrumbs />
            <div className="content grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {
                    offersProducts?.length > 0 && (
                        offersProducts.map((product) => (
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
                    )
                }
            </div>
        </div>
    )
}

export default WeeklyPage
