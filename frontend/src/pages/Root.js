import React, { useEffect } from 'react'
import { Outlet,useLoaderData,useNavigation, useSubmit } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import { getTokenDuration } from '../util/auth'
import classes from './Root.module.css'

const Root = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
        <MainNavigation />
        <main className={classes.content}>
            {/* {navigation.state === 'loading' && <p>Loading ...</p>} */}
            <Outlet />
        </main>
    </>
  )
}

export default Root