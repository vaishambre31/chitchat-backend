const isStringVal = (value) => {
    return value === undefined || value === null || value === '' ? false : true
}
module.exports = {
    isStringVal,
}