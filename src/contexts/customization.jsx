import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'uifort.customization';
const restoreCustomization = () => {
  let value = null;
  try {
    const restored = window.localStorage.getItem(STORAGE_KEY);
    if (restored) {
      value = JSON.parse(restored);
    }
  } catch (err) {
    console.error(err);
  }
  return value;
};
const deleteCustomization = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error(err);
  }
};
const storeCustomization = (value) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};
const initialCustomization = {
  colorPreset: 'monacoBlue',
  direction: 'ltr',
  layout: 'vertical-shells-dark',
  paletteMode: 'light',
  stretch: false,
};
const initialState = {
  ...initialCustomization,
  isInitialized: false,
};
export const CustomizationContext = createContext({
  ...initialState,
  handleReset: () => {},
  handleUpdate: () => {},
  isCustom: false,
});
export const CustomizationProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const restored = restoreCustomization();
    if (restored) {
      setState((prevState) => ({
        ...prevState,
        ...restored,
        isInitialized: true,
      }));
    }
  }, []);
  const handleReset = useCallback(() => {
    deleteCustomization();
    setState((prevState) => ({
      ...prevState,
      ...initialCustomization,
    }));
  }, []);
  const handleUpdate = useCallback((updates) => {
    setState((prevState) => {
      const updatedState = {
        ...prevState,
        ...updates,
      };
      storeCustomization(updatedState);
      return updatedState;
    });
  }, []);
  const isCustom = useMemo(() => {
    return !isEqual(initialCustomization, {
      colorPreset: state.colorPreset,
      direction: state.direction,
      paletteMode: state.paletteMode,
      layout: state.layout,
      stretch: state.stretch,
    });
  }, [state]);
  return (
    <CustomizationContext.Provider
      value={{
        ...state,
        handleReset,
        handleUpdate,
        isCustom,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};
CustomizationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const CustomizationConsumer = CustomizationContext.Consumer;
