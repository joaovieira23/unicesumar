import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import Card from '../Card';
import Text from '../Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type SubjectsProps = {
    qtdSubjects: number;
    color: string;
    titleCard: string;
    iconName: string
}

export function CardSubjects({ qtdSubjects, color, titleCard, iconName }: SubjectsProps) {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 3;

  return (
      <TouchableOpacity style={{ width: itemWidth, padding: 8 }}>
            <Card style={{
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
            </Card>
        </TouchableOpacity>
  );
}
