# alt-react-auth0-docs

Alternative code structure for Auth0's React Setup examples. The basic idea here is to make the code more concise and readable. This way, developers seeking to understand what the code is truly doing will be able to do so faster. In this `REAMDME`, I've included comments on many changes that were made.

Note: You'll notice some extra comments that I've added into the files. Those are _intentional_ and can be considered part of my suggestion. You'll also notice some comments removed from the original files after copy-paste. Those are _not_ intentional removals.

While I believe strongly in many of these changes, they're all open for discussion. Ultimately, I'm sure we all have the same goal: Helping the developers using Auth0 to have a quick and easy transition.

If you're curious, yes I have tested these changes to make sure the application runs correctly. Just make sure the auth0 config has your credentials. Current Date: May 3, 2020 17:00 UTC.

**_So far, the changes are only for Part 1._** Adding Part 2 should be quick since there's hardly any UI work. But I wanted to get the discussion moving first.

Feel free to ignore things like trailing commas and arrowParens. Those aren't part of my suggestion. That's just `prettier`.

## src/react-auth0-spa.js

This is arguably the most important file in the entire example. It's basically where all the logic regarding authentication is centralized. It's also the first (_major_) piece of code in the example. This means the file will likely be read the most, and that people will try to understand it the most out of all the files. This in turn means that it's imperative to make the code here as simple and followable as possible -- before any other files.

- **Change**: Make the auth0 configuration a single prop.
  - **Logic**: By making the config a single prop, it becomes much easier for a reader to follow the code. The developer also will not need to _think_ as much about the code. This way, config comes from one place (the JSON) and it enters one place (the `createAuth0Client` function), meaning that the potential for errors (eg. spelling mistakes) decreases and debugging gets simpler.
- **Change**: Remove logic `onRedirectCallback` logic from `src/index.js`. Put logic into `src/react-auth0-spa.js`.
  - **Logic**: Adding an `onRedirectCallback` prop adds an additional, unnecessary level of complexity. All it's intended to do is direct the user back to their original page. This logic can go straight into the `src/react-auth0-spa.js` file. It should be up to the user to determine whether to extract away that logic. Immediately extracting that logic will create additional confusion and navigation between files for people getting introduced to the Auth0 SPA package.
- **Change**: Change default navigation after login to the home page.
  - **Logic**: Many times, developers will have a `/callback` route to handle callbacks. This seems especially common for people coming from the Implicit Flow. However, such pages are often merely some kind of loading page, or possibly an empty page altogether. If `window.location.pathname` is used, the user will be stuck on `/callback` by default, which will be confusing. If there is no other page to navigate to, it's simpler to just navigate the user to the Home page.
- **Change**: Change async function in `useEffect` to an IIFE
  - **Logic**: This is really just for extra. It decreases the lines of code. If a function is only defined to be called immediately, an IIFE might as well be used, but that's just my opinion.
- **Change**: Add `config` to the list of `useEffect` dependencies.
  - **Logic**: Dan Abramov has [made it clear](https://overreacted.io/a-complete-guide-to-useeffect/) that people should avoid excluding dependencies. And others have encouraged this as well. Just because the `useEffect` hook is only intended to be used once doesn't mean that the dependency should be excluded. There are several reasons for this -- some are mentioned in the linked article. Alternatively, if people strongly wish to keep the dependency array empty, then the `config` should not be passed in as a prop. Instead, it should be imported directly into `react-auth0-spa.js`, removing React's concern for the dependency altogether. The `config` is only being used once anyway, and it's solely being used by the `Auth0Provider` component. Whatever happens, an `eslint-disable-line` does not set a good example for developers trying to learn. So including dependencies is the minimal solution.
- **Change**: Remove unnecessary/unused definitions (`loginWithPopup`, `popupOpen`, and `handleRedirectCallback` in the `Auth0Provider` component).
  - **Logic**: When readers are looking at setup code, the general assumption is that the code provided is necessary unless otherwise specified. This means the user will attempt to read the additional code to understand how it works, and to understand how it will be used. If the code isn't going to be used at all, it consumes more of the reader's time and adds additional confusion. If there's a concern that people won't be able to employ the popup functionality on their own, then that should be added separately in an example where that type of login is actually used in some example code.
- **Change**: Reduce the React Context to 2 values: AuthState and AuthService (client)
  - **Logic**: Again, this is about going easier on the eyes. Extracting out all the individual functions means there's a lot for me as a reader to keep track of without exactly knowing why I need to keep track of it. (In fact, I don't need to keep track of it.) Reducing everything to a centralized location helps a person to reason about what the moving pieces are. One piece is just the state, which can be read at any time. The other part is the service, which calls all the functions we want. I got this idea after looking at Okta's approach, and I think it reads more smoothly.
