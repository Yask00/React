import React from 'react'
import { useNavigate } from "react-router";

export default function TrendingNew() {
    let navigate = useNavigate();

    return (
      <div className="content">
          <div>
          - Concerts/TrendingNew
          <p onClick={() => navigate('/trading')}>navigate to trading</p></div>
      </div>
    );   
}
