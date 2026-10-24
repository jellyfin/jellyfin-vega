import { useHideSplashScreenCallback } from '@amazon-devices/react-native-kepler';
import WebView from '@amazon-devices/webview';
import { createNativeShell } from '../nativeshell';

interface Props {
	url: string;
	onSelectServer: () => void;
}

export function ServerScreen({ url, onSelectServer }: Props) {
	const hideSplashScreen = useHideSplashScreenCallback();

	return (
		<WebView
			source={{ uri: url }}
			hasTVPreferredFocus
			javaScriptEnabled
			domStorageEnabled
			mediaPlaybackRequiresUserAction={false}
			allowSystemKeyEvents
			allowsDefaultMediaControl
			injectedJavaScriptBeforeContentLoaded={createNativeShell()}
			onMessage={({ nativeEvent }) => {
				if (nativeEvent.data === 'org.jellyfin.vega.selectServer') {
					onSelectServer();
				}
			}}
			mixedContentMode="always"
			onLoad={hideSplashScreen}
		/>
	);
}
