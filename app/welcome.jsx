import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../supabase";

export default function AgencyVerification() {
  const [agencyCode, setAgencyCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyAgency = async () => {
    if (!agencyCode.trim()) {
      Alert.alert("Error", "Please enter an agency code.");
      return;
    }

    setLoading(true);

    try {
      // Query Supabase for the agency_code
      const { data, error } = await supabase
        .from("agencies")
        .select("agency_code")
        .eq("agency_code", agencyCode)
        .single(); // use single() since we expect one match

      if (error) {
        if (error.code === "PGRST116") {
          // no rows returned
          Alert.alert("Invalid Code", "Agency code not found.");
        } else {
          console.error(error);
          Alert.alert("Error", "Something went wrong.");
        }
      } else if (data) {
        Alert.alert("Verified", `Agency code ${data.agency_code} is valid.`);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Network or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agency Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter agency code"
        value={agencyCode}
        onChangeText={setAgencyCode}
        autoCapitalize="none"
      />
      <Button
        title={loading ? "Verifying..." : "Verify"}
        onPress={verifyAgency}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});
