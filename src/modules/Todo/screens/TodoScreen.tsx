import { Alert, FlatList, View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { useTodos } from "modules/Todo/hooks/useTodos";
import { Card, ListRow } from "modules/UI";
import { TodoService } from "modules/Todo/services/TodoService";
import type { Todo } from "modules/Todo/types";

export function TodoScreen() {
    // const { todos } = useTodos();

    const todos = [
        { id: 1, title: "Todo 1", completed: false },
        { id: 2, title: "Todo 2", completed: false },
        { id: 3, title: "Todo 3", completed: false },
    ];

    const toggleCompleteTodo = async (todo: Todo) => {
        try {
            await TodoService.updateTodo(todo.id, { ...todo, completed: !todo.completed });
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to complete todo");
        }
    };

    console.log(todos);
    return (
        <FlatList
            className="flex-1 bg-background dark:bg-background-dark"
            contentInsetAdjustmentBehavior="automatic"
            contentContainerClassName="gap-2 pb-8"
            data={todos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
                <Card className="flex-row items-center gap-3 px-4 py-3">
                    <View className="min-w-0 flex-1">
                        <Text className="text-body text-foreground" numberOfLines={1} ellipsizeMode="tail">
                            {item.title}
                        </Text>
                    </View>

                    <Checkbox value={item.completed} onValueChange={() => toggleCompleteTodo(item)} />
                </Card>
            )}
        />
    );
}
