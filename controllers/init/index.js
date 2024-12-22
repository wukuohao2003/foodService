const appInit = (_, res) => {
    res.json({
        code:200,
        msg:"Init Success!",
        data:{}
    })
}

module.exports = {
    appInit
}