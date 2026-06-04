"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  selectedEventAtom,
  draftEventAtom,
  modeAtom,
} from "@/store/calendarAtoms";

import { useEvents } from "@/features/calendar/hooks/useEvents";
import {
  eventSchema,
  type EventForm,
} from "@/features/calendar/schemas/eventFormSchema";
import { createDefaultEventForm } from "@/features/calendar/lib/eventForm";
import {
  eventFormToCalendarEvent,
  calendarEventToEventForm,
} from "@/features/calendar/lib/eventFormMapper";
import { saveEvent } from "@/features/calendar/lib/eventSave";
import { deleteCalendarEvent } from "@/features/calendar/lib/eventDelete";

type Params = {
  clearResizePreview?: () => void;
};

export function useEventModal({ clearResizePreview = () => {} }: Params = {}) {
  const [event, setSelectedEvent] = useAtom(selectedEventAtom);
  const [mode, setMode] = useAtom(modeAtom);
  const [draftEvent] = useAtom(draftEventAtom);
  const { setEvents } = useEvents();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: createDefaultEventForm(),
  });

  useEffect(() => {
    if (!draftEvent || !mode) {
      reset(createDefaultEventForm());
      return;
    }

    reset(calendarEventToEventForm(draftEvent));
  }, [draftEvent, mode, reset]);

  const handleClose = () => {
    clearResizePreview();
    setMode(null);
    setSelectedEvent(null);
  };

  const onSubmit = (data: EventForm) => {
    if (!mode) return;

    const newEvent = eventFormToCalendarEvent(data, event);

    setEvents((prev) =>
      saveEvent({
        events: prev,
        mode,
        currentEvent: event,
        newEvent,
      }),
    );

    handleClose();
  };

  const handleDelete = () => {
    if (!event) return;

    if (!event.originalId) {
      if (!confirm("削除しますか？")) return;

      setEvents((prev) =>
        deleteCalendarEvent({
          events: prev,
          currentEvent: event,
        }),
      );

      handleClose();
      return;
    }

    const choice = window.prompt(
      "繰り返しイベントです。\n\n1: このイベントのみ削除\n2: この日以降すべて削除\n\n1 または 2 を入力してください",
    );

    if (choice !== "1" && choice !== "2") return;

    setEvents((prev) =>
      deleteCalendarEvent({
        events: prev,
        currentEvent: event,
        choice: choice === "1" ? "one" : "future",
      }),
    );

    handleClose();
  };

  const selectedColor = useWatch({
    control,
    name: "color",
  });

  const repeatType = useWatch({
    control,
    name: "repeatType",
  });

  return {
    mode,
    register,
    handleSubmit,
    errors,
    setValue,
    selectedColor,
    repeatType,
    onSubmit,
    handleClose,
    handleDelete,
  };
}
