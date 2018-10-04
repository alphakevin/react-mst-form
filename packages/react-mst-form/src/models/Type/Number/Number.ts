import { IModelType, types } from "mobx-state-tree";
export type __IModelType = IModelType<any, any>;

import { INumberConfig, INumber } from "../../../types";
import createValue from "../Value";
import { decimals } from "../../../utils";
import mappings from "../Mappings";

export const Number: IModelType<Partial<INumberConfig>, INumber> = types
  .compose(
    "Number",
    createValue<number, "number">("number", types.number, 0),
    types.model({
      minimum: types.maybe(types.number),
      maximum: types.maybe(types.number),
      multipleOf: types.maybe(types.number)
    })
  )
  .actions(it => ({
    afterCreate() {
      if (it.multipleOf !== null && it.multipleOf <= 0) {
        throw new TypeError(
          `multipleOf can not be ${it.multipleOf === 0 ? "zero" : "negative"}`
        );
      }
    }
  }))
  .actions(it => ({
    syncValidate(value: number): Array<string> {
      const errors: Array<string> = it.syncValidateBase(value);
      if (it.minimum !== null && value < it.minimum) {
        errors.push(`should NOT be lesser than ${it.minimum}`);
      }
      if (it.maximum !== null && value > it.maximum) {
        errors.push(`should NOT be greater than ${it.maximum}`);
      }
      if (it.multipleOf !== null && it.multipleOf > 1) {
        const multiplier = Math.pow(
          10,
          Math.max(decimals(value), decimals(it.multipleOf))
        );
        if (
          Math.round(value * multiplier) %
          Math.round(it.multipleOf * multiplier) !==
          0
        ) {
          errors.push(`should be multiple of ${it.multipleOf}`);
        }
      }
      return errors;
    }
  }));

mappings["number"] = Number;