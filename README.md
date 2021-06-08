# ethers-jest-environment &middot; [![npm version](https://img.shields.io/npm/v/ethers-jest-environment.svg)](https://www.npmjs.com/package/ethers-jest-environment)

Jest environment with Ganache instance and EthersJS ready.

## Install

Install dependencies.

```shell
yarn add ethers-jest-environment --dev
```

Add to your Jest config.

```json
{
  "testEnvironment": "ethereum",
  "testEnvironmentOptions": {
      "port": "8545",
      "mnemonic": ""
      ...moreOptions // view options section
  }
}
```

## Options

You can specify options for the ganache instance by following the interface:

```
export interface IOptions {
    port?: number
    mnemonic?: string
    db_path?: string
    gasLimit?: string | number
    allowUnlimitedContractSize?: boolean
    fork: string
    network_id: number
    accounts: [
        {
            secretKey: string
            balance: string
        },
    ]
    _chainId: number
    _chainIdRpc: number
    fork_block_number: number | string
    unlocked_accounts: string[]
    vmErrorsOnRPCResponse: boolean
    gasPrice: string
}
```

## Usage

Use Ethereum blockchain with the injected EthersJS provider in your tests:

```javascript
test('accounts', async () => {
    const unlockedAccounts = ethersProvider.getAccounts();

    expect(unlockedAccounts.length).toBe(10);
});
```