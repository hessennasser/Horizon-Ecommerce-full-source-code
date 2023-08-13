import React from 'react'
import { useTranslation } from 'react-i18next';

const Error = () => {
    const { i18n } = useTranslation();
    return (
        <div className="max-w-[98%] mx-auto py-10 text-center p-3 min-h-[300px]">
            <h2 className="text-3xl text-red-500">{i18n.language === "en" ? "THere Is An Error!" : "يوجد خطأ!"}</h2>
        </div>
    )
}

export default Error
