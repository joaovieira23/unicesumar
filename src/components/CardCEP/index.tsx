
import React, { useRef } from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import Card from '../Card';
import Text from '../Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextInput from '../TextInput';


export function CardCEP() {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 3;
  const refRBSheet = useRef<RBSheet>(null);

  const openSheet = () => {
    refRBSheet.current?.open();
  };

  return (
    <>
      <TouchableOpacity onPress={openSheet} style={{ width: itemWidth, padding: 8 }}>
            <Card style={{
                backgroundColor: '#993399',
            }}>
               <View style={{ justifyContent: 'center', backgroundColor: '#FFFFFF', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8,  borderBottomEndRadius: 4, borderBottomStartRadius: 4, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 10 }}>{'0 disciplina'}</Text>
                </View>
                <View style={{  height: 112, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={'book'} size={28} color="#FFFFFF" />
                    <Text style={{
                        color: '#FFFFFF',
                        marginTop: 8,
                        textAlign: 'center',
                    }}>Curso de Proficiência</Text>
                </View>
            </Card>
        </TouchableOpacity>

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
