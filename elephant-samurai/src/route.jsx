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
import Profile from '@/pages/Profile.jsx'
import MyTickets from '@/pages/MyTicket.jsx'
import ProfileForm from '@/pages/ProfileForm.jsx'
import SelectingSeat from '@/pages/SelectingSeat.jsx'
import Payment from '@/pages/Payment.jsx'

/* Admin pages */
import ShowList from '@/pages/admin/show/List.jsx'
import ShowAdd from '@/pages/admin/show/Add.jsx'
import ShowEdit from '@/pages/admin/show/Edit.jsx'
import ReservationList from '@/pages/admin/reservation/List.jsx'
import ReservationAdd from '@/pages/admin/reservation/Add.jsx'
import ReservationEdit from '@/pages/admin/reservation/Edit.jsx'
import VenueList from '@/pages/admin/venue/List.jsx'
import VenueAdd from '@/pages/admin/venue/Add.jsx'
import VenueEdit from '@/pages/admin/venue/Edit.jsx'
import UserList from '@/pages/admin/user/List.jsx'
import UserAdd from '@/pages/admin/user/Add.jsx'
import UserEdit from '@/pages/admin/user/Edit.jsx'

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
    beforeLoad: async ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    getParentRoute: () => rootRoute,
    path: '/seatselecting/$showId',
    component: () => <SelectingSeat/>,
})

const paymentRoute = createRoute({
    beforeLoad: async ({ context, location }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            })
        }
    },
    getParentRoute: () => rootRoute,
    path: '/payment',
    component: () => <Payment/>,
})

const showListRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/show/list',
    component: () => <ShowList />,
})

const showAddRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/show/add',
    component: () => <ShowAdd />,
})

const showEditRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/show/$id/edit',
    component: () => <ShowEdit />,
})

const reservationListRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/reservation/list',
    component: () => <ReservationList />,
})

const reservationAddRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/reservation/add',
    component: () => <ReservationAdd />,
})

const reservationEditRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/reservation/$id/edit',
    component: () => <ReservationEdit />,
})

const venueListRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/venue/list',
    component: () => <VenueList />,
})

const venueAddRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/venue/add',
    component: () => <VenueAdd />,
})

const venueEditRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/venue/$id/edit',
    component: () => <VenueEdit />,
})

const userListRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/user/list',
    component: () => <UserList />,
})

const userAddRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/user/add',
    component: () => <UserAdd />,
})

const userEditRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/user/$id/edit',
    component: () => <UserEdit />,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
    contactUsRoute,
    loginRoute,
    showRoute,
    showDetailRoute,
    selectingSeatRoute,
    paymentRoute
    profileRoute.addChildren([myTicketsRoute,profileFormRoute]),
    showListRoute,
    showAddRoute,
    showEditRoute,
    reservationListRoute,
    reservationAddRoute,
    reservationEditRoute,
    venueListRoute,
    venueAddRoute,
    venueEditRoute,
    userListRoute,
    userAddRoute,
    userEditRoute,
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

