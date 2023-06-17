import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { CardSubjects } from '../components/CardSubjects';
import Text from '../components/Text';
import { CARDS_INFO } from '../seeds/cards-info';

export function Subjects() {

  return (
    <SafeAreaView>
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
            <Text style={{ fontSize: 16, color: '#0e0e7d', fontFamily: 'Poppins-SemiBold' }}>Minhas disciplinas</Text>
            <Text style={{ fontSize: 12 }}>Visualize as suas disciplinas de acordo com cada categoria</Text>
        </View>
        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {CARDS_INFO.map((card) => (
                <CardSubjects key={card.id} color={card.color} qtdSubjects={card.qtdSubjects} titleCard={card.title} iconName={card.iconName} />
            ))}
        </View>
    </SafeAreaView>
  );
}
