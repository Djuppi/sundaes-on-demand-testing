import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants/index"


const OrderDetails = createContext();

// Custom hook to check whether we're in a provider

export function useOrderDetails() {
    const contextValue = useContext(OrderDetails)

    if(!contextValue) {
        throw new Error('userOrderDetails must be called from within a OrderDetailsProvider');
    }

    return contextValue;
}


export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: {}, // example: { Chocolate: 1, Vanilla: 2 }
        toppings: {} // example: { "Gummi Bears": 1 }
    });

    const updateItemCount = (itemName, newItemCount, optionType) => {
        // make a copy of existing state
        const newOptionCounts = { ...optionCounts };

        // update the copy with the new information
        newOptionCounts[optionType][itemName] = newItemCount;
        // set state to new option count
        setOptionCounts(newOptionCounts);
    }

    const resetOrder = () => {
        setOptionCounts({ scoops: {}, toppings: {}});
    }

    // utility function to derive totals from optionCounts sate value
    const calculateTotal = (optionType) => {
        // get an array of counts for the option type (for example, [1, 2])
        const countsArray = Object.values(optionCounts[optionType]);

        // total the values in the array of counts for the number of items
        const totalCount = countsArray.reduce((total, value) => total + value, 0);
        
        // multiply the total number of items by the price for thi option type
        return totalCount * pricePerItem[optionType]
    }

    const totals = {
        scoops: calculateTotal('scoops'),
        toppings: calculateTotal('toppings'),
        grandTotal: calculateTotal('scoops') + calculateTotal('toppings')
    }
    
    const value = { optionCounts, totals, updateItemCount, resetOrder }
    return <OrderDetails.Provider value={value} {...props} />;
}