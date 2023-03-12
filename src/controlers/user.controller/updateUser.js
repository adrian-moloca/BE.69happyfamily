import userModel from "../../models/user.model.js";
import verifyDataType from "../../utils/verify/verifyDataType.js";

const updateUser = async (req, res, _next) => {
    try {
        const { userId } = req.params;

        const {
            userName,
            password,
            firstName,
            lastName,
            isAdmin,
            age
        } = req.body;

        let user = await userModel
            .findById(userId)
            .catch(error => {
                return res.status(500).json({
                    error: error
                })
            })

            if (!userName || !password || !firstName || !age || !lastName){
                return res.status(400).json({
                    error: "Bad Request. Please complete all of the fields"
                });
            }
        
            if(
                !verifyDataType(userName, 'string') ||
                !verifyDataType(password, 'string') ||
                !verifyDataType(firstName, 'string') ||
                !verifyDataType(age, 'number') ||
                !verifyDataType(lastName, 'string')) {
                    return res.status(400).json({
                        error: "Invalid data type for one of the fields"
                    })
                }

            if (age < 18) {
                return res.status(403).json({
                    error: "You are not old enough to see this content" // nici eu n am 18 da eu fac contentu, nu l vad :))
                })
            }

            console.log(user);

            user.userName = userName ? userName : user.userName;
            user.password = password ? password : user.password;
            user.age = age ? age : user.age;
            user.firstName = firstName ? firstName : user.firstName;
            user.lastName = lastName ? lastName : user.lastName;
            user.isAdmin = isAdmin ? isAdmin : user.isAdmin;

            await user
                .save({
                    modifiedValuesOnly: true
                })
                .then(user => {
                    return res.status(200).json({
                        user
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        error: error + "Internal Server Error"
                    })
                })

    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

export default updateUser;