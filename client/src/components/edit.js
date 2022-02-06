// edit employees
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit(props) {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "" 
    });
    const params = useParams(); // defined in routes in App.js, params.id comes from :id 
    const navigate = useNavigate(); // used to nav between pages

    // called everytime [params.id, navigate] changed/called to find out what record the edit should refer to (through fetching from url)
    useEffect(() => {
        const fetchData = async () => {
            const id = params.id.toString();
            const response = await fetch(`${props.baseURL}/record/${id}`);

            if (!response.ok) {
                window.alert(`An error has occurred: ${response.statusText}`);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(record);
        } 

        fetchData();
        return;
    }, [params.id, navigate, props.baseURL]);
    
    const updateForm = value => {
        return setForm(prev => {
            return { ...prev, ...value };
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const editedPerson = { ...form };

        await fetch(`${props.baseURL}/update/${params.id}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedPerson)
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        navigate("/");
    };

    return (
        <div className="text-light">
            <br></br>
            <h3>Update Record</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Role</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(e) => updateForm({ position: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <br />
        
                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}