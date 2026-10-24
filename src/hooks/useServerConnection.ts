import { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { Jellyfin } from '@jellyfin/sdk';
import type { StringKey } from '../i18n';

interface Options {
	initialUrl: string;
	onConnect: (url: string) => Promise<void>;
	onCancel?: () => void;
}

type ConnectionStatus = 'idle' | 'checking' | 'saving';

const jellyfin = new Jellyfin({
	clientInfo: { name: 'Jellyfin Vega', version: '0.0.1' },
	deviceInfo: { name: 'Kepler Device', id: 'kepler-device' },
});

export function useServerConnection({ initialUrl, onConnect, onCancel }: Options) {
	const [url, setUrl] = useState(initialUrl);
	const [status, setStatus] = useState<ConnectionStatus>('idle');
	const [error, setError] = useState<StringKey | null>(null);
	// State updates are asynchronous; the ref also guards submissions within the same render.
	const submitting = useRef(false);

	useEffect(() => {
		const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
			if (submitting.current) {
				return true;
			}
			if (onCancel) {
				onCancel();
				return true;
			}
			return false;
		});
		return () => subscription.remove();
	}, [onCancel]);

	function changeUrl(value: string) {
		setUrl(value);
		setError(null);
	}

	async function checkServer(address: string) {
		try {
			const candidates = await jellyfin.discovery.getRecommendedServerCandidates(address);
			const server = jellyfin.discovery.findBestServer(candidates);
			if (!server) {
				setError('serverConnectionFailed');
			}
			return server?.address;
		} catch (cause) {
			console.error('Failed to discover server', cause);
			setError('serverUnreachable');
		}
	}

	async function saveServer(address: string) {
		setStatus('saving');
		try {
			await onConnect(address);
		} catch (cause) {
			console.error('Failed to save server', cause);
			setError('serverSaveFailed');
		}
	}

	async function connect() {
		if (submitting.current) {
			return;
		}

		const address = url.trim();
		if (!address) {
			setError('serverAddressRequired');
			return;
		}

		submitting.current = true;
		setStatus('checking');
		setError(null);
		try {
			const serverAddress = await checkServer(address);
			if (serverAddress) {
				await saveServer(serverAddress);
			}
		} finally {
			submitting.current = false;
			setStatus('idle');
		}
	}

	return { url, status, error, changeUrl, connect };
}
