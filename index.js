const { v4 } = require("uuid");
const { FusionAuthClient } = require("@fusionauth/node-client");

const createTheme = async () => {
    const faClient = new FusionAuthClient(
        "<api key with theme endpoint permissions>",
        "<fusionauth host>"
    );

    return await faClient.createTheme(v4(), {
        sourceThemeId: "75a068fd-e94b-451a-9aeb-3ddb9a3b5987", // default FusionAuth theme
        theme: {name: "API generated theme", templates: {helpers: "[#ftl/]Expected template"}},
    })
};

createTheme()
    .then((result) => {
        if (!result) {
            throw new Error("no result");
        }

        if (result.successResponse.theme?.templates?.helpers !== "[#ftl/]Expected template") {
            console.error(`Did not set correct template for helpers file! contents:
     ${result.successResponse.theme?.templates?.helpers}`);
        }
    })
    .catch((e) => {
        console.log("error occurred", JSON.stringify(e));
    });

require("net").createServer().listen();
