import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Portal} from 'react-native-paper';

import Text from '../Text';

interface PropsBottomSheet {
  show: boolean;
  onDismiss: () => void;
  agriculture: string;
  enableBackdropDismiss: boolean;
  children: React.ReactNode;
}

export const BottomSheet = ({
  show,
  onDismiss,
  agriculture,
  enableBackdropDismiss,
  children,
}: PropsBottomSheet) => {
  const bottomSheetHeight = Dimensions.get('window').height * 0.5;
  const [open, setOpen] = useState(show);
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

  const onGesture = (event: any) => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = (event: any) => {
    if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
      onDismiss();
    } else {
      bottom.setValue(0);
    }
  };

  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
  }, [bottom, bottomSheetHeight, show]);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <Pressable
        onPress={enableBackdropDismiss ? onDismiss : undefined}
        style={styles.backDrop}
      />
      <Animated.View
        style={[
          styles.root,
          {
            height: bottomSheetHeight,
            bottom: bottom,
            shadowOffset: {
              height: -3,
              width: 0,
            },
          },
        ]}>
        {/*
          // @ts-ignore */}
        <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
          <View
            style={[
              styles.header,
              styles.common,
              {
                position: 'relative',
                shadowOffset: {
                  height: 3,
                  width: 0,
                },
              },
            ]}>
            <TouchableOpacity style={{zIndex: 999}} onPress={onDismiss}>
              <Icon size={22} name="close" style={styles.chevronIcon} color="#000" />
            </TouchableOpacity>
            <Text style={styles.choiceFarm}>Selecione a fazenda</Text>
            <Text style={styles.agriculture}>{agriculture}</Text>
          </View>
        </PanGestureHandler>
        {children}
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  header: {
    height: 80,
    backgroundColor: '#fff',
  },
  common: {
    shadowColor: '#000',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
  },
  chevronIcon: {
    position: 'absolute',
    right: 18,
    top: 32,
    zIndex: 1,
  },
  agriculture: {
    fontSize: 16,
    color: '#1A373C',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  choiceFarm: {
    fontSize: 16,
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 2,
    zIndex: 10,
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 80,
    backgroundColor: 'rgba(0,0,0, 0.12)',
  },
});

export default BottomSheet;
