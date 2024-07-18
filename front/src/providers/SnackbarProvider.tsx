import { Snackbar, SnackbarType } from '@/components/Snackbar';

import { createContext, useReducer, useContext, useCallback } from 'react';
import { TAction, snackbarReducer } from '@/lib/snackbarReducer';

const SnackbarContext = createContext<{
    queue: SnackbarType[];
    dispatch: React.Dispatch<TAction>;
}>({
    queue: [] as SnackbarType[],
    dispatch: () => {},
});

export default function SnackbarProvider({ children }: { children: React.ReactNode }) {
    const [{ queue }, dispatch] = useReducer(snackbarReducer, { queue: [] });
    return (
        <SnackbarContext.Provider value={{ queue, dispatch }}>
            {queue.map((snack, index) => (
                <Snackbar
                    // className={`-mt-${index + 1} left-${index + 4}`}
                    key={snack.key}
                    text={snack.text}
                    variant={snack.variant}
                    icon={snack.icon}
                    handleClose={() => dispatch({ type: 'REMOVE_SNACKBAR', payload: { key: snack.key } })}
                />
            ))}
            {children}
        </SnackbarContext.Provider>
    );
}

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar was called outside SnackbarProvider');
    }
    const { dispatch } = context;

    return useCallback(
        (snack: SnackbarType) => {
            dispatch({ type: 'ADD_SNACKBAR', payload: { current: snack } });
        },
        [dispatch],
    );
};
