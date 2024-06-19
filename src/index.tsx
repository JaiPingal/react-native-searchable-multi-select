import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Images from './theme/ImageConstants';
import Scale, { verticalScale } from './utils/Scale';

interface CustomMultiSelectProps {
  setSelected: (selected: (number | string)[]) => void;
  renderData: any;
  labelName: string;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  setSearchableRenderData: (searchableRenderData: any[]) => void;
  selected: (number | string)[];
  required?: boolean | string;
  openDrop: boolean;
  onToggle: () => void;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  setSelected,
  renderData,
  labelName,
  searchPhrase,
  setSearchPhrase,
  setSearchableRenderData,
  selected,
  required,
  openDrop,
  onToggle,
}) => {
  const [focused, setFocused] = useState(false);
  const [currentValue, setCurrentValue] = useState<any>([]);

  useEffect(() => {
    const onSelectItems = (selectIds: (number | string)[]) => {
      let temp = renderData?.map((p: { id: string | number }) => {
        if (selectIds.includes(p.id)) {
          return { ...p, isChecked: true };
        }
        return { ...p, isChecked: false };
      });
      if (temp) {
        setSearchableRenderData(temp);
        setCurrentValue(temp?.filter((c: { isChecked: any }) => c?.isChecked));
        setSelected(
          temp
            ?.filter((c: { isChecked: any }) => c?.isChecked)
            .map((s: { id: any }) => s.id)
        );
      }
    };
    setTimeout(() => {
      return onSelectItems(selected);
    }, 1000);
    // eslint-disable-next-line
  }, []);

  const onSelectitem = (item: any) => {
    let temp = renderData.map((p: { id: number; isChecked: any }) => {
      if (p.id === item.id) {
        return { ...p, isChecked: !p.isChecked };
      }
      return p;
    });

    setSearchableRenderData(temp);
    setCurrentValue(temp.filter((c: { isChecked: any }) => c.isChecked));
    setSelected(
      temp
        .filter((c: { isChecked: any }) => c.isChecked)
        .map((s: { id: any }) => s.id)
    );
  };

  const openCloseDropdown = () => {
    onToggle();
    if (openDrop || selected) {
      setFocused(false);
    }
  };

  const renderSelectedItem = (selectedItem: any[]) => {
    let count = selectedItem?.length - 1;
    return (
      <View style={{ width: '90%', justifyContent: 'center' }}>
        {count >= 0 && selected ? (
          <Text
            style={
              selectedItem?.length > 0
                ? styles.selectedLabelText
                : styles.selectedTextStyle
            }
          >
            {`${selectedItem?.[0]?.label || selectedItem?.[0]?.name || ''} `}
            {count > 0 ? (
              <Text style={styles.extraTextStyle}>
                {'\t\t'}&{count} more
              </Text>
            ) : null}
          </Text>
        ) : (
          <Text style={styles.selectedTextStyle}>
            {labelName}{' '}
            {required && (
              <Text style={styles.requiredText}>{`${required}`}</Text>
            )}
          </Text>
        )}
      </View>
    );
  };

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => onSelectitem(item)}
        style={[
          styles.itemContentStyle,
          {
            backgroundColor: item.isChecked ? '#F1F5F9' : '#fff',
          },
        ]}
        key={item.id}
      >
        <View style={styles.itemStyle}>
          <Image
            source={item?.isChecked ? Images.SelectedIcon : Images.UnselectIcon}
            style={styles.renderCheckImg}
          />
          <Text style={styles.textItem}>{`${item.name || 'no Options'}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPrimaryItemContainer = (renderData: any[]) => (
    <View style={styles.itemsContainerStyle}>
      <ScrollView
        style={{ flexShrink: 1, marginBottom: 5 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {renderData?.length ? (
          renderData.map((item) => renderItem(item))
        ) : (
          <View style={styles.emptyContent}>
            <Text style={styles.textItem}>No Options</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );

  const renderDropdownContainer = (openDrop: boolean) => (
    <TouchableOpacity
      style={[
        styles.container,
        !openDrop && !selected?.length
          ? styles.blurBorderStyle
          : styles.focusBorderStyle,
      ]}
      onPress={() => openCloseDropdown()}
    >
      <View style={styles.mainContainer}>
        {openDrop ? (
          <TextInput
            style={styles.inputContent}
            placeholder="Search here.."
            placeholderTextColor={'#5E6368'}
            value={searchPhrase}
            onChangeText={(text) => setSearchPhrase(text)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        ) : (
          renderSelectedItem(currentValue)
        )}
        <View style={{ padding: 5, alignItems: 'center' }}>
          {focused ? (
            <Image style={styles.dropdownImg} source={Images.SearchIcon} />
          ) : (
            <Image
              style={styles.dropdownImg}
              source={
                !openDrop ? Images.DOWNDROPDOWNICON : Images.UPDROPDOWNICON
              }
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.warper}>
      {renderDropdownContainer(openDrop)}
      {selected?.length || openDrop ? (
        <Text style={[styles.onFocusLabelText]}>
          {labelName}{' '}
          {required && <Text style={styles.requiredText}>{required} </Text>}
        </Text>
      ) : null}
      {openDrop && renderPrimaryItemContainer(renderData)}
    </View>
  );
};

export default CustomMultiSelect;

const styles = StyleSheet.create({
  warper: {
    zIndex: 5,
  },
  selectedLabelText: {
    color: '#384048',
    paddingLeft: 5,
    backgroundColor: '#FFF',
    fontSize: Scale(14),
  },
  mainContainer: {
    position: 'relative',
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    minHeight: verticalScale(48),
    borderWidth: Scale(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(12),
    marginHorizontal: Scale(17),
    height: verticalScale(48),
  },
  inputContent: {
    color: '#5E6368',
    fontSize: Scale(16),
    marginLeft: 1,
    width: '88%',
    paddingVertical: 3,
    zIndex: 200,
  },
  extraTextStyle: {
    color: 'rgba(51, 65, 85, 0.4)',
    fontSize: Scale(16),
  },
  emptyContent: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemsContainerStyleNewUser: {
    maxHeight: verticalScale(125),
    width: '91%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    marginHorizontal: Scale(17),
    zIndex: 99999,
    backfaceVisibility: 'hidden',
    borderBottomLeftRadius: Scale(4),
    borderBottomRightRadius: Scale(4),
    marginTop: -10,
    elevation: Scale(5),
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.4,
  },
  itemsContainerStyle: {
    position: 'absolute',
    maxHeight: verticalScale(150),
    width: '91%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    marginHorizontal: Scale(17),
    zIndex: 99999,
    backfaceVisibility: 'hidden',
    borderBottomLeftRadius: Scale(4),
    borderBottomRightRadius: Scale(4),
    top: verticalScale(60),
    left: 0,
    elevation: Scale(5),
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.4,
  },
  focusBorderStyle: {
    borderTopLeftRadius: Scale(4),
    borderTopRightRadius: Scale(4),
    borderColor: '#73B8F8',
  },
  blurBorderStyle: {
    borderRadius: Scale(4),
    borderColor: '#6B737A',
  },
  selectedTextStyle: {
    color: '#5E6368',
    paddingLeft: 5,
    backgroundColor: '#FFF',
    fontSize: Scale(16),
  },
  itemStyle: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: Scale(10),
    flexDirection: 'row',
  },
  itemContentStyle: {
    borderBottomWidth: Scale(1),
    borderBottomColor: '#E2EBF0',
  },
  renderCheckImg: {
    width: Scale(18),
    height: Scale(18),
    marginRight: Scale(10),
    resizeMode: 'contain',
  },
  dropdownImg: {
    width: Scale(12),
    height: Scale(12),
    resizeMode: 'contain',
  },
  rightTopBtnIcon: {
    height: verticalScale(8),
    width: Scale(8),
    borderRadius: Scale(10),
    backgroundColor: '#1A73E8',
    marginLeft: Scale(10),
  },
  textItem: {
    color: '#5E6368',
    fontSize: Scale(16),
  },
  onFocusLabelText: {
    backgroundColor: '#FFF',
    color: '#1A73E8',
    fontSize: Scale(12),
    alignSelf: 'flex-start',
    position: 'absolute',
    top: verticalScale(0),
    left: Scale(27),
  },
  requiredText: {
    color: '#E00000',
    marginLeft: Scale(3),
    marginTop: verticalScale(-2),
  },
});
