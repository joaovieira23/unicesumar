import React from 'react';
import { View } from 'react-native';
import { CardSubjects } from '../components/CardSubjects';
import { CARDS_INFO } from '../seeds/cards-info';

export function Subjects() {

  return (
    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {CARDS_INFO.map((card) => (
            <CardSubjects key={card.id} color={card.color} qtdSubjects={card.qtdSubjects} titleCard={card.title} iconName={card.iconName} />
        ))}
    </View>
  );
}
