import React, { createContext, useContext, useState, useCallback } from "react";
import { type Persona, personaTokens } from "./tokens";

interface PersonaContextValue {
  persona: Persona;
  tokens: (typeof personaTokens)[Persona];
  setPersonaOverride: (persona: Persona | null) => void;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

interface PersonaProviderProps {
  children: React.ReactNode;
  defaultPersona?: Persona;
}

/** Provides persona-aware design tokens to all descendants */
export function PersonaProvider({
  children,
  defaultPersona = "casual",
}: PersonaProviderProps) {
  const [override, setOverride] = useState<Persona | null>(null);
  const persona = override ?? defaultPersona;

  const setPersonaOverride = useCallback(
    (p: Persona | null) => setOverride(p),
    [],
  );

  return (
    <PersonaContext.Provider
      value={{
        persona,
        tokens: personaTokens[persona],
        setPersonaOverride,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

/** Access the current persona's design tokens */
export function useTokens() {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error("useTokens must be used within a PersonaProvider");
  }
  return ctx.tokens;
}

/** Access persona controls (switch persona) */
export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return { persona: ctx.persona, setPersonaOverride: ctx.setPersonaOverride };
}
