import adminModel from "../../models/admin.model.js";
import verifyDataType from "../../utils/verify/verifyDataType.js";

const updateAdmin = async (req, res, _next) => {
    try {

        const { adminId } = req.params;

        const {
            userName,
            password,
            email,
            age,
            firstName,
            lastName,
        } = req.body;

        let admin =
         await
            adminModel
                .findById(adminId)
                .catch((error) => {
                    return res.status(500).json({
                        error: error
                    })
                })

                if(!admin){
                    return res.status(404).json({
                        error: "admin user not found"
                    })
                }

                if (
                    !userName ||
                    !password ||
                    !firstName ||
                    !age ||
                    !lastName ||
                    !email
                    ){
                    return res.status(400).json({
                        error: "Bad Request. Please complete all of the fields"
                    });
                }

                if(
                    !verifyDataType(password, 'string') ||
                    !verifyDataType(password, 'string') ||
                    !verifyDataType(firstName, 'string') ||
                    !verifyDataType(age, 'number') ||
                    !verifyDataType(lastName, 'string') ||
                    !verifyDataType(email, 'string')) {
                        return res.status(400).json({
                            error: "Invalid data type for one of the fields"
                        })
                    }

            admin.userName = userName ? userName : admin.userName;
            admin.password = password ? password : admin.password;
            admin.age = age ? age : admin.age;
            admin.firstName = firstName ? firstName : admin.firstName;
            admin.lastName = lastName ? lastName : admin.lastName;
            admin.email = email ? email : admin.email;

            let adminEmailsEnv = process.env.ADMIN_EMAILS;

            if(!adminEmailsEnv.includes(email)){
                return res.status(400).json({
                    error: "Bad Request. Email not on whitelist"
                })
            }

            await
                admin
                .save({
                    validateModifiedOnly: true
                })
                .then(admin => {
                    return res.status(200).json({
                        admin
                    })
                })
                .catch(error => {
                    return res.status(500).json({
                        error
                    })
                })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
};

export default updateAdmin;
