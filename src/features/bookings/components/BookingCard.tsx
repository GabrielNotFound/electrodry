import StatusBadge from "@/src/shared/components/StatusBadge";
import Colors from "@/src/shared/constants/Colors";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Booking, BookingStatus } from "../Types";

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string }> = {
  new: { label: "New", color: Colors.badgeNew },
  pending: { label: "Pending", color: Colors.badgePending },
  complete: { label: "Complete", color: Colors.badgeComplete },
};

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const status = STATUS_CONFIG[booking.status];
  const outstanding = booking.quotedPrice - booking.depositTaken;

  return (
    <View style={styles.card}>
      <View style={styles.badgeRow}>
        <StatusBadge label={status.label} color={status.color} />
        {booking.secondaryTag && (
          <StatusBadge
            label={booking.secondaryTag}
            color={Colors.badgeQuotation}
          />
        )}
      </View>

      <Text style={styles.date}>{booking.date}</Text>
      <Text style={styles.name}>{booking.name}</Text>

      <View style={styles.locationRow}>
        <Icon name="map-marker" size={16} color={Colors.primary} />
        <Text style={styles.location}>{booking.location}</Text>
      </View>

      <Text style={styles.detailLine}>
        <Text style={styles.detailLabel}>Booking ID: </Text>
        {booking.bookingId}
      </Text>

      <View style={styles.detailRow}>
        <Text style={styles.detailLine}>
          <Text style={styles.detailLabel}>Quoted Price: </Text>$
          {booking.quotedPrice.toFixed(2)}
        </Text>
        <Text style={styles.detailLine}>
          <Text style={styles.detailLabel}>Deposit Taken: </Text>$
          {booking.depositTaken.toFixed(2)}
        </Text>
        <Text style={styles.detailLine}>
          <Text style={styles.detailLabel}>Amount Outstanding: </Text>$
          {outstanding.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16 },
  badgeRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  date: { color: Colors.textLight, fontSize: 13, marginBottom: 4 },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  location: { color: Colors.text, fontSize: 14, flexShrink: 1 },
  detailRow: { flexDirection: "row", flexWrap: "wrap", gap: 16, marginTop: 4 },
  detailLine: { fontSize: 14, color: Colors.text },
  detailLabel: { fontWeight: "700" },
});

export default BookingCard;
