import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useHideSplashScreenCallback } from '@amazon-devices/react-native-kepler';
import { Button } from '../components/Button';
import { useServerConnection } from '../hooks/useServerConnection';
import { t } from '../i18n';

interface Props {
	initialUrl?: string;
	onConnect: (url: string) => Promise<void>;
	onCancel?: () => void;
}

export function ConnectScreen({ initialUrl = '', onConnect, onCancel }: Props) {
	const { url, status, error, changeUrl, connect } = useServerConnection({ initialUrl, onConnect, onCancel });
	const [inputFocused, setInputFocused] = useState(false);
	const hideSplashScreen = useHideSplashScreenCallback();
	const isConnecting = status !== 'idle';

	useEffect(() => {
		hideSplashScreen();
	}, [hideSplashScreen]);

	return (
		<ScrollView style={styles.screen} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
			<View style={styles.form}>
				<Image
					source={require('../../assets/image/banner-light.png')}
					style={styles.logo}
					resizeMode="contain"
					accessibilityLabel={t('appName')}
					accessibilityIgnoresInvertColors
				/>
				<Text style={styles.title} accessibilityRole="header">
					{t('connectTitle')}
				</Text>
				<Text style={styles.description}>{t('connectDescription')}</Text>
				<Text style={styles.label} nativeID="server-address-label">
					{t('serverAddress')}
				</Text>
				{/* Avoid inputMode: it overrides showSoftInputOnFocus and opens the keyboard on launch. */}
				<TextInput
					style={[styles.input, inputFocused && styles.inputFocused, !!error && styles.inputError]}
					accessibilityLabel={t('serverAddress')}
					accessibilityLabelledBy="server-address-label"
					placeholder={t('serverAddressExample')}
					placeholderTextColor="#808080"
					selectionColor="#00a4dc"
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType="url"
					returnKeyType="go"
					value={url}
					onChangeText={changeUrl}
					onSubmitEditing={connect}
					onFocus={() => setInputFocused(true)}
					onBlur={() => setInputFocused(false)}
					hasTVPreferredFocus
					showSoftInputOnFocus={false}
					editable={!isConnecting}
				/>
				<Text style={styles.hint}>{t('serverAddressHint')}</Text>
				{error && (
					<Text style={styles.errorText} accessibilityRole="alert" accessibilityLiveRegion="polite">
						{t(error)}
					</Text>
				)}
				<Button label={t('connect')} onPress={connect} loading={isConnecting} />
				{onCancel ? (
					<View style={styles.cancel}>
						<Button label={t('cancel')} onPress={onCancel} variant="text" disabled={isConnecting} />
					</View>
				) : (
					<Text style={styles.footer}>{t('rememberServer')}</Text>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: '#101010' },
	container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 36 },
	form: { width: '100%', maxWidth: 520 },
	logo: { width: 240, height: 68, alignSelf: 'center', marginBottom: 24 },
	title: { color: '#fff', fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
	description: { color: '#bcbcbc', fontSize: 17, textAlign: 'center', marginBottom: 28 },
	label: { color: '#ddd', fontSize: 16, marginBottom: 8 },
	input: {
		height: 54,
		borderWidth: 2,
		borderColor: '#555',
		borderRadius: 4,
		paddingHorizontal: 16,
		paddingVertical: 0,
		textAlignVertical: 'center',
		color: '#fff',
		backgroundColor: '#202020',
		fontSize: 20,
	},
	inputFocused: { borderColor: '#00a4dc', backgroundColor: '#282828' },
	inputError: { borderColor: '#ff8585' },
	hint: { color: '#aaa', fontSize: 14, marginTop: 8, marginBottom: 22 },
	errorText: { color: '#ff8585', fontSize: 16, lineHeight: 23, marginBottom: 18 },
	cancel: { marginTop: 12 },
	footer: { color: '#888', fontSize: 14, textAlign: 'center', marginTop: 20 },
});
