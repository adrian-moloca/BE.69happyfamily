const validateBodyRequest = (bodyRequestObj) => {
    console.log(bodyRequestObj);
    console.log(Object.entries(bodyRequestObj));
    const data = Object.entries(bodyRequestObj);
    let isUndefined = false;
    let message = '';
    for(let i = 0; i < data.length; i++){
        if(data[i][1] === ''){
            message = `${data[i][0]} cannot be undefined`;
            isUndefined = true;
            console.log(data[i][0]);
            break;
        }
    }
    return {isUndefined, message}
};

export default validateBodyRequest;
