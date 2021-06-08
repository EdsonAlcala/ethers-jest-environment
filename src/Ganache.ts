import GanacheCore from 'ganache-core'
import { ethers } from 'ethers'

export enum Status {
    Running = 'Running',
    Stopped = 'Stopped',
}

export class Ganache {
    public status: Status
    public server: GanacheCore.Server | undefined
    private options: Partial<GanacheCore.IProviderOptions>
    private defaultOptions: Partial<GanacheCore.IProviderOptions> = {
        fork_block_number: 12057129,
        port: 8545,
        db_path: '',
        vmErrorsOnRPCResponse: true,
        gasLimit: 200000000000,
        allowUnlimitedContractSize: true,
        gasPrice: '0x2E90EDD000',
        unlocked_accounts: [],
    }

    constructor(options?: Partial<GanacheCore.IProviderOptions>) {
        this.status = Status.Stopped
        this.options = Object.assign(this.defaultOptions, options)

    }

    public async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server = GanacheCore.server(this.options)
            this.server.on('listening', () => {
                console.log('Ganache started successfully', this.options.port)
                this.status = Status.Running

                if (this.options.fork) {
                    console.log(`Forked off of node: ${this.options.fork}\n`)
                }

                console.log(`\nTest chain started on port ${this.options.port}, listening...`);

                if (this.server) {
                    (this as any).global.ethersProvider = new ethers.providers.Web3Provider(this.server.provider as any)
                }
                resolve()
            }).on('error', reject).listen(this.options.port, 'localhost')
        })
    }

    public async stop(): Promise<void> {
        this.status = Status.Stopped
        if (this.server) {
            this.server.close()
        }
    }
}
