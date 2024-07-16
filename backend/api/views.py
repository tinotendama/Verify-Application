from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework import viewsets, permissions,filters
from .models import *
from .serializers import *


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes =[permissions.AllowAny]

class CompanyViewSet(viewsets.ModelViewSet):
    permission_classes =[permissions.AllowAny]
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    permission_classes =[permissions.AllowAny]
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    permission_classes =[permissions.AllowAny]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeSearchViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSearchSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'company__name', 'position', 'department', 'year_started', 'year_left']

class FileUploadViewSet(viewsets.ModelViewSet):
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        file_serializer = self.get_serializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)