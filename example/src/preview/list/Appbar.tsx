import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants';

import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const barHeight = Constants.statusBarHeight;
const pictureSize = barHeight * 2 * 0.8;

const Appbar: React.FC = () => {
  return (
    <View style={styles.appbar}>
      <StatusBar style={'light'} backgroundColor={'transparent'} />

      <Icon
        name={'arrow-left'}
        color={theme.colors.icon}
        size={theme.sizes.iconSize}
      />

      <View style={styles.userContainer}>
        <Image
          source={require('../../../assets/avatar.png')}
          style={styles.profilePicture}
        />
        <View>
          <Text style={styles.username}>Fennec</Text>
          <Text style={styles.status}>Online</Text>
        </View>
      </View>

      <Icon
        name={'phone'}
        color={theme.colors.icon}
        size={theme.sizes.iconSize}
      />

      <Icon
        name={'dots-vertical'}
        color={theme.colors.icon}
        size={theme.sizes.iconSize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    width: '100%',
    height: barHeight * 3,
    paddingTop: barHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.foreground,
    gap: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
  },
  profilePicture: {
    width: pictureSize,
    height: pictureSize,
    borderRadius: pictureSize / 2,
    backgroundColor: 'lime',
  },
  username: {
    fontWeight: 'bold',
    color: theme.colors.username,
    fontSize: 16,
  },
  status: {
    color: theme.colors.online,
  },
});

export default Appbar;
