import React, { useMemo, useState } from 'react';

import { StyleSheet, View, Button, Switch, Text } from 'react-native';
import RampSdk, { WidgetEventTypes } from '@ramp-network/react-native-sdk';
// import RampSdk from '@ramp-network/react-native-sdk';



type ENV = 'PROD';

const envToUrl: { [env in ENV]: string } = {
  PROD: 'https://buy.ramp.network',
};

export default function App() {
  const [env, setEnv] = useState<ENV | undefined>('PROD');
  const ramp = useMemo(() => {
    if (!env) {
      return undefined;
    }

    return new RampSdk({
      url: envToUrl[env],
      hostAppName: 'React Native Example',
      hostLogoUrl:
        'https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg',
      deepLinkScheme: 'ramprndemo',
    })
      .on(WidgetEventTypes.WIDGET_CLOSE, (event) => {
        console.log(`RampSdk.on(WidgetEventTypes.WIDGET_CLOSE)`, event);
      })
      .on(WidgetEventTypes.PURCHASE_CREATED, (event) => {
        console.log(`RampSdk.on(WidgetEventTypes.PURCHASE_CREATED)`, event);
      });
  }, [env]);

  return (
    <View style={styles.container}>
      <Text>Select ENV</Text>

      <View style={styles.switchContainer}>
        <Text>PROD</Text>
        <Switch
          value={env === 'PROD'}
          onValueChange={(v) => (v ? setEnv('PROD') : setEnv(undefined))}
        />
      </View>

      <Button
        disabled={env === undefined}
        title={`Run Demo Ramp ${env ?? ''}`}
        onPress={() => ramp?.show()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
  },
});
