import {Schema} from './types';

export function toLabel(name: string) {
  return name.charAt(0).toUpperCase() + name.substr(1);
}

export function toSchema<T>(schema: string | Schema<T>): Schema<T> {
  return typeof schema === 'string' ? {} : schema;
}
