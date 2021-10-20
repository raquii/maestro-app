import * as dayjs from 'dayjs';

//find the end datetime using duration
function calculateEnd(date, time, duration) {
    return dayjs(date + time).add(duration, 'm').format();
};

export default function eventHelper(data) {
    console.log('in event helper:', data)
    
    const end = calculateEnd(data.date, data.time, data.duration);

    const event = {
        studentProfileId: data.studentProfile === null ? null : data.studentProfile.id,
        allDay: data.allDay,
        title: data.title,
        allowRegistration: data.allowRegistration,
        makeUpCreditRequired: data.allowRegistration,
        eventType: data.eventType,
        visible: data.visible,
        location: data.location,
        price: data.price,
        defaultLesson: data.defaultLesson,
        start: dayjs(data.date + data.time).format(),
        end: end,
        id: data.id === undefined ? undefined : data.id,
    };
 
    //if the event WAS recurring
    if (data.recurringGroupId) {
        //if the event was but is no longer recurring, set groupId to null
        if (!data.recurring) {
            return { ...event, recurringGroupId: null }
        //otherwise, include it in the object
        } else {
            return { event: { ...event, recurringGroupId: data.recurringGroupId }, recurringGroup: { endDate: data.endDate } }
        }
    }

    //if the event is newly a recurring/defaultLesson
    if (data.recurring || data.defaultLesson) {
        return { event: { ...event }, recurringGroup: { endDate: data.endDate } }
    };

    //if the event doesn't recur and never has
    return event
};
