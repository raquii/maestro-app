import * as yup from 'yup';

const studentValidationSchema = yup.object({
    studentProfile: yup.object({
        firstName: yup.string()
        .min(2, 'First name should be at least 2 characters')
        .max(50, 'First name should be less than 50 characters')
        .matches(/^([A-ZÀ-ÿa-z][-,A-ZÀ-ÿa-z. ']+[ ]*)+$/, "Invalid name characters")
        .trim()
        .required('Required'),
        lastName: yup.string()
            .min(2, 'First name should be at least 2 characters')
            .max(50, 'First name should be less than 50 characters')
            .matches(/^([A-ZÀ-ÿa-z][-,A-ZÀ-ÿa-z. ']+[ ]*)+$/, "Invalid name characters")
            .trim()
            .required('Required'),
        email: yup.string()
            .email('Enter a valid email')
            .trim(),
        address: yup.string(),
        lessonReminderEmails: yup.boolean(),
        lessonReminderSms: yup.boolean(),
        birthday: yup.date(),
        adult: yup.boolean(),
        defaultLessonPrice: yup.number()
            .lessThan(1000, "Invalid lesson price: Please enter a value less than 1000"),
        defaultLessonDuration: yup.number('Lesson Duration should be a number in minutes')
            .integer()
            .min(0, "Invalid Duration")
            .max(120, "Invalid Lesson Length. Please select a length less than 120 minutes"),
        status: yup.string()
            .required('Please set a status for the student'),
        gender: yup.string(),
        grade: yup.string().max(10, "Should be less than 10 characters."),
        school: yup.string(),
    }),
    guardianProfileA: yup.object({
        firstName: yup.string()
        .min(2, 'First name should be at least 2 characters')
        .max(50, 'First name should be less than 50 characters')
        .matches(/^([A-ZÀ-ÿa-z][-,A-ZÀ-ÿa-z. ']+[ ]*)+$/, "Invalid name characters")
        .trim()
        .required('Required'),
        lastName: yup.string()
            .min(2, 'First name should be at least 2 characters')
            .max(50, 'First name should be less than 50 characters')
            .matches(/^([A-ZÀ-ÿa-z][-,A-ZÀ-ÿa-z. ']+[ ]*)+$/, "Invalid name characters")
            .trim()
            .required('Required'),
        email: yup.string()
            .email('Enter a valid email')
            .trim(),
        address: yup.string(),
        lessonReminderEmails: yup.boolean(),
        lessonReminderSms: yup.boolean(),
    }),
    guardianProfileB: yup.object({
        firstName: yup.string()
        .min(2, 'First name should be at least 2 characters')
        .max(50, 'First name should be less than 50 characters')
        .matches(/^([A-ZÀ-ÿa-z][-,A-ZÀ-ÿa-z. ']+[ ]*)+$/, "Invalid name characters")
        .trim()
        .required('Required'),
        lastName: yup.string()
            .min(2, 'First name should be at least 2 characters')
            .max(50, 'First name should be less than 50 characters')
            .matches(/^([A-ZÀ-ÿa-z][-,A-ZÀ-ÿa-z. ']+[ ]*)+$/, "Invalid name characters")
            .trim()
            .required('Required'),
        email: yup.string()
            .email('Enter a valid email')
            .trim(),
        address: yup.string(),
        lessonReminderEmails: yup.boolean(),
        lessonReminderSms: yup.boolean(),
    }),
});

export default studentValidationSchema;