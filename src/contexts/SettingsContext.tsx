import { createContext, useContext, useState } from "react";

type SettingsContextType = {
    useGeneralKnowledge: boolean;
    setUseGeneralKnowledge: (
        value: boolean
    ) => void;
};

const SettingsContext =
    createContext<SettingsContextType | null>(null);

export function SettingsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [
        useGeneralKnowledge,
        setUseGeneralKnowledge,
    ] = useState(false);

    return (
        <SettingsContext.Provider
            value={{
                useGeneralKnowledge,
                setUseGeneralKnowledge,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context =
        useContext(SettingsContext);

    if (!context)
        throw new Error(
            "useSettings must be used inside SettingsProvider"
        );

    return context;
}