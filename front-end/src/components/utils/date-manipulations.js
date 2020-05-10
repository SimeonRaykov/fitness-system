export default function incrementDateBy30Days() {
    const today = new Date();
    const incrementedDate = new Date(today.setMonth(today.getMonth() + 1));
    return `${incrementedDate.getFullYear()}-${incrementedDate.getMonth() + 1 < 10 ? `0${incrementedDate.getMonth() + 1}` : incrementedDate.getMonth() + 1}-${incrementedDate.getDate() < 10 ? `0${incrementedDate.getDate()}` : incrementedDate.getDate()}`;
}