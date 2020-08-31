import { readdirSync } from 'fs';
import { promisify } from 'util';

const exec = promisify(require('child_process').exec);
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

const VALIDATOR_EXTENSION = '.validator.ts';

const [dir] = process.argv.slice(2);
if (!dir) throw new Error('Please specify a directory ...');

const types = readdirSync(dir)
  .filter((x) => !x.endsWith(VALIDATOR_EXTENSION))
  .map((type) => type.split('.')[0]);

Promise.all(
  types.map(async (type) => {
    const command = `yarn typescript-json-validator ${dir}/${type}.ts ${type}`;
    const { stderr } = await exec(command);
    if (stderr)
      throw new Error(
        `There was an error while creating the validators: ${stderr}`,
      );

    await fixIssue(type);
    console.log(`- ${type}${VALIDATOR_EXTENSION} created!`);
  }),
);

// Fix for https://github.com/ForbesLindesay/typescript-json-validator/issues/34
const fixIssue = async (type) => {
  const filePath = `${dir}/${type}${VALIDATOR_EXTENSION}`;
  const data = await readFile(filePath, 'utf8');
  const result = data.replace(`export {${type}};`, '');

  await writeFile(filePath, result, 'utf8');
};
