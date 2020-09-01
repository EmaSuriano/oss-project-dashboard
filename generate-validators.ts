import { statSync } from 'fs';
import { watch } from 'chokidar';
import { basename } from 'path';
import { promisify } from 'util';

const exec = promisify(require('child_process').exec);
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

const VALIDATOR_EXTENSION = '.validator.ts';

const [dir] = process.argv.slice(2);
if (!statSync(dir).isDirectory)
  throw new Error('Please specify a directory ...');

console.log(`Generating validators from ${dir} ...`);

const generateValidator = async (path: string) => {
  const { stderr } = await exec(
    `yarn typescript-json-validator ${path} ${basename(path, '.ts')}`,
  );
  if (stderr)
    throw new Error(
      `There was an error while creating the validators: ${stderr}`,
    );

  await fixIssue(path);
  console.log(`- ${path.replace('.ts', VALIDATOR_EXTENSION)} created!`);
};

watch(dir, {
  ignored: `**/*${VALIDATOR_EXTENSION}`,
})
  .on('add', generateValidator)
  .on('change', generateValidator);

// Fix for https://github.com/ForbesLindesay/typescript-json-validator/issues/34
const fixIssue = async (path) => {
  const filePath = path.replace('.ts', VALIDATOR_EXTENSION);
  const data = await readFile(filePath, 'utf8');
  const result = data.replace(`export {${basename(path, '.ts')}};`, '');

  await writeFile(filePath, result, 'utf8');
};
