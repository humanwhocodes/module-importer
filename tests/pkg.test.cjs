/**
 * @fileoverview Tests that Common JS can access npm package.
 */

const { ModuleImporter } = require("../");
new ModuleImporter();
console.log("CommonJS load: success");
