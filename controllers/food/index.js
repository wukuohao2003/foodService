const getFoodList = (req, res) => {
  req.sql(
    {
      sql: "SELECT * FROM food ",
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
    }
  );
};

const getFoodOne = async (req, res) => {
  req.sql(
    {
      sql: "SELECT * FROM food WHERE id = " + req.params.id,
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
    }
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
