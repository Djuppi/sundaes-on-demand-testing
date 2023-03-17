import { render, screen, fireEvent } from '@testing-library/react';
import  SummaryForm  from '../SummaryForm';

test('checking checkbox should enable button and unchecking disable it', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const confirmButton = screen.getByRole('button', { name: "Confirm order" });

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
})