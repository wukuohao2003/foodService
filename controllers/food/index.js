const getFoodList = (req, res) => {
  const { languageCode, languageRegionCode } = req.query;
  req.sql(
    {
      sql: "SELECT * FROM food WHERE languageCode = ? AND languageRegionCode = ?",
      options: [languageCode, languageRegionCode],
    },
    (error, result) => {
      console.log(result);
      if (error) {
        res.status(500).json({
          code: error.errno,
          msg: error.sqlMessage,
          data: {},
        });
      } else {
        res.json({
          code: 200,
          msg: "Success",
          data: result,
        });
      }
    },
  );
};

const getFoodOne = async (req, res) => {
  const { id } = req.params;
  const { languageCode, languageRegionCode } = req.query;
  req.sql(
    {
      sql: "SELECT * FROM food WHERE id = ? AND languageCode = ? AND languageRegionCode = ?",
      options: [id, languageCode, languageRegionCode],
      type: "Object",
    },
    (error, result) => {
      if (error) {
        res.status(500).json({
          code: error.errno,
          msg: error.sqlMessage,
          data: {},
        });
      } else {
        res.json({
          code: 200,
          msg: "Success",
          data: result,
        });
      }
    },
  );
};

const addFood = async (req, res) => {};

const loadFood = async (req, res) => {};

const editFood = async (req, res) => {};

module.exports = {
  getFoodList,
  getFoodOne,
  addFood,
};
