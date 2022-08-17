/**
 * @fileoverview Tests for the ModuleImporter class.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { ModuleImporter } from "../src/module-importer.js";
import { expect } from "chai";
import path from "path";
import { fileURLToPath } from "url";

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("ModuleImporter", () => {

    describe("constructor", () => {
        it("cwd should be process.cwd() by default", () => {
            const importer = new ModuleImporter();
            expect(importer.cwd).to.equal(process.cwd() + "/");
        });

        it("cwd be saved when passed in", () => {
            const importer = new ModuleImporter("foo");
            expect(importer.cwd).to.equal("foo/");
        });

        it("should not add trailing \\  when already present", () => {
            const importer = new ModuleImporter("foo\\");
            expect(importer.cwd).to.equal("foo\\");
        });

        it("should not add trailing / when already present", () => {
            const importer = new ModuleImporter("foo/");
            expect(importer.cwd).to.equal("foo/");
        });
    });

    describe("resolve()", () => {
        it("should find noop.js file with default cwd", () => {
            const importer = new ModuleImporter();
            const location = importer.resolve("./tests/fixtures/noop.js");
            expect(location).to.equal(path.resolve(process.cwd(), "tests/fixtures/noop.js"));
        });

        it("should find noop.js file with custom cwd", () => {
            const importer = new ModuleImporter(__dirname);
            const location = importer.resolve("./fixtures/noop.js");
            expect(location).to.equal(path.resolve(__dirname, "fixtures/noop.js"));
        });

        it("should find mod1.js file with custom cwd", () => {
            const importer = new ModuleImporter(path.join(__dirname, "fixtures"));
            const location = importer.resolve("mod1");
            expect(location).to.equal(path.resolve(__dirname, "fixtures/node_modules/mod1.js"));
        });

        it("should find mod2.js file with custom cwd", () => {
            const importer = new ModuleImporter(path.join(__dirname, "fixtures"));
            const location = importer.resolve("mod2");
            expect(location).to.equal(path.resolve(__dirname, "fixtures/node_modules/mod2/mod2.cjs"));
        });

        it("should find noop.cjs file with default cwd", () => {
            const importer = new ModuleImporter();
            const location = importer.resolve("./tests/fixtures/noop.cjs");
            expect(location).to.equal(path.resolve(process.cwd(), "tests/fixtures/noop.cjs"));
        });
        it("should find noop.cjs file with default cwd", () => {
            const importer = new ModuleImporter();
            const location = importer.resolve("./tests/fixtures/noop.cjs");
            expect(location).to.equal(path.resolve(process.cwd(), "tests/fixtures/noop.cjs"));
        });
    });

    describe("import()", () => {
        it("should import noop.js file with default cwd", async () => {
            const importer = new ModuleImporter();
            const module = await importer.import("./tests/fixtures/noop.js");
            expect(module.noop()).to.equal("js-noop");
        });

        it("should import noop.cjs file with default cwd", async () => {
            const importer = new ModuleImporter();
            const module = await importer.import("./tests/fixtures/noop.cjs");
            expect(module.default()).to.equal("cjs-noop");
        });

    });
});
