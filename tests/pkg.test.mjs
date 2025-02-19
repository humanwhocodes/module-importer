/**
 * @fileoverview Tests that ESM can access npm package.
 */

import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const url = new URL("../" + pkg.exports.default, import.meta.url);

import(url).then(({ ModuleImporter }) => {
    new ModuleImporter();
    console.log("ESM load: success");
});
