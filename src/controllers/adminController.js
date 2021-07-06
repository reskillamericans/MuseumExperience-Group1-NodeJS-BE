const Question = require('../models/questions');
const Admin = require('../models/admin');

//create an admin
exports.createAdmin = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const admin = new Admin(req.body);
        await admin.save();
        return res.status(200).json({ admin })
    } catch (err) {
        next(err)
    }
};

//fetch all admins
exports.fetchAdmin = async (req, res, next) => {
    try{
    const admins = await Admin.find({});
    return res.status(200).json({ admins })
    } catch (err) {
        next(err)
    }
};

//fetch single admin
exports.fetchSingleAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id).populate('questions');
    console.log(admin)
    return res.status(200).json({admin})
}
//send questions to admin
exports.addQuizToAdmin = async (req, res, next) => {
    try{
        const { id } = req.params;
        const admin = await Admin.findById(id);
        const { title, description, answer, status } = req.body;
        const question = new Question({ title, description, answer, status });
        admin.questions.push(question);
        question.admin = admin;
        await admin.save();
        await question.save();
        return res.status(200).json(`/admins/${id}`);
    } catch (err) {
        next(err)
    }
};

