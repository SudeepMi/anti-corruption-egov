import React,{ useEffect } from 'react'
import Api from '../../utils/Api'
import User from '../../utils/User'
import Sidebar from '../../components/Sidebar'
import { toast } from 'react-toastify'

function Dashboard() {
    const [user, setUser] = React.useState({})
    const [api, setApi] = React.useState([])
    const [allApi, setAllApi] = React.useState([])
    useEffect(() => {
        const user = User().user
        setUser(user)
        Api.get('/endpoints/myapi').then(res => {
            res.data && setApi(res.data)
        })
        Api.get('/endpoints').then(res => {
            res.data && setAllApi(res.data)
        })

    }, [])

    const handleUse = (api) => {
        Api.post('/endpoints/use', {
            api_id:api
        }).then(res => {
            if (res.data) {
                setApi(res.data)
            }
        })
    }

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [endpoint, setEndpoint] = React.useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      alert("Submitted");
      const intToast = toast.loading("Creating")
      await Api.post("/endpoints/marketplace/", {
        name,
        description,
        endpoint,
      }).then(async (res) => {
        if (res.status === 201) {
          setName("");
          setDescription("");
          setEndpoint("");
          toast.dismiss(intToast);
          await toast.success("Successfully Created", {
            closeButton: false,
          });
        }
      }).catch((err) => {
        toast.dismiss(intToast);
        toast.error("Creation Failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      });
    };

    
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-12'>
                <Sidebar user={user} />
            </div>
            <div className='row mt-3'>
              <div className='col-lg-7'>
              {api.length > 0 &&  <h3>Your APIS</h3>}
                <div className='row'>
               {
                     api.map(api  => {
                            return (
                                <div className='col-lg-6'>
                                <div key={api.id} className='card mt-2'>
                                  <div className='card-header'>
                                    <h5>{api?.api_id.name}</h5>
                                  </div>
                                  <div className='card-body'>
                                    <code>{api?.api_id.description}</code>
                                    <p>Endpoint: {api?.api_id.endpoint}</p>
                                    <pre>API Key: { api.api_key }</pre>
                                    <p>Total calls : { api.call || 0 }</p>
                                    </div>
                                </div>
                                </div>
                            )
                        })
               }
               </div>
             
               {allApi.length > 0 &&   <h2>All APIs</h2> }
                <div className='row'>

{
                     allApi.map((api,index) => {
                            return (
                                <div className='col-lg-6'>
                                <div key={index} className='card my-4'>
                                    <div className='card-header'>
                                    <h5>{api.name}</h5>
                                    </div>
                                    <div className='card-body'>
                                    <code>{api.description}</code>
                                    <p>Endpoint : {api.endpoint}</p>
                                    </div>
                                    <div className='card-footer'>
                                    <button onClick={()=>handleUse(api._id)} className='btn btn-sm btn-outline-dark'>GET API KEY</button>
                                    </div>
                                </div>
                                </div>
                            )
                        })
               }
               </div>
              </div>
              <div className='col-lg-5'>
              <div className='container'>
                { !user.isAdmin && <div className='col-md-8 m-auto'>
                    <h5>Contribute API endpoints on ANYSCRAP COMMUNITY</h5>
                    <div className='form-group'>
        <input type="text" placeholder="API Name" className='form-control my-3' onChange={e=>setName(e.target.value) } />
        <textarea 
        placeholder="Method: GET, POST, PUT, DELETE...."
        className='form-control my-3'
        cols={20}
        rows={10}
        onChange={
          e=>setDescription(e.target.value)
        } />
        <input type="text" placeholder="API Endpoint"
        className='form-control my-3'
        onChange={
          e=>setEndpoint(e.target.value)
        } />
        <button onClick={handleSubmit} className='btn btn-sm btn-outline-info btn-block'>Add API</button>
      </div>
                    </div>
                }
            </div>
              </div>
              
            </div>
        </div>
       
    </div>
  )
}

export default Dashboard