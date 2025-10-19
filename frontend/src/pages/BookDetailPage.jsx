import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './BookDetailPage.css';

function BookDetailPage() {
  const params = useParams();
  const token = localStorage.getItem('token');
  const [book,setBook] = useState({});
  const [summary,setSummary] = useState('');
  const [backendUrl,setBackendUrl] = useState('');
  const [startPage,setStartPage] = useState(0);
  const [endPage,setEndPage] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/v1/books/${params.id}`,{
    headers: {
    'Authorization': `Bearer ${token}`
  }
})
      .then((res) => {
      console.log(res);
      setBook(res.data?.details);
      })
      .catch((err) => {
      console.error(err);
      })  
},[]);


  useEffect(() => {
    // update backendUrl and make call to backend
    setBackendUrl(`api/vi/books/${params.id}/read?start=&numPages=6`) 
  }, [currentPageNum])

  const [error,setError] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const [currentPageNum,setCurrentPageNum] = useState(1);
  const [totalNumPages,setTotalNumPages] = useState(5);
  const [isReading,setIsReading] = useState(false);
  
  function loadBook(){
    setIsReading(true);
  }
  function prevPage(){
    if (currentPageNum > 1){
      setCurrentPageNum(currentPageNum - 1);
    }
  }

  function nextPage(){
    if (currentPageNum < totalNumPages){
      setCurrentPageNum(currentPageNum + 1);
    }
    
  }

  function loadSummary(){
    stopReading();
    const token = localStorage.getItem('token');
    const cachedSummary = localStorage.getItem(params.id);
    // "68af00ff19e51675f94e5315" : 
    if (cachedSummary){
      setSummary(cachedSummary);
      return;
    }
    console.log("token",token);
    setIsLoading(true);
    axios.get(`http://localhost:8001/api/v1/books/${params.id}/summarize`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
        .then((res) => {
          console.log(res);
          if (res.statusText === "OK"){
          // cache the result to local storage
          localStorage.setItem(params.id, res.data.summary);
          setSummary(res.data.summary);
          } else{
            setError(res.data);
          }
        })
        .catch(((err) => {
          console.error(err);
          setError(err.message);
        })).finally(() => {
              setIsLoading(false);
        });
    
  }
  function closeSummary(){
    setSummary('');
  }
  function stopReading(){
    setIsReading(false);
  }
  return (
    <div className='BookDetailPage'>
      <img id = "book-img" src={book.imgUrl} alt="" />
      <div className="content">
        <div className="buttons-container">
          {backendnUrl}
          {isReading && <button className="close-btn" onClick={stopReading}>Stop Reading</button>}
          {!isReading && <button id="start-reading-btn" onClick={loadBook}>Start Reading</button>}
          {summary === "" && <button id = "summary-btn" onClick={loadSummary}>Summarize</button>}
          {summary !== "" && <button className="close-btn" onClick={closeSummary}>Close Summary</button>}
        </div>
        { isLoading && <h3>Loading Summary...</h3> }
        {summary !== "" && <div id="summary">{summary}</div>}
        { isReading && 
        <div className="BookDetailPage__pagination">
          <button onClick={prevPage}
          disabled = {currentPageNum <= 1}
          >prev</button>
          <span>page {currentPageNum}</span>
          <button onClick={nextPage}
          disabled = {currentPageNum >= totalNumPages}
          >next</button>
        </div>}
        <p>{error}</p>
        {/* https://en.wikipedia.org/wiki/Data_science */}
      </div>
    </div>
  )
}

export default BookDetailPage