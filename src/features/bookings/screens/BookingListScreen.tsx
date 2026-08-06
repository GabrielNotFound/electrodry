import { useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../shared/constants/Colors";
import BookingCard from "../components/BookingCard";
import { Booking } from "../Types";

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    status: "new",
    secondaryTag: "For Quotation",
    date: "June 20, 2025 | 1:30 PM",
    name: "John Paul Santos",
    location: "56 Purcell Place, Crowther Island, New South Wales",
    bookingId: "ABC1234",
    quotedPrice: 35,
    depositTaken: 0,
  },
  {
    id: "2",
    status: "pending",
    date: "June 20, 2025 | 1:30 PM",
    name: "Michael Angelo Cruz",
    location: "17 Weemala Avenue, Caragabal, New South Wales",
    bookingId: "ABC1234",
    quotedPrice: 35,
    depositTaken: 0,
  },
  {
    id: "3",
    status: "complete",
    date: "June 20, 2025 | 1:30 PM",
    name: "Carl Vincent Flores",
    location: "20 Ross Street, South Stradbroke, Queensland",
    bookingId: "ABC1234",
    quotedPrice: 35,
    depositTaken: 10,
  },
];

const TABS = ["New", "Ongoing", "Completed"] as const;

const BookingListScreen = () => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("New");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/images/Electrodry.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.headerButtons}>
        <Button
          mode="outlined"
          style={styles.weeklyButton}
          textColor={Colors.primary}
        >
          Weekly Report
        </Button>
        <Button
          mode="contained"
          buttonColor={Colors.primary}
          style={styles.dailyButton}
        >
          Daily Reconciliation
        </Button>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <Text
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabLabel,
              activeTab === tab && styles.tabLabelActive,
            ]}
          >
            {tab}
          </Text>
        ))}
      </View>
      <View style={styles.tabDivider} />

      <View style={styles.listCard}>
        <View style={styles.listHeader}>
          <Icon
            name="format-list-bulleted"
            size={22}
            color={Colors.background}
          />
          <Text style={styles.listHeaderText}>Booking List</Text>
        </View>

        <FlatList
          data={MOCK_BOOKINGS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookingCard booking={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  logo: {
    width: 220,
    height: 90,
    alignSelf: "center",
    marginVertical: 16,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
    gap: 12,
  },
  weeklyButton: {
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  dailyButton: {
    borderRadius: 8,
  },
  tabRow: {
    flexDirection: "row",
    gap: 32,
  },
  tabLabel: {
    fontSize: 16,
    color: Colors.textLight,
    paddingBottom: 8,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: "700",
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 16,
  },
  listCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 24,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  listHeaderText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
  },
});

export default BookingListScreen;
