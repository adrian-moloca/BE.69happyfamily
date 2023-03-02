const validateProperty = (property) => {
    if ((typeof property) === "undefined" || property === null) {
        return false;
    } return true;
};

export default validateProperty;
