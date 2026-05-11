const transactions = [
    
     {
      transaction_id: "1",
      transaction_date: "2019-01-01",
      transaction_amount: 100.0,
      transaction_type: "debit",
      transaction_description: "Payment for groceries",
      merchant_name: "SuperMart",
      card_type: "Visa",
    },
    {
      transaction_id: "2",
      transaction_date: "2019-01-02",
      transaction_amount: 50.0,
      transaction_type: "credit",
      transaction_description: "Refund for returned item",
      merchant_name: "OnlineShop",
      card_type: "MasterCard",
    },
    {
      transaction_id: "3",
      transaction_date: "2019-01-03",
      transaction_amount: 75.0,
      transaction_type: "debit",
      transaction_description: "Dinner with friends",
      merchant_name: "RestaurantABC",
      card_type: "Amex",
    }
    
]

// 1
/**
 * Возвращает массив уникальных типов транзакций
 * @param {Array} transactions - Массив транзакций
 * @returns {Array} Массив уникальных типов (например, ["debit", "credit"])
 */
function getUniqueTransactionTypes(transactions) {
    const types = new Set() //используется как замена обычного массива, чтобы не использовать проверку на наличие дубликатов
    transactions.forEach(transaction => {
        types.add(transaction.transaction_type)
    })
    return Array.from(types)
}

// 2
/**
 * Вычисляет сумму всех транзакций
 * @param {Array} transactions - Массив транзакций
 * @returns {number} Общая сумма всех транзакций
 */
function calculateTotalAmount(transactions) {
    return transactions.reduce((sum, transaction) => sum + transaction.transaction_amount, 0)
}

// 3
/**
 * Вычисляет сумму транзакций за указанный год, месяц и день
 * @param {Array} transactions - Массив транзакций
 * @param {number} [year] - Год (необязательный)
 * @param {number} [month] - Месяц (необязательный)
 * @param {number} [day] - День (необязательный)
 * @returns {number} Сумма транзакций за указанный период
 */
function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.filter(transaction => {
        const [y, m, d] = transaction.transaction_date.split('-').map(Number)
        if (year !== undefined && y !== year) return false
        if (month !== undefined && m !== month) return false
        if (day !== undefined && d !== day) return false
        return true
    }).reduce((sum, transaction) => sum + transaction.transaction_amount, 0)
}

// 4
/**
 * Возвращает транзакции указанного типа
 * @param {Array} transactions - Массив транзакций
 * @param {string} type - Тип транзакции ("приход" или "расход")
 * @returns {Array} Массив транзакций указанного типа
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(transaction => transaction.transaction_type === type)
}

// 5
/**
 * Возвращает транзакции за указанный диапазон дат
 * @param {Array} transactions - Массив транзакций
 * @param {string} startDate - Начальная дата в формате "ГГГГ-ММ-ДД"
 * @param {string} endDate - Конечная дата в формате "ГГГГ-ММ-ДД"
 * @returns {Array} Массив транзакций в указанном диапазоне
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    return transactions.filter(transaction => 
        transaction.transaction_date >= startDate && transaction.transaction_date <= endDate
    )
}

// 6
/**
 * Возвращает транзакции совершенные у указанного продавца
 * @param {Array} transactions - Массив транзакций
 * @param {string} merchantName - Название магазина или сервиса
 * @returns {Array} Массив транзакций указанного продавца
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(transaction => 
        transaction.merchant_name.toLowerCase() === merchantName.toLowerCase()
    )
}

// 7
/**
 * Возвращает среднее значение суммы транзакций
 * @param {Array} transactions - Массив транзакций
 * @returns {number} Средняя сумма транзакции
 */
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0
    const total = calculateTotalAmount(transactions)
    return total / transactions.length
}

// 8
/**
 * Возвращает транзакции с суммой в заданном диапазоне
 * @param {Array} transactions - Массив транзакций
 * @param {number} minAmount - Минимальная сумма
 * @param {number} maxAmount - Максимальная сумма
 * @returns {Array} Массив транзакций в указанном диапазоне сумм
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(transaction => 
        transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount
    )
}

// 9
/**
 * Вычисляет общую сумму дебетовых транзакций
 * @param {Array} transactions - Массив транзакций
 * @returns {number} Общая сумма дебетовых транзакций
 */
function calculateTotalDebitAmount(transactions) {
    return transactions.filter(transaction => transaction.transaction_type === 'debit')
                      .reduce((sum, transaction) => sum + transaction.transaction_amount, 0)
}

// 10
/**
 * Возвращает месяц с наибольшим количеством транзакций
 * @param {Array} transactions - Массив транзакций
 * @returns {string|null} Номер месяца (01-12) или null если транзакций нет
 */
function findMostTransactionsMonth(transactions) {
    const monthCount = {} /*объект*/
    transactions.forEach(transaction => {
        const month = transaction.transaction_date.split('-')[1]
        monthCount[month] = (monthCount[month] || 0) + 1
    })
    let maxMonth = null
    let maxCount = 0
    for (const [month, count] of Object.entries(monthCount)) { /**превращаем объект в масив пар*/
        if (count > maxCount) {
            maxCount = count
            maxMonth = month
        }
    }
    return maxMonth
}

// 11
/**
 * Возвращает месяц с наибольшим количеством дебетовых транзакций
 * @param {Array} transactions - Массив транзакций
 * @returns {string|null} Номер месяца (01-12) или null если дебетовых транзакций нет
 */
function findMostDebitTransactionMonth(transactions) {
    const monthCount = {}
    transactions.filter(transaction => transaction.transaction_type === 'debit')
                .forEach(transaction => {
                    const month = transaction.transaction_date.split('-')[1]
                    monthCount[month] = (monthCount[month] || 0) + 1
                })
    let maxMonth = null
    let maxCount = 0
    for (const [month, count] of Object.entries(monthCount)) {
        if (count > maxCount) {
            maxCount = count
            maxMonth = month
        }
    }
    return maxMonth
}

// 12
/**
 * Определяет каких транзакций больше: дебетовых или кредитовых
 * @param {Array} transactions - Массив транзакций
 * @returns {string} "debit" если больше дебетовых, "credit" если больше кредитовых, "equal" если поровну
 */
function mostTransactionTypes(transactions) {
    let debitCount = 0
    let creditCount = 0
    transactions.forEach(transaction => {
        if (transaction.card_type === "debit") debitCount++
        else if (transaction.card_type === "credit") creditCount++
    })
    if (debitCount > creditCount) return "debit"
    if (creditCount > debitCount) return "credit"
    return "equal"
}

// 13
/**
 * Возвращает транзакции совершенные до указанной даты
 * @param {Array} transactions - Массив транзакций
 * @param {string} date - Дата в формате "ГГГГ-ММ-ДД"
 * @returns {Array} Массив транзакций совершенных до указанной даты
 */
function getTransactionsBeforeDate(transactions, date) {
    return transactions.filter(transaction => transaction.transaction_date < date)
}

// 14
/**
 * Находит транзакцию по уникальному идентификатору
 * @param {Array} transactions - Массив транзакций
 * @param {number} id - Уникальный идентификатор транзакции
 * @returns {Object|undefined} Объект транзакции или undefined если не найдена
 */
function findTransactionById(transactions, id) {
    return transactions.find(transaction => transaction.transaction_id === id)
}

// 15
/**
 * Возвращает новый массив содержащий только описания транзакций
 * @param {Array} transactions - Массив транзакций
 * @returns {Array} Массив строк с описаниями транзакций
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(transaction => transaction.transaction_description)
}