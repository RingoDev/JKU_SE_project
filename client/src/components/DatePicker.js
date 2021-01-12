import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

export function DatePicker() {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <DateTimePicker
                onChange={onChange}
                value={value}
            />
        </div>
    );
}
