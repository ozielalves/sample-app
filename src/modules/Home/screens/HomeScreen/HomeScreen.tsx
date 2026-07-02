import { ScrollView, Text, View } from "react-native";

import { Badge, Button, Card, ListRow, Section, TextInput } from "modules/UI";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation";

export function HomeScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const goToTodos = () => {
        navigation.navigate("Todos");
    };

    return (
        <ScrollView
            className="flex-1 bg-background dark:bg-background-dark"
            contentInsetAdjustmentBehavior="automatic"
            contentContainerClassName="gap-8 pb-8"
        >
            <Section title="Navigation">
                <Card className="gap-3 p-4">
                    <Button label="Todos" onPress={goToTodos} />
                </Card>
            </Section>

            <View className="px-6">
                <Text className="text-body text-label-secondary">
                    Design system com look iOS — grouped lists, tokens de sistema e componentes base.
                </Text>
            </View>

            <Section title="General" footer="Grouped list style, como em Ajustes do iOS.">
                <Card>
                    <ListRow label="Perfil" value="Oziel" showChevron onPress={() => {}} />
                    <ListRow label="Notificações" showChevron onPress={() => {}} />
                    <ListRow label="Privacidade" showChevron isLast onPress={() => {}} />
                </Card>
            </Section>

            <Section title="Actions">
                <Card className="gap-3 p-4">
                    <Button label="Continuar" />
                    <Button label="Secundário" variant="secondary" />
                    <Button label="Outline" variant="outline" />
                    <Button label="Eliminar conta" variant="destructive" />
                </Card>
            </Section>

            <Section title="Form">
                <Card className="gap-4 p-4">
                    <TextInput
                        label="Email"
                        placeholder="you@example.com"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        label="Password"
                        placeholder="Obrigatório"
                        secureTextEntry
                        error="Password is required"
                    />
                </Card>
            </Section>

            <Section title="Status">
                <Card className="p-4">
                    <View className="flex-row flex-wrap gap-2">
                        <Badge label="Default" />
                        <Badge label="Primary" variant="primary" />
                        <Badge label="Success" variant="success" />
                        <Badge label="Warning" variant="warning" />
                        <Badge label="Error" variant="destructive" />
                    </View>
                </Card>
            </Section>

            <Section title="Danger zone">
                <Card>
                    <ListRow label="Terminar sessão" destructive onPress={() => {}} isLast />
                </Card>
            </Section>
        </ScrollView>
    );
}
