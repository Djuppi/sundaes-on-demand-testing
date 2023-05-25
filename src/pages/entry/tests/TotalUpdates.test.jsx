import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops changes', async () => {
    const user = userEvent.setup()
    render(<Options optionType='scoops' />);
   
   // make sure total starts out at $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

    expect(scoopsSubtotal).toHaveTextContent('0.00');

   // update vanilla scoops to 1, and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    expect(scoopsSubtotal).toHaveTextContent('2.00');

   // update chocolate scoops to 2, and check subtotal

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');

    expect(scoopsSubtotal).toHaveTextContent('6.00');
})

test('update topping subtotal when topping is selected and deseleted', async () => {
    const user = userEvent.setup();
    render(<Options optionType='toppings' />);

    // make sure toppings subtotal starts at $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });

    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // Update cherries to selected, and check subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })

    await user.click(cherriesCheckbox);

    expect(cherriesCheckbox).toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // Update M&Ms to selected, and check subtotal
    const MMsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });

    await user.click(MMsCheckbox);

    expect(MMsCheckbox).toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    // Update cherries to not selected, and check subtotal

    await user.click(cherriesCheckbox);

    expect(cherriesCheckbox).not.toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent('1.50');
})

describe('grand total',  () => {
    const user = userEvent.setup();
    
    

    test('grand total starts at $0.00', () => {
        const { unmount } = render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
        expect(grandTotal).toHaveTextContent('0.00');

        unmount();
    });
    test('grand total updates properly if scoop is added first', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');

        expect(grandTotal).toHaveTextContent('4.00');

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries'});

        await user.click(cherriesCheckbox);

        expect(grandTotal).toHaveTextContent('5.50');
    });
    test('grand total updates properly if topping is added first', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries'});

        await user.click(cherriesCheckbox);

        expect(grandTotal).toHaveTextContent('1.50');

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');

        expect(grandTotal).toHaveTextContent('3.50');
    });
    test('grand total updates properly if items is removed', async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/ });
        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries'});

        await user.click(cherriesCheckbox);


        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '2');

        await user.clear(vanillaInput);
        await user.type(vanillaInput, '1');

        expect(grandTotal).toHaveTextContent('3.50');

        await user.click(cherriesCheckbox);

        expect(grandTotal).toHaveTextContent('2.00');

    });
    
})