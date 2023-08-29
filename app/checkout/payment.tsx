import { Link, useRouter } from 'expo-router';
import { View, Text, ScrollView, Alert } from 'react-native';
import {
  Button,
  Card,
  Checkbox,
  Switch,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PaymentInfo,
  PaymentInfoSchema,
} from '../schema/checkout.schema';
import { Controller, useForm } from 'react-hook-form';
import ControlledInput from '../component/ControlledInput';
import { useCheckoutContext } from '../context/CheckoutContext';

export default function PaymentDetails() {
  const { control, handleSubmit } = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentInfoSchema),
  });
  const { setPayment, onSubmitAll } = useCheckoutContext();
  const router = useRouter();
  const theme = useTheme();
  const nextPage = async (data: PaymentInfo) => {
    //submit
    setPayment(data);
    const success = await onSubmitAll(data);
    if (success) {
      router.push('/');
    } else {
      Alert.alert('Failed to submit form');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 15,
        maxWidth: 500,
        width: '100%',
        alignSelf: 'center',
      }}
      showsVerticalScrollIndicator={false}
    >
      <Card style={{ backgroundColor: theme.colors.background }}>
        <Card.Title
          title={'Payment details'}
          titleVariant="titleLarge"
        />
        <Card.Content style={{ gap: 10 }}>
          <ControlledInput
            control={control}
            name="number"
            label={'Card number'}
            placeholder="4242 4242 4242 4242"
          />
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <ControlledInput
              control={control}
              name="expirationDate"
              label={'Expiration date'}
              placeholder="mn/yyyy"
            />
            <ControlledInput
              control={control}
              name="securityCode"
              label={'Security code'}
            />
          </View>
          <Controller
            control={control}
            name="saveInfo"
            render={({ field: { value, onChange } }) => (
              <Checkbox.Item
                label="save payment information"
                onPress={() => onChange(!value)}
                status={value ? 'checked' : 'unchecked'}
              />
            )}
          />

          {/*<Checkbox.Item
            label="Save payment information"
            status="unchecked"
            position="leading"
          />*/}
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={handleSubmit(nextPage)}>
        Submit
      </Button>
    </ScrollView>
  );
}
