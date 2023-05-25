import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
    const user = userEvent.setup();
    // render app
    const { unmount } = render(<App />)
    // add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');
    
    const hotFudgeInput = await screen.findByRole('checkbox', { name: 'Hot Fudge' });

    await user.click(hotFudgeInput);

    // find and click order button
    const orderButton = await screen.findByRole('button', { name: /order sundae/i });

    await user.click(orderButton);

    // check summary information based on order

    const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });

    expect(summaryHeading).toBeInTheDocument();

    const scoopsPrice = screen.getByRole('heading', {name: 'Scoops: $6.00'});

    expect(scoopsPrice).toBeInTheDocument();

    const scoopsList = screen.getByTestId('Vanilla');

    expect(scoopsList).toBeInTheDocument()

    const toppingPrice = screen.getByRole('heading', { name: 'Toppings: $1.50'});
    expect(toppingPrice).toBeInTheDocument();

    const toppingList = screen.getByTestId('Hot Fudge');
    expect(toppingList).toBeInTheDocument()

    // accept terms and conditions and click button to confirm order

    const termsCheckbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/ });

    expect(termsCheckbox).toBeInTheDocument();

    await user.click(termsCheckbox);

    expect(termsCheckbox).toBeChecked();

    const confirmButton = await screen.findByRole('button', { name: /confirm order/i });
    expect(confirmButton).toBeInTheDocument();

    await user.click(confirmButton);

    // confirm order number on confirmation page

    const loading = await screen.findByText(/loading/i);
    expect(loading).toBeInTheDocument();

    // check confirmation page text

    const thankYouHeader = await screen.findByRole("heading", {
        name: /thank you/i,
      });
    expect(thankYouHeader).toBeInTheDocument();
    //expect(loading).not.toBeInTheDocument();

    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // click new order button on confirmation page

    const newOrderButton = screen.getByRole('button', {name: /create new order/i});
    await user.click(newOrderButton);

    // check that the scoops and toppings subtotal have been reset
    const scoopsTotal = await screen.findByText('Scoops total: $0.00');
    expect(scoopsTotal).toBeInTheDocument();
    const toppingTotal = await screen.findByText('Toppings total: $0.00');
    expect(toppingTotal).toBeInTheDocument();

    // do we need to await anything to avoid test errors?
    unmount();
    
})