const getFoodList = (req, res) => {
  req.sql(
    {
      sql: "SELECT id,auth,title,finished,recommend,createTime FROM food",
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
  req.sql(
    {
      sql: "SELECT * FROM food WHERE id = ?",
      options: [id],
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
  loadFood,
  editFood,
};
