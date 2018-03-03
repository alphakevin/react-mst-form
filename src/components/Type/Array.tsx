import * as React from 'react';
import { Component, ReactNode, Fragment } from 'react';

import { IArrayProps, IArrayStates } from '@root/types';
import { IArray, IForm } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import { renderer } from './renderer';

import createType from '../../models/Type';

import IconButton from 'material-ui/IconButton';
import ActionAdd from 'material-ui-icons/Add';
import ActionClear from 'material-ui-icons/Clear';
import FormLabel from 'material-ui/Form/FormLabel';
import FormControl from 'material-ui/Form/FormControl';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import FormHelperText from 'material-ui/Form/FormHelperText';

@observer
export default class Array extends Base<IArray, IArrayProps, IArrayStates> {
    constructor(props: IArrayProps, context: any) {
        super(props, context);
    }

    protected renderType(type: IArray, form: IForm): ReactNode {
        const Type = createType();
        return (
            <>
                <FormControl
                    component={'fieldset'}
                    error={!type.valid}
                    style={{ width: '100%' }}>
                    <FormLabel component={'legend'} style={{ paddingTop: 20 }}>
                        {type.title}
                    </FormLabel>
                    {type.elements.map((element, index) => (
                        <Fragment key={index}>
                            {type.dynamic && (
                                <IconButton
                                    style={{
                                        float: 'right',
                                        marginTop: 10,
                                        marginBottom: -10
                                    }}
                                    onClick={
                                        // tslint:disable-next-line:jsx-no-lambda
                                        e => type.remove(index)
                                    }>
                                    <ActionClear />
                                </IconButton>
                            )}
                            {renderer(element, form)}
                        </Fragment>
                    ))}
                    {type.dynamic && (
                        <IconButton
                            style={{ float: 'right' }}
                            onClick={
                                // tslint:disable-next-line:jsx-no-lambda
                                e => type.push()
                            }>
                            <ActionAdd />
                        </IconButton>
                    )}
                    {!type.valid &&
                        type.errors!.length > 0 && (
                            <FormHelperText error>
                                {type.errors!.join(', ')}
                            </FormHelperText>
                        )}
                </FormControl>
            </>
        );
    }
}
