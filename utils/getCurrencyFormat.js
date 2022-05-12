export const getCurrencyFormat = (number) => {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let newFormat = dollarUSLocale.format(number);
    return `$${newFormat}`;
}