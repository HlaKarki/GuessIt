import { createContext, useContext, useState } from "react";

const PointsContext = createContext();

export const usePoints = () => {
    return useContext(PointsContext);
};

export const PointsProvider = ({ children }) => {
    const [points, setPoints] = useState(10);

    return (
        <PointsContext.Provider value={[points, setPoints]}>
            {children}
        </PointsContext.Provider>
    );
};
