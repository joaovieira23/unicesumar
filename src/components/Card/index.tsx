import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import BaseCard from '../BaseCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CardProps = {
    onPress: () => void;
    itemWidth: number;
    color: string;
    iconName: string;
    titleCard: string;
    qtdSubjects: number;
}

export function Card({ color, iconName, itemWidth, onPress, titleCard, qtdSubjects }: CardProps) {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: itemWidth, padding: 8 }}>
            <BaseCard style={{
                backgroundColor: color,
            }}>
               <View style={{ justifyContent: 'center', backgroundColor: '#FFFFFF', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8,  borderBottomEndRadius: 4, borderBottomStartRadius: 4, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 10 }}>{`${qtdSubjects} disciplina(s)`}</Text>
                </View>
                <View style={{  height: 112, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={iconName} size={28} color="#FFFFFF" />
                    <Text style={{
                        color: '#FFFFFF',
                        marginTop: 8,
                        textAlign: 'center',
                    }}>{titleCard}</Text>
                </View>
            </BaseCard>
        </TouchableOpacity>
    );
}
