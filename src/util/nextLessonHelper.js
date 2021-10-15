import * as dayjs from 'dayjs';

export default function nextLessonHelper(events){
    let today = dayjs();
    
    let next = events.map(e=> e.start ? {id: e.id, next: e.start, title:e.title, eventType: e.eventType, student:e.student}:{id: e.id, next: findThisWeeksLesson(dayjs(e.startRecur + e.startTime)), title:e.title, eventType: e.eventType, student:e.student })
    next.sort((a,b)=> today.diff(b.next) - today.diff(a.next));
    return next[0]
}

export function findThisWeeksLesson(date){
    const diff = date.diff(dayjs(), 'week');
    const thisWeeksLesson = date.add(diff, 'week').format();

    return thisWeeksLesson;
}