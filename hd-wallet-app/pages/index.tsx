import {
	ConnectWallet,
	useAddress,
	useConnectedWallet,
	useDisconnect,
	useLogin,
	useMetamask,
	useWalletConnect,
} from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useAccount } from '@thirdweb-dev/react';

async function generateNewWallet() {
	const userId = Math.round(Math.random() * 1000000000);

	const res = await axios.get(`/deposit/public/${userId}`);
	alert(res.data.result.publicKey);
	return res.data.result.publicKey;
}

async function getPrivateKey() {
	const userId = Math.round(Math.random() * 1000000000);
	const res = await axios.get(`/deposit/private/${userId}`);
	alert(res.data.result.privateKey);
	return res.data.result.privateKey;
}

const Home: NextPage = () => {
	const disConnect = useDisconnect();
	const connectWithMetamask = useMetamask();
	const address = useAddress();
	const account = useAccount();

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href='http://localhost:5000/api'>Wallet Generator</a>!
				</h1>
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
				</div>
			</main>
		</div>
	);
};

export default Home;