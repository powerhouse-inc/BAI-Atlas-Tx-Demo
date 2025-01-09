import {
    addDocument,
    addFolder,
    createReactorAndCreateLocalDrive,
    sleep,
} from "scripts/utils/drive-actions";
import jsonTransactions from './server/data/transactions.json';
import { addTransaction } from "scripts/utils/account-transaction.actions";
import { IBaseDocumentDriveServer } from "document-drive";

async function main() {
    console.time('...duration')
    console.log('Creating Transaction Document...')

    const driveServer = (await createReactorAndCreateLocalDrive(
        "http://localhost:4001/d/powerhouse"
    )) as IBaseDocumentDriveServer;

    const driveIds = await driveServer.getDrives();
    // console.log(driveIds);
    let drive = await driveServer.getDrive(driveIds[0]);
    // console.log(drive.state);
    // console.log(driveIds[0]);
    await addFolder(driveServer, driveIds[0], "account-transactions", "Account Transactions");
    drive = await driveServer.getDrive(driveIds[0]);
    // console.log(drive.state.global.nodes);
    const rootDirId = drive.state.global.nodes.find(
        (e: any) => e.name === "Account Transactions"
    );
    if (!rootDirId) {
        throw new Error("Root directory not found");
    }

    // create one document to house all transactions
    await addDocument(
        driveServer,
        driveIds[0],
        "transactions",
        "Transactions",
        "powerhouse/account-transactions",
        rootDirId.id
    );

    // create section 1 folders and documents
    for (let transaction of jsonTransactions.erc20Transfers) {

        await addTransaction(
            driveServer,
            driveIds[0],
            "transactions",
            transaction
        );

    }

    await sleep(1000);

    console.timeEnd('...duration')
    process.exit(0);
}

main();