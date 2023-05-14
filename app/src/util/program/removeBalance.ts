import * as anchor from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js';
import { anchorProgram } from '@/util/helper';

export const removeBalance = async (
  wallet: anchor.Wallet,
  threadId: Uint8Array,
  balance: number,
) => {

  const program = anchorProgram(wallet);

  const [bank_account] = PublicKey.findProgramAddressSync(
    [anchor.utils.bytes.utf8.encode("bank_account"), Buffer.from(threadId)],
    program.programId
  );

  try {
    const sig = await program.methods.withdraw(Buffer.from(threadId), balance)
      .accounts({
        bankAccount: bank_account,
        holder: wallet.publicKey,

      }).rpc()

    return { error: false, sig }

  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}