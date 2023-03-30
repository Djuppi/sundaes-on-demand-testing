import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOptions from './ScoopOptions';
import Row from 'react-bootstrap/Row';
import ToppingOptions from './ToppingOption';

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);

    // optionType is 'scoops' or 'toppings'
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then((response) => setItems(response.data))
        .catch((error) => {

        })
    }, [optionType]);

    // TODO: Replace 'null' with ToppingOptions when available
    const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions;

    const optionItems = items.map(item => ( <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} /> ));

  return (
    <Row>{optionItems}</Row>
  )
}

export default Options