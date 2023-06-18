/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useState } from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import Text from '../Text';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextInput from '../TextInput';
import { ListItemSubjects } from '../ListItemSubjects';
import { CARDS_CONTENT } from '../../seeds/cards-content';
import { Card } from '../Card';

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
        <Card
          onPress={openSheet}
          itemWidth={itemWidth}
          color={color}
          iconName={iconName}
          qtdSubjects={qtdSubjects}
          titleCard={titleCard}
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
                            yearModule={item.yearModule}
                            start={item.start}
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
