/**
 * @fileoverview Tests that Common JS can access npm package.
 */

const { ModuleImporter } = require("../");
(new ModuleImporter()).import("./src/module-importer.js");
console.log("CommonJS load: success");
