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
 export interface IProviderOptions {
      account_keys_path?: string;
      accounts?: object[];
      allowUnlimitedContractSize?: boolean;
      blockTime?: number;
      db_path?: string;
      debug?: boolean;
      default_balance_ether?: number;
      fork?: string | object;
      fork_block_number?: string | number;
      forkCacheSize?: number;
      gasLimit?: string | number;
      gasPrice?: string;
      hardfork?: "byzantium" | "constantinople" | "petersburg" | "istanbul" | "muirGlacier";
      hd_path?: string;
      locked?: boolean;
      logger?: {
        log(msg: string): void;
      };
      mnemonic?: string;
      network_id?: number;
      networkId?: number;
      port?: number;
      seed?: any;
      time?: Date;
      total_accounts?: number;
      unlocked_accounts?: string[];
      verbose?: boolean;
      vmErrorsOnRPCResponse?: boolean;
      ws?: boolean;
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