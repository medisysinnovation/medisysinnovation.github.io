// import React from 'react';
// import { PageContext } from '../context';

// export default (Component: any) => (props: any) => {
//   console.log(PageContext.Provider);
//   console.log(props, Component);
//   if (props?.actionRef) return <Component {...props} />;

//   const Wrapped = () => {
//     return (
//       <PageContext.Provider>
//         <Component {...props} />
//       </PageContext.Provider>
//     );
//   };

//   return Wrapped;
// };
