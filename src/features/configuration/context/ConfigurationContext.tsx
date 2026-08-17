import { createContext, useEffect, useState } from 'react';

import { IMappingTemplate } from '../types/FormTemplate';
import useResourceRepository from '../../../shared/api/useResourceRepository';
import { ContextProps } from '../../../shared/context/constants/interface';

type ConfigurationContextState = {
    completed: boolean;
    setCompleted: (completed: boolean) => void;
    active: boolean;
    setActive: (completed: boolean) => void;
    resetConfigurationContext: () => void;
    template: IMappingTemplate | undefined;
    templateStatus: 'loading' | 'success' | 'error';
};

const contextDefaultValues: ConfigurationContextState = {
    completed: false,
    setCompleted: () => undefined,
    resetConfigurationContext: () => undefined,
    active: false,
    setActive: () => undefined,
    template: undefined,
    templateStatus: 'loading',
};

const ConfigurationContext = createContext<ConfigurationContextState>(contextDefaultValues);

const ConfigurationProvider = ({ children }: ContextProps) => {
    const { getArchiveTemplate } = useResourceRepository();

    const [template, setTemplate] = useState<IMappingTemplate | undefined>();
    const [templateStatus, setTemplateStatus] = useState<'loading' | 'success' | 'error'>(
        'loading'
    );

    const [completed, setCompleted] = useState<boolean>(contextDefaultValues.completed);
    const [active, setActive] = useState<boolean>(contextDefaultValues.active);

    function resetConfigurationContext() {
        setCompleted(contextDefaultValues.completed);
    }

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const response = await getArchiveTemplate();
                if (!cancelled) {
                    setTemplate(response.data);
                    setTemplateStatus('success');
                }
            } catch {
                if (!cancelled) setTemplateStatus('error');
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <ConfigurationContext.Provider
            value={{
                completed,
                setCompleted,
                resetConfigurationContext,
                active,
                setActive,
                template,
                templateStatus,
            }}
        >
            {children}
        </ConfigurationContext.Provider>
    );
};

export { ConfigurationContext, ConfigurationProvider as default };
