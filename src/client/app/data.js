import { daysOfWeek } from './utils/constants';
// mapping of data model + form fields
const shows = {
    new: {
        fields: {
            showName: {
                fieldType: 'Text',
                name: 'text',
                hintText: 'Enter the show name',
                label: 'Show Name'
            },
            users: {
                fieldType: 'AutoCompleteField',
                name: 'text',
                label: 'Select a DJ',
                hintText: 'Type a name'
            },
            dayofWeek: {
                fieldType: 'Select',
                label: 'Day of the Week',
                name: 'select',
                hintText: 'Select a Day of the Week',
                items: daysOfWeek.map(d => {
                    return {
                        label: d,
                        value: d
                    }
                })
            },
            startTime: {
                fieldType: 'Time',
                name: 'timepicker',
                hintText: 'Select a Start Time'
            },
            endTime: {
                fieldType: 'Time',
                name: 'timepicker',
                hintText: 'Select a Start Time'
            },
            isActive: {
                fieldType: 'ToggleField',
                label: 'Active Show?'
            }
        }
    },
    show: {
        fields: {
            showName: {
                label: 'Show Name'
            },
            users: {
                label: 'DJ(s)'
            },
            dayofWeek: {
                label: 'Day of the Week'
            },
            startTime: {
                label: 'Start Time'
            },
            endTime: {
                label: 'End Time'
            },
            isActive: {
                label: 'Active'
            }
        }
    },
    edit: {

    }
};

const user = {
    fields: {
        firstName: 'Text',
        lastName: 'Text',
        email: 'Text',
        password: 'Password'
    }
};

const playlist = {
    fields: {

    }
};

export default {
    shows,
    user,
    playlist
};