// view all records in db
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// definition of a record row
const Record = props => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> | 
            <button 
                className="btn btn-link"
                onClick={ () => { props.deleteRecord(props.record._id); } }
            >
                Delete
            </button>
        </td>
  </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // fetch records from db
    useEffect(() => {
        const getRecords = async () => {
            const response = await fetch(`http://localhost:5000/record/`);

            if (!response.ok) {
                window.alert(`An error occurred: ${response.statusText}`);
                return;
            }

            const responseRecords = await response.json();
            setRecords(responseRecords);
        }

        getRecords();
        return;
    }, [records.length]); // test if edited will refresh

    // delete record
    const deleteRecord = async id => {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const remainingRecords = records.filter(record => record._id !== id);
        setRecords(remainingRecords);
    };
    
    // map all records stored in state in form described by Record (props)
    const recordList = () => {
        return records.map(record => {
            return (
                <Record
                    record={record}
                    deleteRecord={ () => deleteRecord(record._id) }
                    key={record._id}
                />
            );
        });
    };

    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={ { marginTop: 20 } }>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{ recordList() }</tbody>
            </table>
        </div>
    );
}