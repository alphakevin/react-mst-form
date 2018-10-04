import * as React from "react";
import { ReactNode } from "react";

import { INumberProps, INumberStates } from "../../types";
import { INumber, IForm } from "../../types";

import { observer } from "mobx-react";

import Base from "./Base";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { toNumber } from "../../utils";

@observer
export default class Number extends Base<INumber, INumberProps, INumberStates> {
  protected renderType(type: INumber, form: IForm): ReactNode {
    const select: boolean = !!type.enum && type.enum.length > 0;
    return (
      <>
        <TextField
          select={select}
          key={type.name!}
          type={"number"}
          margin={"normal"}
          fullWidth={true}
          name={type.name!}
          id={type.name!}
          value={type.data || ""}
          disabled={type.disabled!}
          error={!type.valid}
          label={type.title!}
          helperText={type.errors!.join(", ")}
          // tslint:disable-next-line:jsx-no-lambda
          onChange={e => type.sync(toNumber(e.target.value, type.value!))}
        >
          {type.options &&
            type.options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      </>
    );
  }
}