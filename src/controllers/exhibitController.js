const { ExhibitModel } = require("./../models/exhibit");

exports.fetchExhibits = async (req, res) => {
  try {
    let filter = {};

    if (req.query.name) filter.name = req.query.name;

    let query = await ExhibitModel.find(filter).exec();

    return res.status(200).json({ query });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};

exports.fetchSingleExhibit = async (req, res) => {
  try {
    let query = await ExhibitModel.findById(req.params.id).exec();

    if (!query) return res.status(404).json({ message: `Exhibit not found.` });

    return res.status(200).json({ query });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};
