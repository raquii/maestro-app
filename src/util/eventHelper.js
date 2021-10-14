import * as dayjs from 'dayjs';

export default function eventHelper(data){
    console.log(data)
    const allKeys = {
        teacherId: data.teacherId,
        studentId: data.student.id,
        allDay: data.allDay,
        title: data.title,
        allowRegistration: data.allowRegistration,
        makeUpCreditRequired: data.allowRegistration,
        type: data.type,
        visible: data.visible,
        location: data.location,
        price: data.price,
    };

    if(data.recurring || data.defaultLesson){
        let endTime = calculateDuration(data.date, data.time, data.duration);
        return {...allKeys, startTime: data.time, endTime: endTime, startRecur:data.date, endRecur: data.endRecur};
    }else{
        let end = calculateDuration(data.date, data.time, data.duration);
        return {...allKeys, start: dayjs(`${data.date}T${data.time}Z`).toISOString(), end:end};
    };
};

function calculateDuration(date, time, duration){
    return dayjs(date + time).add(duration, 'm').format('HH:mm');
};