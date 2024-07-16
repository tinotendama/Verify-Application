from rest_framework import routers
from .views import *
from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register('companies', CompanyViewSet, basename='companies')
router.register('departments', DepartmentViewSet, basename='departmens')
router.register('employees', EmployeeViewSet, basename='employees')
router.register('uploads', FileUploadViewSet, basename='fileupload')
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
]


