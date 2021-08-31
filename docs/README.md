## Table of contents

### Type aliases

- [Arguments][1]
- [Context][2]
- [Parser][3]
- [Program][4]

### Variables

- [GIT_COMMITMSG_PATH][5]

### Functions

- [configureProgram][6]

## Type aliases

### Arguments

Ƭ **Arguments**<`T`>: `T` & { \[argName: string]: `unknown`; `$0`: `string` ;
`_`: (`string` | `number`)\[] }

#### Type parameters

| Name | Type |
| :--- | :--- |
| `T`  | {}   |

#### Defined in

node_modules/@types/yargs/index.d.ts:646

---

### Context

Ƭ **Context**: `Object`

#### Type declaration

| Name      | Type           |
| :-------- | :------------- |
| `parse`   | [`Parser`][3]  |
| `program` | [`Program`][4] |

#### Defined in

[src/index.ts:16][7]

---

### Parser

Ƭ **Parser**: (`argv?`: `string`\[]) => `Promise`<[`Arguments`][1]>

#### Type declaration

▸ (`argv?`): `Promise`<[`Arguments`][1]>

##### Parameters

| Name    | Type        |
| :------ | :---------- |
| `argv?` | `string`\[] |

##### Returns

`Promise`<[`Arguments`][1]>

#### Defined in

[src/index.ts:14][8]

---

### Program

Ƭ **Program**: `Argv`

#### Defined in

[src/index.ts:12][9]

## Variables

### GIT_COMMITMSG_PATH

• `Const` **GIT_COMMITMSG_PATH**: `"./.git/COMMIT_EDITMSG"`

#### Defined in

[src/index.ts:24][10]

## Functions

### configureProgram

▸ **configureProgram**(): [`Context`][2]

Create and return a pre-configured Yargs instance (program) and argv parser.

#### Returns

[`Context`][2]

#### Defined in

[src/index.ts:67][11]

▸ **configureProgram**(`program`): [`Context`][2]

Configure an existing Yargs instance (program) and return an argv parser.

#### Parameters

| Name      | Type           | Description                   |
| :-------- | :------------- | :---------------------------- |
| `program` | [`Program`][4] | A Yargs instance to configure |

#### Returns

[`Context`][2]

#### Defined in

[src/index.ts:73][12]

[1]: README.md#arguments
[2]: README.md#context
[3]: README.md#parser
[4]: README.md#program
[5]: README.md#git_commitmsg_path
[6]: README.md#configureprogram
[7]: https://github.com/Xunnamius/commit-spell/blob/620fad4/src/index.ts#L16
[8]: https://github.com/Xunnamius/commit-spell/blob/620fad4/src/index.ts#L14
[9]: https://github.com/Xunnamius/commit-spell/blob/620fad4/src/index.ts#L12
[10]: https://github.com/Xunnamius/commit-spell/blob/620fad4/src/index.ts#L24
[11]: https://github.com/Xunnamius/commit-spell/blob/620fad4/src/index.ts#L67
[12]: https://github.com/Xunnamius/commit-spell/blob/620fad4/src/index.ts#L73
