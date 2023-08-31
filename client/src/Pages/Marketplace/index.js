import React from 'react'
import Api from '../../utils/Api'
import Loading from '../../components/Loading';

function Marketplace() {
 const [api, setApi] = React.useState([])
 const [loading, setLoading] = React.useState(true);
 React.useEffect(() => {
    Api.get('/scrap/sting').then(res => {
        setApi(res.data)
        setLoading(false);
    })
    }, [])
  return (
    <div className='container-fluid mt-5'>
        <h1
        className='text-center'
        >Sting Operations</h1>
        <div className='dFlex'>
        {loading ? <div className="loader text-center"><Loading /></div> : (
        api.map((data,key)=>{
            if(data.text){
                let _ = data.text.trim();
                _ = _.split("\n")
                return(
                    <div className='FlexCard' key={key}>
                        <p>
                            <span className='badge bg-warning text-dark'>{_[0].trim()}</span>
                            <span className='badge bg-success mx-2'>Accusation: {_[10].trim()}</span>
                            <span className='badge bg-danger'>Amount: {_[12].trim()}</span>
                        </p>
                        <p className='info'>{_[4].trim()}</p>
                        <p>Accused Person: {_[6].trim()}</p>
                        <p>Accused Person's Office: {_[8].trim()}</p>
                        <div className='dFlex'>
                            <a className='btn btn-sm btn-primary' href={data.link} target="_blank" rel="noopener noreferrer">View Report</a>
                            <a className='btn btn-sm btn-secondary' href={data.link} download={_[6].trim()+".pdf"}>Download</a>
                        </div>
                    </div>
                )
            }
        }))}
        </div>
    </div>
  )
}

export default Marketplace