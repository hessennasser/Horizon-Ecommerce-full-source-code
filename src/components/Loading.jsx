import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className={`p-3 bg-[#F4F4F4]  shadow-2xl overflow-hidden min-h-[300px]`}>
            <div className="flex flex-col gap-5 items-center justify-center">
                <Oval
                    visible={true}
                    height="160"
                    width="160"
                    ariaLabel="Oval-loading"
                    wrapperStyle={{}}
                    wrapperClass="Oval-wrapper"
                    color='#125ed4'
                    secondaryColor='#060047'
                />
            </div>
        </div>
    )
}

export default Loading
