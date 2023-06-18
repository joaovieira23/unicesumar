/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useState } from 'react';
import { TouchableOpacity, View, Dimensions, FlatList } from 'react-native';
import Card from '../Card';
import Text from '../Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextInput from '../TextInput';
import { ListItemSubjects } from '../ListItemSubjects';
import { CARDS_CONTENT } from '../../seeds/cards-content';

type SubjectsProps = {
    qtdSubjects: number;
    color: string;
    titleCard: string;
    iconName: string
}

export function CardSubjects({ qtdSubjects, color, titleCard, iconName }: SubjectsProps) {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 3;
  const refRBSheet = useRef<RBSheet>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [filteredData, setFilteredData] = useState(CARDS_CONTENT);

  const openSheet = () => {
    refRBSheet.current?.open();
  };

  const ListEmpty = () => (
    <>
      <Text
        style={{
          marginTop: 64,
          textAlign: 'center',
        }}>
        Não há informações nessa seção
      </Text>
    </>
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);

    const filteredItems = CARDS_CONTENT.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredItems);
  };


  return (
    <>
      <TouchableOpacity onPress={openSheet} style={{ width: itemWidth, padding: 8 }}>
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
                backgroundColor: '#000',
            },
            }}
        >
            <View style={{ padding: 8 }}>
                <TextInput
                    label="Pesquisar"
                    value={searchTerm}
                    onChangeText={handleSearch}
                    underlineColorAndroid="transparent"
                    autoFocus
                />
                <FlatList
                    keyExtractor={item => item?.id}
                    data={filteredData}
                    renderItem={({item}) => (
                        <ListItemSubjects
                            title={item.title}
                            minutes={item.yearModule}
                            onPress={() => {}}
                        />
                    )}
                    ListEmptyComponent={<ListEmpty />}
                    />
            </View>
      </RBSheet>
    </>
  );
}
