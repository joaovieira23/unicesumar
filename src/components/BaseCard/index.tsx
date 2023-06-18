import React, { useMemo } from 'react';
import { View } from 'react-native';
import Text, { TextProps } from '../Text';

function BaseCard(props: View['props'] & { flat?: boolean }) {
	const shadow = useMemo(() => {
		if (props.flat) {
			return {};
		} else {
			return {
				shadowColor: '#000000',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.15,
				shadowRadius: 20,
				elevation: 5,
				borderRadius: 8,
			};
		}
	}, [props.flat]);

	const viewStyle = Array.isArray(props.style)
		? [
				{
					backgroundColor: '#FFFFFF',
					...shadow,
				},
				...props.style,
	]
		: ([
				{
					backgroundColor: '#FFFFFF',
					...shadow,
				},
				props.style,
	] as View['props']['style']);

	return <View style={viewStyle}>{props.children}</View>;
}

BaseCard.Title = (props: TextProps) => {
	const textStyle = [
		{ fontSize: 20, fontWeight: '500' },
		...(Array.isArray(props.style) ? props.style : [props.style]),
	] as TextProps['style'];

	return (
		<Text enfase style={textStyle}>
			{props.children}
		</Text>
	);
};

export default BaseCard;
