import React, { useState } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import type { CropZoomType } from '../../../src/components/crop/types';
import { theme } from '../constants';
import { FlipType, type Action, manipulateAsync } from 'expo-image-manipulator';

type EffectIndicatorProps = {
  uri: string;
  setCrop: (uri: string | undefined) => void;
  cropRef: React.RefObject<CropZoomType>;
};

const baseColor = '#fff';
const activeColor = '#75DAEA';

const EffectIndicator: React.FC<EffectIndicatorProps> = ({
  uri,
  cropRef,
  setCrop,
}) => {
  const [isCropping, setIsCropping] = useState<boolean>(false);

  const [isFlippedH, setIsFlippedH] = useState<boolean>(false);
  const [isFlippedV, setIsFlippedV] = useState<boolean>(false);
  const [rotated, setRotated] = useState<number>(0);

  const rotate = () => {
    cropRef?.current?.rotate();
    setRotated((prev) => {
      if (prev + 1 === 4) {
        return 0;
      }

      return prev + 1;
    });
  };

  const flipHorizontal = () => {
    cropRef?.current?.flipHorizontal();
    setIsFlippedH((prev) => !prev);
  };

  const flipVertical = () => {
    cropRef.current?.flipVertical();
    setIsFlippedV((prev) => !prev);
  };

  const crop = async () => {
    if (cropRef.current === null || isCropping) {
      return;
    }

    setIsCropping(true);
    const cropResult = cropRef.current.crop(200);

    const actions: Action[] = [];
    if (cropResult.resize !== undefined) {
      actions.push({ resize: cropResult.resize });
    }

    if (cropResult.context.flipHorizontal) {
      actions.push({ flip: FlipType.Horizontal });
    }

    if (cropResult.context.flipVertical) {
      actions.push({ flip: FlipType.Vertical });
    }

    if (cropResult.context.rotationAngle !== 0) {
      actions.push({ rotate: cropResult.context.rotationAngle });
    }

    actions.push({ crop: cropResult.crop });

    manipulateAsync(uri, actions).then((manipulationResult) => {
      setCrop(manipulationResult.uri);
      setIsCropping(false);
    });
  };

  return (
    <View style={styles.root}>
      <Pressable onPress={rotate}>
        <Icon
          name={'format-rotate-90'}
          size={24}
          color={rotated === 0 ? baseColor : activeColor}
        />
      </Pressable>

      <Pressable onPress={flipHorizontal}>
        <Icon
          name={'flip-horizontal'}
          size={24}
          color={isFlippedH ? activeColor : baseColor}
        />
      </Pressable>

      <Pressable onPress={flipVertical}>
        <Icon
          name={'flip-vertical'}
          size={24}
          color={isFlippedV ? activeColor : baseColor}
        />
      </Pressable>

      <Pressable style={styles.button} onPress={crop}>
        {isCropping ? (
          <ActivityIndicator size={'small'} color={baseColor} />
        ) : (
          <Icon name={'check'} size={24} color={'#fff'} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.s,
    gap: theme.spacing.l,
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75DAEA',
  },
});

export default EffectIndicator;
