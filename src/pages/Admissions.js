import React, { useState,useEffect } from 'react';
import api from "../api/admission";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { format,parseISO } from 'date-fns';

const Admissions = () => {
    const navigate = useNavigate();
    const [admissions,setAdmissions] = useState([]);

    const deleteAdmissions = (item) =>
    {
       //console.log(item);
       deleteAdmission(item.id).then((resp)=>{console.log(resp.data);refreshPage();})
    }   

    const deleteAdmission = async(id) =>
    {
        const response = await api.delete("/admissions/"+id);

        return response;
    }

    function refreshPage(){ 
        window.location.reload(); 
    }

    const retriveAdmissions = async() =>
    {
        const response = await api.get("/admissions");

        return response;
    }

 useEffect(() => {
     retriveAdmissions().then((resp)=>  {
        //console.log(resp.data); 
        setAdmissions(resp.data)});
     
    },[]);   

    return (
        <div>
            <h1>Admissions</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Date Of Admission</th>
                        <th>Name</th>
                        <th>BirthDate</th>
                        <th>Sex</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {admissions.length > 0 ? admissions.map((item,index)=>(   
                    <tr key={index}>
                        <td>{format(parseISO(item.createdDate), 'dd/MM/yyyy hh:mm')}</td>
                        <td>{item.name}</td>
                        <td>{item.birthDate}</td>
                        <td>{item.gender}</td>
                        <td>{item.category}</td>
                        <td>
                            <button className='' onClick={()=>{navigate('edit-admission', { state: item })}}>Edit</button>&nbsp;&nbsp;
                            <button className='' onClick={deleteAdmissions.bind(this,item)}>Delete</button>
                           
                        </td>
                    </tr>
                )): <tr key={0}><td style={{color: "red",width: "100%",textAlign:"center",}} colSpan={6}>No results found</td></tr>}
                </tbody>
            </Table>
            
        <div className="create-button">
            <button className='float-end' onClick={()=>{navigate('create-admission')}}>Create Admission</button>
        </div>
        </div>
    );
};

export default Admissions;