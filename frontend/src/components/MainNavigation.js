import classes from './MainNavigation.module.css';
import { NavLink,Form,useRouteLoaderData} from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  const token = useRouteLoaderData('root');
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? classes.active : undefined}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({isActive}) => isActive ? classes.active : undefined}>Events</NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({isActive}) => isActive ? classes.active : undefined}>Product</NavLink>
          </li>
          <li>
            <NavLink to="/newsletter" className={({isActive}) => isActive ? classes.active : undefined}>NewsLetter</NavLink>
          </li>
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}
           {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
          
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
