import React from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');
export const CardCEPSkeleton = () => {
    const x = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(Animated.timing(x, {
            toValue: 1,
            useNativeDriver: true,
            duration: 1200,
        })).start();
    }, [x]);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                width: 348,
                height: 25,
                borderRadius: 8,
                backgroundColor: 'rgba(225,225,225, 0.8)',
                overflow: 'hidden',
            }}>
                <Animated.View style={{
                    height: '100%',
                    width: 348,
                    backgroundColor: '#e1e1e1',
                    transform: [
                        {
                            translateX: x.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-width, width],
                            }),
                        },
                    ],
                }} >
                    <View>
                        <View style={{
                            width: '100%',
                            height: '100%',
                        }} />
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};
