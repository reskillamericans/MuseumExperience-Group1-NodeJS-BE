const { ExhibitModel } = require("./../models/exhibit");

exports.fetchExhibits = async (req, res) => {
  try {
    let filter = {};

    if (req.query.name) filter.name = new RegExp(req.query.name, "i");

    if (req.query.category) filter.category = req.query.category;

    let query = await ExhibitModel.find(filter);

    if (query.length === 0) return res.status(200).json({ message: "No results found." });

    return res.status(200).json({ query });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};

exports.fetchSingleExhibit = async (req, res) => {
  try {
    let query = await ExhibitModel.findById(req.params.id);

    if (!query) return res.status(404).json({ message: `Exhibit not found.` });

    return res.status(200).json({ query });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};
