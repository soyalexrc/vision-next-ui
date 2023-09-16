function formatCurrency(str: string) {
    // Convert the string to a number (assuming it represents a valid number)
    const number = parseFloat(str);

    if (isNaN(number)) {
        // Handle the case where the input is not a valid number
        return 'Invalid number';
    }

    return '$ ' + number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export default formatCurrency;
