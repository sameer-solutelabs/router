import React from 'react'
import MainNavigation from '../components/MainNavigation'
import { Link,useRouteError } from 'react-router-dom'
import PageContent from '../components/PageContent'

const Error = () => {

  const error = useRouteError();


  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500){
    message = error.data.message;
  }

  if(error.status === 404){
    title = 'Not Found!';
    message = 'Could not find resource or page';
  }

  return (
    <>
        <MainNavigation />
        <main>
            <PageContent title={title}>
              <p>{message}</p>
              <Link to='/'>Go to Home Page</Link>
            </PageContent>            
        </main>
    </>
  )
}

export default Error