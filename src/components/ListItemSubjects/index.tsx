import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';

interface PropsListItemSubjects {
  title: string;
  minutes: string;
  onPress: () => void;
}

export const ListItemSubjects = ({
  title,
  onPress,
}: PropsListItemSubjects) => {
  return (
    <TouchableOpacity
      style={{

        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
      }}
      onPress={onPress}>
      <View style={{
        paddingHorizontal: 16,
        marginTop: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 0,
        flexGrow: 1,
        flex: 1,
      }}>
        {/* Lado esquerdo */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: 0,
          flexGrow: 1,
          flex: 1,
        }}>
          <View style={{marginLeft: 8}}>
            <Text style={{
              fontSize: 14,
              color: '#000000',
            }}>{title}</Text>
          </View>
        </View>

        {/* Lado direito */}
        <View style={{
          alignItems: 'flex-end',
        }}>
          <Text style={{color: '#0047FF', fontSize: 14, marginTop: 4}}>
            #histórico
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

