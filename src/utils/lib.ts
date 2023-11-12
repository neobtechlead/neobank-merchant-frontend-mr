export const formatAmountGHS = (amount: string) => {
    return (parseFloat(amount) / 100).toFixed(2);

}