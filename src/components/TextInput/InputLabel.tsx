import React, {useEffect, useRef} from 'react';
import * as Animatable from 'react-native-animatable';

interface Props {
  focused: boolean;
  label: string;
  error: boolean;
  activeColor: string;
  inactiveColor: string;
  backgroundColor: string;
}

function InputLabel(props: Props) {
  const viewRef = useRef<Animatable.View>(null);
  const labelRef = useRef<Animatable.Text>(null);
  const {focused, label, backgroundColor} = props;

  const estiloFocado = {
    view: {
      height: 15,
      top: -8,
      left: 5,
    },
    input: {
      paddingHorizontal: 5,
      backgroundColor: backgroundColor,
      fontSize: 12,
      color: props.activeColor,
    },
  };

  const estiloNaoFocado = {
    view: {
      top: 0,
      height: 42,
      left: 5,
      paddingHorizontal: 0,
    },
    input: {
      paddingHorizontal: 5,
      backgroundColor: backgroundColor,
      fontSize: 15,
      color: props.inactiveColor,
    },
  };

  useEffect(() => {
    if (viewRef && viewRef.current && viewRef.current.transitionTo) {
      viewRef.current.transitionTo(
        focused ? estiloFocado.view : estiloNaoFocado.view,
      );
    }
  }, [
    estiloFocado.view,
    estiloNaoFocado.view,
    focused,
    props.activeColor,
    props.inactiveColor,
  ]);

  useEffect(() => {
    if (labelRef && labelRef.current && labelRef.current.transitionTo) {
      labelRef.current.transitionTo(
        focused ? estiloFocado.input : estiloNaoFocado.input,
      );
    }
  }, [
    estiloFocado.input,
    estiloNaoFocado.input,
    focused,
    props.activeColor,
    props.inactiveColor,
  ]);

  return (
    <Animatable.View
      // @ts-ignore
      ref={viewRef}
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          justifyContent: 'center',
          borderRadius: 5,
        },
        props.focused ? estiloFocado.view : estiloNaoFocado.view,
      ]}>
      <Animatable.Text
        // @ts-ignore
        ref={labelRef}
        style={[
          {
            fontSize: 15,
            fontFamily: 'Poppins-Light',
            color: props.inactiveColor,
          },
          focused ? estiloFocado.input : estiloNaoFocado.input,
        ]}>
        {label}
      </Animatable.Text>
    </Animatable.View>
  );
}

export default InputLabel;
