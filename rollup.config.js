import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import progress from "rollup-plugin-progress";
import typescript from "rollup-plugin-typescript2";
import screeps from "rollup-plugin-screeps";

var cfg = null;

export default {
  input: "src/main.ts",
  plugins: [
    progress({ clearLine: true }),
    resolve(),
    commonjs({
      namedExports: {
        "screeps-profiler": ["profiler"],
        columnify: ["columnify"]
      }
    }),
    typescript({ tsconfig: "./tsconfig.json" }),
    screeps({ config: cfg, dryRun: cfg == null })
  ],
  treeshake: false,
  output: {
    file: "dist/main.js",
    format: "cjs",
    sourcemap: false
  }
};
