/**
 * @fileoverview Rollup config file
 */

export default [
    {
        input: "src/module-importer.js",
        output: [
            {
                file: "dist/module-importer.cjs",
                format: "cjs"
            },
            {
                file: "dist/module-importer.js",
                format: "esm"
            }
        ]
    }   
];
