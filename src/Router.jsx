import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedData/ProtectedRoute";
import App from "./App";
import Landpage from "./Pages/AdminPages/Foodgo/Landpage.jsx";
import AddLandpage from "./Pages/AdminPages/Foodgo/AddLandpage.jsx";
import { UserLayout,UserHomeLayout ,
    PublicLayout,
    UserProfileLayout,
    StoreLayout,
    UserSubscriptionsLayout,
    AdminLayout,AdminHomeLayout,
    PaymentMethodLayout,
    AddPaymentMethodLayout,
    EditPaymentMethodLayout,
    PlanLayout,
    AddPlanLayout,
    EditPlanLayout,
    UserEditProfileLayout,DemoRequestLayout,
    PendingPaymentLayout,
    OrderLayout,
    AddUserLayout,
    EditUserLayout,
    AddSubscriptionLayout,
    EditSubscriptionLayout,
    ExtraProductLayout,
    AddExtraProductLayout,
    EditExtraProductLayout,
    UserDashboardLayout,
    PaymentLayout,
    PaymentHistoryLayout,
    TutorialLayout,
    ExtraLayout,
    AddStoreLayout,
    EditStoreLayout,
    CheckoutLayout,
    MyDomainLayout,
    BuyDomainLayout,
    VideoTutorialLayout,
    PromoCodeLayout,
    AddPromoCodeLayout,
    EditPromoCodeLayout,
    DomainRequestLayout,
    AdminTutorialLayout,
    AddAdminTutorialLayout,
    EditAdminTutorialLayout,
    AddTutorialLayout,
    EditTutorialLayout,
    TutorialDataLayout,
    ActivityLayout,
    AddActivityLayout,
    EditActivityLayout,
    WelcomOfferLayout,
    AddWelcomOfferLayout,
    EditWelcomOfferLayout,
    AdminInformationLayout,
    AddAdminInformationLayout,
    EditAdminInformationLayout,
    ContactUsLayout,
    StoresLayout,
    EditStoresLayout,
    SMSPackageLayout,
    AddSMSPackageLayout,
    EditSMSPackageLayout,
    UserPackageLayout,
    AddUserPackageLayout,
    EditUserPackageLayout,
    DomainSubscriptionLayout,
    AddDomainSubscriptionLayout,
    EditDomainSubscriptionLayout,
} from "./Layouts/AllLayouts";
import Login from "./Pages/RegisterPages/Login.jsx";
import SignUpPage from "./Pages/RegisterPages/SignUpPage.jsx";
import SubscriptionLayout from "./Layouts/AdminLayouts/SubscriptionLayout.jsx";
import { CartPage } from "./Pages/AllPages.js";
import EmailVerification from "./Pages/RegisterPages/EmailVerification.jsx";
import FeaturesPage from "./Pages/PublicPages/OurFeatureData.jsx";
import TermsAndCondition from "./TermsAndCondition.jsx";
import EditLandpage from "./Pages/AdminPages/Foodgo/EditLandpage.jsx";
import ProposalPage from "./Pages/AdminPages/Proposal/ProposalPage.jsx";
/* User Dashboard */
const AppLayoutUser = () => (
  <>
    <UserDashboardLayout/>
  </>
);
const AppLayoutUserProfile = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutStore = () => (
  <>
    <Outlet/>
  </>
);


const AppLayoutAdmin = () => (
  <>
    <AdminLayout/>
  </>
);
const AppLayoutUsers = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutSubscription = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutPlan = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutExtraProduct = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutPaymentMethod = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutActivity = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutPromoCode = () => (
  <>
    <Outlet/>
  </>
);
const AppLayoutAdminTutorial = () =>(
  <>
  <Outlet/>
 </>
)
const AppLayoutTutorial = () =>(
  <>
  <Outlet/>
 </>
)
const AppLayoutWelcomOffer = () =>(
  <>
  <Outlet/>
 </>
)
const AppLayoutContact  = () =>(
  <>
  <Outlet/>
 </>
)
const AppLayoutStores = () =>(
  <>
  <Outlet/>
 </>
)

