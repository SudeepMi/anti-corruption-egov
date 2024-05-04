import React from "react";
import Api from "../../utils/Api";
import "./style.css";
import Loading from "../../components/Loading";
function Home() {
  const [Notices, setNotices] = React.useState([])
  const [Publication, setPublication] = React.useState([])
  /**
   * Loading staate for both fetch
   */
  const [nLoading, setNLoading] = React.useState(true)
  const [pLoading, setPLoading] = React.useState(true)

  React.useEffect(()=>{
    Api.get("/scrap/get-notices").then(res=>setNotices(res.data)).finally(()=>setNLoading(false))
    Api.get("/scrap/get-publication").then(res=>setPublication(res.data)).finally(()=>setPLoading(false))
  },[])
  

  return (
    <div className="landing__hero">
      <header className="masthead">
        <div className="container-fluid position-relative">
          <div className="row">
            <div className="col-xl-5">
              <iframe title="online-complaint" className="customIframe" height={800} width="100%" src="https://ciaa.gov.np/online-complaint"></iframe>
            </div>
            <div className="col-xl-7 right">
              <div className="row">
                <div className="col-12">
                  <h2>Recent Notices</h2>
                  <p>Source: CIAA, Transparency org. </p>
                </div>
                <div className="col-12">
                  <div className="row">
                    {pLoading ? <Loading /> : Publication.map((data,key)=>{
                      return <div className="col-12 my-2" key={key}>
                        <a href={data.link} className="publication_links">{key+1}. {data.title}</a>
                      </div>
                    })}
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-12">
                  <h2>Recent Publications</h2>
                  <p>Source: CIAA, Transparency org. </p>
                </div>
                <div className="col-12">
                  <div className="row">
                    {nLoading ? <Loading/> : Notices.map((data,key)=>{
                      return <div className="col-12 my-2" key={key}>
                        <a href={data.link} className="notice_links">{key+1}. {data.title}</a>
                      </div>
                    })}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
