import { render, screen } from '@testing-library/react';
import  SummaryForm  from '../SummaryForm';
import userEvent from "@testing-library/user-event";

test('checking checkbox should enable button and unchecking disable it', async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const confirmButton = screen.getByRole('button', { name: "Confirm order" });

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
});

test("popover respons to hover", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    // popover starts hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    // popover shows on hover
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();
    
})