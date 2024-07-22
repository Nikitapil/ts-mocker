import {MockGenerator} from "../generator.ts";
import * as path from "node:path";

(() => {
  const generator = new MockGenerator({
    filePath: './src/example/source-types.ts',
    outputPath: path.resolve(process.cwd(), 'src/example/mocks', 'mocks.ts')
  })

  generator.generate()
})()