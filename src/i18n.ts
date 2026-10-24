import { AssetResolver } from '@amazon-devices/asset-resolver-lib';
import type strings from '../assets/text/strings.puff.json';

export type StringKey = keyof typeof strings.resources;

// Vega resolves the device locale, falling back to the English assets/text resources.
export function t(key: StringKey): string {
	return AssetResolver.getString(key).value;
}
