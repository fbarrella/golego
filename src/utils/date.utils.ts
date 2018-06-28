export class DateUtils {
    static DateToUnix(date: Date) {
        return date.getTime();
    }

    static UnixToDate(unix: number) {
        return new Date(unix);
    }
}

