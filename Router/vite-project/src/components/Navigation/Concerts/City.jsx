import React from 'react'
import { useParams } from "react-router";

export default function City() {
    let params = useParams();

    return (
      <div className="content">
          - Concerts/ City({params.city})
      </div>
    );   
}
