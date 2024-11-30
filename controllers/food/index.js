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
    },
  );
};

module.exports = {
  getFoodList,
};
