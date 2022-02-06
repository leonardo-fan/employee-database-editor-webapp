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
            <Link 
                className="btn btn-warning" 
                to={`/edit/${props.record._id}`}
            >
                Edit
            </Link>
            <span> </span>
            <button 
                className="btn btn-danger"
                onClick={ () => { props.deleteRecord(props.record._id); } }
            >
                Delete
            </button>
        </td>
  </tr>
);

export default function RecordList(props) {
    const [records, setRecords] = useState([]);

    // fetch records from db
    useEffect(() => {
        const getRecords = async () => {
            const response = await fetch(`${props.baseURL}/record/`);
            
            if (!response.ok) {
                window.alert(`An error occurred: ${response.statusText}`);
                return;
            }

            const responseRecords = await response.json();
            setRecords(responseRecords);
        }
        
        getRecords();
    }, [records.length, props.baseURL]); 

    // delete record
    const deleteRecord = id => {
        fetch(`${props.baseURL}/${id}`, { method: "DELETE" })
            .then(res => { res.text()})
            .then(res => console.log(res));
        
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
        <div className="text-light">
            <br></br>
            <h3>Record List</h3>
            <table className="table align-middle table-responsive table-dark table-hover rounded" style={ { marginTop: 15 } }>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{ recordList() }</tbody>
            </table>
        </div>
    );
}