const db = require("../config/db");
const jwt = require("jsonwebtoken");


// LOGIN API

exports.loginEmployee = async (req, res) => {

    try {

        const {
            company_code,
            username,
            password
        } = req.body;

        const [employee] = await db.query(
            `SELECT *
             FROM mobile_app_employees
             WHERE company_code = ?
             AND username = ?
             AND password = ?`,
            [
                company_code,
                username,
                password
            ]
        );

        if (employee.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                employee_id: employee[0].employee_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            employee: {
                employee_id: employee[0].employee_id,
                company_code: employee[0].company_code,
                username: employee[0].username
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// STORE SIM API

exports.storeSim = async (req, res) => {

    try {

        const {
            sim_iccid,
            status
        } = req.body;

        const employee_id =
            req.employee.employee_id;

        await db.query(
            `INSERT INTO
            mobile_employee_sim_assignments
            (employee_id,
             sim_iccid,
             status)
             VALUES (?, ?, ?)`,
            [
                employee_id,
                sim_iccid,
                status
            ]
        );

        res.status(200).json({
            success: true,
            message: "SIM Assigned Successfully"
        });

    } catch (error) {

        if (error.code === "ER_DUP_ENTRY") {

            return res.status(400).json({
                success: false,
                message: "Employee or ICCID already assigned"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// PROFILE API

exports.getProfile = async (req, res) => {

    try {

        const employee_id =
            req.employee.employee_id;

        const [employee] = await db.query(
            `SELECT
                employee_id,
                company_code,
                username
             FROM mobile_app_employees
             WHERE employee_id = ?`,
            [employee_id]
        );

        if (employee.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        res.status(200).json({
            success: true,
            data: employee[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};