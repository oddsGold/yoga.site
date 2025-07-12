import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.js';

// Мокаємо toast.error для перевірки викликів
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Частковий mock authApiSlice: зберігаємо усі реальні експорт-значення, замінюємо лише useLoginMutation
vi.mock('../../redux/auth/authApiSlice', async (importOriginal) => {
  const actual = await importOriginal();
  const mockLogin = vi.fn().mockResolvedValue({ data: {} });
  return {
    ...actual,
    /**
     * @returns {[Function, {isLoading: boolean}]} Повертає mockLogin та стан завантаження
     */
    useLoginMutation: () => [mockLogin, { isLoading: false }],
  };
});

import SignInForm from './SignInForm.jsx';
import { toast } from 'react-toastify';

describe('SignInForm Component', () => {
  /**
   * UI check: перевіряє наявність інпутів для login/password і кнопки Sign in
   */
  test('UI check', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Enter your login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  /**
   * Toggles password visibility: перевіряє, що кнопка-перемикач змінює type поля password
   */
  test('Toggles password visibility', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </MemoryRouter>
    );
    const passInput = screen.getByPlaceholderText(/Password/i);
    const toggleBtn = screen.getByTestId('toggle-password');

    // початковий стан: пароль прихований
    expect(passInput).toHaveAttribute('type', 'password');

    // після кліку: пароль показаний
    await userEvent.click(toggleBtn);
    expect(passInput).toHaveAttribute('type', 'text');

    // ще один клік: назад прихований
    await userEvent.click(toggleBtn);
    expect(passInput).toHaveAttribute('type', 'password');
  });

  /**
   * Validation check: без введених даних після сабміту з'являються повідомлення про обов'язкові поля
   */
  test('Validation check', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  /**
   * Validation for login and password: перевіряє мінімальну та максимальну довжину полів
   */
  test('Validation for login and password', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </MemoryRouter>
    );

    const loginInput = screen.getByPlaceholderText(/Enter your login/i);
    const passInput = screen.getByPlaceholderText(/Password/i);
    const button = screen.getByRole('button', { name: /Sign in/i });

    // Мінімальна довжина
    await userEvent.type(loginInput, 'te');
    await userEvent.type(passInput, 'te');
    await userEvent.click(button);

    expect(await screen.findByText(/Login must be at least 3 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 3 characters/i)).toBeInTheDocument();

    // Максимальна довжина
    await userEvent.clear(loginInput);
    await userEvent.clear(passInput);
    await userEvent.type(loginInput, 'a'.repeat(256));
    await userEvent.type(passInput, 'a'.repeat(256));
    await userEvent.click(button);

    expect(await screen.findByText(/Login must be at most 255 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at most 255 characters/i)).toBeInTheDocument();
  });

  /**
   * Correct value submission: перевіряє, що при коректних даних використовується hook useLoginMutation
   */
  test('Correct value submission', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </MemoryRouter>
    );

    // отримуємо mockLogin та перевіряємо його виклик
    const { useLoginMutation } = await import('../../redux/auth/authApiSlice');
    const [mockLogin] = useLoginMutation();

    await user.type(screen.getByPlaceholderText(/Enter your login/i), 'user_sulym');
    await user.type(screen.getByPlaceholderText(/Password/i), '123456');
    await user.click(screen.getByRole('button', { name: /Sign in/i }));

    // очікуємо, що hook був викликаний з правильними аргументами
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({
      login: 'user_sulym',
      password: '123456',
    });
  });

  /**
   * Calls toast.error with API message on failure: перевіряє, що при помилці виконання викликається toast.error
   */
  test('Calls toast.error with API message on failure', async () => {
    const user = userEvent.setup();

    // налаштовуємо mockLogin на відкидання помилки
    const { useLoginMutation } = await import('../../redux/auth/authApiSlice');
    const [mockLogin] = useLoginMutation();
    mockLogin.mockRejectedValue({ data: { message: 'Invalid credentials' } });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <SignInForm />
        </Provider>
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/Enter your login/i), 'user');
    await user.type(screen.getByPlaceholderText(/Password/i), 'pass');
    await user.click(screen.getByRole('button', { name: /Sign in/i }));

    // перевіряємо факт виклику toast.error
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
