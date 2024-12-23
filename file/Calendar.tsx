import React, { memo, useState } from "react";
import { Calendar as RNCalendar } from "react-native-calendars";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { PermissionsAndroid, Platform } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import RNFS from "react-native-fs";
import type { FC } from "react";
import type { TCalendarValue } from "./types";
import styles from "../src/styles/styleHome";

type TProps = {
  locale?: string;
  maxDate?: Date;
  minDate?: Date;
  onChange?: (date: Date) => void;
  value?: TCalendarValue;
};

const CalendarComponent: FC<TProps> = ({
  locale,
  maxDate,
  minDate,
  onChange,
  value = {} as TCalendarValue,
}: TProps) => {
  const [activeDate, setActiveDate] = useState<Date | undefined>(new Date());
  const [addedDates, setAddedDates] = useState(new Set<string>());

  const handleDayPress = (day: { dateString: string }) => {
    const date = new Date(day.dateString);
    onChange?.(date);
    setActiveDate(date);
  };

  const handleAddDates = () => {
    if (activeDate) {
      const startDate = new Date(activeDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      const startDateString = startDate.toISOString().split("T")[0];
      const endDateString = endDate.toISOString().split("T")[0];

      setAddedDates((prevDates) => {
        const newDates = new Set(prevDates);
        newDates.add(startDateString);
        newDates.add(endDateString);
        return newDates;
      });
    }
  };

  const handleSaveCSV = async () => {
    const addedDatesArray = Array.from(addedDates);

    // if (addedDatesArray.length === 0) {
    //   alert("No dates to save!");
    //   return;
    // }

    const csvHeader = "M,Day,Year,Duration\n";
    const csvRows = addedDatesArray.map((entry: string, index: number) => {
      const currentDate = new Date(entry);
      const duration = index % 2 === 0 ? "Starts" : "Ends"; // Alternating "Starts" and "Ends"
      return `${currentDate.getMonth() + 1},${currentDate.getDate()},${currentDate.getFullYear()},${duration}`;
    });

    const csvData = csvHeader + csvRows.join("\n");
    const dirPath = RNFS.DocumentDirectoryPath + "/dataset";
    const filePath = dirPath + "/selected_dates.csv";

    try {
      const dirExists = await RNFS.exists(dirPath);
      if (!dirExists) {
        await RNFS.mkdir(dirPath);
      }

      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        await RNFS.appendFile(filePath, csvRows.join("\n"), "utf8");
      } else {
        await RNFS.writeFile(filePath, csvData, "utf8");
      }

      console.log("CSV file saved at:", filePath);
      alert("CSV file saved successfully!");
    } catch (error) {
      console.error("Error saving CSV file:", error);
      alert("Error saving CSV file!");
    }

      //  try {
      //        const fileExists = await RNFS.exists(filePath);
      //        if (fileExists) {
      //           await RNFS.unlink(filePath);
      //           console.log('File deleted at:', filePath);
      //           alert('CSV file deleted successfully!');
      //        } else {
      //           console.log('File does not exist at:', filePath);
      //           alert('File does not exist!');
      //        }
      //      } catch (error) {
      //           console.error('Error deleting CSV file:', error);
      //           alert('Error deleting CSV file!');
      //      }
  };
    
  

  const renderArrow = (direction: "left" | "right") => {
    const arrowImage =
      direction === "left"
        ? require("../src/assets/panah-kiri.png")
        : require("../src/assets/panah-kanan.png");

    return <Image source={arrowImage} style={{ width: 44, height: 44 }} />;
  };

  return (
    <View>
      <RNCalendar
        markedDates={{
          [activeDate?.toISOString().split("T")[0] as string]: {
            selected: true,
            selectedColor: "#FFE0E0",
            selectedTextColor: "#B9717D",
          },
          ...Array.from(addedDates).reduce((acc, date) => {
            acc[date] = {
              marked: true,
              selected: true,
              selectedColor: "rgba(214, 118, 118, 0.5)",
              selectedTextColor: "#B9717D",
            };
            return acc;
          }, {} as Record<string, any>),
        }}
        onDayPress={handleDayPress}
        minDate={minDate?.toISOString()}
        maxDate={maxDate?.toISOString()}
        monthFormat={"MMMM yyyy"}
        hideExtraDays={false}
        firstDay={1}
        renderArrow={renderArrow}
        theme={{
          todayTextColor: "#B9717D",
          selectedDayBackgroundColor: "#FFE0E0",
          selectedDayTextColor: "#B9717D",
          monthTextColor: "#706262",
          textMonthFontFamily: "Alike",
          textMonthFontSize: 20,
          textDayFontFamily: "Alike",
          textDayFontSize: 23,
          dayTextColor: "#B9717D",
          textDayHeaderFontFamily: "Alike",
          textDayHeaderFontSize: 15,
          textDisabledColor: "rgba(185, 113, 125, 0.5)",
        }}
        style={styles.containerCalendar}
      />
      <TouchableOpacity
        onPress={() => {
          handleAddDates();
          handleSaveCSV();
        }}
        style={styles.containerButton}
      >
        <LinearGradient colors={["#FFCED6", "#EEB9B9"]} style={styles.button}>
          <Text style={{ color: "#FFF", fontSize: 16, fontFamily: "Cormorant" }}> Add </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export const Calendar: React.NamedExoticComponent<{}> = memo(CalendarComponent);


          // try {
          //   const fileExists = await RNFS.exists(filePath);
          //   if (fileExists) {
          //     await RNFS.unlink(filePath);
          //     console.log('File deleted at:', filePath);
          //     alert('CSV file deleted successfully!');
          //   } else {
          //     console.log('File does not exist at:', filePath);
          //     alert('File does not exist!');
          //   }
          // } catch (error) {
          //   console.error('Error deleting CSV file:', error);
          //   alert('Error deleting CSV file!');
          // }