import { useEffect } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../Utilities";
import SummaryForm from './SummaryForm';

export default function OrderSummary({setOrderPhase}) {

    const { totals, optionCounts } = useOrderDetails();



    const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2], ["vanilla", 1]]
    const scoopList = scoopArray.map(([key, value]) => {
        if(value !== 0) {
           return (
            <li key={key} data-testid={key}>
                {value} {key}
            </li>
           ) 
        } else return null;
        
    });

    const toppingsArray = Object.entries(optionCounts.toppings); // ["M&Ms", "Gummi Bears"]
    const toppingList = toppingsArray.map(([key, value]) => {
        if(value !== 0) {
            return(
                <li key={key} data-testid={key}>
                    {key}
                </li>
            )
        } else return null;

    })

    useEffect(() => {}, [totals]);

    return ( 
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>
                {scoopList}
            </ul>
            <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
            <ul>
                {toppingList}
            </ul>
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    )
}