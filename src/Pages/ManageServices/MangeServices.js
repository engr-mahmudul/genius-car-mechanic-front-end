import React, { useEffect, useState } from 'react';

const MangeServices = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    const deleteHandle = (id) => {

        const url = `http://localhost:5000/services/${id}`;
        fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    alert('Deleted Successfully');
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                }
            })
    }
    return (
        <div>
            <h1>This is manage Services</h1>
            {
                services.map(service => <div key={service._id}>
                    <p>{service.name} <button style={{ backgroundColor: "red", color: "white" }} onClick={() => deleteHandle(service._id)}>Delete</button></p>
                </div>)
            }

        </div>
    );
};

export default MangeServices;