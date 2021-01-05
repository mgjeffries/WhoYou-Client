import React from "react";
import { Route } from "react-router-dom";
import { ContentProvider } from "./components/content/ContentProvider";
import { ContentViewRequestProvider } from "./components/content_view_request/ContentViewRequestProvider";
import { NotificationList } from "./components/notification/NotificationList";
import { UserDetail } from "./components/user/UserDetail";
import { UserEdit } from "./components/user/UserEdit";
import { UserList } from "./components/user/UserList";
import { UserProvider } from "./components/user/UserProvider";

export const ApplicationViews = () => {
  return (
    <>
      <UserProvider>
        <ContentViewRequestProvider>
          <ContentProvider>
            <Route exact path="/"></Route>

            <Route exact path="/users">
              <UserList />
            </Route>
            <Route exact path="/notifications">
              <NotificationList />
            </Route>
            <Route exact path="/users/:userId(\d+)">
              <UserDetail />
            </Route>
            <Route exact path="/users/:userId(\d+)/edit">
              <UserEdit />
            </Route>
          </ContentProvider>
        </ContentViewRequestProvider>
      </UserProvider>
    </>
  );
};
