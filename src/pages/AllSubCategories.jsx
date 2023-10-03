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
                console.log(request);
                setCategories(request.data.data[0]);
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
        <div>
            <div className="container py-10 flex flex-wrap gap-4 justify-center">
                {categories?.map((category) => (
                    <HomeCategory key={category.id} category={category} />
                ))}
            </div>
        </div>

    )
}

export default AllSubCategories
