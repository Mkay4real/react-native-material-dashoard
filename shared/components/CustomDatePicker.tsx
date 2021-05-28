import React, { createRef, ReactNode, useEffect, ComponentProps } from 'react';
import { Headline, Subheading, Colors, TouchableRipple } from 'react-native-paper';
import { VStack, Spacer, Button, TextInput } from '../../exports';
import DatePicker, { DatePickerProps } from 'react-native-datepicker';
import moment from 'moment'

type CustomDatePicker = ComponentProps<typeof DatePicker> & {
  forwardedRef?: any;
  label: string;
  value?: DatePickerProps['date'];
  placeholder: string;
  // visible: boolean;
  children?: ReactNode;
  positiveButton?: {
    label: string;
    onPress(): void;
  };
};
export default function CustomDatePicker({
  label,
  value,
  // visible = false,
  children,
  placeholder,
  forwardedRef,
  ...props
}: CustomDatePicker) {

  const dateRef = createRef<any>();

  const _openDatePicker = () => {
    dateRef.current?.onPressDate()
  }
  return (
    <>
      <TouchableRipple style={{ marginTop: (20) }} onPress={() => _openDatePicker()}>
        <TextInput
          editable={false}
          placeholderTextColor="red"
          label={label}
          value={moment(value).format("DD, MMM YYYY")}
        />
      </TouchableRipple>

      <DatePicker
        ref={dateRef}
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        minDate={new Date()}
        mode="date"
        {...props}
        style={{ height: 0, width: 0 }}
        date={value}
        placeholder={placeholder}
        showIcon={false}
        hideText={true}
      />
    </>

  )

}
