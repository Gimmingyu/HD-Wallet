import 'dotenv/config';
import { HDNode } from 'ethers/lib/utils';
import { ethers, Wallet } from 'ethers';

async function getWalletFromMnemonic(mnemonic: string): Promise<Wallet> {
	return ethers.Wallet.fromMnemonic(mnemonic);
}

async function getHDNodeFromMnemonic(mnemonic: string): Promise<HDNode> {
	return ethers.utils.HDNode.fromMnemonic(mnemonic);
}

async function generateNewMnemonic(): Promise<string> {
	const randomBytes = ethers.utils.randomBytes(16);
	return ethers.utils.entropyToMnemonic(randomBytes);
}

async function generateRandomHDNode(): Promise<HDNode> {
	const mnemonic = await generateNewMnemonic();
	return ethers.utils.HDNode.fromMnemonic(mnemonic);
}

async function generateRandomWallet(): Promise<Wallet> {
	const mnemonic = await generateNewMnemonic();
	return ethers.Wallet.fromMnemonic(mnemonic);
}

async function encryptWallet(
	wallet: Wallet,
	password: string
): Promise<string> {
	return wallet.encrypt(password);
}

async function decryptWallet(json: string, password: string): Promise<Wallet> {
	return ethers.Wallet.fromEncryptedJson(json, password);
}

async function deriveWalletBasePath(accountId: number) {
	const hdNode = ethers.utils.HDNode.fromMnemonic(
		process.env.MNEMONIC
	).derivePath(process.env.BASE_PATH + '/' + accountId.toString());
	return new ethers.Wallet(hdNode.privateKey);
}

async function deriveWalletAdditional(accountId: number) {
	const hdNode = ethers.utils.HDNode.fromMnemonic(
		process.env.MNEMONIC
	).derivePath(process.env.ADDITIONAL + '/' + accountId.toString());
	return new ethers.Wallet(hdNode.privateKey);
}

async function signTransaction(
	wallet: Wallet,
	toAddress: string,
	value: string
) {
	const tx: ethers.Transaction = {
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

async function main() {
	const mnemonic = process.env.MNEMONIC;
	const wallet = await getWalletFromMnemonic(mnemonic);

	console.log(await wallet.getAddress());
	console.log(wallet.privateKey);

	const node = await getHDNodeFromMnemonic(mnemonic);
	console.log(node.address);
	console.log(node.privateKey);

	let password = 'p@$$word';
	const walletEncrypted = await encryptWallet(wallet, password);
	console.log(walletEncrypted);
	let walletDecrypted = await decryptWallet(walletEncrypted, password);
	console.log(walletDecrypted);

	console.log(await (await deriveWalletAdditional(0)).getAddress());
	console.log(await (await deriveWalletAdditional(0)).privateKey);
	console.log(await (await deriveWalletBasePath(1)).getAddress());
	console.log(await (await deriveWalletBasePath(2)).getAddress());
}

main().catch((err) => {
	console.error(err);
});
