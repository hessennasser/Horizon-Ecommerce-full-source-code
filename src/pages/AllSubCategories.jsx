import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import HomeCategory from '../components/categories/HomeCategory';
import { useParams } from 'react-router-dom';
import apiUrl from '../apiUrl';

const AllSubCategories = () => {
    const categoryId = useParams().categoryId;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            try {
                const request = await axios(`${apiUrl}/category/${categoryId}`);
                setCategories(request?.data?.data?.children);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getCategories()
    }, [categoryId])
    const { i18n } = useTranslation();

    if (loading) {
        return <Loading />
    }

    return (
        <div className='container py-10 '>
            {/* <h3 className="font-semibold">{i18n.language === "en" ? categories.title.en : categories.title.ar}</h3> */}
            <div className="flex flex-wrap gap-4 justify-center">
                {categories?.map((category) => (
                    <HomeCategory key={category.id} category={category} />
                ))}
            </div>
        </div>

    )
}

export default AllSubCategories
