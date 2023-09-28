from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
import base64

from .models import Data, PostAnalysis


class UserAccountTests(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(email='testuser@example.com', password='testpass',
                                                         first_name='John', last_name='Doe', username='testuser')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        compounds_file = SimpleUploadedFile('compounds.txt', b'Compounds file content')
        adducts_file = SimpleUploadedFile('adducts.txt', b'Adducts file content')
        bounds_file = SimpleUploadedFile('bounds.txt', b'Bounds file content')
        data_publicity = True  # or False, depending on your requirements
        self.data = Data.objects.create(
            data_publicity=data_publicity,
            compounds_file=compounds_file,
            adducts_file=adducts_file,
            bounds_file=bounds_file
        )
        self.post_analysis = PostAnalysis.objects.create(result_df={'test': 'jsonOBJ'}, data_input=self.data)
        self.testPic = SimpleUploadedFile("testPic.png", base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAUA" + "AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO" + "9TXL0Y4OHwAAAABJRU5ErkJggg=="), content_type="image/png")

    def test_user_login_success(self):
        url = reverse('login')
        data = {'username': 'testuser@example.com', 'password': 'testpass'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)

    def test_user_login_failure(self):
        url = reverse('login')
        data = {'username': 'testuser@example.com', 'password': 'wrongpass'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_register_user_success(self):
        url = reverse('register')
        data = {'email': 'newuser@example.com', 'password': 'newpass', 'first_name': 'New', 'last_name': 'User', 'username': 'thistest'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_user_failure(self):
        url = reverse('register')
        data = {'email': '', 'password': 'newpass', 'first_name': 'New', 'last_name': 'User'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_logout_success(self):
        url = reverse('logout')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_logout_failure(self):
        url = reverse('logout')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + 'wrongtoken')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_post_success(self):
        url = reverse('create_post')
        data = {
            'analysis_id': self.post_analysis.id,
            'title': 'Test Post',
            'description': 'This is a test post.',
            'publicity': True,
            'post_pic': self.testPic,
            'tags': ['tag1', 'tag2']
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_post_failure(self):
        url = reverse('create_post')
        data = {'analysis_id': 999999}  # non-existent analysis_id
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_group_success(self):
        url = reverse('create_group')
        data = {
            'description': 'This is a test group.',
            'group_pic': self.testPic,
            'name': 'Test Group',
            'group_banner': self.testPic
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_group_failure(self):
        url = reverse('create_group')
        data = {'name': ''}  # name field is empty
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
