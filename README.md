# react-native-searchable-multi-select

This  is a customizable and feature-rich multi-select dropdown component for React Native applications. It provides a user-friendly interface for selecting multiple items from a list, with support for search functionality and dynamic rendering of data. The component is designed to be highly customizable, allowing developers to easily adapt its appearance and behavior to fit their specific use cases.

## Installation

```sh
npm install react-native-searchable-multi-select
```

## Usage

```js
import React, { useState } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-searchable-multi-select';

const renderData: any[] = [
  { id: '1', name: 'Option 1', isChecked: false },
  { id: '2', name: 'Option 2', isChecked: false },
  // Add more options
];
const App = () => {
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [openDrop, setOpenDrop] = useState(false);
  const [searchableRenderData, setSearchableRenderData] =
    useState<any[]>(renderData);

  const handleDropOpen = () => {
    setOpenDrop(!openDrop);
  };
  return (
    <View>
      <MultiSelect
        renderData={searchableRenderData}
        setSearchPhrase={setSearchPhrase}
        searchPhrase={searchPhrase}
        labelName={'Project Name'}
        setSearchableRenderData={setSearchableRenderData}
        selected={selected}
        required={'*'}
        setSelected={setSelected}
        openDrop={openDrop}
        onToggle={handleDropOpen}
      />
    </View>
  );
};

export default App;

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
