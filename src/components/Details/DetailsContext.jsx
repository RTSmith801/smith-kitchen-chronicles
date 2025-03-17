import { createContext } from "react";

const DetailsContext = createContext({
    items: [],
    viewItem: (item) => {},
});

export default DetailsContext;
