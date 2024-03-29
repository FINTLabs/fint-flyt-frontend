import { createContext, useState } from "react";
import { ContextProps } from "./constants/interface";

type ConfigurationContextState = {
	completed: boolean;
	setCompleted: (completed: boolean) => void;
	active: boolean;
	setActive: (completed: boolean) => void;
	resetConfigurationContext: () => void;
};

const contextDefaultValues: ConfigurationContextState = {
	completed: false,
	setCompleted: () => undefined,
	resetConfigurationContext: () => undefined,
	active: false,
	setActive: () => undefined,
};

const ConfigurationContext =
	createContext<ConfigurationContextState>(contextDefaultValues);

const ConfigurationProvider = ({ children }: ContextProps) => {
	const [completed, setCompleted] = useState<boolean>(
		contextDefaultValues.completed
	);
	const [active, setActive] = useState<boolean>(contextDefaultValues.active);

	function resetConfigurationContext() {
		setCompleted(contextDefaultValues.completed);
	}

	return (
		<ConfigurationContext.Provider
			value={{
				completed,
				setCompleted,
				resetConfigurationContext,
				active,
				setActive,
			}}
		>
			{children}
		</ConfigurationContext.Provider>
	);
};

export { ConfigurationContext, ConfigurationProvider as default };
