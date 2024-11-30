const getFoodList = async (req, res) => {
  try {
    const foodList = await req.$db.query("SELECT * FROM food");
    console.log(foodList);
    res.status(200).json({
      code: 200,
      msg: "Success",
      data: foodList,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      msg: "Error",
      data: err,
    });
  }
};

module.exports = {
  getFoodList,
};
