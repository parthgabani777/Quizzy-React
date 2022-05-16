import { createContext, useContext, useState } from "react";
import { ClipLoader } from "react-spinners";

const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const loaderStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
    };

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
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
