
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../Utilities';
import Options from './Options';

const OrderEntry = ({setOrderPhase}) => {

  const { totals } = useOrderDetails();

  return (
    <div>
        <Options optionType="scoops" />
        <Options optionType="toppings" />
        <h2>Grand total: {formatCurrency(totals.grandTotal)}</h2>
        <Button onClick={() => setOrderPhase('review')}>Order sundae</Button>
    </div>
  )
}

export default OrderEntry