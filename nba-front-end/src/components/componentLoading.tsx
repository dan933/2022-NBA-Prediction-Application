import React from 'react';

function WithTableLoading(Component:React.FC) {
    return function WithLoadingComponent({ isLoading, ...props }:any) {
      if (!isLoading) return <Component {...props} />;
      return (
        <p style={{ textAlign: 'center', fontSize: '30px' }}>
          Hold on, fetching data may take some time :)
        </p>
      );
    };
  }
export default WithTableLoading;