- **Change**: Extra line/code reduction. (Destructuring `search` from `window.location`, removing the space between getting `isAuthenticated` and setting it.)
  - **Logic**: This is kinda just extra. It's not a necessity. But decreasing size and grouping related code together is always useful. There might be a better solution to the `search` portion, but I haven't found it yet.

## src/index.js

This is another important file. It's not as important as the previous one. But it's the core of the application.

- **Change**: Use the singular `config` prop. (See change in `src/react-auth0-spa.js`)
- **Change**: Wrap application in `React.StrictMode`.
  - **Logic**: The current version of `CRA` now wraps the application in `React.StrictMode`. It enhances the development experience without interfering with production. This is really just to make the example more current, and to prevent a few of the meticulous minds from asking if there's a reason the component was excluded.
- **Change**: Move the `Router` component to wrap the entire application.
  - **Logic**: This just seems to be the common expectation in development for simple apps. The example is seen in the [official docs](https://reacttraining.com/react-router/web/api/Router), in [various guides](https://www.sitepoint.com/react-router-complete-guide/), in various Pluralsight videos by well-known authors, etc. This is more so to keep with common standards (and also, to again reduce any confusion for overly meticulous people familiar with those standards).

## src/auth_config.json

- **Change**: Replace `clientId` with `client_id`. Include `redirect_uri`.
  - **Logic**: This change is necessary for the application to work with the changes done in `src/react-auth0-spa.js`. Looking at this change now, this is probably for the better. The previous version could easily lead to spelling mistakes (clientId vs. client_id and other confusions).

## src/components/NavBar.js

- **Change**: Use new context representation (See change in `src/react-auth0-spa.js`)
- **Change**: Use if-else logic directly within the function.
  - **Logic**: Since we're working with _functional_ components, and since the component is so simple, it's quite easy (and perhaps neater) to just have an if-else block that returns two different sets of JSX. It creates a clearer picture of the "different paths", if you will. It also reduces the need to repeatedly refer to `isAuthenticated`. There are other options if this look is undesired.
- **Change**: Use `nav` element for the wrapper.
  - **Logic**: This seems to be the common standard now for the navigation portion of an application.

## src/App.js

- **Change**: Remove the `Router` component and the `history` (See change in `src/index.js`)

## src/components/Profile.js

- **Change**: Use new context representation (See change in `src/react-auth0-spa.js`). The `user` can be destructured if desired.
- **Change**: Only check the `!user` condition
  - **Logic**: This is just to decrease thought for people reading the code. But from a standpoint of simplicity, the `loading` condition is arguably superfluous. What's really significant here is that we don't want someone to see the page if there is no user. If there is a user, then that means the person was already authenticated and that the loading has pretty much completed (at least in the case of this simple demo app). If some logic for `loading` is desired, it might be better used at the `App.js` level or the `PrivateRoute.js` level.

## src/components/PrivateRoute.js

- **Change**: Use new context representation (See change in `src/react-auth0-spa.js`).
- **Change**: Remove the need for `useEffect`. Use the `render` function provided by the `Route` component.
  - **Logic**: The logic here is really just to remove confusion. There's use of asynchronous logic and `useEffect` when none of that is really necessary to create a private route. Both of these can easily cause confusion for people not very familiar with them. That doesn't mean they should be avoided at all costs, but it does mean they should be avoided when more straightforward logic exists. Using the `render` prop on the `Route` component directly allows us to use a more straightforward method. It's also what seems to be more familiar to people. Cory House uses it in his Auth0 w/ React Pluralsight video, and so far most of the people I've seen in the `Reactiflux` community also take this approach. So the idea is that this will be simpler and more familiar to people who've had to enhance their routers. The [React Router docs](https://reacttraining.com/react-router/web/api/Route/render-func) have something similar for enhancing routes with fades.
- **Change**: Remove `path` from the explicit list of passed props.
  - **Logic**: For one thing, `path` is included as a dependency in `useEffect` even though it isn't used. It can be removed from there. Moreover, the `render` function on the `Route` component will pass its `path` prop through automatically. It's simplest to exclude any Route-specific props from the explicit definitions to make it clear that the `Route` component is providing those props.
