import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
    HeadContent,
} from '@tanstack/react-router'
import Layout from './Layout.jsx'
import Home from '@/pages/Home.jsx'
import About from '@/pages/About.jsx'
import ContactUS from '.@/pages/ContactUs.jsx'
import LoginPage from '@/pages/auth/LoginPage.jsx'
import ShowPage from '@/pages/ShowPage.jsx'
import Detail from '@/pages/Detail.jsx' 

const rootRoute = createRootRoute({
    component: () => (
        <Layout>
            <HeadContent />
            <Outlet />
        </Layout>
    ),
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <Home />,
})

// add routing
const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: () => <About />,
})

const contactUsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contact',
    component: () => <ContactUS />,
})
const showRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/shows',
    component: () => <ShowPage/>,
})

export const showDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/show/$showId',
    component: () => <Detail />,
});


const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: () => <LoginPage />,
})
const routeTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
    contactUsRoute,
    loginRoute,
    showRoute,
    showDetailRoute
])

export const router = createRouter({
    routeTree,
})

export default router

// declare module '@tanstack/react-router' {
//     interface Register {
//         router: typeof router
//     }
// }
