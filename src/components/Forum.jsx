import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Forum = ({ onAdd, fetchLogs }) => {
    const [classes, setClasses] = useState(0);
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData);
        if (!data.date) {
            data = { ...data, date: new Date().toLocaleString() };
        }
        onAdd(data);
        fetchLogs();
    };

    return (
        <div className="d-flex justify-content-center align-items-center my-4">
            <div className="card mx-3" style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Add Log</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="classes" className="form-label">No. of Classes:</label>
                            <select
                                id="classes"
                                name="classes"
                                className="form-control"
                                onChange={(e) => setClasses(parseFloat(e.target.value))}
                                value={classes}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="date" className="form-label">Date:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                {date ? "Submit" : "Submit with Today's Date"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Forum;
