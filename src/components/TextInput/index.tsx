import React, {useState, useRef, useCallback, useMemo} from 'react';
import {
  View,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import InputLabel from './InputLabel';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../Text';

export interface CustomTextInputProps extends Omit<RNTextInputProps, 'value'> {
  tintColor?: string;
  inactiveBorderColor?: string;
  backgroundColor?: string;
  label?: string;
  mask?: {
    type: TextInputMask['props']['type'];
    options?: TextInputMask['props']['options'];
  };
  value: string | number;
  deleteOption?: boolean;
  loading?: boolean;
  error?: string;
  allowPaste?: boolean;
  showEye?: boolean;
  onFocus?: () => any;
  onBlur?: () => any;
  onChangeRawValue?: (newValue: string | number) => any;
}

function TextInput(props: CustomTextInputProps) {
  const inputRef = useRef<RNTextInput | TextInputMask>(null);

  const [ignorarSecureInput, setIgnorarSecureInput] = useState(false);
  const [focused, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);

    if (typeof props.onFocus === 'function') {
      props.onFocus();
    }
  }, [props]);

  const onBlur = useCallback(() => {
    setFocus(false);

    if (typeof props.onBlur === 'function') {
      props.onBlur();
    }
  }, [props]);

  const editable = !(
    typeof props.editable === 'boolean' && props.editable === false
  );

  let InputComponent: typeof RNTextInput | typeof TextInputMask = RNTextInput;

  if (props.mask && props.mask.type) {
    InputComponent = TextInputMask;
  }

  const inputProps = useMemo(() => {
    if (props.mask && props.mask.type) {
      return {
        ...props,
        mask: undefined,
        type: props.mask.type,
        options: props.mask.options,
        backgroundColor: 'transparent',
      };
    } else {
      return {...props, backgroundColor: 'transparent'};
    }
  }, [props]);

  const inputStyle = [
    {
      width: '85%',
      fontFamily: 'Poppins-Light',
      height: 45,
      paddingLeft: 10,
      color: !editable ? 'rgba(0,0,0,0.6)' : 'rgba(0, 0, 0, 0.87)',
    },
    inputProps.style,
  ] as typeof InputComponent['prototype']['props'];

  return (
    <>
      <View
        style={{
          borderColor: props.error
            ? '#F44336'
            : focused
            ? '#4081ec'
            : !focused || !editable
            ? props.inactiveBorderColor || 'rgba(0,0,0,0.6)'
            : props.tintColor || '#4081ec',
          borderWidth: 1,
          marginBottom: 16,
          height: 45,
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderRadius: 5,
          // @ts-ignore
          width: props.style && props.style.width ? props.style.width : '100%',
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : 'transparent',
        }}>
        {props.label ? (
          <InputLabel
            focused={Boolean(
              focused || props.value || [0, '0', '0,00'].includes(props.value),
            )}
            error={false}
            label={props.label}
            activeColor={
              props.error
                ? '#F44336'
                : !editable
                ? props.inactiveBorderColor || 'rgba(0,0,0,0.6)'
                : props.tintColor || '#4081ec'
            }
            inactiveColor={props.inactiveBorderColor || 'rgba(0,0,0,0.6)'}
            backgroundColor={props.backgroundColor || '#FFFFFF'}
          />
        ) : null}

        <InputComponent
          type="only-numbers"
          {...inputProps}
          //@ts-ignore
          value={props.value}
          ref={inputRef}
          placeholder={!props.label ? props.placeholder : undefined}
          placeholderTextColor={'rgba(0,0,0,0.6)'}
          scrollEnabled={false}
          includeRawValueInChangeText={true}
          style={inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          underlineColorAndroid="transparent"
          secureTextEntry={inputProps.secureTextEntry && !ignorarSecureInput}
          contextMenuHidden={
            inputProps.allowPaste || !inputProps.secureTextEntry
          }
          returnKeyType={
            !__DEV__ &&
            props.mask &&
            ['only-numbers', 'money', 'cpf', 'cel-phone'].includes(
              props.mask.type,
            )
              ? 'done'
              : 'default'
          }
          onChangeText={(val: string, raw?: string) => {
            if (props.onChangeText) {
              props.onChangeText(val);
            }
            typeof props.onChangeRawValue === 'function' &&
              props.onChangeRawValue(raw || val);
          }}
        />

        {Boolean(
          (props.deleteOption || props.loading) &&
            editable &&
            props.value &&
            props.value !== '' &&
            focused,
        ) && (
          <View
            pointerEvents="box-none"
            style={[
              StyleSheet.absoluteFill,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <View pointerEvents="none" style={{flex: 1}} />

            {props.loading ? (
              <ActivityIndicator
                style={{paddingHorizontal: 10}}
                color={'rgba(255,255,255,0.87)'}
                size="small"
              />
            ) : null}

            {props.deleteOption ? (
              <View style={{zIndex: 99}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (
                      props.onChangeText &&
                      typeof props.onChangeText === 'function'
                    ) {
                      props.onChangeText('');
                    }
                  }}>
                  <View style={{paddingHorizontal: 10}}>
                    <Icon name="close" size={20} color={props.tintColor || '#4081ec'} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : null}
          </View>
        )}

        {props.showEye &&
        props.secureTextEntry &&
        editable &&
        props.value &&
        props.value !== '' ? (
          <View
            pointerEvents="box-none"
            style={[
              StyleSheet.absoluteFill,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <View pointerEvents="none" style={{flex: 1}} />
            <TouchableWithoutFeedback
              onPress={() => {
                setIgnorarSecureInput(!ignorarSecureInput);
              }}>
              <View style={{paddingHorizontal: 10}}>
                {ignorarSecureInput ? (
                  <Icon
                    name="eye-off"
                    size={20}
                    color={props.tintColor || '#4081ec'}
                  />
                ) : (
                  <Icon
                    name="eye"
                    size={20}
                    color={props.tintColor || '#4081ec'}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : null}
      </View>

      {Boolean(props.error) && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
          }}>
          <Icon name="close" size={15} color={'#F44336'} />
          <Text enfase style={{marginLeft: 10, color: '#F44336'}}>
            {props.error}
          </Text>
        </View>
      )}
    </>
  );
}

export default TextInput;
