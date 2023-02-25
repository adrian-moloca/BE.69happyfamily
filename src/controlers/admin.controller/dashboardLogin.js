import Admin from "../../models/admin.model";

const dashboardLogin = async (req, res, _next) => {
    try {
        const { userName, password } = req.body;

        if (typeof userName === 'undefined' || typeof password === 'undefined') {
          return res.status(400).json({
            error: 'Username and Password required'
          });
        }
    
        if (typeof userName !== 'string' || typeof password !== 'string') {
          return res.status(400).json({
            error: 'Username and Password must be of string type'
          });
        }
    
        const admin = await Admin.findOne({ userName: userName });
    
        if (!admin) {
          return res.status(404).json({
            error: 'User does not exist'
          });
        }
    
        if (admin.password !== password) {
          return res.status(400).json({
            error: 'Invalid Password'
          });
        }
    
        admin.loggedIn = true;
        
        return res.status(200).json({
          message: 'Successfully logged in',
          adminUser: admin
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};

export default dashboardLogin;
