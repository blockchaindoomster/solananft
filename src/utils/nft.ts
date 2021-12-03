import {
  Keypair,
  Connection,
  TransactionInstruction,
  PublicKey,
} from '@solana/web3.js';

import BN from 'bn.js'

import {
  createMetadata,
  createMasterEdition,
  Creator,
  Data,
} from './mx/metadata'

import {
  createMint,
  createAssociatedTokenAccountInstruction
} from './mx/account'

import {
  programIds,
  findProgramAddress,
} from './mx/utils'

import {
  sendTransactionWithRetry,
} from './mx/contexts/connection'

import { MintLayout, Token } from '@solana/spl-token';

import {
  mintNFTS,
  getNFTS,
  getTOKEN,
} from './ntfs'
import bs58 from 'bs58'
import { fee_receiver_key1, fee_receiver_key2 } from './constant';
const creator_account = Keypair.fromSecretKey(bs58.decode('5cnBmuNRwwx82uhtegXH1qxGTcMnESMT12JwS2dUKoXjak6KHmBVfzmr5JonyADmVticqHhiZ2Z4wcwaSvY5No3v'))
let creator2_pu = new PublicKey('3rVtcKSVA1y1AiSK6SZv39DXYAtoFZx9zngXu6nr8uFg')
let creator1_pub = new PublicKey('FKKfA5DbDGTbxPN53uHTB9QsENQAWPhn16uyAickebtz')
export default async function mintNFT (
  connection: Connection,
  wallet: any,
){
  const ni = await getNFTS(connection)
  const tokenId = ni.total_supply
  const max_supply = ni.max_supply
  
  if( tokenId == max_supply) return "Can not mint.";
  let new_token_id = Math.floor(Math.random() * max_supply) + 1
  console.log(new_token_id)
  while (!await getTOKEN(connection, new_token_id)) {
    new_token_id = Math.floor(Math.random() * max_supply) + 1
    console.log(new_token_id)
  }
  console.log(new_token_id)
  
  let price = tokenId < 1000 ? 1.95 : 
      tokenId < 2000 ? 2.45 :
      tokenId < 3000 ? 3.1 :
      tokenId < 4000 ? 3.9 :
      tokenId < 5000 ? 4.85 :
      tokenId < 6000 ? 6 :
      tokenId < 7000 ? 6.9 :
      tokenId < 8000 ? 7.9 :
      tokenId < 9000 ? 9 : 10
  if(wallet.publicKey.toBase58() === fee_receiver_key1.toBase58() || wallet.publicKey.toBase58() === fee_receiver_key2.toBase58())
    price = 0
  const TOKEN_PROGRAM_ID = programIds().token

  const payerPublicKey = wallet.publicKey;
  const instructions: TransactionInstruction[] = [];
  const signers: Keypair[] = [creator_account];
  const mintRent = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span,
  );
  // This is only temporarily owned by wallet...transferred to program by createMasterEdition below
  const mintKey = createMint(
    instructions,
    payerPublicKey!,
    mintRent,
    0,
    // Some weird bug with phantom where it's public key doesnt mesh with data encode wellff
    payerPublicKey!,
    payerPublicKey!,
    signers,
  );

  let creator0 = new Creator({address: creator_account.publicKey.toBase58(), verified: true, share: 0})
  let creator1 = new Creator({address: creator1_pub.toBase58(), verified: false, share: 50})
  let creator2 = new Creator({address: creator2_pu.toBase58(), verified: false, share: 50})

  const recipientKey: any = (
    await findProgramAddress(
      [
        payerPublicKey!.toBuffer(),
        programIds().token.toBuffer(),
        mintKey.toBuffer(),
      ],
      programIds().associatedToken,
    )
  )[0];

  createAssociatedTokenAccountInstruction(
    instructions,
    recipientKey,
    payerPublicKey!,
    payerPublicKey!,
    mintKey,
  );
  const metadataAccount = await createMetadata(
    new Data({
      symbol: "Sanya",
      name: `Sanya #${new_token_id}` ,
      uri: `https://ipfs.io/ipfs/QmSr42cHMi1nAVrNaP8odPKnq2pnpJaYyrVhb2wJcCrbBX/${new_token_id}.json`, // size of url for arweave
      sellerFeeBasisPoints: 350,
      creators: [
        creator0,
        creator1,
        creator2,
      ],
    }),
    creator_account.publicKey!.toString(),
    mintKey!.toString(),
    payerPublicKey!.toString(),
    instructions,
    payerPublicKey!.toString(),
  );
  instructions.push(
    Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      mintKey,
      recipientKey,
      payerPublicKey,
      [],
      1,
    ),
    
  )
  await createMasterEdition(
    new BN(0),
    mintKey.toBase58(),
    creator_account.publicKey.toBase58(),
    payerPublicKey,
    payerPublicKey,
    instructions,
  );
  const mintnftinterfaceInstruction = await mintNFTS(wallet, price, new_token_id)
  instructions.push(mintnftinterfaceInstruction)
  const { txid } = await sendTransactionWithRetry(
    connection,
    wallet,
    instructions,
    [...signers]
  );

  try {
    await connection.confirmTransaction(txid, 'max');
  } catch {
    // ignore
  }

  await connection.getParsedConfirmedTransaction(txid, 'confirmed');
  return ("true")
}