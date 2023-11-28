import { StyleSheet, Text, View } from "react-native";
import { DownloadButton } from "../../components/DownloadButton/DownloadButton";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { formatarData } from "../../utils/Date";

export const ExportWallet = ({ navigation: { navigate }, route }: any) => {
  const { id } = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [isCalendarEndVisible, setCalendarEndVisibility] = useState(false);
  const [isCalendarStartVisible, setCalendarStartVisibility] = useState(false);

  const [selectedDateEnd, setSelectedDateEnd] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedDateStart, setSelectedDateStart] = useState(
    new Date().toISOString().split("T")[0]
  );

  const openAndCloseCalendarEnd = () => {
    setCalendarEndVisibility((previousState) => !previousState);
  };

  const openAndCloseCalendarStart = () => {
    setCalendarStartVisibility((previousState) => !previousState);
  };

  const handleDateChangeEnd = (day: any) => {
    setSelectedDateEnd(day.dateString);
    setValue("endDate", formatarData(day.dateString));
    clearErrors("endDate");
    openAndCloseCalendarEnd();
  };
  const handleDateChangeStart = (day: any) => {
    setSelectedDateStart(day.dateString);
    setValue("startDate", formatarData(day.dateString));
    clearErrors("startDate");
    openAndCloseCalendarStart();
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "#fff" }}>Selecione a data do começo:</Text>
        <TextField
          status={TextFieldStatus.Disabled}
          control={control}
          name="startDate"
          placeholder="Selecione a Data do Começo"
          errors={errors}
          onClick={openAndCloseCalendarStart}
        />
      </View>
      {isCalendarStartVisible && (
        <Calendar
          displayName="date"
          style={{
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "#1aae9f",
            height: "auto",
            width: 328,
          }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#1aae9f",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#1aae9f",
            dayTextColor: "#2d4150",
          }}
          current={selectedDateStart}
          onDayPress={handleDateChangeStart}
          markedDates={{
            [selectedDateStart]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
      )}

      <View>
        <Text style={{ color: "#fff" }}>Selecione a data do fim:</Text>
        <TextField
          status={TextFieldStatus.Disabled}
          control={control}
          name="endDate"
          placeholder="Selecione a Data do Fim"
          errors={errors}
          onClick={openAndCloseCalendarEnd}
        />
      </View>
      {isCalendarEndVisible && (
        <Calendar
          displayName="date"
          style={{
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "#1aae9f",
            height: "auto",
            width: 328,
          }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#1aae9f",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#1aae9f",
            dayTextColor: "#2d4150",
          }}
          current={selectedDateEnd}
          onDayPress={handleDateChangeEnd}
          markedDates={{
            [selectedDateEnd]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
      )}
      <DownloadButton
        walletId={id}
        startDate={selectedDateStart}
        endDate={selectedDateEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "700",
  },
  container: {
    position: "relative",
    borderRadius: 24,
    lineHeight: 1.25,
    padding: 24,
    margin: 12,
    height: "95%",
    backgroundColor: "#242424",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    borderRadius: 24,
    lineHeight: 1.25,
    margin: 12,
    height: 40,
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDelete: {
    borderRadius: 24,
    lineHeight: 1.25,
    margin: 12,
    height: 40,
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
  },
});
