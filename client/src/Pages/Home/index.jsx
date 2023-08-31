import React from "react";
import Api from "../../utils/Api";
import "./style.css";
function Home() {
  // const [scrap_option, setScrap_option] = React.useState({
  //   image: false,
  //   table: false,
  //   link: false,
  // });

  const [Notices, setNotices] = React.useState([])
  const [Publication, setPublication] = React.useState([])

  React.useEffect(()=>{
    Api.get("/scrap/get-notices").then(res=>setNotices(res.data))
    Api.get("/scrap/get-publication").then(res=>setPublication(res.data))

  },[])
  // const [loading, setLoading] = React.useState(false);

  // const [scrap_url, setScrap_url] = React.useState("");
  // const [progress, setProgress] = React.useState(0);
  // const [file, setFile] = React.useState(null);

  // const handleScrap = (e) => {
  //   e.preventDefault();
  //   if(
  //     scrap_url === "" 
  //     ||((scrap_option.image === false)
  //     && (scrap_option.table === false)
  //     &&( scrap_option.link === false))
  //     ) return alert("Please enter url");
  //   setLoading(true);
  //   setProgress(10);
  //   Api.post("/scrap/scrap-url", {
  //     scrap_option,
  //     scrap_url,
  //   }).then((res) => {
  //     console.log(res.data);
  //     setFile(res.data.data.dir);
  //     setProgress(100);
  //     // setLoading(false);
  //   });
  // };
  // const [downloading, setDownloading] = React.useState(false);

  // const handleDownload = (e) => {
  //   e.preventDefault();
  //   if(file === null) return alert("Please select file");
  //   setDownloading(true);
  //   Api.get(`/scrap/download${file}`, {}).then((res) => {
  //     setDownloading(false);
  //     setLoading(false);
  //     setScrap_url("");
  //     setFile(null);
  //     setProgress(0);
  //     setScrap_option({
  //       image: false,
  //       table: false,
  //       link: false,
  //     });
  //     window.location.href = res.data.downloadUrl;
  //   });
  // };
    

  return (
    <div className="landing__hero">
      <header className="masthead">
        <div className="container position-relative">
          <div className="row">
            <div className="col-xl-4">
              {/* <div className="text-center text-white my-large ">
                <h1 className="mb-5">Scrap Any Website by URL</h1>
                <span className="text-dark text-bold font-monospace my-1">
                  Provide the URL of the website you want to scrap and we will
                  do the rest.
                </span>
                <form className="form-subscribe" id="scrapForm">
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control form-control-lg"
                        id="urlScrap"
                        type="url"
                        placeholder="Enter URL to Scrap"
                        data-sb-validations="required,url"
                        onChange={(e) => setScrap_url(e.target.value)}
                        value={scrap_url}
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-outline-dark btn-lg"
                        id="submitButton"
                        onClick={(e) => handleScrap(e)}
                      >
                        Scrap
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex flex-wrap mt-3">
                      <div className="form-check mx-sm-5">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="scrap_option"
                          value=""
                          id="image"
                          checked={scrap_option.image}
                          onChange={() =>
                            setScrap_option({
                              ...scrap_option,
                              image: !scrap_option.image,
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor="image">
                          Images (ZIP)
                        </label>
                      </div>
                      <div className="form-check mx-5">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="scrap_option"
                          value=""
                          id="link"
                          checked={scrap_option.link}
                          onChange={() =>
                            setScrap_option({
                              ...scrap_option,
                              link: !scrap_option.link,
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor="link">
                          Links (JSON)
                        </label>
                      </div>
                      <div className="form-check mx-5">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="scrap_option"
                          value=""
                          id="table"
                          checked={scrap_option.table}
                          onChange={() =>
                            setScrap_option({
                              ...scrap_option,
                              table: !scrap_option.table,
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor="table">
                          Tables (Excel)
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
                {loading && 
                <>
                <div className="progress mt-5">
                  <div
                    className="progress-bar progress-bar-striped bg-dark"
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                    aria-valuenow={`${progress}`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                  {progress===100 && <div className="mt-5">
                <button className="btn btn-block w-75 btn-outline-dark" id="downloadButton" onClick={
                  (e) => handleDownload(e)
                }>
                  {
                    downloading ? "Downloading..." : "Download"
                  }
                </button>
                  </div>}
                 
                
                </> 
                }
                 <p
                 className="text-center text-dark mt-5"
                 >
                    we save the all scraped data in a zip file and you can download
                  </p>
              </div> */}
             
              <iframe title="online-complaint" className="customIframe" height={800} width="100%" src="https://ciaa.gov.np/online-complaint"></iframe>
            </div>
            <div className="col-xl-8 right">
              <div className="row">
                <div className="col-12">
                  <h2>Recent Notices</h2>
                  <p>Source: CIAA, Transparency org. </p>
                </div>
                <div className="col-12">
                  <div className="row">
                    {Publication.map((data,key)=>{
                      return <div className="col-12 my-2">
                        <a href={data.link}>{key+1}. {data.title}</a>
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
                    {Notices.map((data,key)=>{
                      return <div className="col-12 my-2">
                        <a href={data.link} >{key+1}. {data.title}</a>
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
