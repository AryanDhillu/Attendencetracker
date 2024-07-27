import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Display = ({ logs, deleteLog }) => {
    const [newData, setNewData] = useState(logs);

    useEffect(() => {
        const sortedData = logs.slice();
        sortedData.sort((a, b) => {
            const dateA = normalizeDate(a.date);
            const dateB = normalizeDate(b.date);
            return new Date(dateB) - new Date(dateA);
        });
        setNewData(sortedData);
    }, [logs]);

    const normalizeDate = (dateString) => {
        const dateFormats = [
            { regex: /^\d{4}-\d{2}-\d{2}$/, format: 'YYYY-MM-DD' },
            { regex: /^\d{1,2}\/\d{1,2}\/\d{4},\s\d{1,2}:\d{2}:\d{2}\s(AM|PM)$/, format: 'MM/DD/YYYY, hh:mm:ss A' }
        ];

        for (const { regex, format } of dateFormats) {
            if (regex.test(dateString)) {
                return new Date(dateString).toISOString();
            }
        }
        return dateString;
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="list-group">
                        {newData.map((item) => (
                            <div
                                key={item.id}
                                className="list-group-item d-flex justify-content-between align-items-center mb-2"
                            >
                                <div>
                                    <h5 className="mb-1">{item.classes}</h5>
                                    <p className="mb-1">{item.date}</p>
                                </div>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteLog(item.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;
