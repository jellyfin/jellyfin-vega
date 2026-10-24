import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Pressable } from '@amazon-devices/react-native-kepler';

interface Props {
	label: string;
	onPress: () => void;
	variant?: 'primary' | 'text';
	disabled?: boolean;
	loading?: boolean;
}

export function Button({ label, onPress, variant = 'primary', disabled = false, loading = false }: Props) {
	const isTextButton = variant === 'text';
	const isDisabled = disabled || loading;

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={label}
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			disabled={isDisabled}
			onPress={onPress}
			style={({ focused }) => [
				styles.button,
				isTextButton && styles.textButton,
				focused && styles.focused,
				isDisabled && (isTextButton ? styles.textButtonDisabled : styles.disabled),
			]}
		>
			{({ focused }) => (
				<Text style={[styles.label, isTextButton && styles.textLabel, focused && !isDisabled && styles.focusedLabel]}>{label}</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		minHeight: 50,
		borderRadius: 4,
		backgroundColor: '#006f96',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
	},
	textButton: { minHeight: 44, backgroundColor: 'transparent' },
	focused: { backgroundColor: '#fff' },
	disabled: { backgroundColor: '#335563' },
	textButtonDisabled: { opacity: 0.4 },
	label: { color: '#fff', fontSize: 18, fontWeight: '600' },
	textLabel: { color: '#bbb', fontSize: 16, fontWeight: '400' },
	focusedLabel: { color: '#101010' },
});
