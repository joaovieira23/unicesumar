
import React, { useRef, useState } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextInput from '../TextInput';
import { Card } from '../Card';
import api from '../../services/api';
import TextButton from '../Button';
import Text from '../Text';

type GetZipCodeProps = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export function CardCEP() {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 3;

  const refRBSheet = useRef<RBSheet>(null);

  const [zipCode, setZipCode] = useState('');
  const [resultZipCode, setResultZipCode] = useState<GetZipCodeProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openSheet = () => {
    refRBSheet.current?.open();
  };

  function clean(){
    setZipCode('');
  }

  async function handleFetchZipCodeData(){
    if (zipCode === '' || zipCode.length < 8){
      Alert.alert('Digite um cep válido');
      setZipCode('');
      return;
    }

    setIsLoading(true);

    try {
    const response = await api.get(`/${zipCode}/json`);
    console.warn(response.data);
    setResultZipCode(response.data);
    }
    catch (error){
      console.log('ERROR: ' + error);
    } finally {
      setIsLoading(false);
    }
  }

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
            <View style={{   padding: 8 }}>
                <TextInput
                    label="CEP"
                    placeholder="Ex: 09841490"
                    value={zipCode}
                    onChangeText={setZipCode}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    autoFocus
                />

                <TextButton  label="Consultar CEP" onPress={handleFetchZipCodeData} />

                {resultZipCode && !isLoading &&
                  <View>
                    <Text style={{
                      fontSize: 16,
                    }}>CEP: {resultZipCode.cep}</Text>
                    <Text style={{
                      fontSize: 16,
                    }}>Rua: {resultZipCode.logradouro}</Text>
                    <Text style={{
                      fontSize: 16,
                    }}>Bairro: {resultZipCode.bairro}</Text>
                    <Text style={{
                      fontSize: 16,
                    }}>Cidade: {resultZipCode.localidade}</Text>
                    <Text style={{
                      fontSize: 16,
                    }}>Estado (UF): {resultZipCode.uf}</Text>

                  </View>
                }
            </View>
      </RBSheet>
    </>
  );
}
