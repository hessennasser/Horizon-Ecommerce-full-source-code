import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { AppContext } from '../AppContext';
import Breadcrumbs from '../components/Breadcrumbs';

const Privacy = () => {
    const { i18n } = useTranslation();
    const { websiteInfo } = useContext(AppContext);

    return (
        <div className='container py-10 min-h-[300px]'>
            <Breadcrumbs />
            <p className='mt-10'>
                {i18n.language === "en" ? websiteInfo?.privacy?.en : websiteInfo?.privacy?.ar}
            </p>
        </div>
    )
}

export default Privacy
