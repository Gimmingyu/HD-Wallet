import { ethers } from 'ethers';
import crypto, { randomUUID } from 'crypto';
import HDWallet from 'ethereum-hdwallet';

async function main() {
	const id = crypto.randomBytes(32).toString('hex');
	console.log(id);

	const privateKey = '0x' + id;
	console.log('SAVE BUT DO NOT SHARE THIS ', privateKey);

	const wallet = new ethers.Wallet(privateKey);

	console.log('Address : ', wallet.address);

	// =================================================================

	/**
	 * @dev Create a new HD Wallet from a mnemonic
	 * @description BIP-44 규격, 이더리움 유형, change는 이더리움에서 사용하지않고, address_index는 0
	 */
	const mnemonic =
		'metaverse two ethereum solana binance aptos cosmos golang typescript javascript react postgresql';

	const hdWallet = HDWallet.fromMnemonic(mnemonic);

	console.log(
		`0x${hdWallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`
	);
	// 0xda39dc967d2a743ada84d42a6c422c96cdec27ce

	/**
	 * @dev Create a new HD Wallet from a seed
	 */
	const seed = Buffer.from(mnemonic);

	const hdWalletFromSeed = HDWallet.fromSeed(seed);
	console.log(
		`0x${hdWallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`
	);
	// 0xda39dc967d2a743ada84d42a6c422c96cdec27ce

	/**
	 * @dev Deriving keys at a HD path
	 * @
	 */
	console.log(
		hdWallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex')
	); // d6cac25ad15ac86c1afeaf912d9c74c81b40b1b10a3dc88de31e5d342eb353b84355e057f0a0482899348c3976169a95b9cc124c2133f1474f6e49ed03204332
	console.log(
		hdWallet.derive(`m/44'/60'/0'/0/0`).getPublicKey(true).toString('hex')
	); // 02d6cac25ad15ac86c1afeaf912d9c74c81b40b1b10a3dc88de31e5d342eb353b8
	console.log(
		hdWallet.derive(`m/44'/60'/0'/0/0`).getPrivateKey().toString('hex')
	); // 40f8db70dbec277fe61bde902754d76cb9c31a58ca6f5627aae6b2e34be20b3f
	console.log(
		`0x${hdWallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`
	); // 0xda39dc967d2a743ada84d42a6c422c96cdec27ce

	/**
	 * @dev Deriving wallets given account index
	 */
	const walletByAccountIndex = HDWallet.fromMnemonic(mnemonic);
	const walletForIndividual = walletByAccountIndex.derive(`m/44'/60'/0'/0`);
	console.log(
		`0x${walletForIndividual.derive(1).getAddress().toString('hex')}`
	); // 0xc964dd9cba7bc338539094be104054913bce60f5
	console.log(
		`0x${walletForIndividual.derive(2).getAddress().toString('hex')}`
	); // 0x6b25b56d5e31ce7cbc67e20e7c0043cf5d626da1
	console.log(
		`0x${walletForIndividual.derive(3).getAddress().toString('hex')}`
	); // 0x912caf652a709e67398febb373ed47aba26af860
	console.log(`0x${walletForIndividual.derive(3).hdpath()}`); // 0xm/44'/60'/0'/0/3

	const hdwallet = HDWallet.fromMnemonic(mnemonic);
	const signedRawTx = hdwallet.derive(`m/44'/60'/0'/0/0`).signTransaction({
		to: '0x0000000000000000000000000000000000000000',
		value: '0x0',
		data: '0x0',
	});

	// 0xf85d80808094000000000000000000000000000000000000000080001ca0de4b34f17bf51d0b783082090c10d133dcc867c7e981c07cda5ddd1e3211f44ca02125dff6879141708899838356bc42df8815220069ce10507ae4ea980791dac4

	console.log(`0x${signedRawTx.toString('hex')}`);
}

main().catch((error) => {
	console.error(error);
});
