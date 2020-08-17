/* tslint:disable */
// generated by typescript-json-validator
import {inspect} from 'util';
import Ajv from 'ajv';
import Settings from './Settings';
export const ajv = new Ajv({"allErrors":true,"coerceTypes":false,"format":"fast","nullable":true,"unicode":true,"uniqueItems":true,"useDefaults":true});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

export const SettingsSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "defaultProperties": [
  ],
  "properties": {
    "projects": {
      "items": {
        "type": "string"
      },
      "type": "array"
    },
    "threshold": {
      "defaultProperties": [
      ],
      "properties": {
        "issues": {
          "type": "number"
        },
        "pullRequests": {
          "type": "number"
        }
      },
      "type": "object"
    }
  },
  "required": [
    "projects"
  ],
  "type": "object"
};
export type ValidateFunction<T> = ((data: unknown) => data is T) & Pick<Ajv.ValidateFunction, 'errors'>
export const isSettings = ajv.compile(SettingsSchema) as ValidateFunction<Settings>;
export default function validate(value: unknown): Settings {
  if (isSettings(value)) {
    return value;
  } else {
    throw new Error(
      ajv.errorsText(isSettings.errors!.filter((e: any) => e.keyword !== 'if'), {dataVar: 'Settings'}) +
      '\n\n' +
      inspect(value),
    );
  }
}