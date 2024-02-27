// Mediana wydatków do pierwszej niedzieli włącznie
const expenses = {
  "2023-02": {
    "05": {
      food: [19.11, 40, 10.72, 2.1, 34.21, 1.5, 29],
      fuel: [250.25],
    },
    "08": {
      food: [11.4],
      fuel: [188.12],
    },
  },
  "2023-04": {
    "04": {
      food: [10, 21.4, 15.2, 12.9],
    },
    "03": {
      food: [15.4, 13.1, 5.1],
      fuel: [],
    },
  },
  "2023-05": {},
};

const get_median_of_first_week_expenses = (expenses) => {
  if (!expenses) {
    return null;
  }

  function getFirstSundayOfMonth(year, month) {
    const date = new Date(year, month, 1);

    while (date.getDay() !== 0) {
      date.setDate(date.getDate() + 1);
    }

    return date.getDate();
  }

  let finalExpenses = [];

  const dateKeys = Object.keys(expenses);

  dateKeys.forEach((dateKey) => {
    const monthsExpenses = expenses[dateKey];
    const dayKeys = Object.keys(monthsExpenses);

    const month = new Date(dateKey).getMonth();
    const year = new Date(dateKey).getFullYear();

    const filteredDayKeys = dayKeys.filter(
      (dayKey) => dayKey < getFirstSundayOfMonth(year, month)
    );

    filteredDayKeys.forEach((dayKey) => {
      const dayExpenses = monthsExpenses[dayKey];
      const ingredientsKeys = Object.keys(dayExpenses);

      ingredientsKeys.forEach((ingredientsKey) => {
        const ingredientsExpenses = dayExpenses[ingredientsKey];

        finalExpenses = finalExpenses.concat(ingredientsExpenses);
      });
    });
  });

  if (finalExpenses.length === 0) {
    return 0;
  }

  const result =
    finalExpenses.length % 2 === 0
      ? (finalExpenses[finalExpenses.length / 2 - 1] +
          finalExpenses[finalExpenses.length / 2]) /
        2
      : finalExpenses[Math.floor(finalExpenses.length / 2)];

  return result;
};

console.log(get_median_of_first_week_expenses(expenses));
