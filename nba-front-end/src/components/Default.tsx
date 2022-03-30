import * as React from 'react';
import { Link } from 'react-router-dom';

function DefaultPage() {
  return (
    <div>
        <Link to="/dashboard/Players">Launch Application</Link>
    </div>
  );
}

export default DefaultPage;