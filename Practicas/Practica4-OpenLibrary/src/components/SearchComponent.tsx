import React, { FC, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

interface IBook {
  title: string;
  cover_i: string;
  id_amazon?: string[];
  author_name: string[];
  year: number[];
}

interface IType {
    book: IBook;
    type: boolean;
}

interface IResult {
  numFound: number;
  start: number;
  docs: IBook[];
}

const SearchComponent: FC = () => {
  const [value, setValue] = useState<string>("");
  const [auxValue, setAuxValue] = useState<string[]>(["", ""]);
  const [data, setData] = useState<IResult | undefined>(undefined);
  const [searching, setSearching] = useState<boolean>(false);
  const [mypage, setMyPage] = useState<number>(0);
  const [apipage, setApiPage] = useState<number>(1);
  const [type, setType] = useState<boolean>(true);
  const [className, setClassName] = useState<string>("card-container-list");

  const search = (searchText: string) => {
    setSearching(true);
    axios
      .get<IResult>(
        encodeURI(
          `${process.env.REACT_APP_API_URL_SEARCH}?${searchText}&page=${apipage}`
        )
      )
      .then((result) => {
        setData(result.data);
        setSearching(false);
      });
  };

  const searchBy = () => {
    if (auxValue[0].length === 0) {
      return `author=${value}`;
    } else {
      return `title=${value}`;
    }
  };

  console.log(data);
  return (
    <div className="search-container">
      <div className="search-inputs">
        <input type="text" placeholder="Title" value={auxValue[0]} onChange={(e) => [
            setValue(e.target.value),
            setAuxValue([e.target.value, ""]),
          ]}
        />
        <input type="text" placeholder="Author" value={auxValue[1]} onChange={(e) => [
            setValue(e.target.value),
            setAuxValue(["", e.target.value]),
          ]}
        />
        <button className="btn" onClick={(e) => search(searchBy())}>Search</button>
        
      </div>
      
      <div className="buttons">
      {mypage > 0 && (<button className="btn" onClick={(e) => setMyPage(mypage - 1)}>Previous</button>)}
      
      {mypage < data?.numFound! / 20 && (<button className="btn" onClick={(e) => {
            setMyPage(mypage + 1);
            if (mypage * 20 > data?.start!) {
              setData(undefined);
              setApiPage(apipage + 1);
              search(searchBy());
            }
          }}
        >
            Next
        </button>
      )}
      </div>
      <div className="buttons">
        <button className="btn" onClick={(e) => [setType(true), setClassName("card-container-list")]}>List</button>
        <button className="btn" onClick={(e) => [setType(false), setClassName("card-container-block")]}>Block</button>
      </div>


      <div className="loader">
        {searching && <ClipLoader color="#000" />}
      </div>
      <div className={`${className}`}>
        {data &&
          data.docs
            .slice((mypage * 20) % 100, ((mypage * 20) % 100) + 20)
            .map((book: IBook) => {
              return <Book book={book} type={type} />;
            })
        }
      </div>
    </div>
  );
};

const Book: FC<IType> = (props) => {
  if(props.type){
      return (
          <div className="card-item-list">
              <span>{props.book.title}</span> <br/>
              {props.book.author_name}
          </div>
      )
  }else {
      return (
          <div className="card-item-block">
              <img src={`${process.env.REACT_APP_API_COVER_URL}/${props.book.cover_i}-S.jpg`} />
              <span>{props.book.title}</span>
              {props.book.author_name}
          </div>
      )
  }
};

export default SearchComponent;
