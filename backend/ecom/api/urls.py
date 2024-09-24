from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import  RegisterView,prductViewset,CartitemViewset,CategoryViewset,initiate_paypal_payments
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView


router=DefaultRouter()
router.register(r'categories',CategoryViewset)
router.register(r'produts',prductViewset)
router.register(r'cartitem',CartitemViewset)

urlpatterns=[
    path('token/',TokenObtainPairView.as_view(),name="token"),
    path('token/refresh/',TokenRefreshView.as_view(),name="refresh"),
    path('register/', RegisterView.as_view(), name='register'),
    path('',include(router.urls)),
    path('payment/',initiate_paypal_payments,name="paypal")

]