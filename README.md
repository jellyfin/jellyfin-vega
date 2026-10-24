<h1 align="center">Jellyfin for Vega</h1>
<h3 align="center">Part of the <a href="https://jellyfin.org">Jellyfin Project</a></h3>

---

<img alt="Logo Banner" src="https://raw.githubusercontent.com/jellyfin/jellyfin-ux/master/branding/SVG/banner-logo-solid.svg?sanitize=true"/>

Jellyfin for Vega is a Jellyfin client for devices using [Amazon Vega](https://developer.amazon.com/docs/vega/vega). The client loads the
[jellyfin-web](https://github.com/jellyfin/jellyfin-web) interface in a WebView with a custom native shell implementation.

## Repository structure

```txt
.
├── assets/             Images and localized strings
├── src/                Native app and native shell implementation
```

## Develop & build

A working [Amazon Vega SDK](https://developer.amazon.com/docs/vega/0.24/) environment is required, including Node.js and NPM. The project uses NPM scripts for everyday tasks.

### Install dependencies

```sh
source "$HOME/vega/env"
npm ci
```

Loads the Vega SDK environment and installs the dependencies from the lockfile. Adjust the environment path if the SDK is installed elsewhere.

### Build debug packages

```sh
npm run build:debug
```

Builds debug Vega packages under `build/`.

### Build release packages

```sh
npm run build:release
```

Builds release Vega packages under `build/`. The `build` and `build:app` scripts run the same build.

### Serve

```sh
npm start
```

Starts the React Native Metro server for development. Keep it running while using a debug build.

### Install and run

```sh
vega device list
vega run-app path/to/package.vpkg org.jellyfin.vega.main
```

Lists connected devices, then installs and launches a package. Replace the example path with a `.vpkg` from `build/` matching the device architecture. Add `--deviceId <device-id>` when more than one device is connected.

WebView testing requires a supported physical Vega device and does not work in the emulator on Linux. See [Amazon's virtual-device troubleshooting guide](https://developer.amazon.com/docs/vega/0.24/kvd-issues#webview-based-vega-app-fails-on-ubuntu).

### Clean

```sh
npm run clean
```

Removes dependencies and build artifacts. Run `npm ci` again before building.

## License

This project's source code is licensed under the [GNU General Public License v3.0](LICENSE). Amazon Vega SDK components and libraries remain subject to the [Amazon Program Materials License Agreement](https://developer.amazon.com/support/legal/pml) and any applicable separate licenses. Other third-party code and assets retain their respective licenses. This project's license does not grant additional rights to Amazon's materials.
