import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  Button,
  Card,
  TextInput,
  useTheme,
  RadioButton,
  HelperText,
} from 'react-native-paper';
import {
  DeliveryInfo,
  DeliveryInfoSchema,
} from '../schema/checkout.schema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledInput from '../component/ControlledInput';
import { useCheckoutContext } from '../context/CheckoutContext';

export default function DeliveryDetails() {
  const { control, handleSubmit } = useForm<DeliveryInfo>({
    resolver: zodResolver(DeliveryInfoSchema),
    defaultValues: {
      shipping: 'free',
      city: 'cairo',
      postalCode: '132',
      address: '10 omar ebn elKhattab',
    },
  });

  const router = useRouter();
  const theme = useTheme();
  const { setDelivery } = useCheckoutContext();

  const nextPage = (data: DeliveryInfo) => {
    setDelivery(data);
    router.push('/checkout/payment');
  };

  return (
    <ScrollView
      contentContainerStyle={{ gap: 15 }}
      showsVerticalScrollIndicator={false}
    >
      <Card style={{ backgroundColor: theme.colors.background }}>
        <Card.Title
          title={'Delivery address'}
          titleVariant="titleLarge"
        />
        <Card.Content style={{ gap: 10 }}>
          <ControlledInput
            control={control}
            name="city"
            label={'City'}
            style={{ backgroundColor: theme.colors.background }}
          />
          <ControlledInput
            control={control}
            name="postalCode"
            label={'Postal code'}
            style={{ backgroundColor: theme.colors.background }}
          />
          <ControlledInput
            control={control}
            name="address"
            label={'Address'}
            style={{ backgroundColor: theme.colors.background }}
          />
        </Card.Content>
      </Card>

      <Card style={{ backgroundColor: theme.colors.background }}>
        <Card.Title title={'Shipping'} titleVariant="titleLarge" />
        <Card.Content style={{ gap: 10 }}>
          <Controller
            control={control}
            name="shipping"
            render={({
              field: { value, onChange },
              fieldState: { invalid, error },
            }) => (
              <View>
                <HelperText type="error" visible={invalid}>
                  {error?.message}
                </HelperText>
                <RadioButton.Group
                  value={value}
                  onValueChange={(value) => onChange(value)}
                >
                  <RadioButton.Item label="Free" value="free" />
                  <RadioButton.Item label="fast" value="fast" />
                  <RadioButton.Item
                    label="Same day"
                    value="same_day"
                  />
                </RadioButton.Group>
              </View>
            )}
          />
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={handleSubmit(nextPage)}>
        Next
      </Button>
    </ScrollView>
  );
}
