import { useCrudPageLogic } from './useCrudPageLogic';
import { expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

// // Моки
// vi.mock('../components/utils/toastHandler.js', () => ({
//     errorHandler: vi.fn(),
// }));

// Мокаємо toast.error для перевірки викликів
vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

const mockUseQuery = vi.fn();
const mockUseDeleteMutation = vi.fn();

import { toast } from 'react-toastify';

describe('useCrudPageLogic', () => {
  /**
   * Тестує ініціалізацію хука useCrudPageLogic з дефолтними значеннями.
   *
   * @test {useCrudPageLogic} Перевіряє:
   * 1. Коректність початкових значень стану
   * 2. Відповідність дефолтних параметрів
   * 3. Реакцію на відсутність даних від API
   *
   * @description Тест перевіряє, що при ініціалізації хук:
   * - Має правильні стартові значення параметрів пагінації
   * - Коректно обробляє відсутність даних (null) від API
   * - Ініціалізує всі необхідні стани
   */
  test('should initialize with default values', () => {
    // 1. Мокуємо пусту відповідь API
    mockUseQuery.mockReturnValue({
      data: null, // Немає даних
      isLoading: false, // Завантаження завершене
    });

    // 2. Рендеримо хук
    const { result } = renderHook(() =>
      useCrudPageLogic({
        useQuery: mockUseQuery, // Передаємо мок запиту
      })
    );

    // 3. Перевіряємо дефолтні значення
    expect(result.current.page).toBe(1); // Стартова сторінка = 1
    expect(result.current.limit).toBe(30); // Дефолтний ліміт = 30
    expect(result.current.sort).toBe('-id'); // Сортування за замовчуванням
    expect(result.current.openDialog).toBe(false); // Діалог має бути закритий
    expect(result.current.itemToDelete).toBeNull(); // Немає елементів для видалення
    expect(result.current.items).toEqual([]); // Пустий масив даних
    expect(result.current.hasMore).toBe(true); // Очікуємо, що є ще дані для завантаження
  });

  /**
   * Тестує оновлення стану хука при отриманні даних від API.
   *
   * @test {useCrudPageLogic} Перевіряє:
   * 1. Коректність оновлення масиву items при отриманні даних
   * 2. Правильне встановлення прапорця hasMore
   * 3. Реакцію на отримання першої порції даних
   *
   * @description Конкретно перевіряє, що:
   * - При отриманні даних {data: [{id: 1}], meta: {total: 1}}:
   *   - items має містити отримані дані ([{id: 1}])
   *   - hasMore стає false (оскільки total=1 і ми отримали 1 елемент)
   */
  test('should update items when data is received', () => {
    // 1. Готуємо тестові дані - одну сторінку з 1 елементом
    const mockData = {
      data: [{ id: 1 }], // Один елемент даних
      meta: { total: 1 }, // Всього 1 елемент у колекції
    };

    // 2. Мокуємо відповідь API
    mockUseQuery.mockReturnValue({
      data: mockData, // Повертаємо наші тестові дані
      isLoading: false, // Завантаження завершене
    });

    // 3. Рендеримо хук
    const { result } = renderHook(() => useCrudPageLogic({ useQuery: mockUseQuery }));

    // 4. Перевіряємо очікувані зміни стану
    expect(result.current.items).toEqual([{ id: 1 }]); // Дані мають з'явитись у items
    expect(result.current.hasMore).toBe(false); // Більше немає даних для завантаження
  });

  /**
   * Тестує коректність роботи пагінації (підвантаження додаткових даних) у хуку useCrudPageLogic.
   *
   * @test {useCrudPageLogic} Перевіряє:
   * 1. Ініціалізацію початкових даних
   * 2. Роботу методу loadMore()
   * 3. Оновлення стану після завантаження нових даних
   * 4. Коректність об'єднання даних з різних сторінок
   * 5. Оновлення hasMore після завантаження всіх даних
   *
   * @description Тест імітує наступний сценарій:
   * 1. Перший запит - отримання сторінки 1 з 1 елементом
   * 2. Виклик loadMore() для завантаження сторінки 2
   * 3. Перевірка фінального стану з об'єднаними даними
   */
  test('should load more data when loadMore is called', async () => {
    // Мок даних для першої сторінки
    const mockDataPage1 = {
      data: [{ id: 1 }],
      meta: { total: 2 }, // Всього 2 елементи в колекції
    };

    // Мок даних для другої сторінки
    const mockDataPage2 = {
      data: [{ id: 2 }],
      meta: { total: 2 },
    };

    // 1. Мокуємо useDeleteMutation
    const mockDeleteFn = vi.fn(); // Мок функції видалення
    const mockUseDeleteMutation = vi.fn(() => [mockDeleteFn]); // Мок хука, що повертає функцію

    // 2. Мокуємо useQuery з послідовними відповідями (це створює чітку чергу відповідей)
    mockUseQuery
      .mockReturnValueOnce({ data: mockDataPage1, isLoading: false }) // Відповідь для першого рендеру
      .mockReturnValueOnce({ data: mockDataPage1, isLoading: false }) // Додатковий виклик в useEffect
      .mockReturnValueOnce({ data: mockDataPage2, isLoading: false }) // Відповідь після loadMore
      .mockReturnValueOnce({ data: mockDataPage2, isLoading: false }); // Додатковий виклик після оновлення

    // Рендеримо хук з моками
    const { result } = renderHook(() =>
      useCrudPageLogic({
        useQuery: mockUseQuery,
        useDeleteMutation: mockUseDeleteMutation,
      })
    );

    // 3. Перевіряємо початковий стан після ініціалізації
    await vi.waitFor(() => {
      // Очікуємо, що перші дані завантажились і містять такі дані { id: 1 }
      expect(result.current.items).toEqual([{ id: 1 }]);

      // Неявно перевіряємо, що:
      // - хук коректно обробив першу відповідь API
      // - isLoading = false
      // - hasMore = true (бо total=2, а завантажили 1)
    });

    // 4. Імітуємо клік "Завантажити ще"
    await act(async () => {
      result.current.loadMore(); // Має збільшити page на 1
    });

    // 5. Перевіряємо оновлений стан
    await vi.waitFor(() => {
      // Перевіряємо, що номер сторінки оновився
      expect(result.current.page).toBe(2);

      // Перевіряємо, що дані об'єдналися
      expect(result.current.items).toEqual([{ id: 1 }, { id: 2 }]);

      // Перевіряємо, що hasMore = false (завантажили всі дані)
      expect(result.current.hasMore).toBe(false);

      // Неявно перевіряємо, що:
      // - isLoading = false
      // - isFetchingMore = false
      // - дані не дублюються
    });
  });

  /**
   * Тестує коректність роботи функції видалення елемента через RTK Query у хуку useCrudPageLogic.
   *
   * @test {useCrudPageLogic} Перевіряє:
   * 1. Виклик діалогового вікна для підтвердження видалення елемента
   * 2. Виконання функції видалення з передачею правильного ID елемента
   * 3. Оновлення стану після успішного видалення елемента
   * 4. Перевірка виклику мок-функції видалення з правильними параметрами
   * 5. Перевірка зміни стану діалогового вікна після видалення
   *
   * @description Тест імітує наступний сценарій:
   * 1. Виклик функції handleOpenDialog для відкриття діалогового вікна видалення з конкретним елементом
   * 2. Перевірка, що діалогове вікно відкривається і відображає правильний елемент
   * 3. Виконання операції видалення через handleDelete, що викликає функцію mockDelete
   * 4. Перевірка, що mockDelete був викликаний з правильним ID
   * 5. Перевірка, що стан діалогового вікна оновлюється після видалення елемента
   */
  test('should handle delete item successfully with RTK Query', async () => {
    // Мокуємо функцію видалення (mockDelete) для тесту
    const mockDelete = vi.fn(() => ({
      unwrap: () => Promise.resolve({ success: true }), // Мокаємо успішну відповідь після виконання видалення
    }));

    // Мокуємо useDeleteMutation, щоб повернути mockDelete як функцію для тесту
    mockUseDeleteMutation.mockReturnValue([
      mockDelete,
      { isLoading: false, error: null, data: undefined }, // Статус завантаження false та відсутність помилок
    ]);

    // Мокуємо useQuery для отримання даних
    mockUseQuery.mockReturnValue({ data: null, isLoading: false });

    // Рендеримо хук useCrudPageLogic із моками
    const { result } = renderHook(() =>
      useCrudPageLogic({
        useQuery: mockUseQuery,
        useDeleteMutation: mockUseDeleteMutation,
      })
    );

    // Викликаємо handleOpenDialog для відкриття діалогового вікна видалення
    act(() => {
      result.current.handleOpenDialog({ id: 1, name: 'Test Item' });
    });

    // Перевіряємо, що діалогове вікно відкрите та правильний елемент передано для видалення
    expect(result.current.openDialog).toBe(true); // Діалог має бути відкритий
    expect(result.current.itemToDelete).toEqual({ id: 1, name: 'Test Item' }); // Перевіряємо правильний елемент

    // Викликаємо handleDelete для виконання операції видалення
    await act(async () => {
      await result.current.handleDelete();
    });

    // Перевіряємо, що mockDelete викликано з правильним ID (1)
    expect(mockDelete).toHaveBeenCalledWith(1); // Перевірка, що викликано з ID 1

    // Перевіряємо, що після видалення стан діалогового вікна оновлюється
    expect(result.current.openDialog).toBe(false); // Діалог має бути закритий
    expect(result.current.itemToDelete).toBeNull(); // itemToDelete має бути null після видалення
  });

  /**
   * Тестує обробку помилки при видаленні елемента через RTK Query у хуку useCrudPageLogic.
   *
   * @test {useCrudPageLogic} Перевіряє:
   * 1. Виклик діалогового вікна для підтвердження видалення елемента
   * 2. Виконання функції видалення з передачею правильного ID елемента
   * 3. Обробку помилки при видаленні елемента
   * 4. Перевірка виклику мок-функції видалення з правильними параметрами
   * 5. Перевірка виклику методу toast.error при виникненні помилки
   * 6. Перевірка зміни стану діалогового вікна після помилки видалення
   *
   * @description Тест імітує наступний сценарій:
   * 1. Виклик функції handleOpenDialog для відкриття діалогового вікна видалення з конкретним елементом
   * 2. Перевірка, що діалогове вікно відкривається і відображає правильний елемент
   * 3. Імітація помилки видалення за допомогою мок-функції, що викликає reject
   * 4. Перевірка, що mockDelete був викликаний з правильним ID
   * 5. Перевірка, що метод toast.error викликається із повідомленням про помилку
   * 6. Перевірка, що стан діалогового вікна оновлюється після помилки (закривається) і itemToDelete скидається
   */
  test('should handle delete item error', async () => {
    // Мокуємо функцію видалення для RTK Query
    const mockDelete = vi.fn(() => ({
      unwrap: () =>
        Promise.reject({
          data: { message: 'Error' },
        }),
    }));

    // Мокуємо useDeleteMutation
    mockUseDeleteMutation.mockReturnValue([
      mockDelete,
      { isLoading: false, error: { data: { message: 'Error' } } }, // Мок статусу з помилкою
    ]);

    mockUseQuery.mockReturnValue({ data: null, isLoading: false });

    const { result } = renderHook(() =>
      useCrudPageLogic({
        useQuery: mockUseQuery,
        useDeleteMutation: mockUseDeleteMutation,
      })
    );

    // Відкриваємо діалог
    act(() => {
      result.current.handleOpenDialog({ id: 1, name: 'Test Item' });
    });

    // Перевіряємо, що діалогове вікно відкрито
    expect(result.current.openDialog).toBe(true);
    expect(result.current.itemToDelete).toEqual({ id: 1, name: 'Test Item' });

    // Імітуємо видалення з помилкою
    await act(async () => {
      await result.current.handleDelete();
    });

    // Перевіряємо результати
    expect(mockDelete).toHaveBeenCalledWith(1); // Перевірка, що mockDelete викликано з правильним ID
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled(); // Перевірка, що toast.error викликається
    });

    // Додаткові перевірки стану
    await waitFor(() => {
      expect(result.current.openDialog).toBe(false); // Діалог має бути закритий
      expect(result.current.itemToDelete).toBeNull(); // itemToDelete має бути null після помилки
    });
  });

  // //no
  // test('should update filters and reset page to 1 when filters change', async () => {
  //     // Мокуємо useQuery
  //     mockUseQuery.mockReturnValue({
  //         data: { data: [], meta: { total: 0 } },
  //         isLoading: false,
  //     });
  //
  //     // Мокуємо useDeleteMutation
  //     const mockDeleteFn = vi.fn();
  //     mockUseDeleteMutation.mockReturnValue([mockDeleteFn]);
  //
  //     const { result } = renderHook(() =>
  //         useCrudPageLogic({
  //             useQuery: mockUseQuery,
  //             useDeleteMutation: mockUseDeleteMutation,
  //         })
  //     );
  //
  //     // Перевіряємо початковий стан фільтрів (має бути {} або null)
  //     expect(result.current.filters).toEqual({}); // або expect(result.current.filters).toBeDefined()
  //
  //     // Змінюємо сторінку на 2
  //     act(() => {
  //         result.current.setPage(2);
  //     });
  //     expect(result.current.page).toBe(2);
  //
  //     // Оновлюємо фільтри
  //     const newFilters = { status: 'test' };
  //     act(() => {
  //         result.current.setFilters(newFilters);
  //     });
  //
  //     // Перевіряємо оновлення фільтрів та скидання сторінки
  //     expect(result.current.filters).toEqual(newFilters); // Має бути { status: 'test' }
  //     expect(result.current.page).toBe(1); // Має скинутися до 1
  // });
});
