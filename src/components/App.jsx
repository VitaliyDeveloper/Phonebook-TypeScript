import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from 'redux/auth/auth-operations';
import { useAuth } from 'hooks/useAuth';
import PrivateRoute from 'HOCs/PrivateRoute';
import RestrictedRoute from 'HOCs/RestrictedRoute';
// import PublicRoute from 'HOCs/PublicRoute';
import Layout from './Layout/Layout';
import HomePage from 'pages/HomePage';
// import AddContactPage from 'pages/AddContactPage';
import ContactsPage from 'pages/ContactsPage';
import NotFound from './NotFound/NotFound';
import Loader from './Loader/Loader';

export const App = () => {
  const dispatch = useDispatch();

  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<HomePage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<HomePage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
            {/* <Route
              path="/add"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<AddContactPage />}
                />
              }
            /> */}

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        // <Routes>
        //   <Route path="/" element={<Layout />}>
        //     {/* <Route
        //       path="/"
        //       element={
        //         <RestrictedRoute
        //           redirectTo="/contacts"
        //           component={<HomePage />}
        //         />
        //       }
        //     /> */}

        //     <Route
        //       path="/add"
        //       element={
        //         <PrivateRoute redirectTo="/" component={<AddContactPage />} />
        //       }
        //     />
        //     <Route
        //       path="/contacts"
        //       element={
        //         <PrivateRoute redirectTo="/" component={<ContactsPage />} />
        //       }
        //     />
        //     <Route index element={<HomePage />} />

        //     {/* <Route
        //       path="/add"
        //       element={
        //         <PrivateRoute
        //           redirectTo="/add"
        //           component={<AddContactPage />}
        //         />
        //       }
        //     />

        //     <Route
        //       path="/contacts"
        //       element={
        //         <PrivateRoute
        //           redirectTo="/contacts"
        //           component={<ContactsPage />}
        //         />
        //       }
        //     /> */}

        //     {/* <Route element={<PrivateRoute />}>
        //       <Route path="/add" element={<AddContactPage />} />
        //       <Route path="/contacts" element={<ContactsPage />} />
        //     </Route> */}

        //     {/* <Route
        //       path="/add"
        //       element={
        //         <PrivateRoute>
        //           <AddContactPage />
        //         </PrivateRoute>
        //       }
        //     /> */}
        //     {/* <Route
        //       path="/contacts"
        //       element={
        //         <PrivateRoute>
        //           <ContactsPage />
        //         </PrivateRoute>
        //       }
        //     /> */}
        //   </Route>
        // </Routes>
      )}
    </>
  );
};
