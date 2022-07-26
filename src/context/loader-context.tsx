import React, { createContext, useContext, useState } from "react";
import { ClipLoader } from "react-spinners";

const LoaderContext = createContext(false);

const LoaderProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);

    const loaderStyle: any = {
        position: "absolute",
        top: "50%",
        left: "50%",
    };

    const value: any = { loading, setLoading };

    return (
        <LoaderContext.Provider value={value}>
            <ClipLoader
                loading={loading}
                css={loaderStyle}
                color="white"
                size="75px"
            />
            {children}
        </LoaderContext.Provider>
    );
};

const useLoader = () => useContext(LoaderContext);

export { LoaderProvider, useLoader };
