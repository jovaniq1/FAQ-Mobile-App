import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme, { normalize } from '../../theme/theme';

type Question = {
  id: number;
  question: string;
  answer: string;
  lastModified: string;
};

type Props = {
  questionsData: Question[];
  constantData: Question[];
  setSearchQuestions: (questions: Question[]) => void;
  setIsLoadingQuestions: (loading: boolean) => void;
  onFocused?: () => void;
  isLoading?: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchComponent = ({
  constantData,
  questionsData,
  setSearchQuestions,
  setIsLoadingQuestions,
  onFocused,
  searchQuery,
  setSearchQuery,
}: Props) => {
  const handleSearch = (text: string) => {
    setIsLoadingQuestions(true);
    setSearchQuery(text);

    const searchWords = text.toLowerCase().split(' ').filter(Boolean);

    const filteredQuestions = constantData.filter(item =>
      searchWords.every(word => item.question.toLowerCase().includes(word)),
    );

    if (filteredQuestions.length === 0 || text === '') {
      setSearchQuestions([]);
    } else {
      setSearchQuestions(filteredQuestions);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <MaterialCommunityIcons
        name="magnify"
        size={24}
        color="black"
        style={styles.icon}
      />
      <TextInput
        onFocus={onFocused}
        style={styles.input}
        placeholder="Search by keyword or subject"
        value={searchQuery}
        onChangeText={handleSearch}
        keyboardAppearance="dark"
        returnKeyType="search"
      />
    </View>
  );
};

export { SearchComponent };

const styles = StyleSheet.create({
  searchContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
    marginTop: normalize(20),
    alignItems: 'center',
    borderRadius: normalize(10),
    flexDirection: 'row',
  },
  icon: {
    marginLeft: normalize(10),
    marginRight: normalize(10),
  },
  input: {
    height: normalize(40),
    flex: 1,
  },
});
