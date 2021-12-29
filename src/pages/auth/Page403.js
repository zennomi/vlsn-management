import React from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

const Page500 = () => (
  <div className="text-center">
    <h1 className="display-1 font-weight-bold">403</h1>
    <p className="h1">Bạn không có quyền sử dụng tính năng này.</p>
    <p className="h2 font-weight-normal mt-3 mb-4">
      The server encountered something unexpected that didn't allow it to
      complete the request.
    </p>
    <Link to="/">
      <Button color="primary" size="lg">
        Return to website
      </Button>
    </Link>
  </div>
);

export default Page500;
