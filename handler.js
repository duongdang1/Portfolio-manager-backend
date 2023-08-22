"use strict";

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Hello this is my customized message!",
        input: event,
      },
      null,
      2
    ),
  };
};