import React from "react";
import { Text } from "react-native";
import { useTokens } from "../../lib/theme/PersonaProvider";

interface UserGreetingProps {
  name: string;
}

/** Displays "Hi {preferredName}" */
export function UserGreeting({ name }: UserGreetingProps) {
  const tokens = useTokens();

  return (
    <Text className="text-text-primary font-bold" style={{ fontSize: tokens.typography.headingSize }}>
      Hi {name}
    </Text>
  );
}