export const router = createBrowserRouter([

    //Login user page
    {
      path: "/",
      element: <Login />,
    },
{
  path:"features",
  element:<FeaturesPage/>
},
    //EmailVerification
    {
      path: "verification",
      element: <EmailVerification />,
    },
    
    //SignUp user page
    {
      path: "signUp",
      element: <SignUpPage />,
    },

    {
      path: "terms_condition",
      element: <TermsAndCondition />,
    },
   

    /* Admin Routes*/
    {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    path: '/dashboard_admin',
    children: [
      {
        path: '',
        element: <AppLayoutAdmin/>,
        children: [
          {
            path: '',
            element: <AdminHomeLayout/>,
          },
          {
            path: 'demo_request',
            element: <DemoRequestLayout/>,
          },
          {
            path: 'domain_request',
            element: <DomainRequestLayout/>,
          },
          {
            path: 'pending_payment',
            element: <PendingPaymentLayout/>,
          },
          {
            path: 'order',
            element: <OrderLayout/>,
          },
          {
            path: 'user',
            element: <AppLayoutUsers/>,
            children:[
              {
                path:'',
                element: <UserLayout/>,
              },
              {
                path:'add',
                element: <AddUserLayout/>,
              },
              {
                path:'edit/:userId',
                element: <EditUserLayout/>,
              },
            ]
          }, 
          {
            path: 'subscription',
            element: <AppLayoutSubscription/>,
            children:[
              {
                path:'',
                element: <SubscriptionLayout/>,
              },
              {
                path:'add',
                element: <AddSubscriptionLayout/>,
              },
              {
                path:'edit/:subscriptionId',
                element: <EditSubscriptionLayout/>,
              },
            ]
          }, 
          {
            path: 'plan',
            element: <AppLayoutPlan/>,
            children:[
              {
                path:'',
                element: <PlanLayout/>,
              },
              {
                path:'add',
                element: <AddPlanLayout/>,
              },
              {
                path:'edit/:planId',
                element: <EditPlanLayout/>,
              },
            ]
          },
          {
            path: 'extra_product',
            element: <AppLayoutExtraProduct/>,
            children:[
              {
                path:'',
                element: <ExtraProductLayout/>,
              },
              {
                path:'add',
                element: <AddExtraProductLayout/>,
              },
              {
                path:'edit/:extraId',
                element: <EditExtraProductLayout/>,
              },
            ]
          },
          {
            path: 'payment',
            element: <PaymentLayout/>,
          },  
           {
            path: 'landpage',
            element: <Landpage/>,
          }, 
           {
             path: 'proposal',
             element: <ProposalPage/>,
           },
            {
             path: 'addlandpage',
             element: <AddLandpage/>,
          }, 
           {
            path: 'editlandpage',
            element: <EditLandpage/>,
          }, 
          {
            path: 'payment_method',
            element: <AppLayoutPaymentMethod/>,
            children:[
              {
                path:'',
                element: <PaymentMethodLayout/>,
              },
              {
                path:'add',
                element: <AddPaymentMethodLayout/>,
              },
              {
                path:'edit/:methodId',
                element: <EditPaymentMethodLayout/>,
              },
            ]
          },
          {
            path: 'promocode',
            element:<AppLayoutPromoCode/>,
            children: [
              {
                path:'',
                element:<PromoCodeLayout/>
              },
              {
                path:'add',
                element:<AddPromoCodeLayout/>
              },
              {
                path:'edit/:codeId',
                element:<EditPromoCodeLayout/>
              },
            ]
          },
          {
            path: 'activity',
            element: <AppLayoutActivity/>,
            children:[
              {
                path:'',
                element: <ActivityLayout/>,
              },
              {
                path:'add',
                element: <AddActivityLayout/>,
              },
              {
                path:'edit/:activityId',
                element: <EditActivityLayout/>,
              },
            ]
          },
          {
            path: 'tutorial_group',
            element:<AppLayoutAdminTutorial/>,
            children: [
              {
                path:'',
                element:<AdminTutorialLayout/>
              },
              {
                path:'tutorial/:id',
                element:<TutorialDataLayout/>
              },
              {
                path:'add',
                element:<AddAdminTutorialLayout/>
              },
              {
                path:'edit/:groupId',
                element:<EditAdminTutorialLayout/>
              },
              {
                path:'add_tutorial/:groupId',
                element:<AddTutorialLayout/>
              },
              {
                path:'edit_tutorial/:tutorialId',
                element:<EditTutorialLayout/>
              },
            ]
          },
          {
            path: 'welcome_offer',
            element:<AppLayoutWelcomOffer/>,
            children: [
              {
                path:'',
                element:<WelcomOfferLayout/>
              },
              {
                path:'add',
                element:<AddWelcomOfferLayout/>
              },
              {
                path:'edit/:welcomeOfferId',
                element:<EditWelcomOfferLayout/>
              },
            ]
          },
          {
            path: 'contact_info',
            element:<AppLayoutContact/>,
            children: [
              {
                path:'',
                element:<AdminInformationLayout/>
              },
              {
                path:'add',
                element:<AddAdminInformationLayout/>
              },
              {
                path:'edit/:contactId',
                element:<EditAdminInformationLayout/>
              },
            ]
          },
          {
            path: 'stores',
            element:<AppLayoutStores/>,
            children: [
              {
                path:'',
                element:<StoresLayout/>
              },
              {
                path:'edit/:storesId',
                element:<EditStoresLayout/>
              },
            ]
          },
           {
            path: 'sms_packages',
            element: <Outlet/>,
            children:[
              {
                path:'',
                element: <SMSPackageLayout/>,
              },
              {
                path:'add',
                element: <AddSMSPackageLayout/>,
              },
              {
                path:'edit/:smsId',
                element: <EditSMSPackageLayout/>,
              },
            ]
          }, 
          {
            path: 'user_packages',
            element: <Outlet/>,
            children:[
              {
                path:'',
                element: <UserPackageLayout/>,
              },
              {
                path:'add',
                element: <AddUserPackageLayout/>,
              },
              {
                path:'edit/:userPackageId',
                element: <EditUserPackageLayout/>,
              },
            ]
          }, 
          {
            path: 'domain_subscription',
            element: <Outlet/>,
            children:[
              {
                path:'',
                element: <DomainSubscriptionLayout/>,
              },
              {
                path:'add',
                element: <AddDomainSubscriptionLayout/>,
              },
              {
                path:'edit/:domainSubscriptionId',
                element: <EditDomainSubscriptionLayout/>,
              },
            ]
          }, 
        ],
      },
    ],
    },
    /* User Routes*/
    {
        element: <ProtectedRoute allowedRoles={['user']} />,
        path: '/dashboard_user',
        children: [
          {
            path: '',
            element: <AppLayoutUser/>,
            children: [
              {
                path: '',
                element: <UserHomeLayout/>,
              },
              {
                path: 'profile',
                element: <AppLayoutUserProfile/>,
                children:[
                  {
                    path:'',
                    element: <UserProfileLayout/>,
                  },
                  {
                    path:'edit',
                    element: <UserEditProfileLayout/>
                  }
                ]
              },  
              {
                path: 'store',
                element: <AppLayoutStore/>,
                children :[
                  {
                    path: '',
                    element: <StoreLayout/>,
                  },
                  {
                    path: 'add',
                    element: <AddStoreLayout/>,
                  },
                  {
                    path: 'edit/:storeId',
                    element: <EditStoreLayout/>,
                  },
                ]
              },
              {
                path: 'subscription',
                element: <UserSubscriptionsLayout/>,
              },
              {
                path: 'my_domain',
                element: <MyDomainLayout/>,
              },
              {
                path: 'buy_domain',
                element: <BuyDomainLayout/>,
              },
              // {
              //   path: 'my_domain',
              //   element: <AppLayoutUserDomain/>,
              //   children:[
              //     {
              //       path: '',
              //       element: <MyDomainLayout/>,
              //     },
              //     {
              //       path: 'buy_domain',
              //       element: <BuyDomainLayout/>,
              //     }
              //   ]
              // },
              {
                path: 'extra',
                element: <ExtraLayout/>,
              },
              {
                path: 'payment_history',
                element: <PaymentHistoryLayout/>,
              },
              {
                path: 'checkout',
                element: <CheckoutLayout/>,
              },
              {
                path: 'tutorial',
                element: <AppLayoutTutorial/>,
                children: [
                  {
                    path: '',
                    element: <TutorialLayout/>,
                  },
                  {
                    path: 'video/:videoId',
                    element: <VideoTutorialLayout/>,
                  }
                ]
              },
              {
                path: "cart",
                element: <CartPage />, // Use Cart component for the cart route
              },
              {
                path: "contact_us",
                element: <ContactUsLayout />, // Use Cart component for the cart route
              }
            ],
          },
        ],
    },

])