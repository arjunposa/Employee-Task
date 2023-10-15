const employModel = require("../MongoDB/Model/AddEmploy.Model");

const postData = async (req, res) => {
  try {
    const { email } = req.body;
    let data = await employModel.findOne({ email });
    if (data) {
      return res.json({ message: "Email is already in use", data });
    } else {
      let employe = new employModel(req.body);
      await employe.save();
      res.json({ message: "Details Saved in DB" });
    }
  } catch (err) {
    console.error("Error:", err);
    resjson({ message: "An error occurred", error: err.message });
  }
};

const getData = async (req, res) => {
  try {
    let employes = await employModel.find();
    return res.json({ message: "Data retrieved successfully", employes });
  } catch (error) {
    console.error("Error:", error);
    res.json({ message: "An error occurred", error: error.message });
  }
};

const getIdData = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await employModel.findOne({ _id: id });

    if (data) {
      res.json({ message: "Employee Found", data });
    } else {
      res.json({ error: "Employee not found" });
    }
  } catch (err) {
    console.log("Error:", err);
    resjson({ error: "Internal server error" });
  }
};

const updateData = async (req, res) => {
  try {
    const id = req.params.id;
    const dataToUpdate = req.body;

    const updated = await employModel.findOneAndUpdate(
      { _id: id },
      { $set: dataToUpdate },
      { new: true } 
    );

    if (!updated) {
      return res.json({ message: "Data not found" });
    }

    res.json({ message: 'Updated successfully', updated });
  } catch (err) {
    console.log(`ERROR: ${err}`);
    res.status(500).json({ message: "Server Error!" });
  }
};




const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await employModel.findByIdAndDelete(id);

    if (deletedEmployee) {
      return res
        .status(200)
        .json({ message: "Employee deleted successfully", deletedEmployee });
    } else {
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  postData,
  getData,
  getIdData,
  updateData,
  deleteData,
};
