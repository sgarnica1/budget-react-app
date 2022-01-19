import React from "react";

function useLocalStorage(key, defaultValue = []) {
  const [value, setValue] = React.useState(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useLocalStorage };
