const OpenApi = require("@alicloud/openapi-client");
const OpenApiUtil = require("@alicloud/openapi-util");
const Util = require("@alicloud/tea-util");

const Client = {
  sendSMS: async (PhoneNumbers, code) => {
    return await new OpenApi.default(
      new OpenApi.Config({
        accessKeyId: process.env.SMS_ACCESSKEY_ID,
        accessKeySecret: process.env.SMS_ACCESSKEY_SECRET,
        endpoint: "dysmsapi.aliyuncs.com",
      }),
    ).callApi(
      new OpenApi.Params({
        action: "SendSms",
        version: "2017-05-25",
        protocol: "HTTPS",
        method: "POST",
        authType: "AK",
        style: "RPC",
        pathname: `/`,
        reqBodyType: "json",
        bodyType: "json",
      }),
      new OpenApi.OpenApiRequest({
        query: OpenApiUtil.default.query({
          PhoneNumbers,
          SignName: "测MemoRecipe",
          TemplateCode: "SMS_476865349",
          TemplateParam: JSON.stringify({
            code,
          }),
        }),
      }),
      new Util.RuntimeOptions({}),
    );
  },
};

module.exports = Client;
