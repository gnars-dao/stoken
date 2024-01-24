import { SignedTransaction } from './SignedTransaction'
import { Constants } from '../../utils/constants'

export class PrepareTransaction extends SignedTransaction {
    ENDPOINT: string = 'chain/push_transaction';
    ACTION: string = 'trnsfiopubky';
    ACCOUNT: string = Constants.defaultAccount;
    data: any

    constructor(action: string, account: string, data: any){
        super();
        if(action) this.ACTION = action;
        if (account) this.ACCOUNT = account;
        this.data = data;
    }

    public async execute(privateKey: string, publicKey: string): Promise<any> {
        return super.execute(privateKey, publicKey, true);
    }

    getData(): any {
        let actor = this.getActor();
        let data = {
            ...this.data,
            actor: actor,
        };
        return data;
    }
}