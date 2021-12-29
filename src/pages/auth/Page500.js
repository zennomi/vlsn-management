import React from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

const Page500 = () => (
  <div className="text-center">
    <h1 className="display-1 font-weight-bold">403</h1>
    <p className="h2 font-weight-normal mt-3 mb-4">
      Bạn không có quyền dùng chức năng này
    </p>
    <Link to="/">
      <Button color="primary" size="lg">
        quay lại website
      </Button>
    </Link>
  </div>
);

export default Page500;
