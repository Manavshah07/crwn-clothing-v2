import { createContext, useState } from "react";

import ProductData from "../shop-data.json";

export const ProductContext = createContext({
    products: [] // first we want products that should store in my context  
});

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(ProductData);
    const value = {products};

    return(
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}


