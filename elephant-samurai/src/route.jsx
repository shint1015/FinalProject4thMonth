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
// import ContactUS from '.@/pages/ContactUs.jsx'
import LoginPage from '@/pages/auth/LoginPage.jsx'
import ShowPage from '@/pages/ShowPage.jsx'
import Detail from '@/pages/Detail.jsx' 
import Profile from '@/pages/Profile.jsx'
import MyTickets from '@/pages/MyTicket.jsx'
import ProfileForm from '@/pages/ProfileForm.jsx'
import SelectingSeat from '@/pages/SelectingSeat.jsx'
import Payment from '@/pages/Payment.jsx'

// import { useAuth } from '@/hook/useAuth'

// const navigate = useNavigate()
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
    component: () => <ShowPage />,
})

export const showDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/show/$showId',
    component: () => <Detail />,
});

export const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: () => <Profile />,
});

export const profileFormRoute = createRoute({
    getParentRoute: () => profileRoute,
    path: 'info',
    component: () => <ProfileForm />,
});

export const myTicketsRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: 'mytickets',
  component: () => <MyTickets />,
})


const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: () => <LoginPage />,
})

export const selectingSeatRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/seatselecting/$showId',
    component: () => <SelectingSeat/>,
})

// const selectingSeatRoute = createRoute({
//     getParentRoute: () => rootRoute,
//     path: '/protected',
//     beforeLoad: async({location}) => {
//         const {isAuthenticated} = useAuth();
//         if (!Authenticated){
//             throw redirect({
//                 to: '/login',
//                 search: {
//                 // Use the current location to power a redirect after login
//                 // (Do not use `router.state.resolvedLocation` as it can
//                 // potentially lag behind the actual current location)
//                 redirect: location.href,
//                 },
//             })
//         }
//         return null;
//     },
//     component: () => <SelectingSeat/>,
// })

const PaymentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/seatselecting',
    component: () => <SelectingSeat/>,
})

const paymentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/payment',
    component: () => <Payment/>,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
    contactUsRoute,
    loginRoute,
    showRoute,
    showDetailRoute,
    profileRoute.addChildren([myTicketsRoute,profileFormRoute]),
    selectingSeatRoute,
    paymentRoute
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
