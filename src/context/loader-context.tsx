import React, {
    createContext,
    CSSProperties,
    useContext,
    useState,
} from "react";
import { ClipLoader } from "react-spinners";
import { LoaderContextType } from "types/loader.context.types";

const LoaderContext = createContext<LoaderContextType | boolean>(false);

const LoaderProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const loaderStyle: CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
    };

    const value: LoaderContextType = { loading, setLoading };

    return (
        <LoaderContext.Provider value={value}>
            <ClipLoader
                loading={loading}
                cssOverride={loaderStyle}
                color="white"
                size="75px"
            />
            {children}
        </LoaderContext.Provider>
    );
};

const useLoader = () => useContext(LoaderContext);

export { LoaderProvider, useLoader };
