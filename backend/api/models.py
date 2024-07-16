from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from cryptography.fernet import Fernet

class UserManager(BaseUserManager):
    def create_user(self, username, password, email, role):
        if not username:
            raise ValueError('The Username field is required')
        if not email:
            raise ValueError('The Email field is required')
        
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            role=role,
        )
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, email):
        user = self.create_user(
            username=username,
            password=password,
            email=email,
            role='admin',
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'role']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

# Generate a key for encryption
def generate_key():
    return Fernet.generate_key()

# Save this key securely
key = generate_key()
cipher_suite = Fernet(key)

class Company(models.Model):
    name = models.CharField(max_length=255)
    registration_date = models.DateField()
    registration_number = models.CharField(max_length=100, unique=True)
    address = models.TextField()
    contact_person = models.CharField(max_length=255)
    number_of_employees = models.PositiveIntegerField()
    contact_phone = models.CharField(max_length=15)
    email_address = models.EmailField()

    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name='departments', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=100, unique=True, blank=True, null=True)
    company = models.ForeignKey(Company, related_name='employees', on_delete=models.CASCADE)
    department = models.ForeignKey(Department, related_name='employees', on_delete=models.SET_NULL, null=True)
    role = models.CharField(max_length=255)
    date_started = models.DateField()
    date_left = models.DateField(blank=True, null=True)
    duties = models.TextField()
    contact_details_encrypted = models.TextField(default='')

    def set_contact_details(self, contact_details):
        self.contact_details_encrypted = cipher_suite.encrypt(contact_details.encode()).decode()

    def get_contact_details(self):
        return cipher_suite.decrypt(self.contact_details_encrypted.encode()).decode()

    def __str__(self):
        return self.name

class FileUpload(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



