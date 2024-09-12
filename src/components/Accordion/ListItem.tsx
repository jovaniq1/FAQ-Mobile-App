import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { questions } from "./List";
import theme, { normalize } from "../../theme/theme";

export const LIST_ITEM_HEIGHT = 80;
const styles = StyleSheet.create({
  container: {
    marginTop: normalize(10),
    // marginTop: normalize(LIST_ITEM_HEIGHT),
    // marginBottom: normalize(10),
    // backgroundColor: "white",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderColor: "#f4f4f6",
    // height: LIST_ITEM_HEIGHT
  },
  answer:{
    fontSize: normalize(16),
    fontWeight: "bold",
    color: theme.DARK_BLUE
  },
  name: {
    fontSize: 16
  },
  pointsContainer: {
    borderRadius: 8,
    backgroundColor: theme.LIGHT_BLUE,
    padding: 8
  },
  points: {
    color: "white",
fontSize: normalize(14),
    fontWeight: "bold"
  }
});



interface ListItemProps {
  question: questions;
  isLast: boolean;
}

export default ({ question, isLast }: ListItemProps) => {

  const questionHeight = (question?.question?.length/1.5 || 1);

  return (
    <View
      style={[
        styles.container,

      ]}
    >
      <Text style={styles.answer}>{"Answer:"}</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{question.answer}</Text>
      </View>
    </View>
  );
};
