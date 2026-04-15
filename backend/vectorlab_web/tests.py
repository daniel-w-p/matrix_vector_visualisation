from django.test import TestCase
from django.urls import reverse


class ShellPageTests(TestCase):
    def test_index_page_loads(self):
        response = self.client.get(reverse('vectorlab_web:index'))

        self.assertEqual(response.status_code, 200)

# Create your tests here.
