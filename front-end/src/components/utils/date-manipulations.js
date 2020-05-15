export const incrementDateBy30Days = () => {
    const today = new Date();
    const incrementedDate = new Date(today.setMonth(today.getMonth() + 1));
    return `${incrementedDate.getFullYear()}-${incrementedDate.getMonth() + 1 < 10 ? `0${incrementedDate.getMonth() + 1}` : incrementedDate.getMonth() + 1}-${incrementedDate.getDate() < 10 ? `0${incrementedDate.getDate()}` : incrementedDate.getDate()}`;
}

export const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()<10?`0${date.getMonth()}`:date.getMonth()}-${date.getDate()<10?`0${date.getDate()}`:date.getDate()}`;
}

export const formatToday = () => {
    return formatDate(new Date);
}

export const formatLastMonth = () => {
    const today = new Date();
    return formatDate(new Date().setDate(today.getMonth() - 1));
}