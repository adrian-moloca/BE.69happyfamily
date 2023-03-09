const verifyDataType = (data, type) => {
    if((typeof data) === type) return true;
    else return false;
}

export default verifyDataType;