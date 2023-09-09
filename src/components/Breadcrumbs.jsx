import React from 'react';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');
    const { t, i18n } = useTranslation();

    return (
        <Breadcrumb className='breadcrumb mb-10' aria-label="breadcrumb">
            <Breadcrumb.Item href="/" icon={HiHome}>
                <p>{i18n.language === 'ar' ? "الصفحه الرئيسه" : "Home"}</p>
            </Breadcrumb.Item>
            {pathSegments.map((segment, index) => {
                // Remove hyphens and capitalize each segment
                const formattedSegment = segment.replace(/-/g, ' ').charAt(0).toUpperCase() + segment.replace(/-/g, ' ').slice(1);
                return (
                    <Breadcrumb.Item key={index} href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                        {segment === 'profile'
                            ? i18n.language === 'ar' ? "الملف الشخصي" : "Profile"
                            : formattedSegment // Display the formatted segment
                        }
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
