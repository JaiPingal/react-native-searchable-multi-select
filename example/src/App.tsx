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
