import create from './Type';
import { IValue, IString, INumber } from '@root/types';
import { IType, IObject, IArray } from '@root/types';
import { toJS } from 'mobx';
import { keys } from '../../utils';
const Type = create();

test('create string type ', () => {
    const type = Type.create({
        title: 'naguvan',
        value: 'sk',
        type: 'string',
        minLength: 4
    }) as IString;
    expect(type.type).toBe('string');
    expect(type.title).toBe('naguvan');
    expect(type.data).toBe('sk');
    expect(type.minLength).toBe(4);
});

test('create number type ', () => {
    const type = Type.create({
        title: 'naguvan',
        value: 50,
        type: 'number'
    }) as INumber;
    expect(type.type).toBe('number');
    expect(type.title).toBe('naguvan');
    expect(type.data).toBe(50);
});

test('create boolean type ', () => {
    const type = Type.create({
        title: 'naguvan',
        value: true,
        type: 'boolean'
    });
    expect(type.type).toBe('boolean');
    expect(type.title).toBe('naguvan');
    expect(type.name).toBe(type.title);
    expect(type.data).toBe(true);
});

test('create null type ', () => {
    const type = Type.create({
        title: 'naguvan',
        value: null,
        type: 'null'
    });
    expect(type.type).toBe('null');
    expect(type.title).toBe('naguvan');
    expect(type.data).toBe(null);
});

test('create object type', () => {
    const type = Type.create({
        type: 'object',
        properties: {
            name: {
                title: 'name',
                value: 'naguvan',
                type: 'string'
            }
        },
        title: 'naguvan'
    }) as IObject;
    expect(type.type).toBe('object');
    expect(type.title).toBe('naguvan');
    expect(type.data).toEqual({ name: 'naguvan' });
    expect(type.additionalProperties).toBeNull();
    expect(type.maxProperties).toBeNull();
    expect(type.minProperties).toBeNull();

    expect(type.properties).not.toBeNull();

    expect(keys(toJS(type.properties!)).length).toBe(1);
    expect(keys(toJS(type.properties!))).toEqual(['name']);

    expect(type.properties!.get('name')!.title).toBe('name');
    expect(type.properties!.get('name')!.data).toBe('naguvan');
    expect(type.properties!.get('name')!.type).toBe('string');
});

test('create array type', () => {
    const type = Type.create({
        type: 'array',
        items: {
            type: 'number'
        },
        title: 'naguvan'
    }) as IArray;
    expect(type.type).toBe('array');
    expect(type.title).toBe('naguvan');
    expect(type.data).toEqual([]);
    expect(type.additionalItems).toBeNull();
    expect(type.maxItems).toBeNull();
    expect(type.minItems).toBeNull();
    expect(type.uniqueItems).toBeNull();

    expect(type.items).not.toBeNull();
    expect((type.items as IType)!.type).toBe('number');
});
