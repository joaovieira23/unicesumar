
import React, { useRef } from 'react';
import { View, Dimensions } from 'react-native';
import Text from '../Text';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextInput from '../TextInput';
import { Card } from '../Card';


export function CardCEP() {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 3;
  const refRBSheet = useRef<RBSheet>(null);

  const openSheet = () => {
    refRBSheet.current?.open();
  };

  return (
    <>
      <Card
        onPress={openSheet}
        itemWidth={itemWidth}
        color={'#993399'}
        iconName="book"
        qtdSubjects={0}
        titleCard="Curso de Proficiência"
      />
        {/*
          // @ts-ignore */}
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={440}
            closeOnPressMask={false}
            customStyles={{
            wrapper: {
                backgroundColor: 'transparent',
            },
            draggableIcon: {
                backgroundColor: '#000000',
            },
            }}
        >
            <View style={{ padding: 8 }}>
                <TextInput
                    label="Pesquisar"
                    value={''}
                    onChangeText={() => {}}
                    underlineColorAndroid="transparent"
                    autoFocus
                />
                <Text>Teste</Text>
            </View>
      </RBSheet>
    </>
  );
}
