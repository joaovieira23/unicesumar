import React from 'react';
import { ActivityIndicator, Text, View, ViewStyle, TextStyle } from 'react-native';
import Touchable from '../Touchable';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
	loading?: boolean;
	label: string;
	onPress: () => void;
	labelColor?: string;
	accessibilityLabel?: string;
	containerStyle?: ViewStyle;
	labelStyle?: TextStyle;
	icon?: string;
	fontSize?: number;
	sizeIcon?: number;
}

export default function TextButton(props: Props) {

	const { loading, label, onPress, fontSize = 16, labelColor = '#4081ec', icon = '', sizeIcon = 20 } = props;

	return (
		<Touchable accessibilityLabel={props.accessibilityLabel} onPress={() => !loading && onPress()}>
			<View
				pointerEvents="auto"
				style={[
					{
						borderRadius: 5,
						paddingVertical: 10,
						paddingHorizontal: 25,
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'row',
					},
					props.containerStyle,
				]}
			>
				<>
					{Boolean(icon) && (
						<View style={{ marginRight: label ? 10 : 0 }}>
							<Icon name={icon} size={sizeIcon} color={labelColor} />
						</View>
					)}
					<Text
						style={[
							{
								fontSize: fontSize,
								fontWeight: '500',
                                fontFamily: 'Poppins-Medium',
								color: labelColor,
								textAlign: 'center',
							},
							props.labelStyle,
						]}
					>
						{label}
					</Text>
					{loading && <ActivityIndicator style={{ marginLeft: 7.5 }} size="small" color={labelColor} />}
				</>
			</View>
		</Touchable>
	);
}
