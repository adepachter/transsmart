import React, { useEffect, useRef } from "react";

function useListener(ref, eventName, handler) {
  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      element.addEventListener(eventName, handler)
      return () => element.removeEventListener(eventName, handler)
    }
  }, [eventName, handler, ref])
}

export function DatePicker({
  onChange,
  onFocus,
  onBlur,
  onOpen,
  onClose,
  dateAdapter,
  localization = {
    buttonLabel: "Selecteer dag",
    placeholder: "jjjj-mm-dd",
    selectedDateMessage: "Geselecteerd",
    prevMonthLabel: "Vorige maand",
    nextMonthLabel: "Volgende maand",
    monthSelectLabel: "Maand",
    yearSelectLabel: "Jaar",
    closeLabel: "Sluit",
    calendarHeading: "Kalender",
    dayNames: [
      "Zondag", "Maandag", "Dinsdag", "Woensdag",
      "Donderdag", "Vrijdag", "Zaterdag"
    ],
    monthNames: [
        "Januari", "Februari", "Maart", "April",
        "Mei", "Juni", "Juli", "Augustus",
        "September", "Oktober", "November", "December"
    ],
    monthNamesShort: [
        "Jan", "Feb", "Maa", "Apr", "Mei", "Jun",
        "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"
    ],
    locale: "fi-FI",
  },
  ...props
}) {
  const ref = useRef(null)

  useListener(ref, "duetChange", onChange)
  useListener(ref, "duetFocus", onFocus)
  useListener(ref, "duetBlur", onBlur)
  useListener(ref, "duetOpen", onOpen)
  useListener(ref, "duetClose", onClose)

  useEffect(() => {
    ref.current.localization = localization
    ref.current.dateAdapter = dateAdapter
  }, [localization, dateAdapter])

  return <duet-date-picker ref={ref} id="pickupdate" {...props}></duet-date-picker>
}