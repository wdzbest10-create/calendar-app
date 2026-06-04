"use client";

import CalendarContainer from "@/features/calendar/CalendarContainer";
import Sidebar from "@/features/calendar/components/layout/Sidebar";

export default function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1">
        <CalendarContainer />
      </div>
    </div>
  );
}

{
  /* 


src/
└── app/
    ├── global.css
    ├── layout.tsx
    └── page.tsx
└── features/
    └── calendar/
        ├── components/
        │   ├── event-form/
        │   │   ├── DateTimeRow.tsx   
        │   │   ├── EventCategoryField.tsx  
        │   │   ├── EventColorField.tsx  
        │   │   ├── EventDateTimeFields.tsx  
        │   │   ├── EventDetailFields.tsx  
        │   │   ├── EventModal.tsx
        │   │   ├── EventModalActions.tsx                      
        │   │   └── EventRepeatField.tsx 
        │   │ 
        │   ├── layout/
        │   │   ├── CalendarHeader.tsx
        │   │   ├── CalendarTopRow.tsx     
        │   │   ├── AroundToggle.tsx  
        │   │   ├── CreateEventButton.tsx  
        │   │   ├── MiniCalendar.tsx  
        │   │   ├── SearchToggle.tsx  
        │   │   ├── Sidebar.tsx  
        │   │   └── ViewSwitcher.tsx
        │   │
        │   ├── filters/
        │   │   ├── CategoryFilter.tsx        
        │   │   ├── DateRangeFilter.tsx
        │   │   └── MobileFilters.tsx  
        │   │
        │   ├── time-grid/
        │   │   ├── CurrentTimeLine.tsx        
        │   │   ├── TimeGrid.tsx
        │   │   ├── TimeColumn.tsx
        │   │   └── TimeEventBlock.tsx       
        │   │
        │   ├── month/
        │   │   ├── MonthView.tsx
        │   │   ├── DayCell.tsx
        │   │   └── EventItem.tsx
        │   │
        │   ├── week/
        │   │   └── WeekView.tsx
        │   │
        │   └── day/
        │       └── DayView.tsx
        │
        ├── hooks/
        │   ├── useCalendarData.ts
        │   ├── useCalendarInteraction.ts
        │   ├── useDayView.ts 
        │   ├── useDragEvent.ts
        │   ├── useEvents.ts
        │   ├── useResizeEvent.ts                                               
        │   ├── useTimeGridColumnWidth.ts     
        │   ├── useTimeGridScroll.ts
        │   ├── useEventModal.ts                                               
        │   ├── useCalendarShortcuts.ts     
        │   ├── useCalendarNavigation.ts
        │   └── useWeekView.ts
        │
        ├── lib/
        │   ├── calendar.ts
        │   ├── date.ts
        │   ├── event.ts
        │   ├── eventDelete.ts
        │   ├── eventForm.ts
        │   ├── eventFormMapper.ts
        │   ├── eventSave.ts
        │   ├── eventUpdate.ts
        │   ├── filter.ts
        │   ├── holiday.ts        
        │   ├── layout.ts
        │   ├── recurrence.ts
        │   ├── time.ts
        │   ├── timeGrid.ts        
        │   └── weekend.ts
        │
        ├── schemas/
        │   └── eventFormSchema.ts
        │
        ├── types/
        │   ├── calendar.ts
        │   ├── recurrence.ts
        │   ├── drag.ts
        │   ├── layout.ts
        │   └── view.ts
        │
        ├── constants/
        │   ├── categories.ts
        │   ├── colors.ts
        │   ├── holidays.ts  
        │   ├── calendar.ts                  
        │   └── time.ts        
        │
        └── CalendarContainer.tsx
└──  store/
     └── calendarAtoms.ts


        */
}
