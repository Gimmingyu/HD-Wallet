import {
	ConnectWallet,
	useAddress,
	useDisconnect,
	useMetamask,
	useSDK,
} from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { deriveWalletBasePath } from '../api/wallet';
import { ethers } from 'ethers';

async function generateNewWallet() {
	const userId = Math.round(Math.random() * 1000000000);
	const wallet = await deriveWalletBasePath(userId);
	alert(wallet.address);
}

const Home: NextPage = () => {
	const disConnect = useDisconnect();
	const connectWithMetamask = useMetamask();
	const address = useAddress();
	const sdk = useSDK();
	async function getNodeFromMnemonic() {
		alert(
			ethers.utils.formatEther(await (await sdk?.getBalance(address!))!.value)
		);
	}
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to Wallet Generator!</h1>
				<h2>{address}</h2>

				<p className={styles.description}>
					Click the button if you want to create a new wallet from existing
					mnemonic.
				</p>

				<div className={styles.connect}>
					<ConnectWallet />
				</div>

				<div className={styles.grid}>
					<button
						type='submit'
						className={styles.card}
						onClick={disConnect}>
						Disconnect
					</button>
					<button
						type='submit'
						className={styles.card}
						onClick={connectWithMetamask}>
						Connect new wallet
					</button>
					<button
						type='submit'
						className={styles.card}
						onClick={() => generateNewWallet()}>
						Generate new deposit address
					</button>
					<button
						type='submit'
						className={styles.card}
						onClick={() => getNodeFromMnemonic()}>
						Get Balance
					</button>
				</div>
			</main>
		</div>
	);
};

export default Home;
