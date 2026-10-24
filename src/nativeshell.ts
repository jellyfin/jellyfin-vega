/**
 * List of jellyfin-web features requested via AppHost.supports() function.
 */
const features = [
	'displaylanguage',
	'exit',
	'exitmenu',
	'externallinks',
	'htmlaudioautoplay',
	'htmlvideoautoplay',
	'multiserver',
	'remoteaudio',
	'remotecontrol',
	'remotevideo',
	'screensaver',
	'subtitleappearancesettings',
	'subtitleburnsettings',
	'targetblank',
];

export function createNativeShell() {
	return `(() => {
		const features = ${JSON.stringify(features)};
		window.NativeShell = {
			getPlugins: () => [],
			selectServer: () => window.ReactNativeWebView.postMessage('org.jellyfin.vega.selectServer'),
			AppHost: {
				init: async () => {
					console.log('Initializing Vega OS native shell');
				},
				getDefaultLayout: () => 'tv',
				getDeviceProfile: (profileBuilder) => profileBuilder(),
				supports: (feature) => features.includes(feature.toLowerCase()),
			},
		};
	})();`;
}
