import { Link, useRouter } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import {
  Button,
  Card,
  Checkbox,
  Switch,
  TextInput,
  useTheme,
} from 'react-native-paper';

export default function PaymentDetails() {
  const router = useRouter();
  const theme = useTheme();
  const nextPage = () => {
    //submit
    router.push('/');
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
          <TextInput
            label={'Card number'}
            placeholder="4242 4242 4242 4242"
            style={{ backgroundColor: theme.colors.background }}
          />
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <TextInput
              label={'Postal Code'}
              placeholder="mn/yyyy"
              style={{
                backgroundColor: theme.colors.background,
                flex: 3,
              }}
            />
            <TextInput
              label={'Security code'}
              style={{
                backgroundColor: theme.colors.background,
                flex: 2,
              }}
            />
          </View>

          <Checkbox.Item
            label="Save payment information"
            status="unchecked"
            position="leading"
          />
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={nextPage}>
        Submit
      </Button>
    </ScrollView>
  );
}
