import React from "react";
import { View, Text, Image, ViewStyle } from "react-native";
import { useAppTheme } from "../../resources/ThemeContext";
import { FONTS, ICONS, SHADOW } from "../../resources";

interface CategoryProps {
  title: string;
  image: any;
  tutor: string;
  duration: string;
  lectures: number;
  learning_minutes: number;
  price: string;
  category: string;
  onPress?: () => void;
}

const CourseCard: React.FC<CategoryProps> = ({
  title,
  image,
  tutor,
  duration,
  lectures,
  learning_minutes,
  price,
  category,
  onPress,
}) => {
  const theme = useAppTheme(); // Get theme styles

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 5,
          backgroundColor: theme.COLORS.card, // Themed background
          alignItems: "center",
          justifyContent: "center",
          margin: 10,
          marginVertical: 10,
          // ...style,
          // ...SHADOW, // Themed shadow
        }}
      >
        <Image
          source={image}
          resizeMode="contain"
          style={{ width: 70, height: 70 }}
        />
      </View>
      <View>
        <Text style={[FONTS.body2, { color: theme.COLORS.text, marginTop: 8 }]}>
          {title}
        </Text>
        <Text
          style={[
            FONTS.body4,
            { color: theme.COLORS.gray ?? "#777", marginBottom: 4 },
          ]}
        >
          by {tutor}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[FONTS.body6, { color: theme.COLORS.text }]}>
            {duration}
          </Text>
          <Text style={[FONTS.body6, { color: theme.COLORS.text }]}>
            {lectures} Lectures
          </Text>
        </View>
        <Text style={[FONTS.body6, { color: theme.COLORS.text }]}>
          {learning_minutes} mins total
        </Text>
        <View
          style={{
            marginTop: 6,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[FONTS.body4, { color: theme.COLORS.primary }]}>
            ₹{price}
          </Text>
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 6,
              backgroundColor: theme.COLORS.primary + "20",
            }}
          >
            <Text style={[FONTS.body6, { color: theme.COLORS.primary }]}>
              {category}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;


