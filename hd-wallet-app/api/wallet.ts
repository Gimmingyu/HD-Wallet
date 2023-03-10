import 'dotenv/config';
import { HDNode } from 'ethers/lib/utils';
import { ethers, Wallet } from 'ethers';

export async function getWalletFromMnemonic(mnemonic: string): Promise<Wallet> {
	return ethers.Wallet.fromMnemonic(mnemonic);
}

export async function getHDNodeFromMnemonic(mnemonic: string): Promise<HDNode> {
	return ethers.utils.HDNode.fromMnemonic(mnemonic);
}

export async function getSeedFromMnemonic(mnemonic: string): Promise<string> {
	return ethers.utils.mnemonicToSeed(mnemonic, 'password');
}

export async function getWallet(privateKey: string): Promise<Wallet> {
	return new ethers.Wallet(privateKey);
}

export async function generateNewMnemonic(): Promise<string> {
	const randomBytes = ethers.utils.randomBytes(16);
	return ethers.utils.entropyToMnemonic(randomBytes);
}

export async function generateRandomHDNode(): Promise<HDNode> {
	const mnemonic = await generateNewMnemonic();
	return ethers.utils.HDNode.fromMnemonic(mnemonic);
}

export async function generateRandomWallet(): Promise<Wallet> {
	const mnemonic = await generateNewMnemonic();
	return ethers.Wallet.fromMnemonic(mnemonic);
}

export async function encryptWallet(
	wallet: Wallet,
	password: string
): Promise<string> {
	return wallet.encrypt(password);
}

export async function decryptWallet(
	json: string,
	password: string
): Promise<Wallet> {
	return ethers.Wallet.fromEncryptedJson(json, password);
}

export async function deriveWalletBasePath(accountId: number) {
	const hdNode = ethers.utils.HDNode.fromMnemonic(
		process.env.NEXT_PUBLIC_MNEMONIC!
	).derivePath("m/44'/60'/0'/0" + '/' + accountId.toString());
	return new ethers.Wallet(hdNode.privateKey);
}

export async function signTransaction(
	wallet: Wallet,
	toAddress: string,
	value: string
) {
	const tx: ethers.providers.TransactionRequest = {
		nonce: 0,
		gasLimit: ethers.BigNumber.from(21000),
		gasPrice: ethers.BigNumber.from('2000000000'),
		to: toAddress,
		value: ethers.utils.parseEther(value),
		data: '0x',
		chainId: await wallet.getChainId(),
	};
	return wallet.signTransaction(tx);
}

// export async function main() {
// 	const mnemonic = process.env.NEXT_PUBLIC_MNEMONIC!;

// 	const hdNode = await getHDNodeFromMnemonic(mnemonic);
// 	const wallet = await getWalletFromMnemonic(mnemonic);

// 	console.log(`hdNode.address = ${hdNode.address}`);
// 	console.log(`wallet.address = ${wallet.address}`);

// 	const child = await deriveWalletBasePath(0);
// 	console.log(`child.address = ${child.address}`);
// 	console.log(`wallet.address = ${wallet.address}`);

// 	/**
// 	 * @description
// 	 * hdNode??? 0?????? ????????? mnemonic?????? ????????? wallet??? ????????????.
// 	 * ??????????????? ???????????? ethers.Wallet.fromMnemonic()??? ?????? ?????????
// 	 * HDNode??? ????????? 0????????? ??????????????? ?????? ??????????
// 	 *
// 	 */
// }

// main().catch((err) => {
// 	console.error(err);
// });
