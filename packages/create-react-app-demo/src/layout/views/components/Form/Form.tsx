// tslint:disable:object-literal-sort-keys

// tslint:disable:no-console

import * as React from "react";
import { Component, ReactNode } from "react";

import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";

import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import { Form, IFormConfig } from "react-mst-form";

export interface IFormStyles {
  root: CSSProperties;
}

export interface IFormStyleProps extends WithStyles<keyof IFormStyles> {}

export interface IFormProps {
  style?: CSSProperties;
  className?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IFormStates {}

const config: IFormConfig = {
  title: "Test Form",
  cancel: "Cancel",
  submit: "create",
  schema: {
    type: "object",
    properties: {
      name: {
        type: "object",
        properties: {
          first: {
            type: "string",
            title: "First",
            value: "naguvan",
            minLength: 5,
            sequence: 1
          },
          middle: {
            type: "string",
            title: "Middle",
            value: "sk",
            minLength: 5,
            sequence: 1
          },
          last: {
            type: "string",
            title: "Last",
            value: "sk",
            minLength: 5,
            sequence: 2
          },
          age: {
            type: "number",
            title: "Age",
            value: 5,
            sequence: 2,
            maximum: 10,
            minimum: 3
          }
        }
        // layout: [["first", "last"], "middle", "age"]
      },
      title: {
        type: "string",
        title: "Title",
        value: "sk",
        minLength: 5
      },
      ipv4: {
        type: "string",
        title: "ipv4",
        minLength: 5,
        maxLength: 20,
        format: "ipv4"
      },
      color: {
        type: "string",
        title: "In which color",
        component: "color",
        format: "color"
      },
      size: {
        type: "number",
        title: "Size",
        value: 5,
        maximum: 10,
        minimum: 3,
        multipleOf: 3
      },
      type: {
        type: "number",
        title: "Select a type",
        enum: [1, 2],
        options: [{ label: "One", value: 1 }, { label: "Two", value: 2 }]
      },
      agree: {
        type: "boolean",
        title: "I agree with your terms",
        value: false,
        const: true
      },
      array: {
        type: "array",
        title: "Array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              title: "name",
              minLength: 3
            },
            age: {
              type: "number",
              title: "age",
              multipleOf: 2,
              minimum: 2
            }
          }
        },
        minItems: 2,
        maxItems: 4
      }
    }
  },
  sections: [
    {
      title: "Basic",
      layout: ["name", "title", ["size", "color"]]
    },
    {
      title: "Others",
      layout: ["ipv4", "type", "agree", "array"]
    }
  ]
};

export class FormComponent extends Component<
  IFormProps & IFormStyleProps,
  IFormStates
> {
  public render(): ReactNode {
    const { className, classes, style } = this.props;
    const root: string = classNames(classes!.root, className);
    return (
      <div className={root} style={style}>
        <Form
          config={config}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          onErrors={this.onErrors}
          onPatch={this.onPatch}
          onSnapshot={this.onSnapshot}
        />
      </div>
    );
  }

  private onCancel = () => {
    window.alert(`form cancelled`);
  };

  private onSubmit = (values: { [key: string]: any }) => {
    console.info(values);
    window.alert(`submitted values:\n\n${JSON.stringify(values, null, 2)}`);
  };

  private onErrors = (errors: { [key: string]: string[] }) => {
    console.error(errors);
    window.alert(`errors:\n\n${JSON.stringify(errors, null, 2)}`);
  };

  private onPatch = (patch: {
    op: "replace" | "add" | "remove";
    path: string;
    value?: any;
  }): void => {
    console.info(patch);
  };

  private onSnapshot = (snapshot: {}): void => {
    console.info(snapshot);
  };
}

export default withStyles<keyof IFormStyles, {}>({
  root: {
    margin: "0 auto",
    width: 500
  }
})(FormComponent);
