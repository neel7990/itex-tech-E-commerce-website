import React from "react";
import { Img } from "react-image";
import {API} from "../config";
const ShowImage = ({ item, url }) => {
  return (
    <div className="img-fluid rounded text-center">
      <Img
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "156px", maxWidth: "220px" }}
        src={`${API}/${url}/photo/${item._id}`}
        loader={
          <div className="ui placeholder">
            <div className="image"></div>
          </div>
        }
      />
    </div>
  );
};

export default ShowImage;
