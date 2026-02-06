import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/tests/test-utils.tsx';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
    it('renders without crashing', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with correct text', () => {
        render(<Button>Submit</Button>);
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);

        await user.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies variant classes correctly', () => {
        const { container } = render(<Button variant="destructive">Button</Button>);
        expect(container.firstChild).toHaveClass('bg-destructive');
    });

    it('is disabled when disabled prop is true', () => {
        render(<Button disabled>Button</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('is disabled when loading prop is true', () => {
        render(<Button loading>Button</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('shows loading spinner when loading', () => {
        render(<Button loading>Button</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
        // Check for spinner (Loader2 icon)
        const spinner = screen.getByRole('button').querySelector('svg');
        expect(spinner).toBeInTheDocument();
    });

    it('does not call onClick when disabled', async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button disabled onClick={handleClick}>Button</Button>);

        await user.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
    });
});