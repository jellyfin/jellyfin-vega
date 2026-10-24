import { usePreventHideSplashScreen } from '@amazon-devices/react-native-kepler';
import AsyncStorage from '@amazon-devices/react-native-async-storage__async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ConnectScreen } from './screen/ConnectScreen';
import { ServerScreen } from './screen/ServerScreen';

const STORAGE_KEY = 'server_url';

export const App = () => {
	usePreventHideSplashScreen();

	const [url, setUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectingServer, setSelectingServer] = useState(false);

	useEffect(() => {
		const loadUrl = async () => {
			try {
				const storedUrl = await AsyncStorage.getItem(STORAGE_KEY);
				setUrl(storedUrl);
			} catch (e) {
				console.error('Failed to load URL', e);
			} finally {
				setLoading(false);
			}
		};
		loadUrl();
	}, []);

	const handleConnect = async (newUrl: string) => {
		await AsyncStorage.setItem(STORAGE_KEY, newUrl);
		setUrl(newUrl);
		setSelectingServer(false);
	};

	if (loading) {
		return (
			<View style={[styles.container, styles.loading]}>
				<ActivityIndicator size="large" color="#00a4dc" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{url && !selectingServer ? (
				<ServerScreen url={url} onSelectServer={() => setSelectingServer(true)} />
			) : (
				<ConnectScreen
					initialUrl={url ?? ''}
					onConnect={handleConnect}
					onCancel={url ? () => setSelectingServer(false) : undefined}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#101010' },
	loading: { justifyContent: 'center', alignItems: 'center' },
});
